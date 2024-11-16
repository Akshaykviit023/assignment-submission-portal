import { hash, compare } from "bcrypt";
import User from "../models/User.js";
import { createToken } from "../utils/token-manager.js";
import Assignment from "../models/Assignment.js";
import Admin from "../models/Admin.js";

/**
 * @desc    Register a new user
 * @route   POST /api/users/register
 * @access  Public
 */
export const userRegister = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).send("User already signed up");
        }

        // Hash the user's password for security
        const hashedPassword = await hash(password, 10);

        // Create a new user instance
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        // Generate a JWT token for the user
        const token = createToken(user._id.toString(), user.email, "30d");

        // Return a success response with user id and token
        return res.status(201).json({ message: "OK", id: user._id.toString(), token });
    } catch (error) {
        console.log(error);
        // Return an error response with the error message
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};

/**
 * @desc    User login
 * @route   POST /api/users/login
 * @access  Public
 */
export const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send("User not registered");
        }

        // Check if the password is correct
        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(403).send("Incorrect Password");
        }

        // Generate a JWT token for the user
        const token = createToken(user._id.toString(), user.email, "30d");

        // Return a success response with user id and token
        return res.status(200).json({ message: "OK", id: user._id.toString(), token });
    } catch (error) {
        console.log(error);
        // Return an error response with the error message
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};

/**
 * @desc    Upload an assignment by the user
 * @route   POST /api/users/upload
 * @access  Private (User Only)
 */
export const uploadAssignment = async (req, res) => {
    const { task, admin } = req.body;
    const userObj = req.user; // Retrieved from auth middleware

    try {
        // Find the admin to tag the assignment
        const adminObj = await Admin.findOne({ name: admin });
        if (!adminObj) {
            return res.status(404).json({ message: "Admin not found" });
        }

        // Create a new assignment instance
        const assignment = new Assignment({
            userId: userObj._id,
            task,
            admin: adminObj._id,
        });

        // Save the assignment in the database
        await assignment.save();

        // Link the assignment to the user and admin
        userObj.assignments.push(assignment);
        adminObj.assignments.push(assignment);

        // Save the updated user and admin objects
        await userObj.save();
        await adminObj.save();

        // Return a success response
        return res.status(200).json({ message: "Assignment uploaded successfully" });
    } catch (error) {
        console.log(error);
        // Return an error response with the error message
        return res.status(500).json({ message: "Failed to upload assignment" });
    }
};

/**
 * @desc    Fetch all registered admins
 * @route   GET /api/users/admins
 * @access  Public
 */
export const fetchAllAdmins = async (req, res) => {
    try {
        // Retrieve all admin names from the database
        const admins = await Admin.find({}, "name");

        // Return a success response with the list of admins
        return res.status(200).json({
            success: true,
            message: "Admins fetched successfully",
            data: admins,
        });
    } catch (error) {
        console.error(error);
        // Return an error response with the error message
        return res.status(500).json({
            success: false,
            message: "Failed to fetch admins",
            error: error.message,
        });
    }
};
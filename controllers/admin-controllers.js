import { hash, compare } from "bcrypt";
import Admin from "../models/Admin.js";
import { createToken } from "../utils/token-manager.js";
import Assignment from "../models/Assignment.js";

/**
 * @desc Register a new admin
 * @route POST /api/admins/register
 * @access Public
 */
export const adminRegister = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if an admin with the given email already exists
        const existingUser = await Admin.findOne({ email });
        if (existingUser)
            return res.status(401).send("User already signed up");

        // Hash the password before saving it to the database
        const hashedPassword = await hash(password, 10);
        
        // Create a new admin instance
        const user = new Admin({ name, email, password: hashedPassword });

        // Save the new admin to the database
        await user.save();

        // Create a JWT token for the newly registered admin
        const token = createToken(user._id.toString(), user.email, "30d");

        // Send a response with the admin's ID and the token
        return res.status(201).json({ message: "OK", id: user._id.toString(), token });
    } catch (error) {
        console.log(error);
        // Handle any errors that occur during registration
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};

/**
 * @desc Admin login
 * @route POST /api/admins/login
 * @access Public
 */
export const adminLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if the admin exists in the database
        const user = await Admin.findOne({ email });
        if (!user) {
            return res.status(401).send("User not registered");
        }

        // Verify the provided password with the stored hashed password
        const isPasswordCorrect = await compare(password, user.password);

        if (!isPasswordCorrect)
            return res.status(403).send("Incorrect Password");

        // Generate a JWT token upon successful login
        const token = createToken(user._id.toString(), user.email, "30d");

        // Send a response with the admin's ID and the token
        return res.status(200).json({ message: "OK", id: user._id.toString(), token });
    } catch (error) {
        console.log(error);
        // Handle any errors that occur during login
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};

/**
 * @desc View all assignments tagged to the logged-in admin
 * @route GET /api/admins/assignments
 * @access Private (Admin only)
 */
export const viewAssignments = async (req, res) => {
    try {
        // Fetch assignments where the admin field matches the logged-in admin's ID
        const assignments = await Assignment.find({ admin: req.user._id });

        // Respond with the list of assignments
        return res.status(200).json({ assignments });
    } catch (error) {
        // Handle any errors during fetching assignments
        return res.status(500).json({ message: "Failed to fetch assignments" });
    }
};

/**
 * @desc Accept an assignment by updating its status
 * @route POST /api/admins/assignments/:id/accept
 * @access Private (Admin only)
 */
export const acceptAssignment = async (req, res) => {
    const { id } = req.params;
    try {
        // Update the status of the assignment to 'Accepted'
        await Assignment.findByIdAndUpdate(id, { status: 'Accepted' });

        // Respond with a success message
        return res.status(200).json({ message: 'Assignment accepted' });
    } catch (error) {
        // Handle any errors during the status update
        return res.status(500).json({ message: 'Failed to accept assignment' });
    }
};

/**
 * @desc Reject an assignment by updating its status
 * @route POST /api/admins/assignments/:id/reject
 * @access Private (Admin only)
 */
export const rejectAssignment = async (req, res) => {
    const { id } = req.params;
    try {
        // Update the status of the assignment to 'Rejected'
        await Assignment.findByIdAndUpdate(id, { status: 'Rejected' });

        // Respond with a success message
        return res.status(200).json({ message: 'Assignment rejected' });
    } catch (error) {
        // Handle any errors during the status update
        return res.status(500).json({ message: 'Failed to reject assignment' });
    }
};
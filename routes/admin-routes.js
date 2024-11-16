import { Router } from "express";
import { adminLogin, adminRegister, viewAssignments, acceptAssignment, rejectAssignment } from "../controllers/admin-controllers.js";
import { loginValidator, signupValidator, validate } from "../utils/validators.js";
import { adminVerification } from "../middlewares/auth-middleware.js";

const adminRoutes = Router();

adminRoutes.post("/register",validate(signupValidator) , adminRegister);

adminRoutes.post("/login",validate(loginValidator) , adminLogin);

adminRoutes.get("/assignments", adminVerification, viewAssignments);

adminRoutes.post("/assignments/:id/accept", adminVerification, acceptAssignment);

adminRoutes.post("/assignments/:id/reject", adminVerification, rejectAssignment);

export default adminRoutes;
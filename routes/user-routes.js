import { Router } from "express";
import { userLogin, userRegister, uploadAssignment, fetchAllAdmins } from "../controllers/user-controllers.js";
import { loginValidator, signupValidator, validate } from "../utils/validators.js";
import { userVerification } from "../middlewares/auth-middleware.js";

const userRoutes = Router();

userRoutes.post("/register",validate(signupValidator) , userRegister);

userRoutes.post("/login",validate(loginValidator) , userLogin);

userRoutes.post("/upload", userVerification, uploadAssignment);

userRoutes.get("/admins", userVerification, fetchAllAdmins);

export default userRoutes;
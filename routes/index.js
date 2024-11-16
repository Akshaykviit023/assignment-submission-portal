import { Router } from "express";
import userRoutes from "./user-routes.js";
import adminRoutes from "./admin-routes.js";

const appRouter = Router();

appRouter.use("/user", userRoutes);
appRouter.use("/admin", adminRoutes);
export default appRouter;
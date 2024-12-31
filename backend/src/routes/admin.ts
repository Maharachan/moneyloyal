import { Router } from "express";
import { errorHandler } from "../error-handler";
import { getUsers, updateRole } from "../controllers/admin";
import authMiddleware from "../middlewares/auth";
import adminMiddleware from "../middlewares/admin";

const adminRoutes: Router = Router();

adminRoutes.get('/users',[authMiddleware, adminMiddleware ],errorHandler(getUsers))
adminRoutes.put('/users/update-role',[authMiddleware, adminMiddleware ],errorHandler(updateRole))


export default adminRoutes;

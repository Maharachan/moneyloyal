import {Router} from "express";
import { login, me, signup, sendEmail } from "../controllers/auth";
import { errorHandler } from "../error-handler";
import authMiddleware from "../middlewares/auth";

const authRoutes: Router = Router();

authRoutes.post('/signup', errorHandler(signup));
authRoutes.post('/login', errorHandler(login));
authRoutes.get('/me', [authMiddleware], errorHandler(me));
authRoutes.post('/send-email', [authMiddleware], errorHandler(sendEmail));

export default authRoutes;
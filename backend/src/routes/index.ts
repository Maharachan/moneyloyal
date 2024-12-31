import {Router} from "express";
import authRoutes from "./auth";
import offersRoutes from "./offers";
import adminRoutes from "./admin";

const rootRouter: Router = Router();

rootRouter.use("/auth",authRoutes)
rootRouter.use("/offers",offersRoutes)
rootRouter.use("/admin",adminRoutes)


export default rootRouter;
import {Router} from "express";
import authRoutes from "./auth";
import offersRoutes from "./offers";

const rootRouter: Router = Router();

rootRouter.use("/auth",authRoutes)
rootRouter.use("/offers",offersRoutes)


export default rootRouter;
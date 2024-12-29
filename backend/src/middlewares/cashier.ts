import { NextFunction, Request, Response } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";


const cashierMiddleware = async(req: Request, res: Response, next: NextFunction) => {
   const user = req.user;
   if(user.role == "CASHIER" || user.role == "ADMIN") {
    next();
   }
   else{
    next(new UnauthorizedException("Unauthorized", ErrorCode.UNAUTHORIZED));
    return;
   }
}

export default cashierMiddleware;

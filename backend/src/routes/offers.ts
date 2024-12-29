import { Router } from "express";
import { errorHandler } from "../error-handler";
import { createOffer, deleteOffer, getOfferById, listOffer, updateOffer } from "../controllers/offers";
import authMiddleware from "../middlewares/auth";
import cashierMiddleware from "../middlewares/cashier";

const offersRoutes: Router = Router();

offersRoutes.post('/',[authMiddleware, cashierMiddleware ],errorHandler(createOffer))
offersRoutes.put('/:id',[authMiddleware, cashierMiddleware ],errorHandler(updateOffer))
offersRoutes.delete('/:id',[authMiddleware, cashierMiddleware ],errorHandler(deleteOffer))
offersRoutes.get('/',[authMiddleware],errorHandler(listOffer))
offersRoutes.get('/:id',[authMiddleware, cashierMiddleware ],errorHandler(getOfferById))


export default offersRoutes;

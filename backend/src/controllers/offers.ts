import { Request, Response } from "express";
import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";

export const createOffer = async (req: Request, res: Response) => {
    const offer = await prismaClient.offer.create({
        data:{
            ...req.body,
        }
    })
    res.json(offer);
}

export const updateOffer = async (req: Request, res: Response) => {
    try{
        const offer = req.body;
        const updatedOffer = await prismaClient.offer.update({
            where:{
                id: Number(req.params.id)
            },
            data: offer
        })
        res.json(updatedOffer);
    }catch(err){
        throw new NotFoundException("Offer not found", ErrorCode.OFFER_NOT_FOUND);
    }
}

export const deleteOffer = async (req: Request, res: Response) => {}

export const listOffer = async (req: Request, res: Response) => {
   const count = await prismaClient.offer.count();
   const offers = await prismaClient.offer.findMany({
    skip: Number(req.query.skip)||0,
    take: Number(req.query.take)||5,
   })
   res.json({count, data:offers});
}

export const getOfferById = async (req: Request, res: Response) => {
    try{
        const offer = await prismaClient.offer.findFirstOrThrow({
            where:{
                id: Number(req.params.id)
            }
        })
        res.json(offer);
    }catch(err){
        throw new NotFoundException("Offer not found", ErrorCode.OFFER_NOT_FOUND);
    }
}



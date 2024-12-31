import { Request, Response } from "express";
import { prismaClient } from "..";
import { ErrorCode } from "../exceptions/root";
import { InternalException } from "../exceptions/internal-exception";
import { NotFoundException } from "../exceptions/not-found";

export const getUsers = async (req: Request, res: Response) => {
    try{
        const users = await prismaClient.user.findMany();
        const usersResponse = users.map((user) => {
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
        res.json(usersResponse);
    }catch(err){
        throw new InternalException("Internal server error", ErrorCode.INTERNAL_EXCEPTION, err);
    }
}

export const updateRole = async (req: Request, res: Response) => {
    const { email, id, role } = req.body;

    try {
        let user;
        if (email) {
            user = await prismaClient.user.findUnique({ where: { email } });
        } else if (id) {
            user = await prismaClient.user.findUnique({ where: { id } });
        } else {
            throw new NotFoundException("Email or ID is required", ErrorCode.USER_NOT_FOUND);
        }

        if (!user) {
            throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
        }

        const updatedUser = await prismaClient.user.update({
            where: { id: user.id },
            data: { role }
        });

        const userResponse = {
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role
        }
        res.json(userResponse);
    } catch (err) {
        throw new InternalException("Internal server error", ErrorCode.INTERNAL_EXCEPTION, err);
    }
}
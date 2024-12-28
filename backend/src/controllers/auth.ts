import { NextFunction, Request, Response } from "express";
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { BadRequestsException } from "../exceptions/bad-requests";
import { ErrorCode } from "../exceptions/root";
import { UnprocessableEntity } from "../exceptions/validation";
import { signupSchema } from "../schema/user";
import { Sign } from "crypto";
import { NotFoundException } from "../exceptions/not-found";

export const signup = async (req: Request,res: Response) => {
  signupSchema.parse(req.body);
  const { name, phonenumber, email, password } = req.body;
  let user = await prismaClient.user.findFirst({ where: { email } });

  if (user) {
      new BadRequestsException("User already exists!", ErrorCode.USER_ALREADY_EXISTS);
  }

  user = await prismaClient.user.create({
    data: {
      name,
      phonenumber,
      email,
      password: hashSync(password, 10),
    },
  });

  res.json( user );
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  let user = await prismaClient.user.findFirst({ where: { email } });
  if (!user) {
    throw new NotFoundException("User not found!", ErrorCode.USER_NOT_FOUND);
  }
  if (!compareSync(password, user.password)) {
    throw new BadRequestsException("Incorrect password!", ErrorCode.INCORRECT_PASSWORD);
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET);

  const { password: _, ...userWithoutPassword } = user;

  res.json({ user: userWithoutPassword, token });
};
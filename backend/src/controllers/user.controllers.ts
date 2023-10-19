import { NextFunction, Request, Response } from "express";
import { createUser, getAllUser } from "../services/user.services";
import { InternalServerError } from "../errors/internalServerError";

export async function createUserHandeller(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await createUser(req.body).then((user) => {
      res.status(201).json(user);
    });
  } catch (error: any) {
    next(new InternalServerError(error.message))
  }
}

export async function getAllUserHandeller(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await getAllUser();

    res.status(200).json(users);
  } catch (error: any) {
    next(new InternalServerError(error.message))
  }
}

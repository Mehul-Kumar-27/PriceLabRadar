import { NextFunction, Request, Response } from "express";
import { AutheticationError } from "../errors/authentiction-error";

const validateDeserializeUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;
  const isExpired = res.locals.isExpired;

  if (!user) {
    return next(new AutheticationError("The User is not authorized"))
  }

  return next();
};

export default validateDeserializeUser;

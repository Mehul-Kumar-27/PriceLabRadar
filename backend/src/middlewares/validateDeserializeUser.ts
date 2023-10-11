import { NextFunction, Request, Response } from "express";

const validateDeserializeUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;

  if (!user) {
    return res.sendStatus(403);
  }

  return next();
};

export default validateDeserializeUser;
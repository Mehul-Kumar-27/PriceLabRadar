import { NextFunction, Request, Response } from "express";

const validateDeserializeUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;
  const isExpired = res.locals.isExpired;

  if (!user) {
    if (!isExpired) {
      return res.status(403).send({ response: "The User Is Not Allowed" });
    } else {
      return res.status(403).send({ response: "JWT Token is Expired" });
    }
  }

  return next();
};

export default validateDeserializeUser;

import { NextFunction, Request, Response } from "express";
import { verifyJWT } from "../utils/jwt.utils";

const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.split("Bearer")[1].trim();
  if (!accessToken) {
    return next();
  }

  // otherwise verify the access token

  const { decoded, expired } = verifyJWT(accessToken);

  if (decoded && !expired) {
    res.locals.user = decoded;
    return next();
  } else if (expired) {
    return res.status(403).send('JWT EXPIRED');
  }

  return next();
};

export default deserializeUser;

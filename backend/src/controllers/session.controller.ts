import { NextFunction, Request, Response } from "express";
import { validateUserPasword } from "../services/user.services";
import {
  createSessionService,
  findSessionService,
} from "../services/session.services";
import { signInJWT } from "../utils/jwt.utils";
import env from "../utils/validateENV";
import { AutheticationError } from "../errors/authentiction-error";
import { BadRequestError } from "../errors/badrequest-error";
import { InternalServerError } from "../errors/internalServerError";


export async function createSessionController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  /// Validate the user password
  const email = req.body.email;
  const password = req.body.password;
  const user = await validateUserPasword(email, password);

  if (!user) {
    next(new AutheticationError("User Credentials Invalid"));
  } else {

    const session = await createSessionService(
      user._id,
      req.get("user-agent") || ""
    );

    // Create a SignIn Jwt Token

    const accessToken = signInJWT(
      { ...user.toObject(), session: session._id },
      { expiresIn: env.ACCESS_TOKEN_TIME }
    );

    const refreshToken = signInJWT(
      { ...user, session: session._id },
      { expiresIn: env.ACCESS_TOKEN_TIME }
    );

    return res.sendStatus(201).json({ accessToken, refreshToken });
  }


}

export async function getAllSessionController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = res.locals.user._id;

    const sessions = await findSessionService(userId);

    res.sendStatus(200).json(sessions);
  } catch (error) {
    next(new InternalServerError("Something went Wrong !!"))
  }
} 

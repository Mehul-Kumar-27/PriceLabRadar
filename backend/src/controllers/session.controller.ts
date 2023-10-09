import { NextFunction, Request, Response } from "express";
import { validateUserPasword } from "../services/user.services";
import { createSessionService } from "../services/session.services";
import { signInJWT } from "../utils/jwt.utils";
import env from "../utils/validateENV";

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
    return res.status(401).send("Invalid Email Or Password");
  }

  const session = await createSessionService(
    user.id,
    req.get("user-agent") || ""
  );

  // Create a SignIn Jwt Token

  const accessToken = signInJWT(
    { ...user, session: session._id },
    { expiresIn: env.ACCESS_TOKEN_TIME }
  );

  const refreshToken = signInJWT(
    { ...user, session: session._id },
    { expiresIn: env.ACCESS_TOKEN_TIME }
  );

  return res.send({ accessToken, refreshToken });
}

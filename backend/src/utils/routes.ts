import { Express, NextFunction, Request, Response } from "express";
import { validateUserMiddleWare } from "../middlewares/validate_user";
import { validateUser } from "../schema/user_schema";
import {
  createUserHandeller,
  getAllUserHandeller,
} from "../controllers/user.controllers";
import { validateSessionMiddleware } from "../middlewares/validate.session";
import { validateSessionData } from "../schema/session.schema";
import {
  createSessionController,
  getAllSessionController,
} from "../controllers/session.controller";
import validateDeserializeUser from "../middlewares/validateDeserializeUser";

export function routes(app: Express) {
  app.get(
    "/api/healthcheck",
    (req: Request, res: Response, next: NextFunction) => {
      res.sendStatus(200);
    }
  );

  /// User Routes

  app.post(
    "/api/create-user",
    validateUserMiddleWare(validateUser),
    createUserHandeller
  );

  app.get("/api/get-all-users", getAllUserHandeller);

  // Create User Session
  app.post(
    "/api/create-session",
    validateSessionMiddleware(validateSessionData),
    createSessionController
  );

  app.get(
    "/api/get-user-sessions",
    validateDeserializeUser,
    getAllSessionController
  );

 
}

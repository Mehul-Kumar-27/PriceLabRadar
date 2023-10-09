import { Express, NextFunction, Request, Response } from "express";
import { validateUserMiddleWare } from "../middlewares/validate_user";
import { validateUser } from "../schema/user_schema";
import { createUserHandeller } from "../controllers/user.controllers";
import { validateSessionMiddleware } from "../middlewares/validate.session";
import { validateSessionData } from "../schema/session.schema";
import { createSessionController } from "../controllers/session.controller";

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

  // Create User Session
  app.post(
    "/api/create-session",
    validateSessionMiddleware(validateSessionData),
    createSessionController
  );
}

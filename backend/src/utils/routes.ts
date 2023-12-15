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
  setSessionToFalse,
} from "../controllers/session.controller";
import validateDeserializeUser from "../middlewares/validateDeserializeUser";
import errorHandellerMiddlerware from "../middlewares/error.handeller";
import { InternalServerError } from "../errors/internalServerError";
import { getTheProductDetails } from "../controllers/validateUrl";

export function routes(app: Express) {
  app.get(
    "/api/healthcheck",
    (req: Request, res: Response, next: NextFunction) => {
      try {
        res.sendStatus(200)
      } catch (error) {
        next(new InternalServerError("Something Went Wrong"))
      }
    }
  );

  /// User Routes

  app.post(
    "/api/create-user",
    validateUserMiddleWare(validateUser),
    createUserHandeller,
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

  app.get("/api/get-product-data", getTheProductDetails)

  app.delete("/api/deleteSession", validateDeserializeUser, setSessionToFalse)

  app.use(errorHandellerMiddlerware)

}

import { NextFunction, Request, Response } from "express";
import { CreateSessionInterface } from "../schema/session.schema";

export const validateSessionMiddleware =
  (schema: (data: CreateSessionInterface) => Partial<CreateSessionInterface> | null) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = schema(req.body);
      if (errors != null) {
        return res.status(400).json({
          message: "Please Provide Correctly Formatted Data",
          errors: errors,
        });
      } else {
        next();
      }
    } catch (error) {
      return res.status(500).json({
        message: error,
      });
    }
  };

import { NextFunction, Request, Response } from "express";
import { CreateUserInput } from "../schema/user_schema";

export const validateUserMiddleWare =
  (schema: (data: CreateUserInput) => Partial<CreateUserInput> | null) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = schema(req.body);

      if (errors != null) {
        return res.status(400).json({
          message: "User Data Not Formatted Correctly",
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

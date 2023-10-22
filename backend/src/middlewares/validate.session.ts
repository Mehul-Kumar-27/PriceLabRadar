import { NextFunction, Request, Response } from "express";
import { CreateSessionInterface } from "../schema/session.schema";
import { BadRequestError } from "../errors/badrequest-error";
import { InternalServerError } from "../errors/internalServerError";

export const validateSessionMiddleware =
  (schema: (data: CreateSessionInterface) => Partial<CreateSessionInterface> | null) =>
    (req: Request, res: Response, next: NextFunction) => {
      try {
        const errors = schema(req.body);
        if (errors != null) {

          const errorMapField = deserealizeErrors(errors);
          return next(new BadRequestError("Data Not Formatted Correctly", errorMapField))
        } else {
          console.log("No Errors Found");
          next();
        }
      } catch (error) {
        return next(new InternalServerError("Something Went Wrong !!"))
      }
    };

const deserealizeErrors = (errorsPresent: Partial<CreateSessionInterface>): { name: string, validation: string }[] => {
  const errorMapField: { name: string, validation: string }[] = [];

  if (errorsPresent.hasOwnProperty("email")) {
    errorMapField.push({ name: "email", validation: errorsPresent.email! })
  }
  if (errorsPresent.hasOwnProperty("password")) {
    errorMapField.push({ name: "Password", validation: errorsPresent.password! })
  }
  return errorMapField;
};

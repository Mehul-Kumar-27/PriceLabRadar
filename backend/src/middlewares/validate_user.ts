import { NextFunction, Request, Response } from "express";
import { CreateUserInput } from "../schema/user_schema";
import { email } from "envalid";
import { BadRequestError } from "../errors/badrequest-error";
import { InternalServerError } from "../errors/internalServerError";


export const validateUserMiddleWare =
  (schema: (data: CreateUserInput) => Partial<CreateUserInput> | null) =>
    (req: Request, res: Response, next: NextFunction) => {
      try {
        const errorsPresent = schema(req.body);

        if (errorsPresent != null) {
          const errorMapField: { name: string, validation: string }[] = deserealizeErrors(errorsPresent);
          return next(new BadRequestError("User Data Not Formatted Properly", errorMapField))
        } else {
          next();
        }
      } catch (error: any) {
        return next(new InternalServerError(error));
      }
    };
const deserealizeErrors = (errorsPresent: Partial<CreateUserInput>): { name: string, validation: string }[] => {
  const errorMapField: { name: string, validation: string }[] = [];

  if (errorsPresent.hasOwnProperty("email")) {
    errorMapField.push({ name: "email", validation: errorsPresent.email! })
  }
  if (errorsPresent.hasOwnProperty("password")) {
    errorMapField.push({ name: "Password", validation: errorsPresent.password! })
  }
  if (errorsPresent.hasOwnProperty("passwordConformation")) {
    errorMapField.push({ name: "Password Conformation", validation: errorsPresent.passwordConformation! })
  }
  return errorMapField;
};


import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-error";

const errorHandellerMiddlerware = (err: Error, req: Request, res: Response, next: NextFunction) => {

    console.log("Inside The Error Handle Middleware")
    if (err instanceof CustomError) {
        return res.status(err.statusCode).json({ "error": err.generateErrors() });
    } else {
        return res.status(501).json({ message: "Internal Server Error" });
    }
}

export default errorHandellerMiddlerware;
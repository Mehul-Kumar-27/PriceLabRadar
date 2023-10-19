
import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/custom-error";

const errorHandellerMiddlerware = (err: Error, req: Request, res: Response, next: NextFunction) => {


    if (err instanceof CustomError) {

        return res.status(err.statusCode).json({ "error": err.generateErrors() });
    }

}

export default errorHandellerMiddlerware;
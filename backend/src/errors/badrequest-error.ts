import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
    statusCode = 400;

    constructor(message: string, field?: { name: string; validation: string }[]) {
        super(message, field);
    }

    generateErrors(): { message: string, field?: { name: string; validation: string }[] } {
        return {
            message: this.message,
            field: this.field
        };
    }


}

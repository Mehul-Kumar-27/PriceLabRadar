import { CustomError } from "../errors/custom-error"

export class InternalServerError extends CustomError {
    statusCode: number = 500;
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
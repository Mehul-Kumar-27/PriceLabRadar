import { CustomError } from "./custom-error";

export class AutheticationError extends CustomError {
    statusCode: number = 401;

    constructor(message: string, filed?: { name: string, validation: string }[]) {
        super(message, filed)
    }
    generateErrors(): { message: string; field?: { name: string; validation: string; }[] | undefined; } {
        return {
            message: this.message,
            field: this.field
        };
    }
}
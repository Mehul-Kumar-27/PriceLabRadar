export abstract class CustomError extends Error {
   abstract statusCode: number;
   field?: { name: string; validation: string }[]; 
   constructor(message: string, field?: { name: string; validation: string }[]) {
     super(message);
     this.field = field;
   }
 
   abstract generateErrors(): { message: string; field?: { name: string; validation: string }[] };
 }
 
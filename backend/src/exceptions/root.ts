// message,status code, error code, error

export class HttpException extends Error {
   message: string;
   errorCode: any;
   statusCode: number;
   errors : ErrorCode;

   constructor(message:string, errorCode: ErrorCode, statusCode: number, error: any) {
    super(message)
    this.message = message
    this.errorCode = errorCode
    this.statusCode = statusCode
    this.errors = error
   }
}

export enum ErrorCode {
    USER_NOT_FOUND = 1001,
    USER_ALREADY_EXISTS = 1002,
    INCORRECT_PASSWORD = 1003,
    UNPROCESSABLE_ENTITY = 1004,
    INTERNAL_EXCEPTION = 1005,
    UNAUTHORIZED = 1006,
    OFFER_NOT_FOUND = 1007,
    EMAIL_SENDING_FAILED = 1008,
}
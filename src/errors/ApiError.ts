export class ApiError {

    type: string;
    code: number;
    message: string;

    constructor(type: string, message: string, code: number) {
      this.type = type;
      this.message = message;
      this.code = code;
    }
  
    static badRequest(message: string) {
       const error = {
            type: 'Bad Request!',
            message: message,
            code: 400
       }
        return new ApiError(error.type, error.message, error.code);
    }

    static unauthorized(message: string) {
        const error = {
            type: 'Unauthorized!',
            message: message,
            code: 401
       }
        return new ApiError(error.type, error.message, error.code);
     }

     static paymentRequired(message: string) {        
        const error = {
            type: 'Payment Required!',
            message: message,
            code: 402
       }
        return new ApiError(error.type, error.message, error.code);

     }

     static forbidden(message: string) {
        const error = {
            type: 'Forbidden!',
            message: message,
            code: 403
        }
        return new ApiError(error.type, error.message, error.code);
     }

     static notFound(message: string) {        
        const error = {
            type: 'Not Found!',
            message: message,
            code: 404
       }
        return new ApiError(error.type, error.message, error.code);

     }

     static methodNotAllowed(message: string) {        
        const error = {
            type: 'Method Not Allowed!',
            message: message,
            code: 405
       }
        return new ApiError(error.type, error.message, error.code);

     }

     static conflict(message: string) {
        const error = {
            type: 'Conflict!',
            message: message,
            code: 409
       }
        return new ApiError(error.type, error.message, error.code);

     }
  

    static internalServer(message: string) {
       const error = {
            type: 'Internal Server Error!',
            message: message,
            code: 500
        }
        
        return new ApiError(error.type, error.message, error.code);

    }

}

import { Request, Response } from 'express'
import {validationResult} from 'express-validator';

export const validateRequestPayload = (req: Request, res: Response) => {

       // Check if we have any errors
       const errors = validationResult(req)

       let validationErrors: any = []
       let hasErrors: boolean = false;

       if(!errors.isEmpty()){
           hasErrors = true;

           errors.array().forEach(error => {
               // Create a mew modified error object
               const newError = {
                   value: error.value,
                   message: error.msg,
                   param: error.param,
                   location: error.location
                 }
               validationErrors.push(newError)
           });

           res.status(400);
           return {
               hasErrors: hasErrors,
               errorBody: {
                    type: "Bad Request",
                    code: 400,
                    errors: validationErrors
               }
           }
       }
    
}
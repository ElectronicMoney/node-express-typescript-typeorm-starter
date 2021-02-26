import { Request, Response, NextFunction} from 'express'
import {ApiError} from '../errors/ApiError';


export function apiErrorHandler(err: ApiError, req:Request, res:Response, next:NextFunction) {
    // in prod, don't use console.log or console.err because
    // it is not async
    // console.error(err);

    let errorMessage = {
        error: {
            type: 'Internal Server Error!',
            message: err.message,
            code: 500
        }
   }
  
    if (err instanceof ApiError) {

      errorMessage.error.type = err.type
      errorMessage.error.code = err.code
      errorMessage.error.message = err.message

      res.status(err.code).json(errorMessage);

      return;
    }
  
    res.status(500).json(errorMessage);

  }
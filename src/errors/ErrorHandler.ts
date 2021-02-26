import { Response } from 'express'

export class ErrorHandler {

    

    httpError(res: Response, message: string, code: number) {
        let statusType = "";

        //  Check the status code
        switch(code) {
            case 200:
                statusType = 'Ok!' 
              break;
            case 201:
                statusType = 'Created!'
              break;
            case 204:
                statusType = 'No Content!' 
                break;
            case 400:
                statusType = 'Bad Request!' 
                break;
            case 401:
                statusType = 'Unauthorized!' 
                break;
            case 402:
                statusType = 'Payment Required!' 
                break;
            case 403:
                statusType = 'Forbidden!' 
                break;
            case 404:
                statusType = 'Not Found!' 
                break;
            case 405:
                statusType = 'Method Not Allowed!' 
                break;
            case 409:
                statusType = 'Conflict!'
                break;
            default:
                statusType = 'Internal Server Error!'

          }

        res.status(404).json({
            error: {
                type: statusType,
                message: message,
                code: code
            }
        })
    }
}
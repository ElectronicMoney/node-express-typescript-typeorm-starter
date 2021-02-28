import { Request, Response, NextFunction} from 'express'
import {ApiError} from '../errors/ApiError';
import {verify} from 'jsonwebtoken';



export function auth(req:Request, res:Response, next:NextFunction) {

  // secreteKey
  const secreteKey = process.env.ACCESS_TOKEN_SECRETE

  const authHeader = req.headers['authorization']

  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) {
    next(ApiError.unauthorized('Authorization Token header Required!'));
    return;
  }

  verify(token, secreteKey!, (err, user) => {

    if (err) {
      next(ApiError.forbidden('Invalid Token Or Token have Expired!'));
      return;
    }

    // Store the user on request object
    req.auth = user
    next()
  })
  

}
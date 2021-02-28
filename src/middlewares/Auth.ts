import { Request, Response, NextFunction} from 'express'
import { ACCESS_TOKEN_SECRETE } from '../config'
import {ApiError} from '../errors/ApiError';
import {verify} from 'jsonwebtoken';
import {User} from '../models/User';


export function auth(req:Request, res:Response, next:NextFunction) {

  // secreteKey
  const secreteKey = ACCESS_TOKEN_SECRETE

  const authHeader = req.headers['authorization']

  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) {
    next(ApiError.unauthorized('Authorization Token header Required!'));
    return;
  }

  let authPayload: any

  verify(token, secreteKey!, async (err, payload) => {

    if (err) {
      next(ApiError.forbidden('Invalid Token Or Token have Expired!'));
      return;
    }

    authPayload = payload

    // Get the user using the userId in the payload
    const user = new User()

    const authUser = await user.getUserById(authPayload.userId);

    // Store the user on request object
    req.user = authUser
    next()
  })
  

}
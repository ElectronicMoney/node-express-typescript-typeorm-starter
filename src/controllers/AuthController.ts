import {Request, Response, NextFunction} from 'express'
import {ApiError} from '../errors/ApiError'
import { User } from '../models/User'
import { Auth } from '../auth/Auth';
import { compare } from 'bcryptjs';

export class AuthController {

      // Declear the properies here
      user: User;

      constructor() {
          this.user = new User()
      }
    

     // Login 
     async login(req: Request, res: Response, next: NextFunction) {
       
       // Get the User
       const user  = await this.user.getUserByEmail(req.body.username)

       // Check if the user is found 
       if (!user) {
            next(ApiError.badRequest('Invalid Login Credentials; The Username or Password is Incorrect!'));
            return;
       }
 
       // Compare the password
       const valid = await compare(req.body.password, user.password);
 
         // Check if the password  is valid 
       if (!valid) {
            next(ApiError.badRequest('Invalid Login Credentials; The Username or Password is Incorrect!'));
            return;
       }
 
       // Create Access Token from JWT
       const auth = new Auth()
 
       // Pass Refresh Token to httpOnly cookie
       res.cookie(
         'jid', 
         auth.createRefreshToken(user),
         {httpOnly: true}
       );
 
       // Return Access Token if login is successful
       return {
         accessToken: auth.createAccessToken(user!)
       }
     
     }
}
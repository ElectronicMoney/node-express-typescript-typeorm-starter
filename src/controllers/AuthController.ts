import {Request, Response, NextFunction} from 'express'
import {ApiError} from '../errors/ApiError'
import { User } from '../models/User'
import { Auth } from '../auth/Auth';
import { compare } from 'bcryptjs';
import {verify} from 'jsonwebtoken';

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

       const auth = new Auth()
 
       // Pass Refresh Token to httpOnly cookie
       res.cookie('jid', auth.createRefreshToken(user), {httpOnly: true});
 
       // Return Access Token if login is successful
       return {
         accessToken: auth.createAccessToken(user!)
       }
     
     }



     // refreshToken 
     async refreshToken(req: Request, res: Response, next: NextFunction) {

        let authPayload: any
        // secreteKey
        const refreshTokenSecrete = process.env.REFRESH_TOKEN_SECRETE

        const refreshToken = req.cookies.jid
        
        // Check if we have refreshToken in the cookie
        if (!refreshToken) {
          next(ApiError.unauthorized('Unauthroized: Please login to continue!'));
          return;
        }

        verify(refreshToken, refreshTokenSecrete!, (err: any, payload: any) => {
          // Asign the payload
          authPayload = payload

          if (err) {
            next(ApiError.unauthorized('Unauthroized: Please login to continue!'));
            return;
          }
      
        })

        // Get the user using the userId in the payload      
        const authUser = await this.user.getUserById(authPayload.userId);

        const auth = new Auth()

        // Pass Refresh Token to httpOnly cookie
        res.cookie('jid', auth.createRefreshToken(authUser!), {httpOnly: true});

        // Return Access Token if login is successful
        return {
          accessToken: auth.createAccessToken(authUser!)
        }
    
    }

    // Logout
    logout(req: Request, res: Response, next: NextFunction)  {
      // Delete the refresh token in the httpOnly cookie
      res.clearCookie("jid");
      return null

    }

}
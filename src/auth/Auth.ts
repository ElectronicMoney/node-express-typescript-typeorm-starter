import {User} from '../models/User';
import {sign} from 'jsonwebtoken';


export class Auth { 
    //field 
    accessTokenSecrete:string; 
    refreshTokenSecrete:string; 
    userId:string; 
  
    //constructor 
    constructor() { 
       this.accessTokenSecrete  = process.env.ACCESS_TOKEN_SECRETE!;
       this.refreshTokenSecrete = process.env.REFRESH_TOKEN_SECRETE!;
       this.userId = ''
    }  
 
    //createAccessToken 
    createAccessToken(user:User) {
        this.userId = user.user_id
        return sign({userId: this.userId}, this.accessTokenSecrete, {expiresIn: '15m'});
    }

    //createRefreshToken 
    createRefreshToken(user: User) {
        this.userId = user.user_id
        return sign({userId: this.userId}, this.refreshTokenSecrete, {expiresIn: '7d'});
    }
    
}
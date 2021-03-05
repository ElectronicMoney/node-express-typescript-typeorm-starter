import {Request, Response, NextFunction} from 'express'
import {User } from '../models/User';
import { v4 as uuidv4 } from 'uuid';
import {ApiError} from '../errors/ApiError'
import {API_URL} from '../config';


export class UserController {
    // Declear the properies here
    user: User;
    isAuthorized: boolean;

    constructor() {
        this.user = new User()
        this.isAuthorized = false;
    }


    // Create User
    async createUser (req: Request, res: Response, next: NextFunction) {
        try {
            const userPayload = {
                userId:    uuidv4(),
                firstName: req.body.firstName,
                lastName:  req.body.lastName,
                email:     req.body.email,
                username:  req.body.username,
                password:  req.body.password
            }

            // Check if username exist
            if (await this.user.usernameExist(userPayload.username)){

                next(ApiError.conflict('The Username Already exists; Please choose another username!'));
                return;
            }

            // Check if Email exist
            if (await this.user.emailExist(userPayload.email)){

                next(ApiError.conflict('Email Conflict: The Email Already exists; Please choose another email!'));
                return;
            
            }

            const user = await this.user.createUser(userPayload) 
            // Return User
            return user

        } catch(err){
            next(ApiError.internalServer(err.message));
            return
        }

    }

    
    // Get All Users
    async getUsers(req: Request, res: Response, next: NextFunction) {
        
        try {
            // Check if the auth user is an admin
            if(await req.user.isAdmin() ){
                const users = await this.user.getUsers()

                if (!users) {
                    next(ApiError.notFound('No User Found!'));
                    return;
                } 
                // Return users
                return users
            } else {
                next(ApiError.forbidden("You don't have the permision to access this resource!"));
                return;
            }

        } catch(err){
            next(ApiError.internalServer(err.message));
            return
        }
    }


    // Get User
    async getUser(req: Request, res: Response, next: NextFunction) {
        try {
            // Get the user object
            const user  = await this.user.getUser(req.params.id)
            // Check if we have user
            if(!user){
                next(ApiError.notFound('No User Found for the given userId!'));
                return;
            }
            
            if(await req.user.isAdmin() || await req.user.isEditor() || await req.user.isModerator()){
                // Return User
                this.isAuthorized = true;
           } else {
                //Check if the auth user is the same with the user object
                if(req.user.id === user.id){
                    this.isAuthorized = true;
                }
           }

            //Check if the update permision is true
            if(this.isAuthorized) {
                // return the user
                return user
            } else {
                next(ApiError.forbidden("You don't have the permision to access this user resource!"));
                return;
            }
            
          } catch (err) {
            next(ApiError.internalServer(err.message));
            return
          }
    }


    // Update User
    async updateUser (req: Request, res: Response, next: NextFunction) {

        let userPayload: any = {};

        try {
     
            if (!req.params.id) {
                next(ApiError.badRequest('The User Id Is Required!'));
                return;
            }
            // Get the user usings its id
            let user = await this.user.getUser(req.params.id)
             // Check if we have user
             if(!user){
                next(ApiError.notFound('No User Found for the given userId!'));
                return;
            }

            if(await req.user.isAdmin()){
                // Return User
                this.isAuthorized = true;
           } else {
                //Check if the auth user is the same with the user object
                if(req.user.id  === user.id){
                    this.isAuthorized = true;
                }
                
           }

            //Check if the update permision is true
            if(this.isAuthorized) {
                if(req.body.firstName){
                    userPayload.firstName = req.body.firstName
                }
                if(req.body.lastName){
                    userPayload.lastName = req.body.lastName
                }
                user = await user.updateUser(req.params.id, userPayload)
                // Return User
                return user
            } else {
                next(ApiError.forbidden("You don't have the permision to update this user resource!"));
                return;
            }

        } catch(err){
            next(ApiError.internalServer(err.message));
            return
          }

    }
    
    // Delete A user
    async deleteUser(req: Request, res: Response, next: NextFunction) {

        try {

            if (!req.params.id) {
                next(ApiError.badRequest('The User Id Is Required!'));
                return;
            }
            // Get the user usings its id
            let user = await this.user.getUser(req.params.id)

            // Check if we have user
            if(!user){
                next(ApiError.notFound('No User Found for the given userId!'));
                return;
            }
            
            if(await req.user.isAdmin()){
                // Return User
                this.isAuthorized = true;

            } else {
                //Check if the auth user is the same with the user object
                if(req.user.id  === user.id){
                    this.isAuthorized = true;
                }
            }

            //Check if the update permision is true
            if(this.isAuthorized) {
                await this.user.deleteUser(req.params.id)
                // return null
                return null
            } else {
                next(ApiError.forbidden("You don't have the permision to delete this user resource!"));
                return;
            }
      
        } catch(err){
            next(ApiError.internalServer(err.message));
            return
        }
    }


    // Upload Profile Picture
    async uploadProfilePhoto(req: Request, res: Response, next: NextFunction) {
        try {
            // Get profile
            const profile = await req.user.profile
            // req.file is the `avatar` file
            // req.body will hold the text fields, if there were any
            profile.avatarUrl = `${API_URL}/static/images/profiles/${req.file.filename}`;
            // Save the profile
            profile.save()
            // returnthe profile
            return profile

        } catch(err){
            next(ApiError.internalServer(err.message));
            return
        }
    }

}
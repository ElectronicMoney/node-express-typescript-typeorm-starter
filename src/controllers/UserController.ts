import {Request, Response, NextFunction} from 'express'
import {User } from '../models/User';
import { v4 as uuidv4 } from 'uuid';
import {ErrorHandler} from '../errors/ErrorHandler'

export class UserController {
    // Declear the properies here
    user: User;
    errorHandler: ErrorHandler;

    constructor() {
        this.user = new User()
        this.errorHandler = new ErrorHandler()
    }
  
    
    // Get All Users
    async getUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await this.user.getUsers()

            if (!users) {
                throw new Error('No User Found!')
            }
            return users

        } catch(err){
            this.errorHandler.httpError(
                res,
                err.message,
                404
            )
            next(err)
          }
    }


    // Get User
    async getUser(req: Request, res: Response, next: NextFunction) {

        try {
            const user  = await this.user.getUser(req.params.id)
            if (!user) {
                throw new Error('User Not Found!')
            }
            // Return User
            return user
            
          } catch (err) {
            this.errorHandler.httpError(
                res,
                err.message,
                404
            )
            next(err)
          }
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

            if (!userPayload.email) {
                throw new Error('Bad Request: Email Is Required!')
            }
           
            res.status(201)
            return await this.user.createUser(userPayload)  
        } catch(err){
            this.errorHandler.httpError(
                res,
                err.message,
                400
            )
            next(err)
        }

    }


    // Update User
    async updateUser (req: Request, res: Response, next: NextFunction) {

        try {
            const userPayload = {
                firstName : req.body.firstName,
                lastName  : req.body.lastName
            }
           
            if (!req.params.id) {
                throw new Error('Bad Request: The User Id Is Required!')
            }

            return await this.user.updateUser(
                req.params.id, 
                userPayload
            )  
        } catch(err){
            this.errorHandler.httpError(
                res,
                err.message,
                400
            )
            next(err)
          }

    }
    
    // Delete A user
    async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {

            if (!req.params.id) {
                throw new Error('Bad Request: The User Id Is Required!')
            }

            return await this.user.deleteUser(req.params.id)
        } catch(err){
            this.errorHandler.httpError(
                res,
                err.message,
                400
            )
            next(err)
        }
    }
}
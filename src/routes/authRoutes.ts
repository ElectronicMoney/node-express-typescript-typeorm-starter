import {Router, Request, Response, NextFunction} from 'express'
import { AuthController } from '../controllers/AuthController'

// Create the Instance of AuthController
const authController = new AuthController()

const authRoutes = Router()

// Create User Route
authRoutes.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    res.send(await authController.login(req, res, next))
});

// Create User Route
authRoutes.post('/refresh/token', async (req: Request, res: Response, next: NextFunction) => {
    res.send(await authController.refreshToken(req, res, next))
});


export default authRoutes



import {Router, Request, Response, NextFunction} from 'express'
import { UserController } from '../controllers/UserController'


// Create the Instance of UserController
const userController = new UserController()

const userRoutes = Router()


userRoutes.post('/', async (req: Request, res: Response, next: NextFunction) => {
    res.send(await userController.createUser(req, res, next));
})

userRoutes.get('/', async (req: Request, res: Response, next: NextFunction) => {
    res.send(await userController.getUsers(req, res, next));
})

userRoutes.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    res.send(await userController.updateUser(req, res, next));
})


userRoutes.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    res.send(await userController.getUser(req, res, next));
})

userRoutes.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    res.send(await userController.updateUser(req, res, next));
})

export default userRoutes



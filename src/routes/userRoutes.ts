import {Router, Request, Response, NextFunction} from 'express'
import { UserController } from '../controllers/UserController'

// Create the Instance of UserController
const userController = new UserController()

const userRoutes = Router()


// Create User Route
userRoutes.post('/', async (req: Request, res: Response, next: NextFunction) => {
    res.status(201).send(await userController.createUser(req, res, next))
});

// Get All Users Route
userRoutes.get('/', async (req: Request, res: Response, next: NextFunction) => {
    res.send(await userController.getUsers(req, res, next))
});

// Get All Users Route
userRoutes.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    res.send(await userController.updateUser(req, res, next))
});

// Get All Users Route
userRoutes.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    res.send(await userController.getUser(req, res, next))
});

// Get All Users Route
userRoutes.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    res.status(204).send(await userController.deleteUser(req, res, next))
});


export default userRoutes



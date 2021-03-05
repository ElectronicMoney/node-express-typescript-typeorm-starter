import {Router, Request, Response, NextFunction} from 'express'
import { UserController } from '../controllers/UserController';
import {auth} from '../middlewares/Auth';
import {PROFILES_UPLOAD} from '../config'
import multer from 'multer'
import path from 'path'
import { v4 as uuidv4 } from 'uuid';
import {checkFileExtention} from '../utils/helpers';
import {UserValidation} from '../validations/UserValidation';


// Create the Instance of UserController
const userController = new UserController()

const userRoutes = Router()

let fileName = "";

// File Storage Engine
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `${PROFILES_UPLOAD}`)
    },
    filename: (req, file, cb) => {
        // Create fileName for the uploaded file
        fileName = `${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`;
      cb(null, `${fileName}`)
    }
})

//Initialize the upload
const upload = multer({
    storage: fileStorageEngine ,
    limits: {fileSize: 1000000},
    fileFilter: (req, file, cb) => {
        checkFileExtention(file, cb)
    }
})


// Create User Route
userRoutes.post('/', UserValidation, async (req: Request, res: Response, next: NextFunction) => {
    res.status(201).send(await userController.createUser(req, res, next))
});

// Get All Users Route
userRoutes.get('/', auth, async (req: Request, res: Response, next: NextFunction) => {
    res.send(await userController.getUsers(req, res, next))
});

// Get All Users Route
userRoutes.put('/:id', auth, async (req: Request, res: Response, next: NextFunction) => {
    res.send(await userController.updateUser(req, res, next))
});

// Get All Users Route
userRoutes.get('/:id', auth, async (req: Request, res: Response, next: NextFunction) => {
    res.send(await userController.getUser(req, res, next))
});

// Get All Users Route
userRoutes.delete('/:id', auth, async (req: Request, res: Response, next: NextFunction) => {
    res.status(204).send(await userController.deleteUser(req, res, next))
});

// upload Profile Photo Route
userRoutes.post('/profiles/upload', auth, upload.single('avatar'), async (req: Request, res: Response, next: NextFunction) => {
    res.send(await userController.uploadProfilePhoto(req, res, next))
});


export default userRoutes



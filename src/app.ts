import express, {Application, Request, Response, NextFunction} from 'express'
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import {createConnection, Connection} from "typeorm";
import bcrypt, { compare } from 'bcryptjs';
import {User} from "./entity/ User";

const app: Application = express()

app.use(bodyParser.json());

dotenv.config()
dotenv.config({ path: __dirname+'../.env' });

// Applicaiton Port
const PORT = process.env.PORT;

// const addNumber = (a: number, b: number): number => a + b;

export const startServer = async () => {
    // Create connection
    const connection: Connection = await createConnection();

    // Create A User
    app.post('/users', async (req: Request, res: Response, next: NextFunction) => {

        const createuser = async (userPaylaod: any): Promise<User> => {
            // Create the instance of a User
            const user = new User()

            user.user_id   = userPaylaod.userId;
            user.firstName = userPaylaod.firstName;
            user.lastName  = userPaylaod.lastName;
            user.email     = userPaylaod.email;
            user.username  = userPaylaod.username;
            user.password  = await bcrypt.hash(userPaylaod.password, 10);

            const newUser = await user.save();

            return newUser; 
        }

        const userPaylaod = {
            'userId': '647hfufhfdf488ffhhf4gddg8',
            'firstName': req.body.firstName,
            'lastName': req.body.lastName,
            'email': req.body.email,
            'username': req.body.username,
            'password': req.body.password
        }

        const user = await createuser(userPaylaod);
        res.send(user);
    })


    // get A user
    app.get('/users/:id', async (req: Request, res: Response, next: NextFunction) => {

        const getUser = async (userId: string): Promise<User> => {

            const user = await User.findOne({where: {id: userId} });

            return user!; 
        }
        const user = await getUser(req.params.id)
        res.send(user);
    })


    // Get All Users
    app.get('/users', async (req: Request, res: Response, next: NextFunction) => {

        const getUsers = async (): Promise<User[]> => {
            const users = await User.find();
            return users!; 
        }

        const users = await getUsers()
        res.send(users);
    })


    // Updae A user
    app.put('/users/:id', async (req: Request, res: Response, next: NextFunction) => {

        const updateUser = async (userId: string): Promise<User> => {

            const user = await User.findOne({where: {id: userId} });

            user!.firstName = req.body.firstName
            user!.lastName  = req.body.lastName

            const updatedUser = await user!.save();
            return updatedUser; 
        }

        const user = await updateUser(req.params.id)
        res.send(user);
    })

    // Delete A user
    app.delete('/users/:id', async (req: Request, res: Response, next: NextFunction) => {

        const deleteUser = async (userId: string): Promise<User> => {

            const user = await User.findOne({where: {id: userId} });

            const deletedUser = await user!.remove();
            return deletedUser

        }
        
        const user = await deleteUser(req.params.id)
        res.send(user);
    })

    // Create Server
    app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))
}

// Start the server here...
startServer()

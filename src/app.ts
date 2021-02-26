import express, {Application, Request, Response, NextFunction} from 'express'
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import {createConnection, Connection} from "typeorm";
import userRoutes from './routes/userRoutes'

const app: Application = express()

app.use(bodyParser.json());

dotenv.config()
dotenv.config({ path: __dirname+'../.env' });

// Applicaiton Port
const PORT = process.env.PORT;


export const startServer = async () => {
    // Create connection
    const connection: Connection = await createConnection();

    // users routes
    app.use('/v1/users', userRoutes);


    app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
}

// Start the server here...
startServer();

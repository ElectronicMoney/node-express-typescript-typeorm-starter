import express, {Application } from 'express'
import {
    PORT,
    API_VERSION
 } from '../src/config'

import bodyParser from 'body-parser';
import {createConnection, Connection} from "typeorm";
import {apiErrorHandler} from './middlewares/ApiErrorHandler';
import authRoutes from './routes/authRoutes'
import userRoutes from './routes/userRoutes'
import cookieParser from 'cookie-parser'


const app: Application = express()

// Json body Parser
app.use(bodyParser.json());
// Cookie Parser
app.use(cookieParser());

// Serve my static files
app.use('/static', express.static(__dirname + '/static'));

export const startServer = async () => {
    // Create connection
    const connection: Connection = await createConnection();

    // auth routes
    app.use(`/${API_VERSION}/auth`, authRoutes);
    // users routes
    app.use(`/${API_VERSION}/users`, userRoutes);

    // Handle the api errors
    app.use(apiErrorHandler);
    app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
}

// Start the server here...
startServer();

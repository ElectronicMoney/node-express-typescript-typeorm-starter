import express, {Application } from 'express'
import {
    PORT,
    APP_URL,
    API_VERSION
 } from './config'

import bodyParser from 'body-parser';
import cors from 'cors';

import {createConnection, Connection} from "typeorm";
import ConnectionOptions from './ormconfig';
import {apiErrorHandler} from './middlewares/ApiErrorHandler';
import authRoutes from './routes/authRoutes'
import userRoutes from './routes/userRoutes'
import cookieParser from 'cookie-parser'


const app: Application = express()

//options for cors midddleware
const options: cors.CorsOptions = {
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'X-Access-Token'
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: APP_URL,
    preflightContinue: false,
  };
  
  //use cors middleware
  app.use(cors(options));

// Json body Parser
app.use(bodyParser.json());
// Cookie Parser
app.use(cookieParser());

// Serve my static files
app.use('/static', express.static(__dirname + '/static'));

export const startServer = async () => {
    // Create connection
    const connection: Connection = await createConnection(ConnectionOptions);

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

import { ConnectionOptions } from "typeorm";

import {
   DATABASE_TYPE,
   DATABASE_HOST,
   DATABASE_PORT,
   DATABASE_NAME,
   DATABASE_USERNAME,
   DATABASE_PASSWORD
} from './config'

export default {
    type: DATABASE_TYPE,
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    synchronize: true,
    logging: true,
   //  migrationsRun: true,
    entities: [
      `${__dirname}/models/*{.ts,.js}`
    ],
    migrations: [
       `${__dirname}/migrations/*{.ts,.js}`
    ],
    subscribers: [
       `${__dirname}/subscribers/*{.ts,.js}`
    ],
    cli: {
       entitiesDir: "src/models",
       migrationsDir: "src/migrations",
       subscribersDir: "src/subscribers"
    }
 } as ConnectionOptions;
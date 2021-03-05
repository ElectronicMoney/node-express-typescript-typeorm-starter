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
    entities: [
       "models/**/*.ts"
    ],
    migrations: [
       "migration/**/*.ts"
    ],
    subscribers: [
       "subscribers/**/*.ts"
    ],
    cli: {
       entitiesDir: "models",
       migrationsDir: "migration",
       subscribersDir: "subscribers"
    }
 } as ConnectionOptions;
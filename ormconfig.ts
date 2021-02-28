import { ConnectionOptions } from "typeorm";

import {
   DATABASE_TYPE,
   DATABASE_HOST,
   DATABASE_PORT,
   DATABASE_NAME,
   DATABASE_USERNAME,
   DATABASE_PASSWORD
} from './src/config'

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
       "src/models/**/*.ts"
    ],
    migrations: [
       "src/migration/**/*.ts"
    ],
    subscribers: [
       "src/subscribers/**/*.ts"
    ],
    cli: {
       entitiesDir: "src/models",
       migrationsDir: "src/migration",
       subscribersDir: "src/subscribers"
    }
 } as ConnectionOptions;
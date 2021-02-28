declare namespace Express {
    export interface Request {
        auth: import("./models/User").User;
    }
}
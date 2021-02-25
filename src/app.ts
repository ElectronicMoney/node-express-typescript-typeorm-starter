import express, {Application, Request, Response, NextFunction} from 'express'
import * as dotenv from 'dotenv';

const app: Application = express()

dotenv.config()
dotenv.config({ path: __dirname+'../.env' });

// Applicaiton Port
const PORT = process.env.PORT;

const addNumber = (a: number, b: number): number => a + b;

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    console.log(addNumber(5, 8))
    res.send("Hello World!")
})


app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))
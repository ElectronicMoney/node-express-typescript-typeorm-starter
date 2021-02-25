import express, {Application, Request, Response, NextFunction} from 'express'

const app: Application = express()


const addNumber = (a: number, b: number): number => a + b;

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    console.log(addNumber(5, 8))
    res.send("Hello World!")
})


app.listen(5000, () => console.log(`Listening on PORT 5000`))
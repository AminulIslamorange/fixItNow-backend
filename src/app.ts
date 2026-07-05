import express, { Application, Request, Response } from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: '*',
    credentials: true
}));

app.get('/', (req: Request, res: Response) => {
    res.send("Server is running perfectly!");
});

export default app;
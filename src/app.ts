import express, { Application, Request, Response } from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";
import { notFound } from "./midlewares/notFound";
import { globalErrorHandlar } from "./midlewares/globalErrorHandlar";
import { userRoutes } from "./modules/user/user.route";

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

app.use('/api/auth',userRoutes)

app.use(notFound);
app.use(globalErrorHandlar);

export default app;
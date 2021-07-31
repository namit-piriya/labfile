import express, {NextFunction, Response} from "express";
import cors from "cors";
import {appRouter} from "./routes";
import dotenv from "dotenv"

dotenv.config({path: "./env"})

const app = express();
app.use(cors())
app.use(express.json())
app.use("/ping", (req, res) => {
    res.send("pong")
})
app.use("/", appRouter);

app.use((req: any, res: any, next: any) => next(new Error("not found")));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    return res.sendStatus(500).send("Internal Error");
});

export default app;

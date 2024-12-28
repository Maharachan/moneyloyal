import express, {Express, Request, Response } from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middlewares/error";


const app: Express = express();

app.use(express.json());

const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

app.use('/api', rootRouter);


export const prismaClient = new PrismaClient({
    log:['query']
})

app.use(errorMiddleware);


app.listen(PORT, () => {
    console.log("app listening on port " + PORT + "!");
});
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import express, { Request, Response, NextFunction } from 'express';
import { CustomError } from './common/interfaces';

import booksRouter from './routes/books.router';
import authRouter from './routes/auth.router';
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './common/docs/swagger.json'


const logger = require('./log')
dotenv.config()

const port = process.env.PORT || 3010
const app = express()

app.use(bodyParser.json());
app.use(cors());


app.use('/auth', authRouter);
app.use('/book', booksRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/ping", (req, res) => {
    res.json({ message: "pong" }).status(200);
});

app.use((req: Request, res: Response) => {
    res.status(404).json({ message: "Page is not found" });
});

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
    const { status = 500, message = "Internal server error" } = err;
    logger.error(err.stack)
    res.status(status).json({ message });
});

app.listen(port, () => {
    logger.info(`Listening on ${port}`)
});


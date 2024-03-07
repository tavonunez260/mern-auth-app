import { config } from 'dotenv';
import express, { Express, json, Request, Response } from 'express';
import mongoose from 'mongoose';

import { authRouter, userRouter } from './routes';
import { HttpError } from './types';

config();
const app: Express = express();

mongoose
	.connect(process.env.MONGO_URL ?? '')
	.then(() => console.log('Connected to MongoDB'))
	.catch(() => console.log('Error'));
app.use(json());

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.use((err: HttpError, req: Request, res: Response) => {
	const statusCode = err.statusCode ?? 500;
	const message = err.message ?? 'Internal server error';

	return res.status(statusCode).json({
		success: false,
		message,
		statusCode
	});
});

app.listen(4000);

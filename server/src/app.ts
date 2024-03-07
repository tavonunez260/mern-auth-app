import { config } from 'dotenv';
import express, { Express, json } from 'express';
import mongoose from 'mongoose';

import { authRouter, userRouter } from './routes';

config();
const app: Express = express();

mongoose
	.connect(process.env.MONGO_URL ?? '')
	.then(() => console.log('Connected to MongoDB'))
	.catch(() => console.log('Error'));
app.use(json());

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.listen(4000);

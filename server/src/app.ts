import { config } from 'dotenv';
import express, { Express } from 'express';
import mongoose from 'mongoose';

import { userRouter } from './routes';

config();
const app: Express = express();

mongoose
	.connect(process.env.MONGO_URL ?? '')
	.then(() => console.log('Connected to MongoDB'))
	.catch(() => console.log('Error'));

app.use('/api/user', userRouter);

app.listen(4000);

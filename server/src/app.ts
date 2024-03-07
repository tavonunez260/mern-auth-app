import express, { Express } from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';

config();
const app: Express = express();

mongoose
	.connect(process.env.MONGO_URL ?? '')
	.then(() => console.log('Connected to MongoDB'))
	.catch(() => console.log('Error'));

app.get('/', (req, res) => {
	res.send('Hello world');
});

app.listen(4000);

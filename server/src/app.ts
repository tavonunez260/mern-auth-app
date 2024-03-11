import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import express, {
	Express,
	json,
	NextFunction,
	static as expressStatic,
	Request,
	Response
} from 'express';
import { middleware } from 'express-http-context';
import mongoose from 'mongoose';
import { join } from 'path';

import { authRouter, userRouter } from './routes';
import { HttpError } from './types';

import { beautifyError } from 'utils';

config();
const app: Express = express();

mongoose
	.connect(process.env.MONGO_URL ?? '')
	.then(() => console.log('Connected to MongoDB'))
	.catch(() => console.log('Error'));

app.use(expressStatic(join(__dirname, 'client', 'dist')));
app.get('*', (req, res) => {
	res.sendFile(join(__dirname, 'client', 'dist', 'index.html'));
});
app.use(json());
app.use(cookieParser());
app.use(middleware);

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
	const statusCode = err.statusCode ?? 500;
	const message = err.message ?? 'Internal server error';

	return res.status(statusCode).json({
		success: false,
		message: beautifyError(message),
		...(err.data && { data: err.data })
	});
});

app.listen(4000);

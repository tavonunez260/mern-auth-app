import { HttpError } from '../types';

export const createHttpError = (statusCode: number, message: string): HttpError => {
	const error = new Error(message) as HttpError;
	error.statusCode = statusCode;
	return error;
};

export const beautifyError = (message: string) => {
	if (message.includes('11000')) {
		return 'User already exists';
	}
	return message;
};

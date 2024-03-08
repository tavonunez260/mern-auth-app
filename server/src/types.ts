import mongoose from 'mongoose';

export interface HttpError extends Error {
	statusCode: number;
}

export interface IUser extends mongoose.Document {
	password: string;
	username: string;
}

export interface IUserSafe {
	_id: string;
	email: string;
	username: string;
}

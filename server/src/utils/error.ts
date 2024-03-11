import { NextFunction, Request, Response } from 'express';

import { HttpError } from '../types';

export const validateUsername = (username: string, isRequired = true) => {
	const errors = [];
	if (isRequired && !username) {
		errors.push('Name is required');
	} else if (username) {
		if (!/^[a-zA-Z-' _0-9]+$/.test(username)) {
			errors.push('Only letters, numbers, hyphens, underscores, and apostrophes are allowed.');
		}
		if (username.length > 64) {
			errors.push('Name must not exceed 64 characters');
		}
	}
	return errors;
};

export const validateEmail = (email: string, isRequired = true) => {
	const errors = [];
	if (isRequired && !email) {
		errors.push('Email is required');
	} else if (email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
		errors.push('Invalid email format');
	}
	return errors;
};

export const validatePassword = (password: string, isRequired = true) => {
	const errors = [];
	if (isRequired && !password) {
		errors.push('Password is required');
	} else if (password) {
		if (password.length < 8) {
			errors.push('Password must be at least 8 characters long');
		}
		if (password.length > 64) {
			errors.push('Password must not exceed 64 characters');
		}
		if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
			errors.push(
				'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
			);
		}
	}
	return errors;
};

export const createHttpError = (
	statusCode: number,
	message: string,
	data?: { [key: string]: string[] }
): HttpError => {
	const error = new Error(message) as HttpError;
	error.statusCode = statusCode;
	if (data) {
		error.data = data;
	}
	return error;
};

export const beautifyError = (message: string) => {
	if (message.includes('11000')) {
		return 'User already exists';
	}
	return message;
};

export const createValidationMiddleware = (validationConfig: {
	email?: boolean;
	password?: boolean;
	username?: boolean;
}) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const errors: { [key: string]: string[] } = {};

		for (const [field, config] of Object.entries(validationConfig)) {
			let fieldErrors: string[] = [];

			switch (field) {
				case 'username':
					fieldErrors = validateUsername(req.body.username, config);
					break;
				case 'email':
					fieldErrors = validateEmail(req.body.email, config);
					break;
				case 'password':
					fieldErrors = validatePassword(req.body.password, config);
					break;
				default:
					break;
			}

			if (fieldErrors.length > 0) {
				errors[field] = fieldErrors;
			}
		}

		if (Object.keys(errors).length > 0) {
			return next(createHttpError(400, 'Validation failed', errors));
		}

		next();
	};
};

export const validateSignUp = createValidationMiddleware({
	username: true,
	email: true,
	password: true
});

export const validateSignIn = createValidationMiddleware({
	email: true,
	password: true
});

export const validateUpdate = createValidationMiddleware({
	username: false,
	email: false,
	password: false
});

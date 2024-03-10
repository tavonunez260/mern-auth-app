import { compareSync, genSalt, hash } from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import { sign } from 'jsonwebtoken';

import { User } from 'models';
import { createHttpError } from 'utils';

export const signUpController = async (req: Request, res: Response, next: NextFunction) => {
	const { username, email, password } = req.body;
	const salt = await genSalt(10);
	const hashedPassword = await hash(password, salt);
	const newUser = new User({ username, email, password: hashedPassword });
	try {
		await newUser.save();
		res.status(201).json({ message: 'User created successfully' });
	} catch (error) {
		next(error);
	}
};

export const signInController = async (req: Request, res: Response, next: NextFunction) => {
	const { email, password } = req.body;

	try {
		const validUser = await User.findOne({ email });
		if (!validUser) {
			return next(createHttpError(404, 'User not found'));
		}
		const validPassword = compareSync(password, validUser.password);
		if (!validPassword) {
			return next(createHttpError(401, 'Invalid credentials'));
		}
		const { password: hashedPassword, ...userWithoutPassword } = validUser.toJSON();
		const token = sign({ id: validUser._id }, process.env.JWT_SECRET ?? '');
		const expiryDate = new Date(Date.now() + 3600000);
		res
			.cookie('access_token', token, { httpOnly: true, expires: expiryDate })
			.status(200)
			.json(userWithoutPassword);
	} catch (error) {
		next(error);
	}
};

export const googleController = async (req: Request, res: Response, next: NextFunction) => {
	const { email, name, photo } = req.body;

	try {
		const validUser = await User.findOne({ email });
		if (validUser) {
			const token = sign({ id: validUser._id }, process.env.JWT_SECRET ?? '');
			const { password: hashedPassword, ...userWithoutPassword } = validUser.toJSON();

			const expiryDate = new Date(Date.now() + 3600000);
			res
				.cookie('access_token', token, { httpOnly: true, expires: expiryDate })
				.status(200)
				.json(userWithoutPassword);
		} else {
			const generatedPassword =
				Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
			const salt = await genSalt(10);
			const hashedPassword = await hash(generatedPassword, salt);

			const newUser = new User({
				username:
					name.split(' ').join('').toLowerCase() + Math.floor(Math.random() * 10000).toString(),
				email,
				password: hashedPassword,
				profilePicture: photo
			});
			await newUser.save();

			const token = sign({ id: newUser._id }, process.env.JWT_SECRET ?? '');
			const { password: hashedPassword2, ...userWithoutPassword } = newUser.toJSON();
			const expiryDate = new Date(Date.now() + 3600000);
			res
				.cookie('access_token', token, { httpOnly: true, expires: expiryDate })
				.status(200)
				.json(userWithoutPassword);
		}
	} catch (error) {
		next(error);
	}
};

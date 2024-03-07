import { genSalt, hash } from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';

import { User } from 'models';

export const authController = async (req: Request, res: Response, next: NextFunction) => {
	const { username, email, password } = req.body;
	const salt = await genSalt(10);
	const hashedPassword = await hash(password, salt);
	const newUser = new User({ username, email, password: hashedPassword });
	try {
		await newUser.save();
		res.status(201).json({ success: true, message: 'User created successfully' });
	} catch (e) {
		next(e);
	}
};

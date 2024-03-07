import { genSalt, hash } from 'bcryptjs';
import { Request, Response } from 'express';

import { User } from 'models';

export const authController = async (req: Request, res: Response) => {
	const { username, email, password } = req.body;
	const salt = await genSalt(10);
	const hashedPassword = await hash(password, salt);
	const newUser = new User({ username, email, password: hashedPassword });
	try {
		await newUser.save();
		res.status(201).json({ message: 'User created successfully' });
	} catch (e) {
		if (e instanceof Error) {
			res.status(500).json({ message: e.message });
		} else {
			res.status(500).json({ message: 'An unknown error occurred' });
		}
	}
};

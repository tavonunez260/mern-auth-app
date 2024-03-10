import { genSaltSync, hashSync } from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import { get } from 'express-http-context';

import { UserType } from '../types';

import { User } from 'models';
import { createHttpError } from 'utils';

export const userController = (req: Request, res: Response) => {
	res.json({
		message: 'API is working!'
	});
};

export const updateUserController = async (req: Request, res: Response, next: NextFunction) => {
	const user = get('user');
	if (user.id !== req.params.id) {
		return next(createHttpError(401, 'User is allowed to update only his account'));
	}

	const updateData: UserType = {};
	if (req.body.username) updateData.username = req.body.username;
	if (req.body.email) updateData.email = req.body.email;
	if (req.body.profilePicture) updateData.profilePicture = req.body.profilePicture;
	if (req.body.password) {
		const salt = genSaltSync(10);
		updateData.password = hashSync(req.body.password, salt);
	}

	try {
		if (Object.keys(updateData).length > 0) {
			const updatedUser = await User.findByIdAndUpdate(
				req.params.id,
				{ $set: updateData },
				{ new: true }
			);
			if (updatedUser) {
				const { password, ...safeUser } = updatedUser.toJSON();
				res.status(200).json(safeUser);
			} else {
				return next(createHttpError(404, 'User not found'));
			}
		} else {
			res.status(200).json({ message: 'No update performed' });
		}
	} catch (error) {}
};

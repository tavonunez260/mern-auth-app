import { Request, Response } from 'express';

export const userController = (req: Request, res: Response) => {
	res.json({
		message: 'API is working!'
	});
};

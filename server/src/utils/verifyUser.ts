import { NextFunction, Request, Response } from 'express';
import { set } from 'express-http-context';
import { JwtPayload, verify } from 'jsonwebtoken';

import { createHttpError } from 'utils';

export const verifyToken = (req: Request, response: Response, next: NextFunction) => {
	const token = req.cookies.access_token;

	if (!token) {
		return next(createHttpError(401, 'User not authenticated'));
	} else {
		verify(token, process.env.JWT_SECRET ?? '', (error: Error | null, decoded: unknown) => {
			if (error) {
				return next(createHttpError(403, 'Token is not valid'));
			} else {
				if (typeof decoded === 'object' && decoded !== null) {
					set('user', decoded as JwtPayload);
					next();
				} else {
					return next(createHttpError(403, 'Invalid token structure'));
				}
			}
		});
	}
};

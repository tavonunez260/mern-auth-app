import { Router } from 'express';

import {
	googleController,
	signInController,
	signOutController,
	signUpController
} from 'controllers';
import { validateSignIn, validateSignUp, verifyToken } from 'utils';

export const authRouter = Router();

authRouter.post('/signup', validateSignUp, signUpController);
authRouter.post('/signin', validateSignIn, signInController);
authRouter.post('/google', googleController);
authRouter.post('/signout/:id', verifyToken, signOutController);

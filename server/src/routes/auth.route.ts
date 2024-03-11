import { Router } from 'express';

import {
	googleController,
	signInController,
	signOutController,
	signUpController
} from 'controllers';
import { validateSignIn, validateSignUp } from 'utils';

export const authRouter = Router();

authRouter.post('/signup', validateSignUp, signUpController);
authRouter.post('/signin', validateSignIn, signInController);
authRouter.post('/google', googleController);
authRouter.get('/signout', signOutController);

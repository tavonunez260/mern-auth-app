import { Router } from 'express';

import { signInController, signUpController } from 'controllers';

export const authRouter = Router();

authRouter.post('/signup', signUpController);
authRouter.post('/signin', signInController);

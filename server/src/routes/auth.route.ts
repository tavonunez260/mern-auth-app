import { Router } from 'express';

import { googleController, signInController, signUpController } from 'controllers';

export const authRouter = Router();

authRouter.post('/signup', signUpController);
authRouter.post('/signin', signInController);
authRouter.post('/google', googleController);

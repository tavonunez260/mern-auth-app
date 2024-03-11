import { Router } from 'express';

import { updateUserController } from 'controllers';
import { validateUpdate, verifyToken } from 'utils';

export const userRouter = Router();

userRouter.post('/update/:id', verifyToken, validateUpdate, updateUserController);

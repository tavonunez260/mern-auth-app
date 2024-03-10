import { Router } from 'express';

import { updateUserController, userController } from 'controllers';
import { verifyToken } from 'utils';

export const userRouter = Router();

userRouter.get('', userController);
userRouter.post('/update/:id', verifyToken, updateUserController);

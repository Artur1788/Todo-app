import { Router } from 'express';

import userRouter from './userRoutes.js';
import todoRouter from './todoRoutes.js';

const router = Router();

router.use('/user', userRouter);
router.use('/todo', todoRouter);

export default router;

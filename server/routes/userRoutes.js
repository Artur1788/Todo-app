import { Router } from 'express';

import {
  check,
  getAll,
  registration,
  login,
} from '../controllers/userController.js';
import { auth } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', registration);
router.post('/login', login);
router.get('/me', auth, check);

export default router;

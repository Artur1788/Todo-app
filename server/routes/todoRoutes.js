import { Router } from 'express';

import {
  setTodo,
  getTodos,
  deleteTodo,
  updateTodo,
} from '../controllers/todoController.js';
import { auth } from '../middleware/authMiddleware.js';

const router = Router();

router.route('/').get(auth, getTodos).post(auth, setTodo);
router.route('/:id').put(auth, updateTodo).delete(auth, deleteTodo);

export default router;

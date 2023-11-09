import Express from 'express';
import {
  createUsers,
  deleteUsers,
  getUsers,
  getUsersById,
  updateUsers,
} from '../controllers/UsersController.js';
import { AdminOnly, VerifyUser } from '../middleware/AuthUser.js';

const router = Express.Router();

router.get('/api/users', VerifyUser, AdminOnly, getUsers);
router.get('/api/users/:id', VerifyUser, AdminOnly, getUsersById);
router.post('/api/users', VerifyUser, AdminOnly, createUsers);
router.patch('/api/users/:id', VerifyUser, AdminOnly, updateUsers);
router.delete('/api/users/:id', VerifyUser, AdminOnly, deleteUsers);

export default router;

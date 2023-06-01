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

router.get('/users', VerifyUser, AdminOnly, getUsers);
router.get('/users/:id', VerifyUser, AdminOnly, getUsersById);
router.post('/users', VerifyUser, AdminOnly, createUsers);
router.patch('/users/:id', VerifyUser, AdminOnly, updateUsers);
router.delete('/users/:id', VerifyUser, AdminOnly, deleteUsers);

export default router;

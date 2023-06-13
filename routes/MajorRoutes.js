import Express from 'express';
import {
  getMajors,
  getMajorsById,
  createMajors,
  updateMajors,
  deleteMajors,
} from '../controllers/MajorsController.js';
import { VerifyUser } from '../middleware/AuthUser.js';

const router = Express.Router();

router.get('/majors', VerifyUser, getMajors);
router.get('/majors/:id', VerifyUser, getMajorsById);
router.post('/majors', VerifyUser, createMajors);
router.patch('/majors/:id', VerifyUser, updateMajors);
router.delete('/majors/:id', VerifyUser, deleteMajors);

export default router;

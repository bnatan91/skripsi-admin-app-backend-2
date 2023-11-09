import Express from 'express';
import { VerifyUser } from '../middleware/AuthUser.js';
import {
  createMajors,
  deleteMajors,
  getMajors,
  getMajorsById,
  updateMajors,
} from '../controllers/MajorsController.js';

const router = Express.Router();

router.get('/api/majors/:id', VerifyUser, getMajors);
router.get('/api/majors/:studentId/:id', VerifyUser, getMajorsById);
router.post('/api/majors/:studentId', VerifyUser, createMajors);
router.patch('/api/majors/:studentId/:id', VerifyUser, updateMajors);
router.delete('/api/majors/:studentId/:id', VerifyUser, deleteMajors);

export default router;

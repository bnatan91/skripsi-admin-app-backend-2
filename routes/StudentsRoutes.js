import Express from 'express';
import {
  createStudents,
  deleteStudents,
  getStudentById,
  getStudents,
  updateStudents,
} from '../controllers/StudentsController.js';
import { VerifyUser } from '../middleware/AuthUser.js';
const router = Express.Router();

router.get('/api/students', VerifyUser, getStudents);
router.get('/api/students/:id', VerifyUser, getStudentById);
router.post('/api/students', VerifyUser, createStudents);
router.patch('/api/students/:id', VerifyUser, updateStudents);
router.delete('/api/students/:id', VerifyUser, deleteStudents);

export default router;

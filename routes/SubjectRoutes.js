import Express from 'express';
import {
  getSubjects,
  getSubjectsById,
  createSubjects,
  updateSubjects,
  deleteSubjects,
} from '../controllers/SubjectsController.js';
import { VerifyUser } from '../middleware/AuthUser.js';

const router = Express.Router();

router.get('/subjects', VerifyUser, getSubjects);
router.get('/subjects/:id', VerifyUser, getSubjectsById);
router.post('/subjects', VerifyUser, createSubjects);
router.patch('/subjects/:id', VerifyUser, updateSubjects);
router.delete('/subjects/:id', VerifyUser, deleteSubjects);

export default router;

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

router.get('/api/subjects', VerifyUser, getSubjects);
router.get('/api/subjects/:id', VerifyUser, getSubjectsById);
router.post('/api/subjects', VerifyUser, createSubjects);
router.patch('/api/subjects/:id', VerifyUser, updateSubjects);
router.delete('/api/subjects/:id', VerifyUser, deleteSubjects);

export default router;

import Express from 'express';
import {
  getAllSubjects,
  getCriteria,
  getStudent,
} from '../controllers/ApiController.js';
import { createUsers } from '../controllers/UsersController.js';

const router = Express.Router();

router.get('/api/test/subjects', getAllSubjects);
router.get('/api/test/criteria', getCriteria);
router.post('/api/test/students', getStudent);
router.post('/api/test/users', createUsers);

export default router;

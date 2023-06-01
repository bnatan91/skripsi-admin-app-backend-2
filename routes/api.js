import Express from 'express';
import { getAllSubjects } from '../controllers/ApiController.js';
import { createUsers } from '../controllers/UsersController.js';

const router = Express.Router();

router.get('/api/subjects', getAllSubjects);
router.post('/api/users', createUsers);

export default router;

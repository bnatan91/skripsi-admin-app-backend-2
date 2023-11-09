import Express from 'express';
import { Login, LogOut, Me } from '../controllers/AuthControllers.js';

const router = Express.Router();

router.get('/api/me', Me);
router.post('/api/login', Login);
router.delete('/api/logout', LogOut);

export default router;

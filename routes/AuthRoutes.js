import Express from 'express';
import { Login, LogOut, Me } from '../controllers/AuthControllers.js';

const router = Express.Router();

router.get('/me', Me);
router.post('/login', Login);
router.delete('/logout', LogOut);

export default router;

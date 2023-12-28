import express from 'express';
import { VerifyUser } from '../middleware/AuthUser.js';
import {
  getCriteria,
  getCriteriaById,
  updateCriteriaValue,
} from '../controllers/CriteriaController.js';

const router = express.Router();

router.get('/api/criteria', VerifyUser, getCriteria);
router.get('/api/criteria/:id', VerifyUser, getCriteriaById);
router.patch('/api/criteria/edit', VerifyUser, updateCriteriaValue);

export default router;

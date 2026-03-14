import express from 'express';
import {
  createJournal,
  getUserJournals,
  analyzeEmotion,
  getInsights,
  getJournalById,
  deleteJournal,
} from '../controllers/journalController.js';
import { analyzeLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Journal entry endpoints
router.post('/', createJournal);
router.get('/:userId', getUserJournals);
router.get('/entries/:id', getJournalById);
router.delete('/:id', deleteJournal);

// Analysis endpoints
router.post('/analyze', analyzeLimiter, analyzeEmotion);

// Insights endpoint
router.get('/insights/:userId', getInsights);

export default router;

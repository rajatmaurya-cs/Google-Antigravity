const express = require('express');
const router = express.Router();
const journalController = require('../controllers/journalController');

// Journal CRUD
router.post('/', journalController.createEntry);
router.get('/:userId', journalController.getEntriesByUser);

// Analysis Endpoints
router.post('/analyze', journalController.analyzeRawText);
router.patch('/:id/analyze', journalController.analyzeAndSaveEntry);

// Insights Endpoint
router.get('/insights/:userId', journalController.getUserInsights);

module.exports = router;

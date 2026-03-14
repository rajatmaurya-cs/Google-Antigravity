const Journal = require('../models/Journal');

const llmService = require('../services/llmService');

const insightService = require('../services/insightService');

const createEntry = async (req, res, next) => {
    try {
        const { userId, ambience, text } = req.body;

        if (!userId || !ambience || !text) {
            return res.status(400).json({ error: 'userId, ambience, and text are required' });
        }

        const newEntry = await Journal.create({
            userId,
            ambience,
            text
        });

        res.status(201).json(newEntry);
    } catch (error) {
        next(error);
    }
};

const getEntriesByUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const entries = await Journal.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(entries);
    } catch (error) {
        next(error);
    }
};

const analyzeRawText = async (req, res, next) => {
    try {
        const { text } = req.body;

        console.log("Entered in analyzeRawText Backend");
        
        console.log(text);
        
        if (!text) {
            return res.status(400).json({ error: 'text is required for analysis' });
        }

        const analysis = await llmService.analyzeText(text);
        res.status(200).json(analysis);
    } catch (error) {
        next(error);
    }
};

const analyzeAndSaveEntry = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const entry = await Journal.findById(id);
        if (!entry) {
            return res.status(404).json({ error: 'Journal entry not found' });
        }

        // Only analyze if it hasn't been analyzed or needs re-analysis
        const analysis = await llmService.analyzeText(entry.text);
        
        entry.analysis = analysis;
        await entry.save();

        res.status(200).json(entry);
    } catch (error) {
         next(error);
    }
};

const getUserInsights = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const insights = await insightService.calculateInsights(userId);
        res.status(200).json(insights);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createEntry,
    getEntriesByUser,
    analyzeRawText,
    analyzeAndSaveEntry,
    getUserInsights
};

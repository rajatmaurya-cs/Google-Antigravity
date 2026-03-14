const Journal = require('../models/Journal');

const insightService = {
    calculateInsights: async (userId) => {
        const entries = await Journal.find({ userId }).sort({ createdAt: -1 });
        
        const totalEntries = entries.length;
        if (totalEntries === 0) {
            return {
                totalEntries: 0,
                topEmotion: null,
                mostUsedAmbience: null,
                recentKeywords: []
            };
        }

        const emotionsCount = {};
        const ambienceCount = {};
        let recentKeywordsSet = new Set();
        let analyzedCount = 0;

        for (const entry of entries) {
            // Count Ambience
            ambienceCount[entry.ambience] = (ambienceCount[entry.ambience] || 0) + 1;

            // Process analysis if exists
            if (entry.analysis) {
                analyzedCount++;
                
                const em = entry.analysis.emotion.toLowerCase();
                emotionsCount[em] = (emotionsCount[em] || 0) + 1;

                // Take keywords from the most recent 5 analyzed entries
                if (analyzedCount <= 5 && Array.isArray(entry.analysis.keywords)) {
                    entry.analysis.keywords.forEach(kw => recentKeywordsSet.add(kw.toLowerCase()));
                }
            }
        }

        // Determine top emotion
        let topEmotion = null;
        let maxEmotionCount = 0;
        for (const [em, count] of Object.entries(emotionsCount)) {
            if (count > maxEmotionCount) {
                maxEmotionCount = count;
                topEmotion = em;
            }
        }

        // Determine most used ambience
        let mostUsedAmbience = null;
        let maxAmbienceCount = 0;
        for (const [amb, count] of Object.entries(ambienceCount)) {
            if (count > maxAmbienceCount) {
                maxAmbienceCount = count;
                mostUsedAmbience = amb;
            }
        }

        return {
            totalEntries,
            topEmotion,
            mostUsedAmbience,
            recentKeywords: Array.from(recentKeywordsSet).slice(0, 10) // Limit to 10 distinct keywords
        };
    }
};

module.exports = insightService;

const crypto = require('crypto');

const AnalysisCache = require('../models/AnalysisCache');


const  Groq =  require ("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

function getGroqChatModel() {
    // Allow overriding without code changes.
    // Default is a general chat model; Prompt-Guard models are classification-only and will 400 on chat-style prompts.
    return process.env.GROQ_MODEL || process.env.GROQ_CHAT_MODEL || "llama-3.1-8b-instant";
}


const llmService = {
    generateHash: (text) => {
        return crypto.createHash('sha256').update(text.trim().toLowerCase()).digest('hex');
    },

    analyzeText: async (text) => {
        if (!text || text.trim() === '') {
            throw new Error('Text to analyze is empty');
        }

        const textHash = llmService.generateHash(text);

        // 1. Check Cache
        const cachedAnalysis = await AnalysisCache.findOne({ textHash });
        if (cachedAnalysis) {
            console.log('Cache hit for analysis');
            return {
                emotion: cachedAnalysis.emotion,
                keywords: cachedAnalysis.keywords,
                summary: cachedAnalysis.summary
            };
        }

        // 2. Call Real LLM API
        console.log('Cache miss. Calling LLM...');

        const apiKey = process.env.GROQ_API_KEY;

    
        if (!apiKey) {
            throw new Error('GROQ_API_KEY environment variable is missing.');
        }

        let resultJson;
        try {

            const prompt = `
                Analyze the following journal entry text from a nature meditation session.
                Extract the primary emotion, a list of 2-5 thematic nature/mindfulness keywords, and a 1-sentence summary.
                
                You MUST return ONLY valid JSON matching this exact structure:
                {
                    "emotion": "string (single word)",
                    "keywords": ["string", "string"],
                    "summary": "string"
                }
                
                No markdown, no backticks, no extra text. Just the raw JSON object.

                Text to analyze:
                ${text}
            `;

           

            const response = await groq.chat.completions.create({
                model: getGroqChatModel(),
                messages: [
                    { role: "system", content: "Return only valid JSON. Do not include markdown or extra text." },
                    { role: "user", content: prompt.trim() },
                ],
                temperature: 0.2,
            });

            const responseText =
                response?.choices?.[0]?.message?.content ??
                response?.choices?.[0]?.delta?.content ??
                response?.text ??
                "";

            if (!responseText || typeof responseText !== "string") {
                throw new Error("LLM returned empty response text.");
            }

            // Cleanup response formatting if LLM includes markdown
            const cleaned = responseText.replace(/```json/g, '').replace(/```/g, '').trim();

            resultJson = JSON.parse(cleaned);

            // Validate schema briefly
            if (!resultJson.emotion || !Array.isArray(resultJson.keywords) || !resultJson.summary) {
                throw new Error("LLM Output did not match expected schema.");
            }
        } catch (error) {
            console.error('LLM Analysis Error:', error.message);
            // Strong Parsing Fallback Handling
            throw new Error(`Failed to generate analysis from LLM: ${error.message}`);
        }

        // 3. Save to Cache
        try {
            await AnalysisCache.create({
                textHash,
                emotion: resultJson.emotion,
                keywords: resultJson.keywords,
                summary: resultJson.summary
            });
        } catch (cacheError) {
            console.error('Failed to save to Cache (ignoring):', cacheError.message);
        }

        return resultJson;
    }
};



module.exports = llmService;

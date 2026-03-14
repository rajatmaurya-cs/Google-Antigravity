import Journal from '../models/Journal.js';
import Groq from 'groq-sdk';
import { asyncHandler } from '../middleware/errorHandler.js';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.1-8b-instant';

// Create a new journal entry
export const createJournal = asyncHandler(async (req, res) => {
  const { userId, ambience, text } = req.body;

  if (!userId || !ambience || !text) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields: userId, ambience, text',
    });
  }

  const journal = new Journal({
    userId,
    ambience,
    text,
  });

  await journal.save();

  res.status(201).json({
    success: true,
    message: 'Journal entry created successfully',
    data: journal,
  });
});

// Get all journal entries for a user
export const getUserJournals = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: 'User ID is required',
    });
  }

  const journals = await Journal.find({ userId }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: journals.length,
    data: journals,
  });
});

// Analyze journal text for emotions using Groq
export const analyzeEmotion = asyncHandler(async (req, res) => {
  const { text, journalId } = req.body;

  if (!text) {
    return res.status(400).json({
      success: false,
      message: 'Text is required for analysis',
    });
  }

  try {
    if (!process.env.GROQ_API_KEY) {
      throw new Error('Missing GROQ_API_KEY in environment');
    }

    const completion = await groq.chat.completions.create({
      model: GROQ_MODEL,
      temperature: 0.2,
      max_tokens: 200,
      response_format: {
        type: 'json_object',
      },
      messages: [
        {
          role: 'system',
          content:
            'You analyze a journal entry and output ONLY JSON. Your JSON MUST contain these exact keys: "emotion" (string), "keywords" (an array of 3 to 5 strings), and "summary" (string).',
        },
        {
          role: 'user',
          content: `Journal Entry:\n${text}`,
        },
      ],
    });

    const responseText = completion?.choices?.[0]?.message?.content;
    if (!responseText) {
      throw new Error('Empty response from LLM');
    }

    const analysis = JSON.parse(responseText);

    // Validate analysis structure
    if (!analysis.emotion || !analysis.keywords || !analysis.summary) {
      throw new Error('Invalid analysis structure from LLM');
    }

    // If journalId is provided, update the journal entry with analysis
    if (journalId) {
      await Journal.findByIdAndUpdate(
        journalId,
        {
          emotion: analysis.emotion,
          keywords: analysis.keywords,
          summary: analysis.summary,
          analyzed: true,
        },
        { new: true }
      );
    }

    res.status(200).json({
      success: true,
      message: 'Analysis completed successfully',
      data: {
        emotion: analysis.emotion,
        keywords: analysis.keywords,
        summary: analysis.summary,
      },
    });
  } catch (error) {
    console.error('LLM Analysis Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to analyze text: ' + error.message,
    });
  }
});

// Get insights for a user
export const getInsights = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: 'User ID is required',
    });
  }

  const journals = await Journal.find({ userId });

  if (journals.length === 0) {
    return res.status(200).json({
      success: true,
      message: 'No journal entries found',
      data: {
        totalEntries: 0,
        topEmotion: null,
        mostUsedAmbience: null,
        recentKeywords: [],
      },
    });
  }

  // Calculate insights
  const emotions = journals
    .filter((j) => j.emotion)
    .map((j) => j.emotion);
  const ambiences = journals.map((j) => j.ambience);
  const allKeywords = journals
    .filter((j) => j.keywords.length > 0)
    .flatMap((j) => j.keywords)
    .slice(0, 10);

  // Get most frequent emotion
  const emotionCounts = {};
  emotions.forEach((e) => {
    emotionCounts[e] = (emotionCounts[e] || 0) + 1;
  });
  const topEmotion =
    Object.keys(emotionCounts).length > 0
      ? Object.keys(emotionCounts).reduce((a, b) =>
          emotionCounts[a] > emotionCounts[b] ? a : b
        )
      : null;

  // Get most used ambience
  const ambienceCounts = {};
  ambiences.forEach((a) => {
    ambienceCounts[a] = (ambienceCounts[a] || 0) + 1;
  });
  const mostUsedAmbience = Object.keys(ambienceCounts).reduce((a, b) =>
    ambienceCounts[a] > ambienceCounts[b] ? a : b
  );

  res.status(200).json({
    success: true,
    message: 'Insights retrieved successfully',
    data: {
      totalEntries: journals.length,
      topEmotion,
      mostUsedAmbience,
      recentKeywords: [...new Set(allKeywords)],
      emotionBreakdown: emotionCounts,
      ambienceBreakdown: ambienceCounts,
    },
  });
});

// Get a single journal entry
export const getJournalById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const journal = await Journal.findById(id);

  if (!journal) {
    return res.status(404).json({
      success: false,
      message: 'Journal entry not found',
    });
  }

  res.status(200).json({
    success: true,
    data: journal,
  });
});

// Delete a journal entry
export const deleteJournal = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const journal = await Journal.findByIdAndDelete(id);

  if (!journal) {
    return res.status(404).json({
      success: false,
      message: 'Journal entry not found',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Journal entry deleted successfully',
  });
});

import React, { useState } from 'react';
import { journalAPI } from '../services/api';
import { Sparkles, BrainCircuit } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AnalyzeSection() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const emotionMemoji = {
    calm: '😌',
    happy: '😊',
    anxious: '😟',
    sad: '😢',
    excited: '🤩',
    peaceful: '🙏',
    joyful: '😄',
    melancholic: '🎻',
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setAnalysis(null);

    if (!text.trim()) {
      setError('Please enter text to analyze');
      setLoading(false);
      return;
    }

    try {
      const response = await journalAPI.analyzeText(text);
      setAnalysis(response.data.data);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to analyze text'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-accent-500/20 rounded-lg">
          <BrainCircuit className="w-5 h-5 text-accent-400" />
        </div>
        <h2 className="text-xl font-semibold text-white">Quick Analysis</h2>
      </div>

      <form onSubmit={handleAnalyze} className="flex flex-col gap-4">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-500 to-primary-500 rounded-xl opacity-0 group-focus-within:opacity-20 transition duration-500 blur"></div>
          <textarea
            id="analyze-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste any text to uncover the hidden emotions..."
            rows="4"
            disabled={loading}
            className="glass-input relative resize-none text-sm w-full"
          />
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !text.trim()}
          className="btn-premium bg-gradient-to-r from-accent-600 to-primary-600 text-white hover:from-accent-500 hover:to-primary-500 py-3 disabled:opacity-50 w-full"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              Analyzing...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Start Analysis
            </span>
          )}
        </button>
      </form>

      <AnimatePresence>
        {analysis && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="mt-6 pt-6 border-t border-white/10"
          >
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-widest text-center">Results</h3>

            <div className="bg-white/5 border border-white/10 rounded-xl p-5 mb-4 text-center">
              <div className="text-4xl mb-2">{emotionMemoji[analysis.emotion.toLowerCase()] || '😊'}</div>
              <div className="text-accent-400 font-medium capitalize text-lg tracking-wide">{analysis.emotion}</div>
            </div>

            {analysis.summary && (
              <div className="mb-4">
                <span className="text-xs text-gray-500 uppercase font-semibold mb-1 block tracking-wider">Summary</span>
                <p className="text-sm text-gray-300 leading-relaxed bg-white/5 p-3 rounded-lg">{analysis.summary}</p>
              </div>
            )}

            {analysis.keywords && analysis.keywords.length > 0 && (
              <div>
                <span className="text-xs text-gray-500 uppercase font-semibold mb-2 block tracking-wider">Keywords</span>
                <div className="flex flex-wrap gap-2">
                  {analysis.keywords.map((keyword, i) => (
                    <span key={i} className="px-2.5 py-1 text-xs bg-accent-500/10 border border-accent-500/20 text-accent-300 rounded hover:bg-accent-500/20 transition-colors">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

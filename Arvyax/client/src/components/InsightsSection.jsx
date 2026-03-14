import React, { useEffect, useState } from 'react';
import { journalAPI } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, TrendingUp, Hash, Heart, RefreshCw } from 'lucide-react';

export default function InsightsSection({ userId, refreshTrigger }) {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const ambienceEmoji = {
    forest: '🌲',
    ocean: '🌊',
    mountain: '⛰️',
  };

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

  useEffect(() => {
    if (userId) {
      fetchInsights();
    }
  }, [userId, refreshTrigger]);

  const fetchInsights = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await journalAPI.getInsights(userId);
      setInsights(response.data.data);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to fetch insights'
      );
    } finally {
      setLoading(false);
    }
  };

  if (!userId) return null;

  return (
    <div className="glass-card p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 rounded-lg">
            <BarChart3 className="w-5 h-5 text-indigo-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">Your Insights</h2>
        </div>
        <button 
          onClick={fetchInsights} 
          disabled={loading}
          className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/5"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-indigo-400' : ''}`} />
        </button>
      </div>

      <AnimatePresence mode="wait">
        {loading && !insights ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-10 text-gray-400"
          >
            <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-4" />
            <p className="text-sm">Gathering insights...</p>
          </motion.div>
        ) : error ? (
          <motion.div 
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex flex-col gap-3"
          >
            <p>{error}</p>
            <button onClick={fetchInsights} className="btn-secondary self-start py-1.5 px-3 text-xs bg-red-500/20 border-red-500/30 text-red-300 hover:bg-red-500/30">
              Retry
            </button>
          </motion.div>
        ) : !insights || insights.totalEntries === 0 ? (
          <motion.div 
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-8 text-gray-400"
          >
            <p className="text-sm">No entries yet. Write your first journal entry to unlock insights!</p>
          </motion.div>
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-8"
          >
            {/* KPI Grid */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
              <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/10 border border-indigo-500/20 rounded-xl p-4 flex flex-col overflow-hidden">
                <span className="text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-2 grid grid-cols-[auto,1fr] items-center gap-1.5 min-w-0">
                  <BarChart3 className="w-3.5 h-3.5 shrink-0" /> 
                  <span className="min-w-0 whitespace-normal break-normal leading-snug">Total Entries</span>
                </span>
                <span className="text-3xl font-bold text-white mt-auto">{insights.totalEntries}</span>
              </div>

              <div className="bg-gradient-to-br from-rose-500/20 to-orange-500/10 border border-rose-500/20 rounded-xl p-4 flex flex-col overflow-hidden">
                <span className="text-rose-300 text-xs font-semibold uppercase tracking-wider mb-2 grid grid-cols-[auto,1fr] items-center gap-1.5 min-w-0">
                  <Heart className="w-3.5 h-3.5 shrink-0" /> 
                  <span className="min-w-0 whitespace-normal break-normal leading-snug">Top Emotion</span>
                </span>
                <span className="text-base sm:text-lg font-bold text-white mt-auto capitalize grid grid-cols-[auto,1fr] items-center gap-2 min-w-0">
                  {insights.topEmotion ? (
                    <>
                      <span className="shrink-0">{emotionMemoji[insights.topEmotion.toLowerCase()] || '😊'}</span>
                      <span className="min-w-0 whitespace-normal break-normal leading-snug">{insights.topEmotion}</span>
                    </>
                  ) : (
                    <span className="leading-tight">N/A</span>
                  )}
                </span>
              </div>

              <div className="bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/20 rounded-xl p-4 flex flex-col overflow-hidden">
                <span className="text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-2 grid grid-cols-[auto,1fr] items-center gap-1.5 min-w-0">
                  <TrendingUp className="w-3.5 h-3.5 shrink-0" /> 
                  <span className="min-w-0 whitespace-normal break-normal leading-snug">Top Ambience</span>
                </span>
                <span className="text-base sm:text-lg font-bold text-white mt-auto capitalize grid grid-cols-[auto,1fr] items-center gap-2 min-w-0">
                  {insights.mostUsedAmbience ? (
                    <>
                      <span className="shrink-0">{ambienceEmoji[insights.mostUsedAmbience]}</span>
                      <span className="min-w-0 whitespace-normal break-normal leading-snug">{insights.mostUsedAmbience}</span>
                    </>
                  ) : (
                    <span className="leading-tight">N/A</span>
                  )}
                </span>
              </div>
            </div>

            {insights.recentKeywords && insights.recentKeywords.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                  <Hash className="w-4 h-4 text-primary-400" /> Recurring Themes
                </h3>
                <div className="flex flex-wrap gap-2">
                  {insights.recentKeywords.map((keyword, i) => (
                    <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-300 shadow-sm hover:bg-white/10 transition-colors">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {insights.emotionBreakdown && Object.keys(insights.emotionBreakdown).length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-white mb-3">Emotion Breakdown</h3>
                <div className="flex flex-col gap-2">
                  {Object.entries(insights.emotionBreakdown)
                    .sort((a, b) => b[1] - a[1])
                    .map(([emotion, count]) => {
                      const percentage = Math.round((count / insights.totalEntries) * 100);
                      return (
                        <div key={emotion} className="flex items-center gap-4">
                          <div className="w-24 text-sm text-gray-300 flex items-center gap-2 capitalize">
                            <span>{emotionMemoji[emotion.toLowerCase()] || '😊'}</span>
                            {emotion}
                          </div>
                          <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 1, ease: 'easeOut' }}
                              className="h-full bg-gradient-to-r from-primary-500 to-accent-500"
                            />
                          </div>
                          <div className="w-8 text-right text-xs text-gray-400 font-medium">
                            {percentage}%
                          </div>
                        </div>
                      );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import React, { useState } from 'react';
import { journalAPI } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Sparkles, Clock, Trees, Waves, Mountain, ChevronDown, ChevronUp } from 'lucide-react';

export default function EntriesList({ entries, onAnalyze, onDelete, loading }) {
  const [analyzingId, setAnalyzingId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const ambienceConfig = {
    forest: { icon: Trees, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    ocean: { icon: Waves, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    mountain: { icon: Mountain, color: 'text-slate-300', bg: 'bg-slate-500/10' },
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

  const handleAnalyze = async (id, text) => {
    setAnalyzingId(id);
    try {
      const response = await journalAPI.analyzeText(text, id);
      if (onAnalyze) {
        onAnalyze(id, response.data.data);
      }
    } catch (error) {
      console.error('Analysis failed:', error);
      alert('Failed to analyze entry');
    } finally {
      setAnalyzingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await journalAPI.delete(id);
        if (onDelete) {
          onDelete(id);
        }
      } catch (error) {
        console.error('Delete failed:', error);
        alert('Failed to delete entry');
      }
    }
  };

  if (loading) {
    return (
      <div className="glass-card p-12 flex flex-col items-center justify-center text-gray-400">
        <div className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin mb-4" />
        <p>Retrieving your memories...</p>
      </div>
    );
  }

  if (!entries || entries.length === 0) {
    return (
      <div className="glass-card p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4">
          <Trees className="w-8 h-8 text-gray-500" />
        </div>
        <h3 className="text-lg font-medium text-white mb-2">No entries yet</h3>
        <p className="text-gray-400 text-sm max-w-sm">Capture your feelings and thoughts above to begin your journaling journey.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
      <AnimatePresence>
        {entries.map((entry, index) => {
          const amb = ambienceConfig[entry.ambience] || ambienceConfig.forest;
          const AmbIcon = amb.icon;
          const isExpanded = expandedId === entry._id;
          const isAnalyzing = analyzingId === entry._id;

          return (
            <motion.div
              key={entry._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="glass-card flex flex-col h-full overflow-hidden group"
            >
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${amb.bg} border border-white/5`}>
                    <AmbIcon className={`w-3.5 h-3.5 ${amb.color}`} />
                    <span className={`text-xs font-medium ${amb.color} capitalize`}>{entry.ambience}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-500 text-xs font-medium">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(entry.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>

                <div className="text-gray-300 text-sm leading-relaxed mb-4 flex-1">
                  {isExpanded ? entry.text : entry.text.substring(0, 150) + (entry.text.length > 150 ? '...' : '')}
                  {entry.text.length > 150 && (
                    <button
                      className="ml-2 text-primary-400 hover:text-primary-300 font-medium inline-flex items-center gap-1"
                      onClick={() => setExpandedId(isExpanded ? null : entry._id)}
                    >
                      {isExpanded ? <>Less <ChevronUp className="w-3 h-3" /></> : <>More <ChevronDown className="w-3 h-3" /></>}
                    </button>
                  )}
                </div>

                {entry.analyzed && entry.emotion && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-4 bg-primary-500/10 border border-primary-500/20 rounded-xl p-4"
                  >
                    <div className="flex items-center gap-3 mb-3 pb-3 border-b border-primary-500/10">
                      <div className="text-2xl">{emotionMemoji[entry.emotion.toLowerCase()] || '😊'}</div>
                      <div>
                        <div className="text-xs text-primary-400 uppercase tracking-wider font-semibold mb-0.5">Primary Emotion</div>
                        <div className="text-white font-medium capitalize">{entry.emotion}</div>
                      </div>
                    </div>
                    
                    {entry.summary && (
                      <p className="text-xs text-gray-300 leading-relaxed mb-3">
                        {entry.summary}
                      </p>
                    )}
                    
                    {entry.keywords && entry.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {entry.keywords.map((keyword, i) => (
                          <span key={i} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-gray-300">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </div>

              <div className="bg-white/5 border-t border-white/5 px-4 py-3 flex items-center gap-3 mt-auto">
                <button
                  onClick={() => handleAnalyze(entry._id, entry.text)}
                  disabled={isAnalyzing}
                  className="btn-secondary flex-1 py-1.5 text-xs text-primary-300 hover:text-primary-200 border-primary-500/30 hover:border-primary-500/50 bg-primary-500/10"
                >
                  {isAnalyzing ? (
                    <span className="flex items-center justify-center gap-1.5">
                      <span className="w-3 h-3 border-2 border-primary-400/30 border-t-primary-400 rounded-full animate-spin"></span>
                      Analyzing
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Insight
                    </span>
                  )}
                </button>
                <button
                  onClick={() => handleDelete(entry._id)}
                  className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                  title="Delete Entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

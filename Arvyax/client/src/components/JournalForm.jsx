import React, { useState } from 'react';
import { journalAPI } from '../services/api';
import { PenLine, Send, Trees, Waves, Mountain } from 'lucide-react';
import { motion } from 'framer-motion';

export default function JournalForm({ userId, onEntryCreated }) {
  const [ambience, setAmbience] = useState('forest');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const ambiences = [
    { id: 'forest', icon: Trees, label: 'Forest', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { id: 'ocean', icon: Waves, label: 'Ocean', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
    { id: 'mountain', icon: Mountain, label: 'Mountain', color: 'text-slate-300', bg: 'bg-slate-500/10', border: 'border-slate-500/20' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!text.trim()) {
      setError('Please write something in your journal entry');
      setLoading(false);
      return;
    }

    if (text.trim().length < 10) {
      setError('Journal entry must be at least 10 characters');
      setLoading(false);
      return;
    }

    try {
      const response = await journalAPI.create(userId, ambience, text);
      setSuccess('✓ Journal entry saved successfully');
      setText('');
      if (onEntryCreated) {
        onEntryCreated(response.data.data);
      }
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save journal entry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass-card p-6 md:p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-primary-500/20 rounded-lg">
          <PenLine className="w-5 h-5 text-primary-400" />
        </div>
        <h2 className="text-xl font-semibold text-white">Capture Your Thoughts</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Choose your ambience
          </label>
          <div className="grid grid-cols-3 gap-3">
            {ambiences.map((amb) => {
              const active = ambience === amb.id;
              const Icon = amb.icon;
              return (
                <button
                  key={amb.id}
                  type="button"
                  onClick={() => setAmbience(amb.id)}
                  className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all duration-300 ${
                    active 
                      ? `${amb.bg} ${amb.border} shadow-[0_0_15px_rgba(255,255,255,0.05)] shadow-${amb.color.split('-')[1]}-500/20` 
                      : 'bg-white/5 border-white/5 hover:bg-white/10'
                  }`}
                  disabled={loading}
                >
                  <Icon className={`w-6 h-6 ${active ? amb.color : 'text-gray-400'}`} />
                  <span className={`text-xs font-medium ${active ? 'text-white' : 'text-gray-400'}`}>
                    {amb.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label htmlFor="text" className="block text-sm font-medium text-gray-300 mb-2 flex justify-between">
            <span>Your Entry</span>
            <span className={`text-xs ${text.length > 4000 ? 'text-orange-400' : 'text-gray-500'}`}>
              {text.length}/5000
            </span>
          </label>
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl opacity-0 group-focus-within:opacity-20 transition duration-500 blur"></div>
            <textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What's on your mind today?"
              rows="5"
              disabled={loading}
              className="glass-input relative resize-none w-full"
            />
          </div>
        </div>

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </motion.div>
        )}
        
        {success && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
            {success}
          </motion.div>
        )}

        <button
          type="submit"
          disabled={loading || !userId}
          className="btn-primary py-3 w-full mt-2"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              Saving...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Send className="w-4 h-4" /> Save Entry
            </span>
          )}
        </button>
      </form>
    </motion.div>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, User, RefreshCw, Sparkles, LogOut } from 'lucide-react';
import JournalForm from './components/JournalForm';
import EntriesList from './components/EntriesList';
import AnalyzeSection from './components/AnalyzeSection';
import InsightsSection from './components/InsightsSection';
import { journalAPI } from './services/api';
import './styles/App.css';

function App() {
  const [userId, setUserId] = useState('');
  const [userIdInput, setUserIdInput] = useState('');
  const [entries, setEntries] = useState([]);
  const [loadingEntries, setLoadingEntries] = useState(false);
  const [error, setError] = useState('');
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Load entries when userId changes
  useEffect(() => {
    if (userId) {
      fetchEntries();
    } else {
      setEntries([]);
    }
  }, [userId]);

  const fetchEntries = async () => {
    setLoadingEntries(true);
    setError('');
    try {
      const response = await journalAPI.getUserEntries(userId);
      setEntries(response.data.data);
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to load entries'
      );
    } finally {
      setLoadingEntries(false);
    }
  };

  const handleSetUserId = (e) => {
    e.preventDefault();
    if (userIdInput.trim()) {
      setUserId(userIdInput.trim());
    }
  };

  const handleEntryCreated = (newEntry) => {
    setEntries([newEntry, ...entries]);
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleAnalyzeComplete = (entryId, analysis) => {
    setEntries(
      entries.map((entry) =>
        entry._id === entryId
          ? {
              ...entry,
              emotion: analysis.emotion,
              keywords: analysis.keywords,
              summary: analysis.summary,
              analyzed: true,
            }
          : entry
      )
    );
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleDeleteEntry = (entryId) => {
    setEntries(entries.filter((entry) => entry._id !== entryId));
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleRefreshEntries = () => {
    if (userId) {
      fetchEntries();
    }
  };

  return (
    <div className="min-h-screen bg-mesh text-gray-200 selection:bg-primary-500/30 font-sans">
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="sticky top-0 z-50 glass border-b border-white/10"
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl shadow-lg shadow-primary-500/20">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                Aura <span className="text-gray-400 font-normal">Journal</span>
              </h1>
            </div>
          </div>
          <p className="hidden md:block text-sm text-gray-400">Explore emotions through nature & AI</p>
        </div>
      </motion.header>

      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12 flex flex-col gap-8">
        <AnimatePresence mode="wait">
          {!userId ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
              transition={{ duration: 0.5 }}
              className="max-w-md mx-auto w-full mt-12"
            >
              <div className="glass-card p-8 text-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 mb-6 shadow-xl">
                  <Sparkles className="w-8 h-8 text-primary-400" />
                </div>
                
                <h2 className="text-2xl font-bold text-white mb-2">Welcome to Aura</h2>
                <p className="text-gray-400 mb-8 text-sm">Enter a unique identifier to access your secure journal space.</p>
                
                <form onSubmit={handleSetUserId} className="flex flex-col gap-4 relative z-10">
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="userId"
                      type="text"
                      value={userIdInput}
                      onChange={(e) => setUserIdInput(e.target.value)}
                      placeholder="e.g. user123"
                      className="glass-input pl-11"
                      required
                    />
                  </div>
                  <button type="submit" className="btn-primary py-3 w-full">
                    Enter Space
                  </button>
                </form>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, staggerChildren: 0.1 }}
              className="flex flex-col gap-8"
            >
              {/* User Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 glass-card px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent-500 to-primary-500 flex items-center justify-center text-white font-bold shadow-lg">
                    {userId.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Active User</p>
                    <p className="text-white font-medium">{userId}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setUserId('');
                    setUserIdInput('');
                    setEntries([]);
                  }}
                  className="btn-secondary py-2 px-4 text-sm flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>

              {error && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-3">
                  <span className="flex-shrink-0">⚠️</span> {error}
                </motion.div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-4 flex flex-col gap-8 sticky top-28">
                  <JournalForm userId={userId} onEntryCreated={handleEntryCreated} />
                  <InsightsSection userId={userId} refreshTrigger={refreshTrigger} />
                  <AnalyzeSection />
                </div>
                
                <div className="lg:col-span-8 flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                       Your Journey 
                       <span className="text-sm font-normal text-gray-400 bg-white/5 py-1 px-3 rounded-full border border-white/10">
                         {entries.length} entries
                       </span>
                    </h2>
                    <button
                      onClick={handleRefreshEntries}
                      className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5 flex items-center gap-2 text-sm"
                    >
                      <RefreshCw className={`w-4 h-4 ${loadingEntries ? 'animate-spin' : ''}`} />
                      Refresh
                    </button>
                  </div>
                  
                  <EntriesList
                    entries={entries}
                    onAnalyze={handleAnalyzeComplete}
                    onDelete={handleDeleteEntry}
                    loading={loadingEntries}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;

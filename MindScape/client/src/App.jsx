import React, { useState, useEffect, useCallback } from 'react';
import JournalForm from './components/JournalForm';
import EntryList from './components/EntryList';
import Dashboard from './components/Dashboard';
import { api } from './services/api';
import { Leaf } from 'lucide-react';

function App() {
  const [userId, setUserId] = useState('demo-user');
  const [entries, setEntries] = useState([]);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadData = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    setError('');
    try {
      const [entriesData, insightsData] = await Promise.all([
        api.getEntries(userId),
        api.getInsights(userId)
      ]);
      setEntries(entriesData);
      setInsights(insightsData);
    } catch (err) {
      console.error(err);
      setError('Failed to load user data. Is the backend running?');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleEntryAdded = (newEntry) => {
    setEntries([newEntry, ...entries]);
    loadData(); // reload insights
  };

  const handleEntryAnalyzed = (id, analysis) => {
    setEntries(entries.map(e => e._id === id ? { ...e, analysis } : e));
    loadData(); // reload insights
  };

  return (
    <div className="app-container">
      <header className="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Leaf color="#10b981" size={32} />
          <h1>ArvyaX Journal</h1>
        </div>
        <div className="user-input-group">
            <span style={{ color: 'var(--text-muted)' }}>User ID:</span>
            <input 
              type="text" 
              className="input" 
              value={userId} 
              onChange={(e) => setUserId(e.target.value)} 
              style={{ width: '150px', padding: '0.5rem' }}
            />
        </div>
      </header>

      <main style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {error && <div className="error-message">{error}</div>}
        
        <JournalForm userId={userId} onEntryAdded={handleEntryAdded} />
        
        <div>
          <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Previous Entries</h2>
          {loading ? (
             <p style={{ color: 'var(--text-muted)' }}>Loading entries...</p>
          ) : (
            <EntryList entries={entries} onEntryAnalyzed={handleEntryAnalyzed} />
          )}
        </div>
      </main>

      <aside>
        <Dashboard insights={insights} loading={loading} />
      </aside>
    </div>
  );
}

export default App;

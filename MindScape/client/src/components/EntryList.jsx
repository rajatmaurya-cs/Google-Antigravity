import React, { useState } from 'react';
import { api } from '../services/api';
import { Sparkles } from 'lucide-react';

function EntryCard({ entry, onEntryAnalyzed }) {
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    setAnalyzing(true);
    setError('');
    try {
      const updatedEntry = await api.analyzeSavedEntry(entry._id);
      onEntryAnalyzed(entry._id, updatedEntry.analysis);
    } catch (err) {
      setError('Analysis failed. Try again.');
      console.error(err);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="card entry-card" style={{ marginBottom: '1rem', padding: '1.25rem' }}>
      <div className="entry-header">
        <span style={{ color: 'var(--text-muted)' }}>
          {new Date(entry.createdAt).toLocaleDateString(undefined, {
             weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
          })}
        </span>
        <span className="ambience-badge">{entry.ambience}</span>
      </div>
      
      <p className="entry-text">{entry.text}</p>

      {error && <div className="error-message" style={{ padding: '0.5rem', marginTop: '0' }}>{error}</div>}

      {!entry.analysis ? (
        <button 
          onClick={handleAnalyze} 
          disabled={analyzing} 
          className="btn btn-secondary"
          style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
        >
           <Sparkles size={16} /> 
           {analyzing ? 'Analyzing with AI...' : 'Analyze Insights'}
        </button>
      ) : (
        <div className="analysis-box">
           <div className="analysis-header">
             <span className="emotion-tag">Emotion: {entry.analysis.emotion}</span>
             <Sparkles size={16} color="#60a5fa" />
           </div>
           <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem', color: '#bfdbfe' }}>
              {entry.analysis.summary}
           </p>
           <div className="keywords">
              {entry.analysis.keywords?.map((kw, i) => (
                 <span key={i} className="keyword">{kw}</span>
              ))}
           </div>
        </div>
      )}
    </div>
  );
}

export default function EntryList({ entries, onEntryAnalyzed }) {
  if (entries.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
        <p>No journal entries found. Time to write your first one!</p>
      </div>
    );
  }

  return (
    <div>
      {entries.map(entry => (
        <EntryCard 
          key={entry._id} 
          entry={entry} 
          onEntryAnalyzed={onEntryAnalyzed} 
        />
      ))}
    </div>
  );
}

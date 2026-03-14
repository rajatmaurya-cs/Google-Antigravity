import React, { useState } from 'react';
import { api } from '../services/api';
import { PenLine } from 'lucide-react';

export default function JournalForm({ userId, onEntryAdded }) {
  const [ambience, setAmbience] = useState('forest');
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsSubmitting(true);
    setError('');

    try {
      const newEntry = await api.createEntry({ userId, ambience, text });
      setText('');
      onEntryAdded(newEntry);
    } catch (err) {
      console.error(err);
      setError('Failed to save journal entry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card">
      <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <PenLine size={20} color="var(--primary)" />
        New Journal Entry
      </h2>
      
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="ambience">Nature Session</label>
          <select 
            id="ambience"
            className="select" 
            value={ambience} 
            onChange={(e) => setAmbience(e.target.value)}
          >
            <option value="forest">🌲 Forest Canopy</option>
            <option value="ocean">🌊 Ocean Waves</option>
            <option value="mountain">⛰️ Mountain High</option>
            <option value="blank">⚪ Blank Space</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="text">How do you feel?</label>
          <textarea 
            id="text"
            className="textarea" 
            placeholder="Write down your thoughts after the session..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>

        <button 
          type="submit" 
          className="btn" 
          disabled={isSubmitting || !text.trim()}
          style={{ width: '100%' }}
        >
          {isSubmitting ? 'Saving...' : 'Save Entry'}
        </button>
      </form>
    </div>
  );
}

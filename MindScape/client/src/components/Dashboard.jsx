import React from 'react';
import { BarChart2 } from 'lucide-react';

export default function Dashboard({ insights, loading }) {
  if (loading || !insights) {
    return (
      <div className="card">
        <h2 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <BarChart2 size={20} color="var(--primary)" />
          Your Insights
        </h2>
        <p style={{ color: 'var(--text-muted)' }}>Loading stats...</p>
      </div>
    );
  }

  const { totalEntries, topEmotion, mostUsedAmbience, recentKeywords } = insights;

  return (
    <div className="card" style={{ position: 'sticky', top: '2rem' }}>
      <h2 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <BarChart2 size={20} color="var(--primary)" />
        Your Insights
      </h2>

      {totalEntries === 0 ? (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            Complete sessions and write entries to unlock AI insights.
          </p>
      ) : (
          <>
            <div className="insight-grid">
                <div className="insight-box">
                    <h4>Total Entries</h4>
                    <p style={{ color: 'var(--primary)' }}>{totalEntries}</p>
                </div>
                <div className="insight-box">
                    <h4>Top Ambience</h4>
                    <p style={{ color: '#a78bfa' }}>{mostUsedAmbience || '-'}</p>
                </div>
            </div>

            <div className="insight-box" style={{ marginTop: '1rem', textAlign: 'left' }}>
                <h4>Dominant Emotion</h4>
                <p style={{ color: '#60a5fa', fontSize: '1.5rem' }}>{topEmotion || 'Not analyzed yet'}</p>
            </div>

            {recentKeywords && recentKeywords.length > 0 && (
                <div style={{ marginTop: '1.5rem' }}>
                    <h4 style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                        Recent Themes
                    </h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                        {recentKeywords.map((kw, i) => (
                            <span key={i} style={{ 
                                fontSize: '0.75rem', 
                                background: 'rgba(59, 130, 246, 0.1)', 
                                color: '#93c5fd',
                                padding: '0.2rem 0.6rem', 
                                borderRadius: '9999px',
                                border: '1px solid rgba(59, 130, 246, 0.2)'
                            }}>
                                {kw}
                            </span>
                        ))}
                    </div>
                </div>
            )}
          </>
      )}
    </div>
  );
}

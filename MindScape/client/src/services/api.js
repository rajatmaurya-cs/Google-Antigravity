function normalizeApiBase(value) {
    const trimmed = (value || '').trim().replace(/\/$/, '');
    if (!trimmed) return '/api';
    return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
}

const API_BASE = normalizeApiBase(import.meta.env.VITE_API_URL);

export const api = {
    // 1. Create a journal entry
    createEntry: async (data) => {
        const res = await fetch(`${API_BASE}/journal`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) throw new Error('Failed to create entry');
        return res.json();
    },

    // 2. Get user entries
    getEntries: async (userId) => {
        const res = await fetch(`${API_BASE}/journal/${userId}`);
        if (!res.ok) throw new Error('Failed to fetch entries');
        return res.json();
    },

    // 3. Analyze any raw text
    analyzeRawText: async (text) => {
        const res = await fetch(`${API_BASE}/journal/analyze`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });
        if (!res.ok) throw new Error('Analysis failed');
        return res.json();
    },

    // 4. Analyze and save to a specific entry id
    analyzeSavedEntry: async (entryId) => {
        const res = await fetch(`${API_BASE}/journal/${entryId}/analyze`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' }
        });
        if (!res.ok) throw new Error('Failed to analyze entry');
        return res.json();
    },

    // 5. Get Insights
    getInsights: async (userId) => {
        const res = await fetch(`${API_BASE}/journal/insights/${userId}`);
        if (!res.ok) throw new Error('Failed to fetch insights');
        return res.json();
    }
};

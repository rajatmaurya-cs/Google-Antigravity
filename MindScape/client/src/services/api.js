const API_BASE = (() => {
    const raw = typeof import.meta.env.VITE_API_URL === 'string' ? import.meta.env.VITE_API_URL.trim() : '';
    const base = raw.replace(/\/+$/, '');
    if (!base) return '/api';
    return base.endsWith('/api') ? base : `${base}/api`;
})();

const joinUrl = (base, path) => {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${base}${normalizedPath}`;
};

const fetchJson = async (url, options) => {
    let res;
    try {
        res = await fetch(url, options);
    } catch (err) {
        throw new Error(
            `Network error calling ${url}. Check that the backend is deployed and VITE_API_URL points to it.`
        );
    }

    const contentType = res.headers.get('content-type') || '';
    const body = contentType.includes('application/json')
        ? await res.json().catch(() => null)
        : await res.text().catch(() => '');

    if (!res.ok) {
        const detail =
            body && typeof body === 'object'
                ? (body.error || body.message || JSON.stringify(body))
                : body;
        const message = detail || `Request failed: ${res.status} ${res.statusText}`;
        const err = new Error(message);
        err.status = res.status;
        err.url = url;
        throw err;
    }

    return body;
};

export const api = {
    // 1. Create a journal entry
    createEntry: async (data) => {
        return fetchJson(joinUrl(API_BASE, '/journal'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    },

    // 2. Get user entries
    getEntries: async (userId) => {
        return fetchJson(joinUrl(API_BASE, `/journal/${encodeURIComponent(userId)}`));
    },

    // 3. Analyze any raw text
    analyzeRawText: async (text) => {
        console.log("Entered in analyzeText fronted")
        return fetchJson(joinUrl(API_BASE, '/journal/analyze'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text })
        });
    },

    // 4. Analyze and save to a specific entry id
    analyzeSavedEntry: async (entryId) => {
        
        console.log("Entered in analyzeedSabedEntry");

        return fetchJson(joinUrl(API_BASE, `/journal/${encodeURIComponent(entryId)}/analyze`), {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' }
        });
    },

    // 5. Get Insights
    getInsights: async (userId) => {
        return fetchJson(joinUrl(API_BASE, `/journal/insights/${encodeURIComponent(userId)}`));
    }
};

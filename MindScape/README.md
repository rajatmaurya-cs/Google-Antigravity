# AI-Assisted Journal System

A full-stack MERN application that allows users to record their journal entries after completing nature sessions. The application uses a real LLM integration to analyze the journal entries to extract emotions, thematic keywords, and a summary. Users can view their insights over time, such as their top emotion, most frequented nature ambience, and recent thematic keywords.

## Tech Stack
-   **Frontend**: React (Vite), plain CSS (No TypeScript).
-   **Backend**: Node.js, Express (No TypeScript).
-   **Database**: MongoDB (via Mongoose).
-   **LLM Integration**: Google Gemini API (via `@google/genai` or standard HTTP request).

## Folder Structure
```
root/
  client/                    # React frontend application
    package.json
    src/                     # React source files (components, services, styles)
  server/                    # Node.js + Express backend application
    package.json
    src/
      config/                # Database connection configuration
      controllers/           # Request handlers for API endpoints
      models/                # Mongoose database schemas
      routes/                # API route definitions
      services/              # Core business logic (LLM analysis, insights)
      middleware/            # Express middlewares (error handling, validation)
      utils/                 # Reusable utility functions
      app.js                 # Express app setup and middleware configuration
      server.js              # Server entry point
  README.md                  # Project documentation
  ARCHITECTURE.md            # Technical architecture questions and strategies
```

## Setup Instructions

### Prerequisites
-   Node.js (v18+)
-   MongoDB (Local instance or MongoDB Atlas cluster)
-   Gemini API Key (or alternative LLM API key)

### 1. Environment Variables

Create `.env` files in both `client/` and `server/` directories based on the provided `.env.example` files.

**Backend (`server/.env`)**
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/journal_system
LLM_API_KEY=your_gemini_api_key
# Optional Model Customization
LLM_MODEL=gemini-2.5-flash
```

**Frontend (`client/.env`)**
```env
# Backend base URL (recommended: no `/api` suffix)
VITE_API_URL=http://localhost:5000

# Notes:
# - The frontend will call `${VITE_API_URL}/api/...`.
# - If you set `VITE_API_URL` including `/api` (e.g. `http://localhost:5000/api`), it will still work.
```

### 2. Backend Setup
```bash
cd server
npm install
npm run dev
```
The server will start on `http://localhost:5000`.

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```
The client will start on `http://localhost:5173` (default Vite port).

## Deployment Notes (Vercel)

- This repo is split into `client/` (Vite static frontend) and `server/` (Express API). Vercel will not run an always-on Express server from `server/src/server.js` as part of the frontend deploy.
- Deploy the backend separately (Render/Railway/Fly.io/any Node host), then set `VITE_API_URL` in your Vercel frontend project to that backend’s base URL and redeploy.
- If you deploy both under the same domain via a proxy/rewrite, you can omit `VITE_API_URL` and the frontend will call `/api/...` on the same origin.

## API Endpoints

### `POST /api/journal`
Creates a new journal entry.
**Request Body**:
```json
{
  "userId": "user123",
  "ambience": "forest",
  "text": "I felt very peaceful walking through the trees today."
}
```

### `GET /api/journal/:userId`
Fetches all journal entries for a user, sorted by newest first.

### `POST /api/journal/analyze`
Analyzes raw text using the LLM.
**Request Body**:
```json
{
  "text": "I felt very peaceful walking through the trees today."
}
```
**Response**:
```json
{
  "emotion": "peaceful",
  "keywords": ["trees", "walking", "nature"],
  "summary": "The user experienced tranquility during a forest walk."
}
```

### `PATCH /api/journal/:id/analyze`
Analyzes a specific stored journal entry and saves the results to the database. Caches results to avoid duplicate LLM calls if the text is unchanged.

### `GET /api/journal/insights/:userId`
Retrieves aggregated insights for a user based on their analyzed journal entries.
**Response**:
```json
{
  "totalEntries": 5,
  "topEmotion": "peaceful",
  "mostUsedAmbience": "forest",
  "recentKeywords": ["trees", "calm", "rain"]
}
```

## LLM Provider Note
This project integrates with a generic LLM service, defaulting to a schema-enforced prompt that requires a strict JSON response. You can configure which provider to use by implementing the `LlmService`. A default `fetch` implementation against Google's Gemini API is a good low-barrier approach.

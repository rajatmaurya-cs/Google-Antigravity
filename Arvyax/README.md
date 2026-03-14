# 🌿 AI-Assisted Journal System

A full-stack MERN application that helps users journal about nature experiences and receive AI-powered emotional analysis of their entries using Groq.

![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 🎯 Features

### Core Features
- ✅ **Journal Entry Management** - Create, read, and delete journal entries
- ✅ **Emotion Analysis** - AI-powered emotional analysis using Groq
- ✅ **User Insights** - View insights about your emotional patterns and favorite ambiences
- ✅ **Multiple Ambiences** - Log entries from forest, ocean, or mountain environments
- ✅ **Real-time UI** - Instant updates and responsive interface

### Technical Features
- ✅ RESTful API with proper error handling
- ✅ Rate limiting for API protection
- ✅ CORS enabled for cross-origin requests
- ✅ MongoDB with Mongoose validation
- ✅ React hooks and functional components only
- ✅ Clean, interview-quality code
- ✅ Responsive design for all devices
- ✅ Real LLM integration (not mock data)

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Axios** - HTTP client
- **Modern CSS** - Responsive styling

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **Groq** - LLM for emotion analysis

### Infrastructure
- **Environment Variables** - Secure configuration
- **Rate Limiting** - express-rate-limit
- **CORS** - Cross-origin resource sharing

---

## 📁 Project Structure

```
copilot_/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── JournalForm.jsx       # Create new entry
│   │   │   ├── EntriesList.jsx       # Display entries
│   │   │   ├── AnalyzeSection.jsx    # Text analysis tool
│   │   │   └── InsightsSection.jsx   # User insights
│   │   ├── services/
│   │   │   └── api.js                # API client
│   │   ├── styles/
│   │   │   └── App.css               # Global styles
│   │   ├── App.jsx                   # Main app component
│   │   └── index.js                  # Entry point
│   ├── public/
│   │   └── index.html                # HTML template
│   └── package.json
│
├── server/
│   ├── config/
│   │   └── database.js               # DB connection
│   ├── controllers/
│   │   └── journalController.js      # Business logic
│   ├── models/
│   │   └── Journal.js                # Database schema
│   ├── routes/
│   │   └── journal.js                # API routes
│   ├── middleware/
│   │   ├── errorHandler.js           # Error handling
│   │   └── rateLimiter.js            # Rate limiting
│   ├── .env                          # Environment variables
│   ├── server.js                     # Server entry
│   ├── app.js                        # Express setup
│   └── package.json
│
├── .gitignore
├── README.md                          # This file
└── ARCHITECTURE.md                    # Architecture docs
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v14+ and npm
- MongoDB (local or Atlas)
- Groq API key

### Installation

#### 1. Clone the Repository
```bash
cd copilot_
```

#### 2. Get API Key
1. Visit [Groq Console](https://console.groq.com/keys)
2. Create an API key
3. Copy the key

#### 3. Set Up Backend

```bash
cd server

# Install dependencies
npm install

# Create .env file
cp .env .env.local

# Edit .env.local with your values
# MONGODB_URI=mongodb://localhost:27017/ai-journal
# PORT=5000
# GROQ_API_KEY=your_api_key_here
# GROQ_MODEL=llama-3.1-8b-instant
# CORS_ORIGIN=http://localhost:3000

# Start server
npm start
```

Server runs at: `http://localhost:5000`

#### 4. Set Up Frontend

```bash
cd client

# Install dependencies
npm install

# Create .env file (optional)
# VITE_API_URL=http://localhost:5000/api

# Start development server
npm start
```

Frontend runs at: `http://localhost:3000`

---

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Journal Endpoints

#### Create Journal Entry
```http
POST /journal
Content-Type: application/json

{
  "userId": "user123",
  "ambience": "forest",
  "text": "I felt calm today after listening to the rain."
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Journal entry created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "userId": "user123",
    "ambience": "forest",
    "text": "I felt calm today...",
    "createdAt": "2024-03-15T10:30:00Z"
  }
}
```

#### Get User's Entries
```http
GET /journal/:userId
```

**Response (200):**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "userId": "user123",
      "ambience": "forest",
      "text": "..."
    }
  ]
}
```

#### Get Single Entry
```http
GET /journal/entries/:id
```

#### Delete Entry
```http
DELETE /journal/:id
```

---

### Analysis Endpoints

#### Analyze Text for Emotions
```http
POST /journal/analyze
Content-Type: application/json

{
  "text": "I felt calm today after listening to the rain",
  "journalId": "507f1f77bcf86cd799439011"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Analysis completed successfully",
  "data": {
    "emotion": "calm",
    "keywords": ["rain", "nature", "peace"],
    "summary": "User experienced relaxation during nature exposure"
  }
}
```

**Rate Limit:** 10 requests per minute per IP

---

### Insights Endpoints

#### Get User Insights
```http
GET /journal/insights/:userId
```

**Response (200):**
```json
{
  "success": true,
  "message": "Insights retrieved successfully",
  "data": {
    "totalEntries": 8,
    "topEmotion": "calm",
    "mostUsedAmbience": "forest",
    "recentKeywords": ["focus", "nature", "rain"],
    "emotionBreakdown": {
      "calm": 5,
      "peaceful": 2,
      "joyful": 1
    },
    "ambienceBreakdown": {
      "forest": 5,
      "ocean": 2,
      "mountain": 1
    }
  }
}
```

---

## 🔑 Environment Variables

### Backend (.env)
```env
# MongoDB connection
MONGODB_URI=mongodb://localhost:27017/ai-journal

# Server configuration
PORT=5000
NODE_ENV=development

# LLM API key (Get from https://console.groq.com/keys)
GROQ_API_KEY=your_api_key_here

# Optional: model override
GROQ_MODEL=llama-3.1-8b-instant

# CORS origin
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env, optional)
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 💡 LLM Integration Details

### Provider: Groq

**Why Groq:**
- ✅ Fast responses
- ✅ Simple API
- ✅ Good JSON-mode support

**Model Used:** `llama-3.1-8b-instant` (default)
- Optimized for speed and efficiency
- Good for real-time apps

**Prompt Engineering:**
```
Analyze the following journal entry and provide emotions,
keywords, and a brief summary in JSON format ONLY.

Return ONLY valid JSON:
{
  "emotion": "single primary emotion word",
  "keywords": ["array", "of", "keywords"],
  "summary": "One concise sentence"
}
```

---

## 🧪 Testing the Application

### 1. Start Both Servers
```bash
# Terminal 1: Start backend
cd server && npm start

# Terminal 2: Start frontend
cd client && npm start
```

### 2. Use the Application

1. Enter User ID: `testuser123`
2. Select Ambience: Forest/Ocean/Mountain
3. Write a journal entry
4. Click "Save Entry"
5. View your entry in the list
6. Click "Analyze" to see emotion analysis
7. Go to "Insights" section to see your patterns

### 3. Example Entries to Test

**Forest Entry:**
```
I spent the morning walking through the forest near my home.
The sound of birds chirping and the fresh smell of pine trees
made me feel incredibly peaceful and grounded. I felt my anxiety
slowly fade away as I walked deeper into nature.
```
Expected emotion: calm, peaceful

**Ocean Entry:**
```
The ocean waves were crashing powerfully against the shore.
I felt exhilarated and alive, jumping in the water and swimming.
The vastness of the ocean made me feel so small yet so connected
to something greater.
```
Expected emotion: excited, joyful

---

## 📊 Database

### MongoDB Connection

**Local MongoDB:**
```bash
# Install MongoDB Community Edition
# Then start MongoDB service

# Connection string:
MONGODB_URI=mongodb://localhost:27017/ai-journal
```

**MongoDB Atlas (Cloud):**
```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/ai-journal?retryWrites=true&w=majority
```

### Collections

**Journal Collection:**
- Stores all user journal entries
- Indexed by userId for fast queries
- Includes analysis results (emotion, keywords, summary)

---

## 🔒 Security Features

- ✅ Input validation on all endpoints
- ✅ Rate limiting (100 req/15min global, 10 req/1min for analysis)
- ✅ CORS protection with configurable origins
- ✅ Environment variables for sensitive data
- ✅ Error handling without exposing system details
- ✅ Mongoose schema validation

---

## 📈 Performance Features

- ✅ Database indexing on userId for O(1) lookups
- ✅ Non-blocking async/await operations
- ✅ Efficient React component rendering
- ✅ CSS optimization with modern features
- ✅ Gzip compression ready (Express built-in)

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED
```
**Solution:** Make sure MongoDB is running
```bash
# macOS with Homebrew
brew services start mongodb-community

# Or manually start MongoDB service
```

### Vercel + MongoDB Atlas: buffering timed out
If you see an error like:
`Operation \`journals.find()\` buffering timed out after 10000ms`

**Checklist:**
1. Set `MONGODB_URI` in your Vercel Project Environment Variables (Production + Preview).
2. In MongoDB Atlas, allow your deployment to connect (Network Access). Vercel does not have a fixed outbound IP, so the simplest option is temporarily allowing `0.0.0.0/0` while testing.
3. Note: Atlas won’t show a database/collection until the first successful write (a `find()` alone won’t create it).

### GROQ_API_KEY not working
```
Error: 400 Bad Request
```
**Solution:**
1. Get a fresh API key from [Groq Console](https://console.groq.com/keys)
2. Make sure the key is in your .env file
3. Restart the backend server

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:** Update CORS_ORIGIN in .env to match your client URL

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Kill the process or use different port
```bash
# macOS/Linux
lsof -i :5000
kill -9 <PID>

# Or change PORT in .env
```

---

## 📦 Deployment

### Quick Deploy

**Backend (Render, Railway, Heroku):**
1. Push code to GitHub
2. Connect repository to platform
3. Set environment variables
4. Deploy

**Frontend (Vercel, Netlify):**
1. Push code to GitHub
2. Connect repository to platform
3. Set VITE_API_URL to production backend
4. Deploy

---

## 🎓 Learning Resources

- [Express.js Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [React Docs](https://react.dev/)
- [Groq Docs](https://console.groq.com/docs)
- [MERN Stack Tutorial](https://www.mongodb.com/mern-stack)

---

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the MIT License.

---

## 🚀 Future Improvements

- [ ] User authentication with JWT
- [ ] Dark mode theme
- [ ] PDF export for journal entries
- [ ] Mobile app with React Native
- [ ] Advanced analytics dashboard
- [ ] Community features (sharing, following)
- [ ] Voice journaling with transcription
- [ ] Scheduled reminders
- [ ] Multiple language support
- [ ] Streaming LLM responses

---

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

## ✨ Acknowledgments

- Groq for LLM access
- MongoDB for flexible database
- React for powerful UI framework
- Express.js for simple backend

---

**Happy Journaling! 🌿📝**

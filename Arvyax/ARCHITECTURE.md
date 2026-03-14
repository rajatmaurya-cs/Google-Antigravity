# AI-Assisted Journal System - Architecture Documentation

## Overview

The AI-Assisted Journal System is a full-stack MERN application designed to help users journal about nature experiences (forest, ocean, mountain) and receive AI-powered emotional analysis of their entries.

**Tech Stack:**
- **Frontend:** React 18 with JavaScript/JSX, Axios for API calls
- **Backend:** Node.js with Express.js, ES6 modules
- **Database:** MongoDB with Mongoose ODM
- **LLM Integration:** Google Generative AI (Gemini)
- **Middleware:** CORS, Rate Limiting

---

## Current Architecture

### Backend Structure

```
server/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   └── journalController.js # Business logic for journal operations
├── models/
│   └── Journal.js           # Mongoose schema
├── routes/
│   └── journal.js           # API route definitions
├── middleware/
│   ├── errorHandler.js      # Error handling & async wrapper
│   └── rateLimiter.js       # Rate limiting for API
├── app.js                   # Express app setup
├── server.js                # Server entry point
├── package.json
└── .env                     # Environment variables
```

### Frontend Structure

```
client/
├── src/
│   ├── components/
│   │   ├── JournalForm.jsx       # Create new entry
│   │   ├── EntriesList.jsx       # Display all entries
│   │   ├── AnalyzeSection.jsx    # Quick analysis tool
│   │   └── InsightsSection.jsx   # User insights dashboard
│   ├── services/
│   │   └── api.js                # API client wrapper
│   ├── styles/
│   │   └── App.css               # Global styling
│   ├── App.jsx                   # Main App component
│   ├── index.js                  # React entry point
│   └── index.html
├── public/
│   └── index.html                # HTML template
└── package.json
```

---

## Database Schema

### Journal Model

```javascript
{
  userId: String (indexed),           // User identifier
  ambience: String (enum),            // 'forest', 'ocean', 'mountain'
  text: String,                       // Journal entry content
  emotion: String,                    // Primary emotion from LLM
  keywords: [String],                 // Key terms extracted by LLM
  summary: String,                    // One-sentence summary from LLM
  analyzed: Boolean,                  // Flag for analysis status
  createdAt: Date,                    // Automatic timestamp
  updatedAt: Date                     // Automatic timestamp
}
```

---

## API Endpoints

### Journal Management

**POST `/api/journal`**
- Create a new journal entry
- Body: `{ userId, ambience, text }`
- Response: Created journal document

**GET `/api/journal/:userId`**
- Fetch all entries for a user
- Returns: Array of journal documents sorted by date (newest first)

**GET `/api/journal/entries/:id`**
- Fetch a single journal entry
- Returns: Journal document

**DELETE `/api/journal/:id`**
- Delete a journal entry
- Returns: Success message

### Emotion Analysis

**POST `/api/journal/analyze`**
- Analyze text for emotions using Google Gemini
- Body: `{ text, journalId? }`
- Response: `{ emotion, keywords[], summary }`
- Uses prompt engineering to force structured JSON output
- 10 requests per minute rate limit

### Insights

**GET `/api/journal/insights/:userId`**
- Generate user insights from all entries
- Returns: `{ totalEntries, topEmotion, mostUsedAmbience, recentKeywords, emotionBreakdown }`

---

## LLM Integration Details

### Provider: Google Generative AI (Gemini)

**Package:** `@google/generative-ai`

**Pricing:** Free tier available (60 requests/min)

**Model Used:** `gemini-1.5-flash` (fast and efficient)

**Prompt Engineering:**
```
Analyze emotion and return JSON ONLY:
{
  "emotion": "primary emotion (single word)",
  "keywords": ["array", "of", "keywords"],
  "summary": "One concise sentence"
}
```

**Why This Approach:**
1. Free models available (no payment required for small usage)
2. Reliable JSON parsing with structured prompts
3. Fast response times suitable for real-time analysis
4. Generous free tier (excellent for projects)

---

## Scaling Strategies

### 1. **Scaling to 100k Users**

**Database Optimization:**
- Add index on `userId` field (already implemented)
- Partition data by userId for faster queries
- Implement caching layer (Redis) for frequently accessed insights
- Add database read replicas for read-heavy workloads

**Backend Optimization:**
- Implement job queue (Bull/BullMQ) for background analysis tasks
- Use clustering (Node.js cluster module) for multi-core utilization
- Load balancing with Nginx or HAProxy
- Horizontal scaling with multiple server instances

**Frontend Optimization:**
- Implement pagination/infinite scroll for entries list
- Virtual scrolling for large lists
- Code splitting and lazy loading
- Service Worker for offline support

**Infrastructure:**
```
Load Balancer
├── API Server 1
├── API Server 2
├── API Server 3
└── Background Job Worker

MongoDB
├── Primary (writes)
├── Secondary Replica 1
└── Secondary Replica 2

Cache Layer (Redis)
└── Session & Query cache
```

### 2. **Reducing LLM Costs**

**Current Approach (Cost-Free):**
- Using Google's free Gemini tier (sufficient for MVP)

**Cost Reduction Strategies:**
1. **Caching Analysis Results:**
   ```javascript
   // Cache identical text analysis
   const cacheKey = hashText(text);
   const cached = await redis.get(cacheKey);
   if (cached) return cached;
   // If not cached, call LLM and save result
   ```

2. **Batch Processing:**
   - Queue analysis requests
   - Batch multiple analysis requests in single API call
   - Run during off-peak hours

3. **Alternative Models:**
   - Hugging Face free endpoints
   - Open-source models (Llama 2, Mistral)
   - Local models for on-device analysis

4. **Sampling Strategy:**
   - Analyze only 10% of entries
   - Use heuristics for obvious emotions
   - Only analyze new content, not edits

### 3. **Caching Strategy**

**Multi-Level Caching:**
```
Request → App Memory Cache (fast)
       → Redis Cache (distributed)
       → Database Query (slow)
```

**Implementation:**
```javascript
// Cache analysis results for 24 hours
await redis.setex(
  `analysis:${textHash}`,
  86400,
  JSON.stringify(analysis)
);

// Cache user insights for 1 hour
await redis.setex(
  `insights:${userId}`,
  3600,
  JSON.stringify(insights)
);
```

**Cache Invalidation:**
- On new entry creation
- On entry deletion
- On manual refresh button click

---

## Data Security & Privacy

### 1. **Sensitive Data Protection**

**Current Measures:**
- Environment variables for API keys (.env not in git)
- CORS enabled only for allowed origins
- MongoDB restricted to authenticated connections

**Recommended Additions:**
```javascript
// Encrypt journal text at rest
const encrypted = encrypt(text, encryptionKey);
await Journal.create({ ...data, text: encrypted });

// Hash user IDs for additional privacy
const hashedUserId = hashUserId(userId);

// Implement role-based access control (RBAC)
// Users can only access their own journals

// Add authentication/authorization
app.use(requireAuth);
```

### 2. **Data Privacy Compliance**

**GDPR Compliance:**
- Add "Right to be forgotten" - implement soft delete
- Data export functionality for users
- Privacy policy documentation

**Implementation:**
```javascript
// Soft delete
Journal.updateOne(
  { _id: id },
  { deletedAt: new Date() }
);

// Hard delete after 30 days
// Export user data
const userData = await Journal.find({ userId });
```

### 3. **API Security**

**Current Implementation:**
- Rate limiting (100 req/15min globally, 10 req/1min for analysis)
- Input validation on all endpoints
- CORS protection

**Additional Measures:**
```javascript
// Add request validation
import joi from 'joi';
const schema = joi.object({
  text: joi.string().max(5000).required(),
  ambience: joi.string().valid('forest', 'ocean', 'mountain')
});

// Add request signing for sensitive operations
// Implement HTTPS only
// Add helmet.js for security headers
```

---

## Performance Optimization

### Current Optimizations:
1. ✅ Database indexing on userId
2. ✅ Rate limiting to prevent abuse
3. ✅ Async/await for non-blocking operations
4. ✅ Pagination ready (can be added to routes)
5. ✅ CSS optimized with modern features
6. ✅ React component memoization ready

### Recommended Optimizations:
1. **Image Optimization:** Compress ambience images if added
2. **Query Optimization:** Use MongoDB aggregation pipeline for insights
3. **Connection Pooling:** Configure MongoDB connection pool size
4. **CDN:** Serve static assets from CDN
5. **Compression:** Enable gzip compression in Express

---

## Monitoring & Logging

**Recommended Stack:**
```javascript
// Logging
import winston from 'winston';
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Monitoring
import sentry from '@sentry/node';
sentry.init({ dsn: process.env.SENTRY_DSN });

// Performance monitoring
import newrelic from 'newrelic';
```

---

## Deployment

### Docker Setup (Bonus)
```dockerfile
# Backend Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]

# Docker Compose
version: '3.8'
services:
  server:
    build: ./server
    ports:
      - "5000:5000"
    env_file: .env
    depends_on:
      - mongodb
  client:
    build: ./client
    ports:
      - "3000:3000"
  mongodb:
    image: mongo:6
    environment:
      MONGODB_INITDB_ROOT_USERNAME: root
      MONGODB_INITDB_ROOT_PASSWORD: password
    ports:
      - "27017:27017"
```

### Deployment Platforms
- **Backend:** Heroku, Railway, Render, AWS EC2
- **Frontend:** Vercel, Netlify
- **Database:** MongoDB Atlas (free tier available)

---

## Future Improvements

1. **User Authentication:** JWT-based auth with registration
2. **Social Features:** Share entries, follow users, community insights
3. **Mobile App:** React Native or Flutter version
4. **Advanced Analytics:** Mood trends, correlation with ambience
5. **Streaming Responses:** Real-time emotion analysis updates
6. **Video/Audio:** Journal entries with voice transcription
7. **Notifications:** Daily journaling reminders
8. **Dark Mode:** Theme switching
9. **Export Features:** PDF reports, CSV data export
10. **Payments:** Premium features, subscription model

---

## Conclusion

The current architecture balances simplicity with scalability. The modular structure allows for easy additions of caching, authentication, and monitoring features as the user base grows. The use of Google's free Gemini API ensures zero infrastructure costs initially, with clear pathways to upgrade or switch providers as needed.

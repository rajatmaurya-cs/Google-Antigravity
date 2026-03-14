# Architecture & Technical Strategies

This document answers core architectural considerations for the AI-Assisted Journal System, specifically covering scale, cost, caching, and data privacy.

## 1. How would you scale this to 100k users?

Scaling the system to support 100,000 active users requires addressing both the backend API layer and the database layer:

*   **Database Scaling (MongoDB)**:
    *   **Indexing**: Ensure proper indexes exist on high-frequency query fields, particularly `userId` and `createdAt` on the `Journal` collection to optimize read operations for the `GET /api/journal/:userId` endpoint.
    *   **Horizontal Scaling (Sharding)**: If the dataset grows massively, we can shard the MongoDB cluster using `userId` as the shard key since most queries are isolated to a single user.
*   **Backend Scaling (Node.js)**:
    *   **Stateless Architecture**: By keeping the Node.js/Express server stateless and handling session management (if any) via JWTs or a Redis store, we can effortlessly scale out the backend utilizing a load balancer (e.g., AWS ALB, Nginx) across multiple instances or containers.
    *   **Asynchronous Processing**: LLM calls can be synchronous bottlenecks. For massive scale, analyzing entries shouldn't block the main HTTP thread unnecessarily. We should decouple the `/analyze` operations by placing them onto a message queue (e.g., RabbitMQ or AWS SQS). A worker service would pick up entries, call the LLM, and update the database, returning a fast "Accepted (202)" response to the client or pushing updates via WebSockets when the analysis is ready.

## 2. How would you reduce LLM cost?

LLM API calls are usually billed per token or per request. To reduce costs:

*   **Batching**: If users are generating multiple entries or if we need to run nightly aggregations, batching texts into a single, structured prompt can reduce overhead tokens and potentially lower costs depending on the pricing model of the LLM provider.
*   **Prompt Optimization & Enforcement**: A tightly constrained prompt that demands a tiny, strict JSON schema avoids verbose LLM outputs, directly reducing "output token" costs.
*   **Choosing the Right Model**: Not all analyses need the "pro" or most expensive tier. A smaller, faster model (e.g., Gemini-Flash, GPT-4o-mini, Claude 3 Haiku) is usually more than capable of extracting basic emotion/keywords/summaries at a fraction of the cost.
*   **Aggressive Caching**: (See Section 3).

## 3. How would you cache repeated analysis?

Caching is the primary mechanism to avoid paying for identical LLM analyses.

*   **Hashing the Input**: When a text snippet is received for analysis, we normalize it (trim, lower-case, remove extra spaces) and compute a fast cryptographic hash (like SHA-256).
*   **Cache Storage Layer**:
    *   **InMemory/Redis**: For frequently repeated "demo" queries across the platform, a fast key-value store like Redis is ideal. The key would be the text hash (`hash:e3b0c442...`), and the value the JSON analysis result.
    *   **Database (Persistent Cache)**: If Redis is unavailable, we can store a `HashCache` document directly in MongoDB. Since LLM responses are relatively static for identical text, storing them indefinitely (or with a long TTL) is highly effective.
*   **Workflow**:
    1.  Receive `text`.
    2.  Normalize and hash `text` -> `hash123`.
    3.  Check Cache/DB for `hash123`.
    4.  If hit -> Return cached JSON response instantly.
    5.  If miss -> Call LLM -> Save output to Cache/DB under `hash123` -> Return output.

## 4. How would you protect sensitive journal data?

Journal entries are highly personal and sensitive PI/PHI data.

*   **Encryption at Rest**: The database (MongoDB) must use Transparent Data Encryption (TDE) so files on disk cannot be read by an attacker.
*   **Encryption in Transit**: All API traffic must exclusively use HTTPS/TLS 1.2+.
*   **Application-Layer Encryption (Optional but Recommended)**: To ensure absolute privacy (even against database administrators), we can encrypt the `text` field within the Node.js layer using a symmetric key (like AES-256-GCM) before saving it to MongoDB. We only decrypt it when returning the entry to the specific, authorized `userId`.
*   **LLM Privacy Policies**: We must ensure we are using an enterprise/API tier of an LLM provider that explicitly guarantees they do **not** train on our API text inputs (e.g., standard Gemini/OpenAI API policies generally do not train on API inputs, unlike consumer web interface data).
*   **Data Minimization**: In a production setting, we should strip PII (Personally Identifiable Information) before sending the raw text to the external LLM provider.

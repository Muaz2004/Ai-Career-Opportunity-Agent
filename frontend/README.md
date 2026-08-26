# AI Career Intelligence Agent — Frontend

React frontend for the **AI Career Intelligence Agent**, an AI-powered system that helps developers understand technology trends and decide what to learn and build next.

The frontend communicates with the FastAPI backend and presents career intelligence results through a clean web interface.

---

##  Tech Stack

* **React**
* **Vite**
* **JavaScript**
* **CSS**
* **REST API**
* **FastAPI Backend**

---

## Architecture

```text
React Frontend
      │
      │ HTTP Requests
      ▼
FastAPI Backend
      │
      ▼
LangGraph
      │
 ┌────┴────┐
 ▼         ▼
RAG      AI Agents
 │         │
 ▼         ▼
ChromaDB  LLM
```

---

##  Main Features

The frontend will provide interfaces for:

* 🔍 Asking career and technology questions
* 📊 Viewing current GitHub technology trends
* 🧠 Receiving AI-generated career insights
* 🚀 Getting project recommendations
* 📚 Discovering skills to learn
* 🗺️ Viewing recommended learning roadmaps

---

##  Project Structure

```text
frontend/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
│
├── public/
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Installation

From the `frontend` directory:

```bash
npm install
```

---

## Development

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

## 🔗 Backend Connection

The frontend communicates with the FastAPI backend.

Current backend endpoints include:

```text
GET  /
GET  /health
GET  /trending
POST /ingest
POST /ask
```

Example request:

```json
{
  "query": "What should I learn to become an AI engineer?"
}
```

The backend processes the request through the AI Career Intelligence pipeline and returns the generated recommendation.

---

##  User Flow

```text
User
 │
 ▼
Ask Career Question
 │
 ▼
React Frontend
 │
 ▼
FastAPI API
 │
 ▼
Intent Filter
 │
 ▼
LangGraph
 │
 ├── Retrieval
 ├── Analysis
 ├── Strategy
 └── Output
 │
 ▼
AI Career Recommendation
 │
 ▼
React UI
```

---

##  Development Roadmap

### Current

* [x] React + Vite setup
* [x] Backend API available
* [ ] Connect frontend to `/ask`
* [ ] Build career query interface
* [ ] Display AI recommendations
* [ ] Display GitHub trends

### Future

* [ ] Career dashboard
* [ ] Skill ranking visualization
* [ ] Project recommendation cards
* [ ] Learning roadmap visualization
* [ ] Personalized career profiles
* [ ] Authentication
* [ ] Saved recommendations
* [ ] Responsive mobile design

---

## Project Goal

The frontend is designed to turn the AI Career Intelligence Agent from a backend API into a usable product.

The final application will help developers answer:

> **What should I learn next?**

> **What should I build next?**

> **Which technologies should I prioritize?**

using real technology signals and AI-powered analysis.

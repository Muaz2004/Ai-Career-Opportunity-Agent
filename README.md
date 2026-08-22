# AI Career Intelligence Agent

An AI-powered career intelligence system that analyzes technology trends, GitHub data, job-related signals, and curated knowledge to help developers decide **what to learn, what to build, and what to focus on next**.

The project combines **FastAPI, LangChain, LangGraph, RAG, ChromaDB, embeddings, and real GitHub API data** to create a decision-oriented AI system rather than a simple chatbot.

---

## Project Goal

Technology changes quickly. Developers often struggle to answer questions such as:

* What technologies are becoming important?
* What skills should I learn next?
* What projects should I build for my portfolio?
* Which technologies appear repeatedly in current projects?
* What should I prioritize for an AI/software engineering career?

The AI Career Intelligence Agent analyzes available technology signals and transforms them into actionable career recommendations.

### Example

**User:**

> What should I learn based on current GitHub trends?

**Agent:**

>  Trending skills: Python, TypeScript, AI agents
>  Recommended project: Build a tool-using AI agent
>  Priority: Learn RAG, LangGraph, API integration, and vector databases

---

#  Architecture

```text
                    ┌──────────────────┐
                    │      User        │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │     FastAPI      │
                    │      API         │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │  Intent Filter   │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │    LangGraph     │
                    │     Workflow     │
                    └────────┬─────────┘
                             │
             ┌───────────────┼───────────────┐
             ▼               ▼               ▼
       ┌──────────┐    ┌──────────┐    ┌──────────┐
       │Retrieval │ →  │ Analysis │ →  │ Strategy │
       │  Agent   │    │  Agent   │    │  Agent   │
       └──────────┘    └──────────┘    └──────────┘
                                              │
                                              ▼
                                      ┌──────────────┐
                                      │ Output Agent │
                                      └──────────────┘
```

---

#  Core Technologies

| Technology                  | Purpose                             |
| --------------------------- | ----------------------------------- |
| **Python**                  | Main programming language           |
| **FastAPI**                 | Backend REST API                    |
| **LangChain**               | LLM and RAG integration             |
| **LangGraph**               | Agent workflow orchestration        |
| **ChromaDB**                | Vector database                     |
| **Hugging Face Embeddings** | Local semantic embeddings           |
| **Groq**                    | LLM inference                       |
| **GitHub API**              | Real-time GitHub technology signals |
| **Pydantic**                | API request validation              |
| **Uvicorn**                 | ASGI server                         |

---

#  Project Structure

```text
ai-career-agent/
│
├── agents/
│   ├── graph.py
│   └── intent.py
│
├── data/
│   └── knowledge/
│       ├── ai_trends.json
│       ├── skills.json
│       └── project_ideas.json
│
├── rag/
│   ├── embeddings.py
│   ├── llm_client.py
│   ├── retriever.py
│   └── vector_store.py
│
├── tools/
│   └── github_api.py
│
├── chroma_db/
│
├── main.py
├── test_graph.py
├── requirements.txt
├── .env
└── README.md
```

---

#  System Components

## 1. GitHub Data Layer

The system uses the GitHub API to collect recent repository signals such as:

* Repository name
* Stars
* Programming language
* Description
* Repository URL

The collected information becomes part of the system's technology intelligence.

---

## 2. Knowledge Base

The project contains curated knowledge in JSON format:

```text
data/knowledge/
├── ai_trends.json
├── skills.json
└── project_ideas.json
```

These datasets provide additional context about:

* AI trends
* Technical skills
* Career skills
* Project ideas
* Learning paths
* Technologies

This allows the system to combine live technology signals with structured knowledge.

---

#  RAG Pipeline

The Retrieval-Augmented Generation system works approximately like this:

```text
Raw Data
   ↓
Document Formatting
   ↓
Embeddings
   ↓
ChromaDB
   ↓
Similarity Search
   ↓
Relevant Context
   ↓
LLM
```

GitHub repository information is converted into LangChain `Document` objects.

The documents are embedded using:

```text
sentence-transformers/all-MiniLM-L6-v2
```

and stored in ChromaDB.

When a user asks a question, the system retrieves the most relevant documents before generating a response.

---

# 🤖 LangGraph Agent Workflow

The current workflow is:

```text
User Query
    ↓
Intent Filter
    ↓
Retrieval Agent
    ↓
Analysis Agent
    ↓
Strategy Agent
    ↓
Output Agent
    ↓
Final Recommendation
```

### Retrieval Agent

Retrieves relevant information from the vector database.

### Analysis Agent

Analyzes the retrieved context and identifies:

* Trending technologies
* Repeated technologies
* Programming languages
* Patterns
* Demand signals

### Strategy Agent

Transforms the analysis into actionable recommendations:

* What to learn
* What to build
* What to prioritize
* Suggested roadmap

### Output Agent

Produces a clean career intelligence report.

---

#  Intent Filtering

The system is designed specifically for technology and career-related questions.

For example:

```text
"What should I learn to become an AI engineer?"
```

is accepted.

While:

```text
"Who are the top 3 football players?"
```

is rejected because it is outside the system's domain.

This prevents unrelated questions from unnecessarily triggering the RAG and agent pipeline.

---

#  API Endpoints

## `GET /`

Checks whether the application is running.

Example response:

```json
{
  "message": "AI Career Agent is running"
}
```

---

## `GET /health`

Health check endpoint.

```json
{
  "status": "ok"
}
```

---

## `GET /trending`

Fetches current GitHub repository signals.

Example:

```json
{
  "trending_repositories": []
}
```

---

## `POST /ingest`

Fetches GitHub data, converts it into documents, and stores the embeddings in ChromaDB.

Example response:

```json
{
  "message": "Data ingested successfully",
  "documents_added": 5
}
```

---

## `POST /ask`

Runs the LangGraph career intelligence workflow.

Request:

```json
{
  "query": "What should I learn based on current GitHub trends?"
}
```

The request passes through:

```text
Intent
→ Retrieval
→ Analysis
→ Strategy
→ Output
```

---

#  Installation

Clone the repository:

```bash
git clone <your-repository-url>
cd ai-career-agent
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

#  Environment Variables

Create a `.env` file:

```env
GROQ_API_KEY=your_groq_api_key
```

The `.env` file should **never be committed to GitHub**.

Add it to `.gitignore`:

```text
.env
venv/
__pycache__/
chroma_db/
```

---

#  Running the Application

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

Open Swagger:

```text
http://127.0.0.1:8000/docs
```

Recommended testing order:

```text
1. GET /health
2. GET /trending
3. POST /ingest
4. POST /ask
```

---

#  Example Questions

### Career

```text
What should I learn to become an AI engineer?
```

### Technology Trends

```text
What technologies are appearing repeatedly in current GitHub projects?
```

### Projects

```text
What project should I build based on current AI trends?
```

### Learning Path

```text
Give me a roadmap for becoming an AI engineer.
```

---

#  Design Philosophy

This project follows an important principle:

> **Build a working system first, then make the intelligence better.**

The project intentionally separates:

```text
Data
 ↓
Retrieval
 ↓
Analysis
 ↓
Decision
 ↓
Response
```

This makes each part independently testable and allows future improvements without rebuilding the entire system.

---

#  Roadmap

## Phase 1 — Foundation

* [x] FastAPI backend
* [x] GitHub API integration
* [x] Basic API endpoints
* [x] Project structure

## Phase 2 — RAG

* [x] Embedding generation
* [x] ChromaDB integration
* [x] Document retrieval
* [x] GitHub data ingestion
* [ ] Knowledge-base ingestion

## Phase 3 — AI Response

* [x] LLM integration
* [x] Context-based generation
* [x] RAG-powered responses

## Phase 4 — Agent System

* [x] LangGraph workflow
* [x] Retrieval Agent
* [x] Analysis Agent
* [x] Strategy Agent
* [x] Output Agent
* [x] Intent filtering

## Phase 5 — Intelligence

* [ ] Skill scoring
* [ ] Demand ranking
* [ ] Trend weighting
* [ ] Recency weighting
* [ ] Job-market dataset integration
* [ ] Improved recommendation engine

## Phase 6 — Product

* [ ] `/recommend` endpoint
* [ ] `/trends` endpoint
* [ ] Frontend dashboard
* [ ] User profiles
* [ ] Personalized recommendations
* [ ] Visualization of technology trends

## Phase 7 — Deployment

* [ ] Production configuration
* [ ] Cloud deployment
* [ ] Public API
* [ ] Monitoring
* [ ] Production documentation

---

# 🎯 Long-Term Vision

The final system will combine multiple signals:

```text
             GitHub
                │
                ▼
          ┌─────────────┐
          │             │
Jobs ───► │ AI Career   │ ◄── Knowledge Base
          │ Intelligence│
          │   Engine    │
          └──────┬──────┘
                 │
                 ▼
       Personalized Strategy
                 │
        ┌────────┼────────┐
        ▼        ▼        ▼
      Learn    Build    Avoid
```

Instead of simply answering questions, the system aims to help developers make better career decisions based on **evidence and technology signals**.

---



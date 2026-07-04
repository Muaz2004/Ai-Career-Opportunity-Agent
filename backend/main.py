"""
main.py
FastAPI backend for AI Career Agent (WITH CHAT SUPPORT SAFE VERSION)
"""

import os
from fastapi import FastAPI, Depends
from pydantic import BaseModel
from dotenv import load_dotenv
from sqlalchemy.orm import Session

from fastapi.middleware.cors import CORSMiddleware

from tools.github_api import get_trending_repos
from rag.vector_store import VectorStore
from rag.llm_client import LLMClient
from rag.embeddings import prepare_documents
from agents.graph import build_graph
from agents.intent import is_career_related
from rag.job_ingestion import ingest_jobs
from agents.recommendation_agent import generate_recommendation

from app.database import get_db
from app.auth.routes import router as auth_router
from app.chat.routes import router as chat_router
from app.auth.dependencies import get_current_user

from app.chat.service import (
    create_chat,
    get_chat,
    save_message
)

# Load env
load_dotenv(
    dotenv_path=os.path.join(
        os.path.dirname(__file__),
        ".env"
    )
)

app = FastAPI(
    title="AI Career Agent",
    version="1.0.0"
)

app.include_router(chat_router)
app.include_router(auth_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global services
vector_store = None
llm = None
graph = None


@app.on_event("startup")
def startup():
    global vector_store, llm, graph

    vector_store = VectorStore()
    llm = LLMClient()

    graph = build_graph(
        vector_store=vector_store,
        llm=llm
    )


# ---------------- REQUEST MODELS ----------------

class AskRequest(BaseModel):
    query: str = None
    session_id: int = None

from typing import Optional

class RecommendationRequest(BaseModel):
    goal: str
    session_id: Optional[int] = None


# ---------------- CORE ROUTES ----------------

@app.get("/")
def root():
    return {"message": "AI Career Agent is running"}


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/trending")
def trending():
    return {"trending_repositories": get_trending_repos()}


@app.post("/ingest")
def ingest():
    repos = get_trending_repos()
    docs = prepare_documents(repos)
    vector_store.add_documents(docs)

    return {
        "message": "Data ingested successfully",
        "documents_added": len(docs)
    }


# ---------------- CHAT SAFE ASK ----------------

@app.post("/ask")
def ask_agent(
    req: AskRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    query = req.query

    # fallback safety (IMPORTANT)
    if not query:
        return {"response": "No query provided"}

    # OPTIONAL CHAT SUPPORT (only if session exists)
    chat = None
    if req.session_id:
        chat = get_chat(db, req.session_id, current_user.id)

    if chat:
        save_message(db, chat.id, "user", query)

    # intent check
    if not is_career_related(query):

        response = (
            "This AI Career Agent only answers career-related questions:\n"
            "- programming\n"
            "- AI / ML\n"
            "- software engineering\n"
            "- tech careers"
        )

        if chat:
            save_message(db, chat.id, "assistant", response)

        return {"response": response}

    # AI pipeline
    result = graph.invoke({"query": query})
    response = result["final_response"]

    if chat:
        save_message(db, chat.id, "assistant", response)

    return {
        "question": query,
        "response": response
    }


# ---------------- RECOMMEND SAFE ----------------

@app.post("/recommend")
def recommend(
    req: RecommendationRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    goal = req.goal

    if not goal:
        return {"error": "No goal provided"}

    chat = None
    if req.session_id:
        chat = get_chat(db, req.session_id, current_user.id)

    if chat:
        save_message(db, chat.id, "user", goal)

    result = generate_recommendation(goal)

    if chat:
        save_message(db, chat.id, "assistant", result["recommendation"])

    return result


# ---------------- JOB INGEST ----------------

@app.post("/ingest/jobs")
def ingest_jobs_endpoint():
    count = ingest_jobs()
    return {
        "message": "Job dataset ingested successfully",
        "documents_added": count
    }
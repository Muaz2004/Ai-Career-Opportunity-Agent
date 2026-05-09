"""
main.py
FastAPI backend for AI Career Agent
"""

import os
from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv

from tools.github_api import get_trending_repos

from rag.vector_store import VectorStore
from rag.llm_client import LLMClient
from rag.embeddings import prepare_documents

from agents.graph import build_graph


# Load env first
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


class AskRequest(BaseModel):
    query: str


@app.get("/")
def root():
    return {
        "message": "AI Career Agent is running"
    }


@app.get("/health")
def health():
    return {
        "status": "ok"
    }


@app.get("/trending")
def get_trending_repos_endpoint():

    repos = get_trending_repos()

    return {
        "trending_repositories": repos
    }


@app.post("/ingest")
def ingest_data():

    repos = get_trending_repos()

    documents = prepare_documents(repos)

    vector_store.add_documents(documents)

    return {
        "message": "Data ingested successfully",
        "documents_added": len(documents)
    }


@app.post("/ask")
def ask_agent(req: AskRequest):

    result = graph.invoke({
        "query": req.query
    })

    return {
        "question": req.query,
        "response": result["final_response"]
    }
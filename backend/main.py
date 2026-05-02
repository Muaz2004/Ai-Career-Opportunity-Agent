from fastapi import FastAPI
from tools.github_api import get_trending_repos

app = FastAPI(
    title="AI Career Agent",
    version="1.0.0"
)

@app.get("/")
def root():
    return {"message": "AI Career Agent is running"}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/trending")
def get_trending_repos_endpoint():
    repos = get_trending_repos()
    return {"trending_repositories": repos}

     


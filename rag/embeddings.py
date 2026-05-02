''' rag/embeddings.py
Functions to convert GitHub repo data → text for embedding'''




from langchain_core.documents import Document


def format_repo_text(repo):
    """
    Convert GitHub repo dict → clean text for embeddings
    """

    return f"""
Repo: {repo.get("name", "unknown")}
Language: {repo.get("language", "unknown")}
Stars: {repo.get("stars", 0)}
Description: {repo.get("description", "No description")}
""".strip()


def prepare_documents(repos):
    """
    Convert list of repos → LangChain Documents
    """

    documents = []

    for repo in repos:
        documents.append(
            Document(
                page_content=format_repo_text(repo),
                metadata={
                    "name": repo.get("name"),
                    "stars": repo.get("stars"),
                    "language": repo.get("language"),
                    "url": repo.get("url"),
                }
            )
        )

    return documents
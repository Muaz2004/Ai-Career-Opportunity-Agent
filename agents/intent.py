"""
Simple intent classifier for AI Career Agent
"""

def is_career_related(query: str) -> bool:

    keywords = [
        "ai", "machine learning", "ml", "data",
        "python", "java", "javascript", "typescript",
        "programming", "developer", "software",
        "career", "job", "github", "coding",
        "react", "fastapi", "langchain", "langgraph",
        "engineer", "tech", "learn", "skill"
    ]

    query_lower = query.lower()

    return any(keyword in query_lower for keyword in keywords)
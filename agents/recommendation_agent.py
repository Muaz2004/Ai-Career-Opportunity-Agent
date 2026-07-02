"""
Recommendation Agent

Uses the RAG retriever + LLM to generate structured career recommendations.
"""

from rag.vector_store import VectorStore
from rag.llm_client import LLMClient

vector_store = VectorStore()
llm = LLMClient()


def generate_recommendation(goal: str):
    """
    Generate career recommendations for a user's goal.
    """

    retriever = vector_store.get_retriever(k=8)

    docs = retriever.invoke(goal)

    if not docs:
        return {
            "goal": goal,
            "recommendation": "No relevant information was found in the knowledge base.",
            "sources_used": 0
        }

    context = "\n\n".join(doc.page_content for doc in docs)

    prompt = f"""
You are an experienced AI Career Advisor.

Use ONLY the context below.

Do not invent technologies.

If the context is insufficient, clearly say so.

==========================
USER GOAL

{goal}

==========================
CONTEXT

{context}

==========================

Return your answer in this format.

# Career Recommendation

## Recommended Skills
- ...

## Technologies
- ...

## Project Ideas
- ...

## Learning Roadmap
1.
2.
3.

## Why These Recommendations
Explain briefly using only the provided context.
"""

    response = llm.invoke(prompt)

    return {
        "goal": goal,
        "recommendation": response.content,
        "sources_used": len(docs)
    }
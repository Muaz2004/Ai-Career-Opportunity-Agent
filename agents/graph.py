"""
agents/graph.py
Production-style LangGraph workflow
"""

from typing import TypedDict, List, Dict, Any

from langgraph.graph import StateGraph, END

from rag.vector_store import VectorStore
from rag.llm_client import LLMClient



# Shared Agent State


class AgentState(TypedDict):
    query: str

    retrieved_docs: List[str]

    analysis: Dict[str, Any]

    strategy: Dict[str, Any]

    final_response: str



# Retrieval Agent


def retrieval_agent(state: AgentState, vector_store: VectorStore):

    docs = vector_store.search(state["query"])

    retrieved_docs = [doc.page_content for doc in docs]

    return {
        **state,
        "retrieved_docs": retrieved_docs
    }



# Analysis Agent


def analysis_agent(state: AgentState, llm: LLMClient):

    context = "\n\n".join(state["retrieved_docs"])

    prompt = f"""
You are a technology trend analyst.

IMPORTANT:
Only use the provided context.
Do NOT use outside knowledge.

Your task:
1. Identify trending technologies
2. Identify repeated programming languages
3. Identify recurring themes
4. Estimate demand strength

You are a senior AI career mentor helping a junior developer.

IMPORTANT STYLE RULES:
- Do NOT output JSON
- Do NOT output code blocks
- Do NOT format like a machine response
- Speak like a real human mentor
- Be clear, direct, and motivating
- Use simple bullet points if needed
-donot answer in the form of json every thing must be human readable and simple to understand

Use the context below:

Context:
{context}


Now answer in this format:

🔥 Insight (short explanation)

📊 Trending Skills (bullet list)

🚀 What You Should Learn Next (simple steps)

🛠️ Project Idea (1 strong idea)

📅 30-Day Action Plan (very simple steps)


"""

    response = llm.invoke(prompt)

    return {
        **state,
        "analysis": response.content
    }



# Strategy Agent


def strategy_agent(state: AgentState, llm: LLMClient):

    prompt = f""" You are an AI career strategist.

Based ONLY on the analysis below:

{state["analysis"]}

Create practical career advice.

IMPORTANT:
- Do NOT output JSON.
- Do NOT output Markdown code blocks.
- Write naturally for a human reader.
- Keep it concise.

Use this format:

🎯 Priority Skills
- ...

📚 Recommended Learning Order
1.
2.
3.

⚠️ Common Mistakes to Avoid
- ...

💼 Portfolio Projects
- ...

🎯 Long-Term Goal
...   """

    response = llm.invoke(prompt)

    return {
        **state,
        "strategy": response.content
    }



# Output Agent


def output_agent(state: AgentState):

    final_response = f"""
 AI Career Intelligence Report



{state["analysis"]}




{state["strategy"]}
"""

    return {
        **state,
        "final_response": final_response
    }



# Graph Builder


def build_graph(vector_store: VectorStore, llm: LLMClient):

    graph = StateGraph(AgentState)

    graph.add_node(
        "retrieve",
        lambda state: retrieval_agent(state, vector_store)
    )

    graph.add_node(
        "analyze",
        lambda state: analysis_agent(state, llm)
    )

    graph.add_node(
        "strategy",
        lambda state: strategy_agent(state, llm)
    )

    graph.add_node(
        "output",
        output_agent
    )

    graph.set_entry_point("retrieve")

    graph.add_edge("retrieve", "analyze")
    graph.add_edge("analyze", "strategy")
    graph.add_edge("strategy", "output")
    graph.add_edge("output", END)

    return graph.compile()
"""
agents/graph.py
REAL LangGraph RAG Agent Pipeline
"""

from langgraph.graph import StateGraph, END
from typing import TypedDict

from rag.vector_store import VectorStore
from rag.llm_client import LLMClient



# Shared State

class AgentState(TypedDict):
    query: str
    context: str
    analysis: str
    strategy: str
    output: str



# Init tools (REAL)

vector_store = VectorStore()
llm = LLMClient()



# 1. Data / Retrieval Agent

def retrieval_agent(state: AgentState):
    retriever = vector_store.get_retriever()

    docs = retriever.invoke(state["query"])

    context = "\n\n".join([doc.page_content for doc in docs])

    return {
        **state,
        "context": context
    }



# 2. Analysis Agent

def analysis_agent(state: AgentState):

    prompt = f"""
You are a technical analyst.

Analyze this context and extract:
- trending skills
- repeated technologies
- patterns

Context:
{state['context']}
"""

    response = llm.invoke(prompt)

    return {
        **state,
        "analysis": response.content
    }



# 3. Strategy Agent

def strategy_agent(state: AgentState):

    prompt = f"""
You are a career strategist.

Based on this analysis:
{state['analysis']}

Give:
- what to learn
- what to build
- roadmap steps
"""

    response = llm.invoke(prompt)

    return {
        **state,
        "strategy": response.content
    }



# 4. Output Agent

def output_agent(state: AgentState):

    final = f"""
CAREER INSIGHT REPORT

--- ANALYSIS ---
{state['analysis']}

--- STRATEGY ---
{state['strategy']}
"""

    return {
        **state,
        "output": final
    }



# Build Graph

def build_graph():

    graph = StateGraph(AgentState)

    graph.add_node("retrieve", retrieval_agent)
    graph.add_node("analysis", analysis_agent)
    graph.add_node("strategy", strategy_agent)
    graph.add_node("output", output_agent)

    graph.set_entry_point("retrieve")

    graph.add_edge("retrieve", "analysis")
    graph.add_edge("analysis", "strategy")
    graph.add_edge("strategy", "output")
    graph.add_edge("output", END)

    return graph.compile()



# Run helper (for testing)

app_graph = build_graph()


def run_agent(query: str):
    return app_graph.invoke({"query": query})
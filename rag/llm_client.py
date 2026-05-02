"""
rag/llm_client.py
LangChain Groq wrapper
"""

import os
from langchain_groq import ChatGroq


class LLMClient:
    def __init__(self):
        api_key = os.getenv("GROQ_API_KEY")

        if not api_key:
            raise ValueError("GROQ_API_KEY is missing")

        self.llm = ChatGroq(
            api_key=api_key,
            model="llama-3.3-70b-versatile",
            temperature=0.3
        )

    def invoke(self, prompt: str):
        return self.llm.invoke(prompt)
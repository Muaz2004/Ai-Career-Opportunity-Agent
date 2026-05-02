''' rag/retriever.py
Simple wrapper around VectorStore for retrieving relevant docs as structured context'''


from rag.vector_store import VectorStore


class Retriever:
    def __init__(self):
        self.store = VectorStore()

    def search(self, query: str):
        """
        Return relevant docs as structured context
        """
        docs = self.store.search(query)

        return [
            {
                "content": d.page_content,
                "metadata": d.metadata
            }
            for d in docs
        ]
'''
rag/vector_store.py
ChromaDB wrapper for storing and retrieving repo embeddings
'''

from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings


class VectorStore:
    def __init__(self, persist_directory="rag/chroma_db"):
        # FREE embeddings (no API key needed)
        self.embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )

        self.db = Chroma(
            persist_directory=persist_directory,
            embedding_function=self.embeddings
        )

    def add_documents(self, documents):
        """
        Store documents into ChromaDB
        """
        if not documents:
            return

        self.db.add_documents(documents)
        self.db.persist()

    def search(self, query, k=5):
        """
        Retrieve similar documents
        """
        return self.db.similarity_search(query, k=k)

    def get_retriever(self, k=5):
        """
        LangChain retriever interface
        """
        return self.db.as_retriever(search_kwargs={"k": k})
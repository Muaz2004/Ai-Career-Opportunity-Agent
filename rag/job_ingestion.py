from rag.job_embeddings import prepare_job_documents
from rag.vector_store import VectorStore


def ingest_jobs():
    store = VectorStore()

    documents = prepare_job_documents()

    store.add_documents(documents)

    return len(documents)
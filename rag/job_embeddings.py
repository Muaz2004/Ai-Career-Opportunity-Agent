import json
from pathlib import Path

from langchain_core.documents import Document


JOB_FILE = Path("data/jobs/jobs.json")


def format_job(job: dict) -> str:
    return f"""
Job Title: {job['title']}
Company: {job['company']}
Location: {job['location']}
Experience Level: {job['level']}

Required Skills:
{", ".join(job["skills"])}

Description:
{job["description"]}
""".strip()


def prepare_job_documents():
    with open(JOB_FILE, "r", encoding="utf-8") as f:
        jobs = json.load(f)

    documents = []

    for job in jobs:
        documents.append(
            Document(
                page_content=format_job(job),
                metadata={
                    "source": "jobs",
                    "title": job["title"],
                    "company": job["company"],
                    "level": job["level"],
                    "skills": job["skills"]
                }
            )
        )

    return documents
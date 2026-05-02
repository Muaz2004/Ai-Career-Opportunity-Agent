import requests
from datetime import datetime, timedelta


def get_trending_repos(limit=5):
    last_week = datetime.now() - timedelta(days=7)
    date_str = last_week.strftime("%Y-%m-%d")

    
    url = "https://api.github.com/search/repositories"
    params = {
        "q": f"created:>{date_str}",
        "sort": "stars",
        "order": "desc",
        "per_page": limit
    }

    response = requests.get(url, params=params)

    
    if response.status_code != 200:
        return {"error": "GitHub API request failed"}

    data = response.json()

    repos = []
    for repo in data.get("items", []):
        repos.append({
            "name": repo.get("name"),
            "stars": repo.get("stargazers_count"),
            "language": repo.get("language"),
            "url": repo.get("html_url"),
            "description": repo.get("description")
        })

    return repos
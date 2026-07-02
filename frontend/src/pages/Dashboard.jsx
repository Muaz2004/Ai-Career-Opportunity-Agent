import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/trending")
      .then(res => setData(res.data.trending_repositories))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">🔥 Trending GitHub Repos</h1>

      <div className="grid grid-cols-3 gap-4">
        {data?.map((repo, i) => (
          <div key={i} className="glass p-4 rounded-xl hover:scale-105">
            <h2 className="font-bold text-blue-300">{repo.name}</h2>
            <p className="text-sm opacity-70">{repo.language}</p>
            <p className="text-xs mt-2 opacity-50">
              ⭐ {repo.stars}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
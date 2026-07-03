import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/trending")
      .then(res => {
        setData(res.data.trending_repositories || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.6)]" />
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          Trending Repositories
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          // 2026 Sleek Skeleton Loader
          Array(6).fill(0).map((_, i) => (
            <div key={i} className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl space-y-4 animate-pulse">
              <div className="h-5 bg-slate-800 rounded-md w-2/3" />
              <div className="h-4 bg-slate-800/60 rounded-md w-1/3" />
              <div className="h-4 bg-slate-800/40 rounded-md w-1/4" />
            </div>
          ))
        ) : (
          data?.map((repo, i) => (
            <div 
              key={i} 
              className="group relative bg-gradient-to-br from-slate-900/50 to-slate-950/50 p-5 rounded-2xl border border-slate-800/80 hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.5)]"
            >
              <div className="space-y-3">
                <h2 className="font-bold text-lg text-slate-100 group-hover:text-blue-400 transition-colors duration-200 truncate">
                  {repo.name}
                </h2>
                
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800/60 text-slate-400 border border-slate-700/50">
                  {repo.language || "Unknown"}
                </span>

                <div className="pt-2 flex items-center justify-between border-t border-slate-800/60">
                  <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">Metrics</span>
                  <div className="flex items-center gap-1.5 text-xs text-amber-400 font-medium bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                    {Number(repo.stars).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
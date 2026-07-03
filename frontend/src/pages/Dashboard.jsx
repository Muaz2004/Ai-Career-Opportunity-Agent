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
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
        <h1 className="text-2xl font-mono tracking-wider text-white uppercase">
          Trending Indexes
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          Array(6).fill(0).map((_, i) => (
            <div key={i} className="bg-slate-950 border border-slate-900 p-5 rounded-xl space-y-4 animate-pulse">
              <div className="h-4 bg-slate-900 rounded w-2/3" />
              <div className="h-3 bg-slate-900/60 rounded w-1/3" />
              <div className="h-3 bg-slate-900/40 rounded w-1/4" />
            </div>
          ))
        ) : (
          data?.map((repo, i) => (
            <div 
              key={i} 
              className="group bg-slate-950 p-5 rounded-xl border border-slate-900 hover:border-emerald-500/30 transition-all duration-300"
            >
              <div className="space-y-4">
                <h2 className="font-mono font-bold text-base text-slate-100 group-hover:text-emerald-400 transition-colors duration-200 truncate">
                  {repo.name}
                </h2>
                
                <span className="inline-flex items-center px-2.5 py-0.5 rounded font-mono text-[10px] bg-slate-900 text-slate-400 border border-slate-800">
                  {repo.language || "RAW"}
                </span>

                <div className="pt-3 flex items-center justify-between border-t border-slate-900">
                  <span className="font-mono text-[10px] tracking-widest text-slate-600 uppercase">Metrics</span>
                  <div className="flex items-center gap-1 text-xs text-emerald-400 font-mono bg-emerald-500/5 px-2.5 py-1 rounded border border-emerald-500/10">
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
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
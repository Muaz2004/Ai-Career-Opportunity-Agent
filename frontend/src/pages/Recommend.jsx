import { useState } from "react";
import axios from "axios";

export default function Recommend() {
  const [goal, setGoal] = useState("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  const getRec = async () => {
    if (!goal.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:8000/recommend", { goal });
      setData(res.data.recommendation);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 p-1">
      <div className="flex items-center gap-3">
        <div className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          Career Strategy
        </h1>
      </div>

      <div className="flex gap-3 bg-slate-900/40 p-2 rounded-2xl border border-slate-800 backdrop-blur-xl shadow-2xl focus-within:border-purple-500/50 transition-all duration-300">
        <input
          className="w-full bg-transparent px-4 py-3 rounded-xl text-slate-100 placeholder-slate-500 outline-none"
          placeholder="e.g., Transition into Senior AI/ML Architect"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && getRec()}
        />

        <button
          onClick={getRec}
          disabled={loading}
          className="relative group overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-500 px-6 py-3 rounded-xl font-medium text-white shadow-lg shadow-purple-500/20 active:scale-95 transition-all duration-200 disabled:opacity-50"
        >
          <span className="relative z-10">{loading ? "Mapping..." : "Generate"}</span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </button>
      </div>

      {data && !loading && (
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-900/80 via-slate-950/70 to-slate-900/80 p-6 rounded-2xl border border-slate-800/80 shadow-2xl animate-slide-up">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
          <div className="text-xs font-semibold text-purple-400 uppercase tracking-widest mb-3">Custom Blueprint</div>
          <p className="text-slate-300 leading-relaxed whitespace-pre-wrap text-sm md:text-base">
            {data}
          </p>
        </div>
      )}
    </div>
  );
}
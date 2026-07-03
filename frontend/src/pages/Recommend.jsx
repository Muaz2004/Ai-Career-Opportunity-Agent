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
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
        <h1 className="text-2xl font-mono tracking-wider text-white uppercase">
          Strategy Compiler
        </h1>
      </div>

      <div className="flex gap-3 bg-slate-950 p-2 rounded-xl border border-slate-900 focus-within:border-emerald-500/30 transition-all duration-300">
        <input
          className="w-full bg-transparent px-4 py-3 font-mono text-sm text-slate-100 placeholder-slate-600 outline-none"
          placeholder="TARGET GOAL..."
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && getRec()}
        />

        <button
          onClick={getRec}
          disabled={loading}
          className="bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-lg transition-all duration-200 active:scale-95 disabled:opacity-40"
        >
          {loading ? "Compiling" : "Generate"}
        </button>
      </div>

      {data && !loading && (
        <div className="relative overflow-hidden bg-slate-950 p-6 rounded-xl border border-slate-900 shadow-2xl">
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
          <div className="font-mono text-[10px] text-emerald-500 uppercase tracking-widest mb-3">Compiled Blueprint</div>
          <p className="text-slate-300 font-sans leading-relaxed whitespace-pre-wrap text-sm md:text-base">
            {data}
          </p>
        </div>
      )}
    </div>
  );
}
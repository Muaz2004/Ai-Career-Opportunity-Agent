import { useState } from "react";
import axios from "axios";

export default function AskAI() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post("http://127.0.0.1:8000/ask", { query });
      setResponse(res.data.response);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
        <h1 className="text-2xl font-mono tracking-wider text-white uppercase">
          Agent Query
        </h1>
      </div>

      {/* Input Group */}
      <div className="flex gap-3 bg-slate-950 p-2 rounded-xl border border-slate-900 focus-within:border-emerald-500/30 transition-all duration-300">
        <input
          className="w-full bg-transparent px-4 py-3 font-mono text-sm text-slate-100 placeholder-slate-600 outline-none"
          placeholder="ENTER INQUIRY..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && ask()}
        />
        <button
          onClick={ask}
          disabled={loading}
          className="bg-emerald-500 hover:bg-emerald-400 text-black font-mono font-bold text-xs tracking-widest uppercase px-6 py-3 rounded-lg transition-all duration-200 active:scale-95 disabled:opacity-40"
        >
          Execute
        </button>
      </div>

      {/* Dynamic Processing Status */}
      {loading && (
        <div className="flex items-center gap-3 px-4 py-3 bg-slate-950 rounded-xl border border-slate-900 w-max">
          <span className="font-mono text-xs uppercase text-slate-500 tracking-widest animate-pulse">Analyzing Data</span>
          <div className="flex gap-1 items-center h-3">
            <div className="w-1 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-1 h-3 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-1 h-2 bg-emerald-500 rounded-full animate-bounce" />
          </div>
        </div>
      )}

      {/* Response Display Box */}
      {response && !loading && (
        <div className="relative overflow-hidden bg-slate-950 p-6 rounded-xl border border-slate-900 transition-all duration-500">
          <div className="absolute top-0 left-0 w-[2px] h-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
          <div className="font-mono text-[10px] text-emerald-500 uppercase tracking-widest mb-3">Output Stream</div>
          <p className="text-slate-300 font-sans leading-relaxed whitespace-pre-wrap text-sm md:text-base">
            {response}
          </p>
        </div>
      )}
    </div>
  );
}
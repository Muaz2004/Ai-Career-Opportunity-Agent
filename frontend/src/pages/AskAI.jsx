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
    <div className="max-w-3xl mx-auto space-y-6 p-1">
      {/* Header with animated ambient light instead of text icon */}
      <div className="flex items-center gap-4 relative group">
        <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 opacity-30 blur-md group-hover:opacity-50 transition duration-500"></div>
        <div className="relative h-4 w-4 rounded-full bg-cyan-400 animate-pulse" />
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
          AI Career Agent
        </h1>
      </div>

      {/* Input Group */}
      <div className="flex gap-3 bg-slate-900/40 p-2 rounded-2xl border border-slate-800 backdrop-blur-xl shadow-2xl focus-within:border-blue-500/50 transition-all duration-300">
        <input
          className="w-full bg-transparent px-4 py-3 rounded-xl text-slate-100 placeholder-slate-500 outline-none"
          placeholder="Ask anything about your career path..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && ask()}
        />
        <button
          onClick={ask}
          disabled={loading}
          className="relative group overflow-hidden bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 rounded-xl font-medium text-white shadow-lg shadow-blue-500/20 active:scale-95 transition-all duration-200 disabled:opacity-50"
        >
          <span className="relative z-10">Ask</span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </button>
      </div>

      {/* Modern Wave Loading Animation */}
      {loading && (
        <div className="flex items-center gap-2 px-4 py-3 bg-slate-900/20 rounded-xl border border-slate-800/50 w-max animate-fade-in">
          <span className="text-sm text-slate-400 font-medium">Analyzing</span>
          <div className="flex gap-1 items-center h-4">
            <div className="w-1 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-1 h-3 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-1 h-2 bg-blue-500 rounded-full animate-bounce" />
          </div>
        </div>
      )}

      {/* Response Box */}
      {response && !loading && (
        <div className="relative overflow-hidden bg-gradient-to-b from-slate-900/60 to-slate-950/60 p-6 rounded-2xl border border-slate-800 shadow-xl transition-all duration-500 animate-slide-up">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-cyan-500" />
          <p className="text-slate-300 leading-relaxed whitespace-pre-wrap text-sm md:text-base">
            {response}
          </p>
        </div>
      )}
    </div>
  );
}
import { useEffect, useState } from "react";
import api from "../utils/api";

export default function Recommend() {
  const [goal, setGoal] = useState("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  // OPTIONAL: create session for history grouping
  useEffect(() => {
    const init = async () => {
      try {
        const res = await api.post("/chat/new");
        setSessionId(res.data.session_id);
      } catch (err) {
        console.error("Session init failed:", err);
      }
    };

    init();
  }, []);

  const getRec = async () => {
    if (!goal.trim()) return;

    setLoading(true);
    setData("");

    try {
      const res = await api.post("/recommend", {
        goal,
        session_id: sessionId
      });

      setData(res.data.recommendation);
    } catch (err) {
      console.error("Recommend error:", err.response?.data || err.message);
      setData("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">

      <div className="flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-emerald-500" />
        <h1 className="text-2xl font-mono tracking-wider text-white uppercase">
          Strategy Compiler
        </h1>
      </div>

      <div className="flex gap-3 bg-slate-950 p-2 rounded-xl border border-slate-900">
        <input
          className="w-full bg-transparent px-4 py-3 text-slate-100 outline-none"
          placeholder="TARGET GOAL..."
          value={goal}
          onChange={(e) => {
            setGoal(e.target.value);
            setData("");
          }}
          onKeyDown={(e) => e.key === "Enter" && getRec()}
        />

        <button
          onClick={getRec}
          disabled={loading}
          className="bg-emerald-500 text-black px-6 py-3 rounded"
        >
          {loading ? "Analyzing..." : "Generate"}
        </button>
      </div>

      {data && !loading && (
        <div className="bg-slate-950 p-6 rounded-xl">
          <pre className="text-slate-300 whitespace-pre-wrap">
            {data}
          </pre>
        </div>
      )}
    </div>
  );
}
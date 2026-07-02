import { useState } from "react";
import axios from "axios";

export default function AskAI() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    setLoading(true);
    const res = await axios.post("http://127.0.0.1:8000/ask", {
      query,
    });

    setResponse(res.data.response);
    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">💬 Ask AI Career Agent</h1>

      <div className="flex gap-2">
        <input
          className="w-full p-3 rounded-lg glass"
          placeholder="Ask anything..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button
          onClick={ask}
          className="bg-blue-500 px-4 rounded-lg hover:bg-blue-600"
        >
          Ask
        </button>
      </div>

      {loading && <p className="mt-4">Thinking...</p>}

      {response && (
        <div className="mt-4 glass p-4 rounded-xl whitespace-pre-wrap">
          {response}
        </div>
      )}
    </div>
  );
}
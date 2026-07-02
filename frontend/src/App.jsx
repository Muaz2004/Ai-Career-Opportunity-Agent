import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import AskAI from "./pages/AskAI";
import Recommend from "./pages/Recommend";

export default function App() {
  const [tab, setTab] = useState("dashboard");

  const renderPage = () => {
    switch (tab) {
      case "ask":
        return <AskAI />;
      case "recommend":
        return <Recommend />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex">
      
      {/* SIDEBAR */}
      <div className="w-64 glass p-5 flex flex-col gap-4">
        <h1 className="text-xl font-bold text-blue-400">
          AI Career Agent
        </h1>

        <button onClick={() => setTab("dashboard")} className="hover:text-blue-400 text-left">
          📊 Dashboard
        </button>

        <button onClick={() => setTab("ask")} className="hover:text-blue-400 text-left">
          💬 Ask AI
        </button>

        <button onClick={() => setTab("recommend")} className="hover:text-blue-400 text-left">
          🎯 Recommend
        </button>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6">
        {renderPage()}
      </div>
    </div>
  );
}
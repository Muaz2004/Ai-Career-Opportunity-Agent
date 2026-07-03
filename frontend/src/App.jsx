import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import AskAI from "./pages/AskAI";
import Recommend from "./pages/Recommend";
import System from "./pages/System";

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

  const tabs = [
    { id: "dashboard", label: "Dashboard", lightColor: "bg-blue-400" },
    { id: "ask", label: "Ask AI Agent", lightColor: "bg-cyan-400" },
    { id: "recommend", label: "Career Strategy", lightColor: "bg-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex font-sans antialiased">
      
      {/* MODERN GLASS SIDEBAR */}
      <aside className="w-64 bg-slate-950/40 border-r border-slate-900 backdrop-blur-xl p-6 flex flex-col gap-8 select-none">
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2">
          <div className="h-5 w-5 rounded-lg bg-gradient-to-tr from-blue-600 to-purple-600 shadow-md shadow-blue-500/20" />
          <h1 className="text-lg font-black tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            Nexus AI
          </h1>
        </div>

        {/* Navigation Group */}
        <nav className="flex flex-col gap-1.5 flex-1">
          {tabs.map((t) => {
            const isActive = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`group relative flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-all duration-300 ${
                  isActive
                    ? "bg-slate-900/60 text-white shadow-inner shadow-white/5 border border-slate-800/60"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/20"
                }`}
              >
                <span>{t.label}</span>
                
                {/* Active Indicator Micro-dot instead of flat icons */}
                {isActive ? (
                  <span className={`h-1.5 w-1.5 rounded-full ${t.lightColor} animate-fade-in shadow-[0_0_8px_currentColor]`} />
                ) : (
                  <span className="h-1 w-1 rounded-full bg-transparent group-hover:bg-slate-700 transition-colors duration-200" />
                )}
              </button>
            );
          })}
        </nav>

        {/* System Footer Badge */}
        <div className="pt-4 border-t border-slate-900/60 px-2 flex items-center justify-between text-[11px] font-semibold uppercase tracking-widest text-slate-600">
          <span>Secure Node</span>
          <span className="h-2 w-2 rounded-full bg-emerald-500/80 animate-pulse" />
        </div>
      </aside>

      {/* MAIN VIEWPORT */}
      <main className="flex-1 p-8 overflow-y-auto max-w-7xl mx-auto w-full transition-all duration-300 animate-fade-in">
        <div className="bg-slate-950/20 rounded-3xl p-6 min-h-[calc(100vh-4rem)] border border-slate-900/40 shadow-2xl backdrop-blur-sm">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import AskAI from "./pages/AskAI";
import Recommend from "./pages/Recommend";
import System from "./pages/System";
import Login from "./pages/Login";
import { useAuth } from "./context/AuthContext";
import ChatPage from "./pages/ChatPage";

export default function App() {
  const [tab, setTab] = useState("dashboard");
  const { token } = useAuth();

  const renderPage = () => {
    switch (tab) {
      case "recommend":
        return <Recommend />;
      case "system":
        return <System />;
      case "chat":
        return <ChatPage />;
      default:
        return <Dashboard />;
    }
  };

  const tabs = [
    { id: "dashboard", label: "Dashboard" },
     { id: "chat", label: "Ask Agent" } ,
    { id: "recommend", label: "Strategy" },
    { id: "system", label: "System" },
   
  ];

  // 🔐 AUTH GATE (ONLY ADDITION)
  if (!token) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-sans antialiased selection:bg-emerald-500 selection:text-black">
      
      {/* MINIMALIST PLAIN TEXT TOPBAR - GREEN & BLACK SPEC */}
      <header className="sticky top-0 z-50 w-full bg-[#030712]/80 backdrop-blur-md border-b border-emerald-950/30 select-none px-6 md:px-12 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
          
          {/* Brand Identity */}
          <div className="flex items-center gap-2 tracking-widest font-mono text-sm uppercase text-slate-400 shrink-0">
            <span className="bg-emerald-500 w-1.5 h-1.5 rounded-full shadow-[0_0_8px_#10b981]" />
            <span className="text-white font-bold">Mu</span> Agentic AI
          </div>

          {/* Pure Typography Navigation */}
          <nav className="flex items-center gap-6 md:gap-8 overflow-x-auto no-scrollbar py-1">
            {tabs.map((t) => {
              const isActive = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`group relative py-1 font-mono text-xs md:text-sm font-medium tracking-wider uppercase transition-all duration-300 whitespace-nowrap outline-none ${
                    isActive ? "text-emerald-400 font-bold" : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  <span>{t.label}</span>
                  
                  {/* Clean Emerald Active Line */}
                  <span 
                    className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-emerald-500 transition-all duration-300 transform origin-left ${
                      isActive ? "scale-x-100 opacity-100 shadow-[0_0_10px_#10b981]" : "scale-x-0 opacity-0 group-hover:scale-x-50 group-hover:opacity-50"
                    }`} 
                  />
                </button>
              );
            })}
          </nav>

          {/* System status */}
          <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] font-bold tracking-widest text-slate-600 uppercase shrink-0">
            <span>Online</span>
            <span className="h-1 w-1 rounded-full bg-emerald-500 animate-ping" />
          </div>

        </div>
      </header>

      {/* WORKSPACE CONTENT VIEWPORT */}
      <main className="flex-1 px-6 md:px-12 py-12 md:py-16 w-full max-w-7xl mx-auto transition-all duration-300 animate-fade-in">
        <div className="p-2 min-h-[calc(100vh-12rem)]">
          {renderPage()}
        </div>
      </main>

    </div>
  );
}
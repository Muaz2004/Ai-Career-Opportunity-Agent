import { useEffect, useState } from "react";
import api from "../utils/api";
import { createChat, getChats, getMessages } from "../api/chat";

export default function ChatPage() {
  const [sessionId, setSessionId] = useState(null);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Load all chats
  const loadChats = async () => {
    const res = await getChats();
    setChats(res || []);
  };

  //  Load messages
  const loadMessages = async (id) => {
    const res = await getMessages(id);
    setMessages(res.messages || []);
    setSessionId(id);
  };

  // INIT (NO auto chat creation anymore)
  useEffect(() => {
    const init = async () => {
      await loadChats();
    };

    init();
  }, []);

  //CREATE CHAT
  const handleNewChat = async () => {
    const res = await createChat();
    setSessionId(res.session_id);
    setMessages([]);
    await loadChats();
  };

  //  DELETE CHAT
  const deleteChat = async (id) => {
    await api.delete(`/chat/${id}`);

    if (sessionId === id) {
      setSessionId(null);
      setMessages([]);
    }

    await loadChats();
  };

  //  SEND MESSAGE
  const sendMessage = async () => {
    if (!input.trim() || !sessionId) return;

    const userMsg = input;
    setInput("");
    setLoading(true);

    try {
      await api.post("/ask", {
        query: userMsg,
        session_id: sessionId,
      });

      // refresh both chat + messages (IMPORTANT FIX)
      await loadMessages(sessionId);
      await loadChats();

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-12rem)] bg-[#030712] border border-slate-900 rounded-2xl overflow-hidden font-mono text-sm antialiased">

      {/* COMPACT STREAM LIST SIDEBAR */}
      <div className="w-64 bg-slate-950/60 border-r border-slate-900 p-4 flex flex-col gap-4 select-none">
        
        <button
          onClick={handleNewChat}
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs tracking-widest uppercase py-3 rounded-lg transition-all duration-200 active:scale-95 shadow-[0_0_10px_rgba(16,185,129,0.1)]"
        >
          + Initialize Node
        </button>

        <div className="flex-1 space-y-1 overflow-y-auto no-scrollbar">
          {chats.map((chat) => {
            const isSelected = sessionId === chat.id;
            return (
              <div
                key={chat.id}
                className={`group flex justify-between items-center px-3 py-2.5 rounded-lg text-xs tracking-wide transition-all duration-200 border ${
                  isSelected
                    ? "bg-slate-900 border-emerald-500/30 text-emerald-400"
                    : "bg-transparent border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-900/20"
                }`}
              >
                {/* OPEN CHAT */}
                <span
                  className="flex-1 truncate cursor-pointer uppercase font-medium"
                  onClick={() => loadMessages(chat.id)}
                >
                  {chat.title || "Untitled Session"}
                </span>

                {/* MINIMALIST TERMINATE CHAT BUTTON */}
                <button
                  onClick={() => deleteChat(chat.id)}
                  className="opacity-0 group-hover:opacity-100 text-slate-600 hover:text-emerald-400 text-[10px] ml-2 transition-all duration-150"
                  title="Terminate Session"
                >
                  [X]
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* MATRIX CHAT AREA */}
      <div className="flex-1 flex flex-col bg-slate-950/20">

        {/* ACTIVE STREAMS / MESSAGES */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 no-scrollbar">
          
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-slate-600 text-xs tracking-widest uppercase space-y-2">
              <div className="h-1 w-1 bg-slate-700 rounded-full animate-ping" />
              <span>Awaiting Session Initialization</span>
            </div>
          )}

          {messages.map((msg, i) => {
            const isUser = msg.role === "user";
            return (
              <div
                key={i}
                className={`relative overflow-hidden max-w-xl p-4 rounded-xl border transition-all duration-300 ${
                  isUser
                    ? "bg-slate-950 border-emerald-500/20 ml-auto"
                    : "bg-slate-950/40 border-slate-900"
                }`}
              >
                {/* Absolute status edge */}
                <div className={`absolute top-0 left-0 bottom-0 w-[2px] ${isUser ? 'bg-emerald-500' : 'bg-slate-800'}`} />
                
                <div className="text-[10px] font-bold tracking-widest uppercase mb-2 text-slate-600">
                  {isUser ? "User Object" : "Agent Response"}
                </div>
                
                <div className="text-slate-300 font-sans leading-relaxed text-sm whitespace-pre-wrap">
                  {msg.content}
                </div>
              </div>
            );
          })}

          {/* Minimal Process Tracking */}
          {loading && (
            <div className="flex items-center gap-2 text-xs text-slate-500 uppercase tracking-widest animate-pulse">
              <span>Streaming response matrix</span>
              <span className="animate-bounce">.</span>
              <span className="animate-bounce [animation-delay:0.2s]">.</span>
              <span className="animate-bounce [animation-delay:0.4s]">.</span>
            </div>
          )}
        </div>

        {/* COMMAND INPUT BAR */}
        <div className="p-4 bg-slate-950 border-t border-slate-900 flex gap-3 items-center">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={!sessionId}
            className="flex-1 bg-transparent px-4 py-3 text-sm text-slate-100 placeholder-slate-700 outline-none border border-slate-900 focus:border-emerald-500/20 rounded-xl transition-all duration-300 disabled:opacity-30"
            placeholder={sessionId ? "ENTER INPUT QUERY..." : "CHOOSE A SESSION NODE TO COMMENCE..."}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <button
            onClick={sendMessage}
            disabled={loading || !sessionId || !input.trim()}
            className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-20 text-black font-bold text-xs tracking-widest uppercase px-6 py-3.5 rounded-xl transition-all duration-200 active:scale-95 shrink-0"
          >
            Execute
          </button>
        </div>

      </div>
    </div>
  );
}
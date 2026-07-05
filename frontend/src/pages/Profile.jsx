import { useEffect, useState } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const [user, setUser] = useState(null);

  const { logout } = useAuth();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data);
      } catch (err) {
        console.error(err);
        setUser(null);
      }
    };

    loadUser();
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] font-mono text-xs uppercase tracking-widest text-slate-600 animate-pulse">
        Fetching Identity Metrics...
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[70vh] text-white font-mono antialiased p-2">
      <div className="relative overflow-hidden w-full max-w-sm bg-slate-950 p-8 rounded-2xl border border-slate-900 shadow-2xl space-y-8">
        
        {/* Top Minimalist Line Accent */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

        {/* Minimalist Signature Block instead of standard visual avatars */}
        <div className="flex items-center justify-between border-b border-slate-900 pb-4">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-600 uppercase tracking-widest">// Identity Node</span>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Active Status
            </div>
          </div>
          <div className="h-9 w-9 border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 flex items-center justify-center font-bold text-sm rounded-lg shadow-[0_0_10px_rgba(16,185,129,0.05)]">
            {user.full_name.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Data Fields */}
        <div className="space-y-4">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-600 uppercase tracking-widest block">Entity Name</span>
            <div className="bg-[#030712] border border-slate-900 px-4 py-3 rounded-xl text-sm font-sans font-medium text-slate-200">
              {user.full_name}
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] text-slate-600 uppercase tracking-widest block">Linked Interface</span>
            <div className="bg-[#030712] border border-slate-900 px-4 py-3 rounded-xl text-sm text-slate-400 select-all">
              {user.email}
            </div>
          </div>
        </div>

        {/* Control Actions */}
        <div className="pt-2">
          <button
            onClick={handleLogout}
            className="w-full border border-slate-900 hover:border-emerald-500/30 text-slate-500 hover:text-emerald-400 font-bold text-xs tracking-widest uppercase py-3.5 rounded-xl transition-all duration-200 active:scale-[0.98]"
          >
            Terminate Session
          </button>
        </div>

      </div>
    </div>
  );
}
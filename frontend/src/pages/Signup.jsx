import { useState } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

export default function Signup({ switchToLogin }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { login } = useAuth();

  const handleSignup = async () => {
    if (!fullName.trim() || !email.trim() || !password.trim()) return;
    setLoading(true);
    setErrorMessage("");
    try {
      // 1. Create account
      await api.post("/auth/signup", {
        full_name: fullName,
        email,
        password,
      });

      // 2. Auto login after signup
      const loginRes = await api.post("/auth/login", {
        email,
        password,
      });

      login(loginRes.data.access_token);
      console.log("Account created successfully!");
    } catch (err) {
      console.error(err);
      setErrorMessage(err?.response?.data?.detail || "Registration rejected");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[75vh] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-white font-mono antialiased px-4 max-w-6xl mx-auto">
      
      {/* LEFT SIDE: Architectural Decorative Matrix */}
      <div className="hidden lg:flex lg:col-span-7 flex-col space-y-4 select-none border-l border-slate-900/60 pl-8">
        <div className="text-[10px] text-emerald-500 tracking-widest uppercase">// INITIALIZE NODE</div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-100 max-w-md uppercase font-sans">
          Create Identity Record
        </h2>
        <p className="text-sm font-sans text-slate-500 leading-relaxed max-w-sm">
          Register new authorization variables into the system matrix to configure your personal agent terminal framework.
        </p>
        
        {/* Decorative Grid Lines */}
        <div className="pt-6 space-y-2 max-w-xs opacity-40">
          <div className="flex justify-between text-[10px] text-slate-600">
            <span>REGISTRY.EXE</span>
            <span className="text-emerald-500">PENDING</span>
          </div>
          <div className="w-full h-[1px] bg-slate-900" />
          <div className="flex justify-between text-[10px] text-slate-600">
            <span>NODE_ENCRYPT</span>
            <span>AES_256 // LOCAL</span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Perfectly Balanced Gateway Form */}
      <div className="lg:col-span-5 flex justify-center lg:justify-end">
        <div className="relative overflow-hidden w-full max-w-md bg-slate-950 p-8 md:p-10 rounded-2xl border border-slate-900 shadow-2xl space-y-6">
          
          {/* Top Accent line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

          {/* Header Block */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
              <h1 className="text-base tracking-widest text-white uppercase font-bold">
                Registration Gateway
              </h1>
            </div>
            <p className="text-slate-600 text-[10px] uppercase tracking-wider">
              Establish client signature
            </p>
          </div>

          {/* Form Inputs Container */}
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 uppercase tracking-widest pl-1">Full Name</label>
              <input
                className="w-full bg-[#030712] px-4 py-3 text-sm text-slate-100 placeholder-slate-700 outline-none border border-slate-900 focus:border-emerald-500/20 rounded-xl transition-all duration-300"
                placeholder="ENTER FULL NAME..."
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 uppercase tracking-widest pl-1">Ident / Email</label>
              <input
                className="w-full bg-[#030712] px-4 py-3 text-sm text-slate-100 placeholder-slate-700 outline-none border border-slate-900 focus:border-emerald-500/20 rounded-xl transition-all duration-300"
                placeholder="ENTER EMAIL ADDRESS..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-500 uppercase tracking-widest pl-1">Passkey</label>
              <input
                className="w-full bg-[#030712] px-4 py-3 text-sm text-slate-100 placeholder-slate-700 outline-none border border-slate-900 focus:border-emerald-500/20 rounded-xl transition-all duration-300"
                placeholder="GENERATE PASSKEY..."
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Error Message Flag */}
          {errorMessage && (
            <div className="text-[11px] text-red-400 bg-red-950/10 border border-red-900/30 px-3 py-2 rounded-lg">
              ❌ {errorMessage}
            </div>
          )}

          {/* Actions Block */}
          <div className="space-y-4">
            <button
              onClick={handleSignup}
              disabled={loading || !fullName.trim() || !email.trim() || !password.trim()}
              className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-20 text-black font-bold text-xs tracking-widest uppercase py-4 rounded-xl transition-all duration-200 active:scale-[0.98] shadow-[0_0_15px_rgba(16,185,129,0.05)]"
            >
              {loading ? "Allocating Record..." : "Create Account"}
            </button>

            <p className="text-xs text-slate-500 text-center uppercase tracking-wider">
              Existing identity?{" "}
              <span
                className="text-emerald-400 cursor-pointer hover:text-emerald-300 transition-colors"
                onClick={switchToLogin}
              >
                Sign In
              </span>
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
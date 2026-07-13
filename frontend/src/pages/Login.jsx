import { useState } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";

export default function Login({ switchToSignup }) {
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("string");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const handleGoogleSuccess = async (credentialResponse) => {
  try {
    window.location.href = "http://localhost:8000/auth/google/login";
  } catch (err) {
    console.error("Google authentication failed:", err);
  }
};

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      login(res.data.access_token);
      console.log("Authentication successful.");
    } catch (err) {
      console.error("Authentication rejected:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[75vh] grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-white font-mono antialiased px-4 max-w-6xl mx-auto">
      
      {/* LEFT SIDE: Architectural Decorative Matrix (Fills the emptiness beautifully) */}
      <div className="hidden lg:flex lg:col-span-7 flex-col space-y-4 select-none border-l border-slate-900/60 pl-8">
        <div className="text-[10px] text-emerald-500 tracking-widest uppercase">// SYSTEM STATUS OVERVIEW</div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-100 max-w-md uppercase font-sans">
          Accessing Secure Workspace Node
        </h2>
        <p className="text-sm font-sans text-slate-500 leading-relaxed max-w-sm">
          Please enter verified authentication parameters. Unregistered accesses are logged locally into environmental matrices.
        </p>
        
        {/* Decorative Grid Lines */}
        <div className="pt-6 space-y-2 max-w-xs opacity-40">
          <div className="flex justify-between text-[10px] text-slate-600">
            <span>CORE.EXE</span>
            <span className="text-emerald-500">READY</span>
          </div>
          <div className="w-full h-[1px] bg-slate-900" />
          <div className="flex justify-between text-[10px] text-slate-600">
            <span>ENV_PORT</span>
            <span>8000 // LOCAL</span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Perfectly Balanced Gateway Form */}
      <div className="lg:col-span-5 flex justify-center lg:justify-end">
        <div className="relative overflow-hidden w-full max-w-md bg-slate-950 p-8 md:p-10 rounded-2xl border border-slate-900 shadow-2xl space-y-8">
          
          {/* Top Accent line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

          {/* Header Block */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
              <h1 className="text-base tracking-widest text-white uppercase font-bold">
                Secure Gateway
              </h1>
            </div>
            <p className="text-slate-600 text-[10px] uppercase tracking-wider">
              Authorize agent credentials
            </p>
          </div>

          {/* Form Inputs Container */}
          <div className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-500 uppercase tracking-widest pl-1">Ident / Email</label>
              <input
                className="w-full bg-[#030712] px-4 py-3.5 text-sm text-slate-100 placeholder-slate-700 outline-none border border-slate-900 focus:border-emerald-500/20 rounded-xl transition-all duration-300"
                placeholder="ENTER EMAIL ADDRESS..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-500 uppercase tracking-widest pl-1">Passkey</label>
              <input
                className="w-full bg-[#030712] px-4 py-3.5 text-sm text-slate-100 placeholder-slate-700 outline-none border border-slate-900 focus:border-emerald-500/20 rounded-xl transition-all duration-300"
                placeholder="ENTER PASSKEY..."
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Submission Trigger */}
          <button
            onClick={handleLogin}
            disabled={loading || !email.trim() || !password.trim()}
            className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-20 text-black font-bold text-xs tracking-widest uppercase py-4 rounded-xl transition-all duration-200 active:scale-[0.98] shadow-[0_0_15px_rgba(16,185,129,0.05)]"
          >
            {loading ? "Verifying..." : "Establish Link"}
          </button>
          <div className="flex justify-center pt-3">
  <GoogleLogin
    onSuccess={handleGoogleSuccess}
    onError={() => {
      console.error("Google Login Failed");
    }}
  />
</div>

                    <p className="text-xs text-slate-500 text-center pt-2">
  Don't have an account?{" "}
  <span
    onClick={switchToSignup}
    className="text-emerald-500 cursor-pointer hover:underline"
  >
    Create one
  </span>
</p>

          

        </div>
      </div>

    </div>
  );
}
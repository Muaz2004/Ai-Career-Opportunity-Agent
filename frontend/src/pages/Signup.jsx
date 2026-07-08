import { useState } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

export default function Signup({ switchToLogin }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const handleSignup = async () => {
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
      console.log(err);
      alert(err?.response?.data?.detail || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0B1220] text-white">
      <div className="w-80 bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-4">

        <h1 className="text-xl font-bold text-center">Sign Up</h1>

        <input
          className="w-full p-2 text-black rounded"
          placeholder="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          className="w-full p-2 text-black rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-2 text-black rounded"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold p-2 rounded"
        >
          Create account
        </button>

        <p className="text-sm text-gray-400 text-center mt-4">
          Already have an account?{" "}
          <span
            className="text-emerald-400 cursor-pointer hover:underline"
            onClick={switchToLogin}
          >
            Sign in
          </span>
        </p>

      </div>
    </div>
  );
}
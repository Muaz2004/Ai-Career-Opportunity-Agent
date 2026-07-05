import { useState } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const handleSignup = async () => {
    try {
      // Create account
      await api.post("/auth/signup", {
        full_name: fullName,
        email,
        password,
      });

      // Automatically log in
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      login(res.data.access_token);

      alert("Account created successfully!");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.detail || "Signup failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-white">
      <div className="w-96 bg-gray-900 rounded-xl p-6 space-y-4">

        <h1 className="text-2xl font-bold">
          Create Account
        </h1>

        <input
          className="w-full p-2 rounded text-black"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          className="w-full p-2 rounded text-black"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-2 rounded text-black"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-emerald-500 text-black p-2 rounded"
        >
          Sign Up
        </button>

      </div>
    </div>
  );
}
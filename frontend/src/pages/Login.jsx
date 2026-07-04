import { useState } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("string");

  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      login(res.data.access_token);

      alert("Login successful!");
    } catch (err) {
      console.log(err);
      alert("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-white">
      <div className="p-6 bg-gray-900 rounded-xl space-y-4 w-80">
        <h1 className="text-xl font-bold">Login</h1>

        <input
          className="w-full p-2 text-black"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-2 text-black"
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-emerald-500 p-2"
        >
          Login
        </button>
      </div>
    </div>
  );
}
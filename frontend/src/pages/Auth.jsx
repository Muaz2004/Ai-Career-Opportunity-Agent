import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

export default function Auth() {
  const [mode, setMode] = useState("login");

  return mode === "login" ? (
    <Login switchToSignup={() => setMode("signup")} />
  ) : (
    <Signup switchToLogin={() => setMode("login")} />
  );
}
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export default function GoogleSuccess() {

  const { login } = useAuth();

  useEffect(() => {

    const params = new URLSearchParams(
      window.location.search
    );

    const token = params.get("token");

    if(token){
      login(token);

      window.location.href = "/";
    }

  }, []);

  return (
    <div className="text-white">
      Authenticating Google account...
    </div>
  );
}
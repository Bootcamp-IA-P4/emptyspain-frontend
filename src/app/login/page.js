"use client";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLogin } = useAuth();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = await handleLogin({ email, password });
    if (data.access) {
      router.push("/dashboard"); // Redirige a una página después del login
    } else {
      alert("Error en login");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

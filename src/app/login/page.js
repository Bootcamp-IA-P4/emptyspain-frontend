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
      router.push("/dashboard");
    } else {
      alert("Error en login");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Iniciar Sesión</h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="p-3 border border-gray-400 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
            className="p-3 border border-gray-400 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}

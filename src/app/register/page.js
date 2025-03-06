"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/services/authService";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("visualizador");
  const [error, setError] = useState(null);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    try {
      await register({
        email,
        username,
        password: password,
        password2: confirmPassword,
        tipo_usuario: tipoUsuario,
      });
      router.push("/login");
    } catch (err) {
      setError(err.message || "Error en el registro");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Registro</h2>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
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
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            className="p-3 border border-gray-400 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="p-3 border border-gray-400 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            required
            className="p-3 border border-gray-400 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
            value={tipoUsuario}
            onChange={(e) => setTipoUsuario(e.target.value)}
            required
            className="p-3 border border-gray-400 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
            <option value="visualizador">Visualizador</option>
            <option value="editor">Editor</option>
            </select>
            <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
            Registrarse
            </button>
        </form>
        </div>
    </div>
    );
}

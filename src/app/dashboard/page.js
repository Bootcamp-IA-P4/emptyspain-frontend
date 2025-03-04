"use client";
import { useAuth } from "../../context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  console.log(user);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <h1>Bienvenido al Dashboard</h1>
      <p>Hola, {user?.username}</p>
    </div>
  );
}

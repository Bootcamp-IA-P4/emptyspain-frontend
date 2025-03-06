"use client";
import { useAuth } from "../../context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ListPueblo from "./listPueblo";

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Aquí irá el listado de pueblos  
      </h2>
      <ListPueblo />
    </div>
  );
}

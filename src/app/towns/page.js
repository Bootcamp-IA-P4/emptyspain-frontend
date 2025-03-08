"use client";
import { useAuth } from "../../context/authContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getPueblos } from "../../services/api";
import TownForm from "../components/TownForm";
import TownCard from "../components/TownCard";

export default function TownsList() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [pueblos, setPueblos] = useState([]);
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchPueblos = async () => {
      const data = await getPueblos();
      setPueblos(data);
    };

    fetchPueblos();
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-4xl font-bold text-center mb-8 text-indigo-600">
        Listado de Pueblos
      </h2>

      {user?.tipo_usuario === "editor" && <TownForm setPueblos={setPueblos} />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pueblos.map((pueblo) => (
          <div
            key={pueblo.id}
            onClick={() => router.push(`/towns/${pueblo.id}`)}
            className="cursor-pointer"
          >
            <TownCard
              pueblo={pueblo}
              favorite={favorites[pueblo.id]}
              user={user}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

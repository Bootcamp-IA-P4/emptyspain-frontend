"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { useRouter } from "next/navigation";
import { getPueblos, getFavoritos, toggleFavorito } from "../../services/api";
import TownForm from "../components/TownForm";
import TownCard from "../components/TownCard";

export default function TownsList() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [pueblos, setPueblos] = useState([]);
  const [favoritos, setFavoritos] = useState(new Set());

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchData = async () => {
      const pueblosData = await getPueblos();
      setPueblos(pueblosData);
      if (user) {
        const favoritosData = await getFavoritos(user.id);
        setFavoritos(new Set(favoritosData.map((fav) => fav.pueblo)));
      }
    };
    fetchData();
  }, [user]);

  const handleFavoriteToggle = async (puebloId) => {
    if (!user || user.tipo_usuario !== "visualizador") return;
    const updatedFavoritos = new Set(favoritos);
    if (favoritos.has(puebloId)) {
      updatedFavoritos.delete(puebloId);
    } else {
      updatedFavoritos.add(puebloId);
    }
    setFavoritos(updatedFavoritos);
    await toggleFavorito(user.id, puebloId);
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-4xl font-bold text-center mb-8 text-indigo-600">
        Listado de Pueblos
      </h2>

      {user?.tipo_usuario === "editor" && <TownForm setPueblos={setPueblos} />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pueblos.map((pueblo) => (
          <TownCard
            key={pueblo.id}
            pueblo={pueblo}
            isFavorite={favoritos.has(pueblo.id)}
            onFavoriteToggle={handleFavoriteToggle}
            user={user}
          />
        ))}
      </div>
    </div>
  );
}

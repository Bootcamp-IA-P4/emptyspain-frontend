"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { useRouter } from "next/navigation";
import {
  getFavoritos,
  getPuebloById,
  toggleFavorito,
} from "../../services/api";
import TownCard from "../components/TownCard";

export default function Favorites() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [favoritos, setFavoritos] = useState([]);
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        setIsLoadingFavorites(true);
        const favoritosData = await getFavoritos(user.id);
        const pueblosData = await Promise.all(
          favoritosData.map(async (fav) => await getPuebloById(fav.pueblo))
        );
        setFavoritos(pueblosData);
        setIsLoadingFavorites(false);
      }
    };
    fetchFavorites();
  }, [user]);

  const handleFavoriteToggle = async (puebloId) => {
    if (!user || user.tipo_usuario !== "visualizador") return;

    const updatedFavoritos = favoritos.filter(
      (pueblo) => pueblo.id !== puebloId
    );
    setFavoritos(updatedFavoritos);

    await toggleFavorito(user.id, puebloId);
  };

  if (loading || isLoadingFavorites)
    return (
      <p className="text-center text-lg text-gray-600 mt-20 animate-pulse">
        Cargando...
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-4xl font-bold text-center mb-8 text-red-500">
        Mis Pueblos Favoritos
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {favoritos.length > 0 ? (
          favoritos.map((pueblo) => (
            <TownCard
              key={pueblo.id}
              pueblo={pueblo}
              isFavorite={true}
              onFavoriteToggle={handleFavoriteToggle}
              user={user}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 mt-10">
            No tienes pueblos favoritos aún.
          </p>
        )}
      </div>
    </div>
  );
}

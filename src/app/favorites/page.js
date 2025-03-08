"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { useRouter } from "next/navigation";
import { getFavoritos, getPuebloById } from "../../services/api";
import TownCard from "../components/TownCard";

export default function Favorites() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        const favoritosData = await getFavoritos(user.id);
        const pueblosData = await Promise.all(
          favoritosData.map(async (fav) => await getPuebloById(fav.pueblo))
        );
        setFavoritos(pueblosData);
      }
    };
    fetchFavorites();
  }, [user]);

  if (loading) return <p>Cargando...</p>;

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
              user={user}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">
            No tienes pueblos favoritos aún.
          </p>
        )}
      </div>
    </div>
  );
}

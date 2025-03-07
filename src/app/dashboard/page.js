"use client";
import { useAuth } from "../../context/authContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getPueblos } from "../../services/api";
import { HeartIcon as HeartOutline } from '@heroicons/react/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/solid';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [pueblos, setPueblos] = useState([]);
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchPueblos = async () => {
      const data = await getPueblos();
      setPueblos(data);
    };

    fetchPueblos();
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [id]: !prevFavorites[id],
    }));
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-4xl font-bold text-center mb-8 text-indigo-600">
        Listado de Pueblos
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pueblos.map((pueblo) => (
          <div
            key={pueblo.id}
            className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 relative"
          >
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">
              {pueblo.nombre}
            </h3>
            <p className="text-gray-700 mb-1">
              <strong>Provincia:</strong> {pueblo.provincia}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Comunidad Autónoma:</strong> {pueblo.comunidad_autonoma}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Población:</strong> {pueblo.poblacion}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Superficie (km²):</strong> {pueblo.superficie_km2}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Densidad de Población:</strong> {pueblo.densidad_poblacion}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Código INE:</strong> {pueblo.codigo_ine}
            </p>
            <p className="text-gray-700">
              <strong>Clasificación de Zona:</strong>{" "}
              {pueblo.clasificacion_zona}
            </p>
            <button
              onClick={() => toggleFavorite(pueblo.id)}
              className="absolute top-4 right-4"
            >
              {favorites[pueblo.id] ? (
                <HeartSolid className="h-6 w-6 text-red-500" />
              ) : (
                <HeartOutline className="h-6 w-6 text-gray-500 hover:text-red-500" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

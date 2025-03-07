"use client";
import { useAuth } from "../../context/authContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getPueblos, addPueblo } from "../../services/api";
// import { HeartIcon as HeartOutline } from "@heroicons/react/outline";
// import { HeartIcon as HeartSolid } from "@heroicons/react/solid";
import TownForm from "../components/TownForm";
import TownCard from "../components/TownCard";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [pueblos, setPueblos] = useState([]);
  const [favorites, setFavorites] = useState({});
  const [newPueblo, setNewPueblo] = useState({
    nombre: "",
    provincia: "",
    comunidad_autonoma: "",
    poblacion: "",
    superficie_km2: "",
    densidad_poblacion: "",
    codigo_ine: "",
    clasificacion_zona: "",
  });

  // Estado para mostrar el mensaje de éxito
  const [successMessage, setSuccessMessage] = useState("");

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

      {/* Mostrar mensaje de éxito */}
      {successMessage && (
        <div className="bg-green-500 text-white p-4 rounded-lg text-center mb-6">
          {successMessage}
        </div>
      )}

      {user?.tipo_usuario === "editor" && (
        <TownForm
          setSuccessMessage={setSuccessMessage}
          setPueblos={setPueblos}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pueblos.map((pueblo) => (
          <TownCard
            key={pueblo.id}
            pueblo={pueblo}
            toggleFavorite={toggleFavorite}
            favorite={favorites[pueblo.id]}
            user={user}
          />
        ))}
      </div>
    </div>
  );
}

"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "../../../context/authContext";
import { getPuebloById, getPuebloGaleria } from "../../../services/api";
import Image from "next/image";

export default function TownDetail() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { id } = useParams();
  const [pueblo, setPueblo] = useState(null);
  const [galeria, setGaleria] = useState(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      const puebloData = await getPuebloById(id);
      const galeriaData = await getPuebloGaleria(id);
      setPueblo(puebloData);
      setGaleria(galeriaData);
    };
    fetchData();
  }, [id]);

  if (loading || !pueblo) return <p>Cargando...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-4xl font-bold text-center mb-8 text-indigo-600">
        {pueblo.nombre}
      </h2>
      <div className="flex gap-8 justify-center">
        {galeria && (
          <img
            src={galeria.url_foto}
            alt={galeria.descripcion}
            width={400}
            height={300}
            className="rounded-lg"
          />
        )}
        <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 relative">
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
            <strong>Clasificación de Zona:</strong> {pueblo.clasificacion_zona}
          </p>
        </div>
      </div>
    </div>
  );
}

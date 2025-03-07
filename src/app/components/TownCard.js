import { HeartIcon as HeartOutline } from "@heroicons/react/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/solid";

export default function TownCard({ pueblo, toggleFavorite, favorite, user }) {
  return (
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

      {user?.tipo_usuario === "visualizador" && (
        <button
          onClick={() => toggleFavorite(pueblo.id)}
          className="absolute top-4 right-4"
        >
          {favorite ? (
            <HeartSolid className="h-6 w-6 text-red-500" />
          ) : (
            <HeartOutline className="h-6 w-6 text-gray-500 hover:text-red-500" />
          )}
        </button>
      )}
    </div>
  );
}

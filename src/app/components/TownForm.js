import { useState } from "react";
import { addPueblo, getPueblos } from "../../services/api";

export default function TownForm({ setSuccessMessage, setPueblos }) {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPueblo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddPueblo = async (e) => {
    e.preventDefault();
    try {
      await addPueblo(newPueblo);
      // Refrescar el listado después de agregar el pueblo
      const updatedPueblos = await getPueblos();
      setPueblos(updatedPueblos);
      setNewPueblo({
        nombre: "",
        provincia: "",
        comunidad_autonoma: "",
        poblacion: "",
        superficie_km2: "",
        densidad_poblacion: "",
        codigo_ine: "",
        clasificacion_zona: "",
      });

      // Mostrar mensaje de éxito
      setSuccessMessage("¡Enhorabuena! Tu pueblo ha sido añadido al listado.");
    } catch (error) {
      console.error("Error al agregar pueblo:", error);
    }
  };

  return (
    <form
      onSubmit={handleAddPueblo}
      className="bg-white p-6 rounded-lg shadow-lg mb-8"
    >
      <h3 className="text-2xl font-semibold text-indigo-600 mb-4">
        Agregar Pueblo
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(newPueblo).map((key) => (
          <input
            key={key}
            type={
              key === "poblacion" ||
              key === "superficie_km2" ||
              key === "densidad_poblacion"
                ? "number"
                : "text"
            }
            name={key}
            value={newPueblo[key]}
            onChange={handleInputChange}
            placeholder={
              key.charAt(0).toUpperCase() + key.slice(1).replace("_", " ")
            }
            className="p-2 border border-gray-300 rounded"
            required
          />
        ))}
      </div>
      <button
        type="submit"
        className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
      >
        Agregar Pueblo
      </button>
    </form>
  );
}

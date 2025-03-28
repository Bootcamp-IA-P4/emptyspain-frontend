import axios from "axios";

const API_PUEBLOS = "http://localhost:8000/api/pueblos/";
const API_GALERIA = "http://localhost:8000/api/galeria-fotos/";
const API_FAVORITOS = "http://localhost:8000/api/favoritos/";

export const getPueblos = async () => {
  try {
    const response = await axios.get(API_PUEBLOS);
    return response.data;
  } catch (error) {
    console.error("Error fetching pueblos:", error);
    return [];
  }
};

export const addPueblo = async (puebloData) => {
  try {
    const response = await axios.post(API_PUEBLOS, puebloData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding pueblo:", error);
    throw new Error("No se pudo agregar el pueblo");
  }
};

// Obtener detalles de un pueblo por ID
export const getPuebloById = async (id) => {
  try {
    const response = await axios.get(`${API_PUEBLOS}${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching pueblo with ID ${id}:`, error);
    return null;
  }
};

// Obtener galería de un pueblo por ID
export const getPuebloGaleria = async (id) => {
  try {
    const response = await axios.get(`${API_GALERIA}${id}/`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching gallery for pueblo with ID ${id}:`, error);
    return null;
  }
};

// Obtener los pueblos favoritos de un usuario
export const getFavoritos = async (userId) => {
  try {
    const response = await axios.get(`${API_FAVORITOS}?usuario=${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching favoritos:", error);
    return [];
  }
};

// Alternar favorito (añadir o quitar)
export const toggleFavorito = async (userId, puebloId) => {
  try {
    const favoritos = await getFavoritos(userId);
    const favoritoExistente = favoritos.find((fav) => fav.pueblo === puebloId);

    if (favoritoExistente) {
      await axios.delete(`${API_FAVORITOS}${favoritoExistente.id}/`);
    } else {
      await axios.post(
        API_FAVORITOS,
        { usuario: userId, pueblo: puebloId },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Error toggling favorito:", error);
  }
};

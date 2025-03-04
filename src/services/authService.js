import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Interceptor para incluir el token en cada solicitud
api.interceptors.request.use((config) => {
  const token = Cookies.get("token"); // Leer el token desde cookies
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = async (userData) => {
  try {
    const response = await api.post("/register/", userData);
    return response.data;
  } catch (error) {
    console.error("Error al registrar:", error.response?.data || error);
    throw error.response?.data || "Error en el registro";
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post("/login/", credentials);
    Cookies.set("token", response.data.access, { expires: 7 }); // Guardar en cookies con duración de 7 días
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error en el login";
  }
};

export const getProfile = async () => {
  try {
    const token = Cookies.get("token"); // Obtener token de cookies
    if (!token) throw "No hay token disponible";

    const response = await api.get("/profile/", {
      headers: { Authorization: `Bearer ${token}` }, // Enviar token manualmente
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || "Error obteniendo perfil";
  }
};

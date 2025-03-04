import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Interceptor para incluir el token en cada solicitud
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
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
    throw error.response?.data || "Error en el registro";
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post("/login/", credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error en el login";
  }
};

export const getProfile = async () => {
  try {
    const response = await api.get("/profile/");
    return response.data;
  } catch (error) {
    throw error.response?.data || "Error obteniendo perfil";
  }
};

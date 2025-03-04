"use client";
import { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { login, getProfile } from "@/services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const token = Cookies.get("token");
      if (token) {
        try {
          const userData = await getProfile();
          setUser(userData);
        } catch (error) {
          console.error("Error obteniendo usuario:", error);
          Cookies.remove("token"); // Si hay error, eliminamos el token
        }
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const data = await login(credentials);
      if (data.access) {
        const userData = await getProfile();
        setUser(userData);
      }
      return data;
    } catch (error) {
      return { error };
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

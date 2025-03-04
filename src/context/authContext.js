"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { login, getProfile } from "@/services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getProfile()
        .then(setUser)
        .catch(() => localStorage.removeItem("token"));
    }
    setLoading(false);
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const data = await login(credentials);
      if (data.access) {
        localStorage.setItem("token", data.access);
        const userData = await getProfile();
        setUser(userData);
      }
      return data;
    } catch (error) {
      return { error };
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

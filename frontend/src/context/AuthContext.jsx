import { createContext, useState, useEffect } from "react";
import * as authService from "../services/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const login = async (formData) => {
    try {
      const data = await authService.login(formData);
      setUser({ email: formData.email });
      setToken(data.access_token);
      localStorage.setItem("user", JSON.stringify({ email: formData.email }));
      localStorage.setItem("token", data.access_token);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const register = async (formData) => {
    try {
      const data = await authService.register(formData);
      setUser({ email: formData.email });
      setToken(data.access_token);
      localStorage.setItem("user", JSON.stringify({ email: formData.email }));
      localStorage.setItem("token", data.access_token);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


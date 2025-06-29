import { createContext, useState, useEffect } from "react";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);
  const login = ({ email }) => {
    const fakeUser = { id: Date.now(), email };
    localStorage.setItem("user", JSON.stringify(fakeUser));
    setUser(fakeUser);
  };
  const register = ({ email }) => {
    const fakeUser = { id: Date.now(), email };
    localStorage.setItem("user", JSON.stringify(fakeUser));
    setUser(fakeUser);
  };
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


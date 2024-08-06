import React, { createContext, useContext, useEffect } from "react";
import { UserContext } from "./UserContext";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { setLoggedInUser } = useContext(UserContext);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setLoggedInUser(storedUser);
    }
  }, [setLoggedInUser]);

  const login = (user) => {
    setLoggedInUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setLoggedInUser({});
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

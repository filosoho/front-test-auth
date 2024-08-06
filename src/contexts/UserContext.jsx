import React, { useState, useEffect, createContext } from "react";
import { fetchUsers } from "../services/api";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [users, setUsers] = useState({});

  useEffect(() => {
    fetchUsers().then((userList) => {
      const usersMap = userList.reduce((acc, user) => {
        acc[user.username] = user;
        return acc;
      }, {});
      setUsers(usersMap);
    });
  }, []);

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser, users }}>
      {children}
    </UserContext.Provider>
  );
};

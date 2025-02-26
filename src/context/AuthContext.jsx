import React, { createContext, useContext, useEffect, useState } from 'react';
import { verifyTokenRequest } from '../api/auth';
// import socket from '../api/socket';

const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);



  const login = (userData) => {
    console.log(userData)
    setUser(userData);
    setIsAuth(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuth(false);
    localStorage.removeItem("token-chofer");
    setLoading(false)
  };

  useEffect(() => {
    async function checkLogin() {
      const token = localStorage.getItem("token-chofer");
      if (!token) {
        setIsAuth(false);
        setLoading(false);
        return setUser(null);
      }
      try {
        const res = await verifyTokenRequest(token);
        if (!res.data) {
          setIsAuth(false);
          setLoading(false);
          return;
        }

        setIsAuth(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuth(false);
        setUser(null);
        setLoading(false);
      }
    }

    checkLogin();
  }, []);
console.log("authContext user: " + user)
console.log("authContext isAuth: " + isAuth)
console.log("authContext token: " + localStorage.getItem("token-chofer"))

  return (
    <AuthContext.Provider value={{ user, isAuth, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

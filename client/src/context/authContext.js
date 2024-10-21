import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('googleToken');
    if (token) {
      try {
        const userObject = jwtDecode(token);
        setUser(userObject);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
    setLoading(false);
  }, []);

  const login = (userObject) => {
    setIsAuthenticated(true);
    setUser(userObject);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('googleToken');
    window.google.accounts.id.revoke(); 
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, user, login, logout }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

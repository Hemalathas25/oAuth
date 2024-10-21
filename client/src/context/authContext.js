import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const isTokenExpired = (token) => {
    const { exp } = jwtDecode(token);
    return exp * 1000 < Date.now();
  }

  useEffect(() => {
    const token = localStorage.getItem('googleToken');
    if ( token && typeof token === 'string' && token.split('.').length === 3) {
      if (!isTokenExpired(token)) {
      try {
        const userObject = jwtDecode(token);
        setUser(userObject);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Failed to decode token:", error);
        localStorage.removeItem('googleToken');
      }
    } else {
      console.error("Token has expired.");
      localStorage.removeItem('googleToken');
    }
  }

    setLoading(false);
  }, []);

  const login = (token) => {
    if (typeof token !== 'string' || token.split('.').length !== 3){
      console.error("Invalid token format", token);
      return;
    }
    localStorage.setItem('googleToken', token);
    const userObject = jwtDecode(token);
    setUser(userObject);
    setIsAuthenticated(true);
  };

  const logout =  () => {
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

import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null represents the initial loading state
  const [loading, setLoading] = useState(true); // Set loading to true initially

  useEffect(() => {
    const checkAuthStatus = () => {
      setLoading(true); // Start loading
      const token = localStorage.getItem('token');
      
      // Simulate token validity check (you can add expiry check logic here)
      setTimeout(() => {
        setIsAuthenticated(!!token); // Update the authentication status based on the presence of a token
        setLoading(false); // Stop loading after check
      }, 1000); // Simulating async behavior (you can remove this delay for real scenarios)
    };

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

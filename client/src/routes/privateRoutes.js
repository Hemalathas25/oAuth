import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/authContext'; 

const PrivateRoute = () => {
  const { authState } = useContext(AuthContext);
  const { accessToken } = authState || {}; 

  // Render children or redirect based on authentication
  return accessToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

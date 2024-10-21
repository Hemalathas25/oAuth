import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/authContext'; 
import {jwtDecode} from 'jwt-decode';

const PrivateRoute = () => {
  const { authState } = useContext(AuthContext);
  const { accessToken } = authState || {};

  let isTokenValid = false;

  if (accessToken) {
    const decodedToken = jwtDecode(accessToken);
    const currentTime = Date.now() / 1000;
    isTokenValid = decodedToken.exp > currentTime; 
  }

  return isTokenValid ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// PrivateRoute component that checks if the user is authenticated
const PrivateRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;

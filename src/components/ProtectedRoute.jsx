import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/auth" />;
  }

  return children;
};

export default ProtectedRoute;
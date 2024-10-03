import React from 'react';
import { Navigate } from 'react-router-dom';
import  useAuth from '../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuth();
// console.log(isAuthenticated, "isAuthenticated")
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;

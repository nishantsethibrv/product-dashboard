// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import  useAuth from '../hooks/useAuth'; // Assuming you have an authentication hook or context

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // If the user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the child components (e.g., Dashboard)
  return children;
};

export default ProtectedRoute;

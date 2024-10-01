// src/routes/index.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/Login/LoginPage';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import RouteAuth from '../components/RouteAuth'; // Import the ProtectedRoute

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<LoginPage />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <RouteAuth>
            <DashboardPage />
          </RouteAuth>
        }
      />


      {/* You can add more protected routes as needed */}
    </Routes>
  );
};

export default AppRoutes;

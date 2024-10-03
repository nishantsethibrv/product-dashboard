import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/Login/LoginPage';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import RouteAuth from '../components/RouteAuth'; // Import the ProtectedRoute
import ProductList from '../components/Products/EditListingProduct';
import EditProduct from '../components/Products/EditProduct';
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route
        path="/dashboard"
        element={
          <RouteAuth>
            <DashboardPage />
          </RouteAuth>
        }
      />
      <Route path="/products" element={<ProductList />} />
      <Route path="/edit-product/:productId" element={<EditProduct />} />


    </Routes>
  );
};

export default AppRoutes;

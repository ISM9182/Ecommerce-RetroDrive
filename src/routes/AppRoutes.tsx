import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import ProductsPage from '../pages/ProductsPage';
import ProductFormPage from '../pages/ProductFormPage'; 
import CategoriesPage from '../pages/CategoriesPage';
import CategoryFormPage from '../pages/CategoryFormPage';
import SuppliersPage from '../pages/SuppliersPage';
import SupplierFormPage from '../pages/SupplierFormPage';
import ClientsPage from '../pages/ClientsPage';
import ClientFormPage from '../pages/ClientFormPage';
import NotFoundPage from '../pages/NotFoundPage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/new" element={<ProductFormPage />} />
      <Route path="/products/edit/:id" element={<ProductFormPage />} />

      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/categories/new" element={<CategoryFormPage />} />
      <Route path="/categories/edit/:id" element={<CategoryFormPage />} />

      <Route path="/suppliers" element={<SuppliersPage />} />
      <Route path="/suppliers/new" element={<SupplierFormPage />} />
      <Route path="/suppliers/edit/:id" element={<SupplierFormPage />} />

      <Route path="/clients" element={<ClientsPage />} />
      <Route path="/clients/new" element={<ClientFormPage />} />
      <Route path="/clients/edit/:id" element={<ClientFormPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
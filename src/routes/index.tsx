import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import SpacesPage from '../pages/SpacesPage';
import DashboardPage from '../pages/DashboardPage';
import MyBoard from '../pages/MyBoard';
import WelcomePage from '../pages/WelcomePage';
import NotFoundPage from '../pages/NotFoundPage';
import { useAuthStore } from '../store/authStore';

export const AppRoutes = () => {
  const { user } = useAuthStore();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<WelcomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/spaces" element={<SpacesPage />} />
      <Route path="/login" element={
        user ? <Navigate to="/home" replace /> : <LoginPage />
      } />
      <Route path="/register" element={
        user ? <Navigate to="/home" replace /> : <RegisterPage />
      } />

      {/* Protected routes */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute requiredPermission="dashboard.view">
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-board"
        element={
          <ProtectedRoute requiredPermission="myboard.view">
            <MyBoard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
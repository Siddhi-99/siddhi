import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, requireAdmin = false, requireUser = false }) => {
  const { isAuthenticated, isAdmin, isUser, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated()) {
    if (requireAdmin) {
      return <Navigate to="/admin/admin-login" state={{ from: location }} replace />;
    } else {
      return <Navigate to="/user-login" state={{ from: location }} replace />;
    }
  }

  // If admin required but user is not admin
  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/" replace />;
  }

  // If user required but user is not regular user
  if (requireUser && !isUser()) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

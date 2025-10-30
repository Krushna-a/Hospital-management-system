import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { isLoggedIn, userRole, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/auth" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // If user's role is not in the allowed list, redirect.
    return <Navigate to="/" replace />;
  }

  // If logged in and role is allowed, render the nested routes.
  return <Outlet />;
};

export default ProtectedRoute;
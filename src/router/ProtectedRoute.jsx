import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ProtectedRoute = ({ children, requireAuth = true }) => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <LoadingSpinner fullscreen />;
    }

    if (requireAuth && !isAuthenticated) {
        // Redirect to login page, but save the attempted location
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!requireAuth && isAuthenticated) {
        // If route is public-only (like login/register) and user is authenticated
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default ProtectedRoute;

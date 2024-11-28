import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useRoleAccess } from '../../hooks/useRoleAccess';
import { useAuthStore } from '../../store/authStore';
import { useToast } from '../../hooks/useToast';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredPermission
}) => {
  const { user, isLoading } = useAuthStore();
  const { hasPermission } = useRoleAccess();
  const location = useLocation();
  const { toast } = useToast();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    toast.error('Please login to access this page');
    // Save the current location for redirect after login
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (requiredPermission && !hasPermission(requiredPermission as any)) {
    toast.error('You do not have permission to access this page');
    // Redirect to appropriate page based on user role
    const redirectPath = user.role === 'admin' ? '/dashboard' 
      : user.role === 'owner' ? '/my-board'
      : '/home';
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};
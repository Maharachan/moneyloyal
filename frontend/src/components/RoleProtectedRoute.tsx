import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth-contexts';

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: Array<'ADMIN' | 'CASHIER' | 'USER'>;
  redirectTo?: string;
}

const RoleProtectedRoute = ({ 
  children, 
  allowedRoles, 
  redirectTo = '/dashboard' 
}: RoleProtectedRouteProps) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default RoleProtectedRoute; 
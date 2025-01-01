import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import ForgotPassword from '../pages/auth/Forgot';
import Dashboard from '../pages/dashboard';
import AuthRoute from '../components/AuthRoute';
import Layout from '../components';
import Home from '../pages/Home';
import RoleProtectedRoute from '../components/RoleProtectedRoute';
import RoleManagement from '../pages/admin/AdminDashboard/role-management';
import OfferManagement from '../pages/admin/AdminDashboard/offer-management';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: (
      <AuthRoute>
        <Login />
      </AuthRoute>
    ),
  },
  {
    path: '/signup',
    element: (
      <AuthRoute>
        <Signup />
      </AuthRoute>
    ),
  },
  {
    path: '/forgot-password',
    element: (
      <AuthRoute>
        <ForgotPassword />      
      </AuthRoute>
    ),
  },
  {
    path: "/dashboard/*",
    element: (
      <RoleProtectedRoute allowedRoles={['USER', 'CASHIER', 'ADMIN']}>
        <Layout>
          <Dashboard />
        </Layout>
      </RoleProtectedRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <RoleProtectedRoute 
        allowedRoles={['CASHIER', 'ADMIN']} 
        redirectTo="/dashboard"
      >
        <Layout>
          <OfferManagement />
        </Layout>
      </RoleProtectedRoute>
    ),
  },
  {
    path: "/admin/role-management",
    element: (
      <RoleProtectedRoute 
        allowedRoles={['ADMIN']} 
        redirectTo="/admin"
      >
        <Layout>
          <RoleManagement />
        </Layout>
      </RoleProtectedRoute>
    ),
  }
]);
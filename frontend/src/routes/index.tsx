import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import Dashboard from '../pages/dashboard';
import ProtectedRoute from '../components/ProtectedRoute';
import AuthRoute from '../components/AuthRoute';
import Layout from '../components';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthRoute>
        <Login />
      </AuthRoute>
    ),
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
    path: "/dashboard/*",
    element: (
      <ProtectedRoute>
        <Layout>
          <Dashboard />
        </Layout>
      </ProtectedRoute>
    ),
  },
 
  // Add other protected routes similarly
]);
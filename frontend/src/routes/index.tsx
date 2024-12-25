import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/auth-contexts';
import Home from '../pages/Home'
import Login from '../pages/auth/Login'
import Signup from '../pages/auth/Signup'
import Dashboard from '../pages/dashboard';
import Layout from '../components/index';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard/*"
        element={
        //   <PrivateRoute>
            <Layout>
              <Dashboard />
            </Layout>
        //   </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
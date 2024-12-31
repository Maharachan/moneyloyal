import { useEffect } from 'react';
import { useAuth } from '../contexts/auth-contexts';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export function useVerifyUser() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
            method: 'GET',
            headers: {
              Authorization: localStorage.getItem('token') || '',
            },
        });

        if (!response.ok) {
          throw new Error('Token verification failed');
        }

        const userData = await response.json();
        
        // Verify if stored user data matches the server response
        if (user?.email !== userData.email || user?.role !== userData.role) {
          throw new Error('User data mismatch');
        }
      } catch (error) {
        console.error('Verification failed:', error);
        logout();
        navigate('/login');
        toast.error('Unauthorized');
      }
    };

    verifyToken();
  }, [user, logout, navigate]);
}
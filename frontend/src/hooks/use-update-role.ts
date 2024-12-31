import { useState } from 'react';
import { User } from '../types/user';
import { toast } from 'react-toastify';

interface UpdateRoleResponse {
  message: string;
  user: User;
}

export function useUpdateRole() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateRole = async (userId: number, role: User['role']) => {
    setLoading(true);
    setError(null);
    console.log(userId, role)

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/users/update-role`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token') || '',
          },
          body: JSON.stringify({ id: userId, role: role }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update role');
      }

      const data: UpdateRoleResponse = await response.json();
      return data.user;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update role';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { updateRole, loading, error };
}



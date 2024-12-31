// http://localhost:3000/api/admin/users

import { useState, useEffect } from 'react';
import { type User, type UsersResponse } from '../types/user';

export function useGetUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/users`, {
          headers: {
            Authorization: localStorage.getItem('token') || '',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data: UsersResponse = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
}
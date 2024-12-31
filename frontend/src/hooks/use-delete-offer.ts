import { useState } from 'react';
import { toast } from 'react-toastify';

export function useDeleteOffer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteOffer = async (offerId: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/offers/${offerId}`, {
        method: 'DELETE',
        headers: {
          Authorization: localStorage.getItem('token') || '',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete offer');
      }

      return true;
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      toast.error('An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { deleteOffer, loading, error };
} 
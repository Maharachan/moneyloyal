import { useState } from 'react';
import { type Offer } from '../types/offer';

export function useCreateOffer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createOffer = async (offerData: Omit<Offer, 'id'>) => {
    setLoading(true);
    setError(null);

    // Format the date if it exists
    const formattedData = {
      ...offerData,
      expiresAt: offerData.expiresAt ? new Date(offerData.expiresAt).toISOString() : undefined
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/offers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token') || '',
        },
        body: JSON.stringify(formattedData)
      });

      if (!response.ok) {
        throw new Error('Failed to create offer');
      }

      const newOffer = await response.json();
      return newOffer.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { createOffer, loading, error };
} 
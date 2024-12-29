import { useState, useEffect } from 'react';
import { type Offer, type OffersResponse } from '../types/offer';

export function useOffers() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/offers`, {
          headers: {
            Authorization: localStorage.getItem('token') || '',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch offers');
        }

        const data: OffersResponse = await response.json();
        setOffers(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  return { offers, loading, error };
}
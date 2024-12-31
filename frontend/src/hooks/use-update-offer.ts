import { useState } from 'react';
import { type Offer } from '../types/offer';

export function useUpdateOffer() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateOffer = async (offerId: number, offerData: Partial<Offer>, originalOffer: Offer) => {
    setLoading(true);
    setError(null);

    // Compare and only include changed fields
    const changedData: Partial<Offer> = {};
    (Object.keys(offerData) as Array<keyof Partial<Offer>>).forEach((key) => {
      if (offerData[key] !== originalOffer[key]) {
        // Format the date if it's the expiresAt field
        if (key === 'expiresAt' && offerData.expiresAt) {
          changedData[key] = new Date(offerData.expiresAt).toISOString();
        } else {
          changedData[key] = offerData[key];
        }
      }
    });

    console.log('Changed data:', changedData);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/offers/${offerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token') || '',
        },
        body: JSON.stringify(changedData)
      });

      if (!response.ok) {
        throw new Error('Failed to update offer');
      }

      const updatedOffer = await response.json();
      return updatedOffer.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { updateOffer, loading, error };
} 
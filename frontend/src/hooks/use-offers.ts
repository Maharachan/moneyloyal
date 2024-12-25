import { useState } from 'react';
import { mockOffers } from '../data/offers';
import { type Offer } from '../types/offer';

export function useOffers() {
  const [offers] = useState<Offer[]>(mockOffers);
  return { offers };
}
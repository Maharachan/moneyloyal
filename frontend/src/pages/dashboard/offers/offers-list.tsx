import { type Offer } from '../../../types/offer';
import OfferCard from './offer-card';

interface OffersListProps {
  offers: Offer[];
  onSelect: (offer: Offer) => void;
}

export default function OffersList({ offers, onSelect }: OffersListProps) {
  if (offers.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center text-muted-foreground">
        No offers found
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {offers.map((offer) => (
        <OfferCard key={offer.id} offer={offer} onClick={() => onSelect(offer)} />
      ))}
    </div>
  );
}
import { useState } from 'react';
import { useOffers } from '../../../hooks/use-offers';
import { Input } from '../../../components/ui/input';
import { ScrollArea } from '../../../components/ui/scroll-area';
import OffersList from './offers-list';
import OfferDialog from './offer-dialog';
import { type Offer } from '../../../types/offer';

export default function Offers() {
  const { offers, loading, error } = useOffers();
  const [search, setSearch] = useState('');
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  const filteredOffers = offers.filter((offer) =>
    offer.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="container p-8">Loading offers...</div>;
  }

  if (error) {
    return <div className="container p-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container space-y-6 p-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Special Offers</h1>
        <p className="text-muted-foreground">
          Browse and redeem exclusive offers to earn rewards.
        </p>
      </div>

      <Input
        placeholder="Search offers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      <ScrollArea className="h-[calc(100vh-200px)]">
        <OffersList
          offers={filteredOffers}
          onSelect={(offer) => setSelectedOffer(offer)}
        />
      </ScrollArea>

      <OfferDialog
        offer={selectedOffer}
        onClose={() => setSelectedOffer(null)}
      />
    </div>
  );
}
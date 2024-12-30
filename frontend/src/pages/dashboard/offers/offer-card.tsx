import { Calendar } from 'lucide-react';
import { Card, CardContent, CardFooter } from '../../../components/ui/card';
import Button from '../../../components/home/common/Button';
import { type Offer } from '../../../types/offer';
import { formatDate } from '../../../utils/Utils';
import { useState } from 'react';

interface OfferCardProps {
  offer: Offer;
  onClick?: () => void;
}

export default function OfferCard({ offer, onClick }: OfferCardProps) {
  const [imageError, setImageError] = useState(false);
  const defaultImage = 'https://images.unsplash.com/photo-1509042239860-f550ce710b93';

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-video w-full">
        <img
          src={imageError ? defaultImage : (offer.image || defaultImage)}
          alt={offer.name}
          className="h-full w-full object-cover"
          onError={() => setImageError(true)}
          loading="lazy"
        />
      </div>
      <CardContent className="space-y-4 p-6">
        <div>
          <h3 className="font-semibold">{offer.name}</h3>
          <p className="text-sm text-muted-foreground">{offer.description}</p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">Expires {formatDate(offer.expiresAt)}</span>
          <span className="ml-auto inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
            {offer.discountPercentage}% OFF
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button onClick={onClick} className="w-full">
          View Offer
        </Button>
      </CardFooter>
    </Card>
  );
}
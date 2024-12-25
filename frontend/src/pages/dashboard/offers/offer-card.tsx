import { Calendar } from 'lucide-react';
import { Card, CardContent, CardFooter } from '../../../components/ui/card';
import Button from '../../../components/home/common/Button';
import { type Offer } from '../../../types/offer';
import { formatDate } from '../../../utils/Utils';

interface OfferCardProps {
  offer: Offer;
  onClick?: () => void;
}

export default function OfferCard({ offer, onClick }: OfferCardProps) {
  return (
    <Card className="overflow-hidden">
      <img
        src={offer.image}
        alt={offer.title}
        className="aspect-video w-full object-cover"
      />
      <CardContent className="space-y-4 p-6">
        <div>
          <h3 className="font-semibold">{offer.title}</h3>
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
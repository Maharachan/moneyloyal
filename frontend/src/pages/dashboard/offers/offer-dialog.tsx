import { QRCodeSVG } from 'qrcode.react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import { type Offer } from '../../../types/offer';
import { formatDate } from '../../../utils/Utils';

interface OfferDialogProps {
  offer: Offer | null;
  onClose: () => void;
}

export default function OfferDialog({ offer, onClose }: OfferDialogProps) {
  if (!offer) return null;

  const qrValue = offer.redemptionCode;

  return (
    <Dialog open={!!offer} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>{offer.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <QRCodeSVG value={qrValue} size={200} />
            <div className="text-center text-sm text-muted-foreground">
              <p>Scan this QR code to redeem the offer</p>
              <p>Expires {formatDate(offer.expiresAt)}</p>
            </div>
          </div>
          <div className="rounded-lg bg-muted p-4 text-center bg-slate-300">
            <p className="font-mono text-sm ">Code: {offer.redemptionCode}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
import { Button } from "../../../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Pencil, Plus, Trash } from 'lucide-react'
import { useState } from "react"
import { Offer } from "../../../types/offer"
import { useOffers } from "../../../hooks/use-offers"
import { useUpdateOffer } from "../../../hooks/use-update-offer"
import { useDeleteOffer } from "../../../hooks/use-delete-offer"
import { useCreateOffer } from "../../../hooks/use-create-offer"
import { toast } from "react-toastify"


export default function OfferManagement() {
  const { offers, loading: fetchingOffers } = useOffers();
  const { updateOffer, loading: updating } = useUpdateOffer();
  const { createOffer, loading: creating } = useCreateOffer();
  const { deleteOffer, loading: deleting } = useDeleteOffer();
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  const handleSave = async (offerData: Partial<Offer>) => {
    try {
      if (selectedOffer) {
        await updateOffer(selectedOffer.id, offerData, selectedOffer);
        toast.success('Offer updated successfully', {
          onClose: () => window.location.reload()
        });
      } else {
        await createOffer(offerData as Omit<Offer, 'id'>);
        toast.success('Offer created successfully', {
          onClose: () => window.location.reload()
        });
      }
      setSelectedOffer(null);
    } catch (error) {
      toast.error('Failed to save offer');
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteOffer(id);
      toast.success('Offer deleted successfully', {
        onClose: () => window.location.reload()
      });
    } catch (error) {
      toast.error('Failed to delete offer');
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (fetchingOffers) {
    return <div>Loading offers...</div>
  }

  return (
    <div className="container space-y-6 p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Offer Management</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button disabled={creating || updating}>
              <Plus className="h-4 w-4 mr-2" />
              New Offer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Offer</DialogTitle>
            </DialogHeader>
            <OfferForm onSave={handleSave} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="p-6 bg-white rounded-lg border border-gray-200 space-y-4"
          >
            {offer.image && (
              <div className="relative w-full h-48 mb-4">
                <img
                  src={offer.image}
                  alt={offer.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            )}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{offer.name}</h3>
                <p className="text-sm text-gray-500">{offer.description}</p>
                <div className="mt-2">
                  <p className="text-sm">Points: {offer.points}</p>
                  <p className="text-sm">Discount: {offer.discountPercentage}%</p>
                  <p className="text-sm">Code: {offer.redemptionCode}</p>
                  {offer.expiresAt && (
                    <p className="text-sm">Expires: {formatDate(offer.expiresAt)}</p>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setSelectedOffer(offer)}
                      disabled={updating}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Offer</DialogTitle>
                    </DialogHeader>
                    <OfferForm offer={offer} onSave={handleSave} />
                  </DialogContent>
                </Dialog>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500"
                  onClick={() => handleDelete(offer.id)}
                  disabled={deleting}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function OfferForm({
  offer,
  onSave,
}: {
  offer?: Offer
  onSave: (offer: Partial<Offer>) => void
}) {
  const [formData, setFormData] = useState({
    name: offer?.name || "",
    description: offer?.description || "",
    points: offer?.points || 0,
    discountPercentage: offer?.discountPercentage || 0,
    expiresAt: offer?.expiresAt ? new Date(offer.expiresAt).toISOString().split('T')[0] : "",
    redemptionCode: offer?.redemptionCode || "",
    image: offer?.image || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="image">Image URL</Label>
        <div className="space-y-4">
          {formData.image && (
            <div className="relative w-full h-48">
              <img
                src={formData.image}
                alt="Offer preview"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          )}
          <div className="flex items-center gap-2">
            <Input
              id="image"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setFormData({ ...formData, image: "" })}
              className="shrink-0"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="points">Points</Label>
        <Input
          id="points"
          type="number"
          value={formData.points}
          onChange={(e) => setFormData({ ...formData, points: Number(e.target.value) })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="discountPercentage">Discount Percentage</Label>
        <Input
          id="discountPercentage"
          type="number"
          value={formData.discountPercentage}
          onChange={(e) => setFormData({ ...formData, discountPercentage: Number(e.target.value) })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="redemptionCode">Redemption Code</Label>
        <Input
          id="redemptionCode"
          value={formData.redemptionCode}
          onChange={(e) => setFormData({ ...formData, redemptionCode: e.target.value })}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="expiresAt">Expiration Date</Label>
        <Input
          id="expiresAt"
          type="date"
          value={formData.expiresAt}
          onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        {offer ? "Update" : "Create"} Offer
      </Button>
    </form>
  )
}


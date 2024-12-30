export interface Offer {
  id: number;
  name: string;
  description: string;
  points: number;
  discountPercentage: number;
  expiresAt: string;
  image: string;
  redemptionCode: string;
  createdAt: string;
  updatedAt: string;
}

export interface OffersResponse {
  count: number;
  data: Offer[];
} 
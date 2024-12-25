export interface Offer {
    id: string;
    title: string;
    description: string;
    points: number;
    discountPercentage: number;
    expiresAt: Date;
    image: string;
    redemptionCode: string;
  }
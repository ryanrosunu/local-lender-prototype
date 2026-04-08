export type ItemStatus = 'available' | 'lent' | 'unavailable';

export interface Listing {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  status: ItemStatus;
  price: number;
  imageUrl: string;
  locationDetails: string;
  category: string;
  lenderId: string;
  lenderName: string;
}

export interface ListingFormValues {
  title: string;
  description: string;
  price: number;
  locationDetails: string;
  category: string;
  imageUrl: string;
}

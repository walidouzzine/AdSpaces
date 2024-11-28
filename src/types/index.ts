export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'owner' | 'client';
  createdAt: Date;
}

export interface AdSpace {
  id: string;
  title: string;
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  price: {
    amount: number;
    currency: string;
    period: 'day' | 'week' | 'month';
  };
  dimensions: {
    width: number;
    height: number;
    unit: 'ft' | 'm';
  };
  type: 'digital' | 'transit' | 'billboard' | 'street';
  images: string[];
  ownerId: string;
  availability: {
    start: Date;
    end: Date;
  }[];
  features: string[];
  status: 'available' | 'booked' | 'maintenance';
}

export interface Booking {
  id: string;
  adSpaceId: string;
  clientId: string;
  startDate: Date;
  endDate: Date;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  createdAt: Date;
}
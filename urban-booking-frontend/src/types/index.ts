export interface Slot {
  id: number;
  time: string;
  isAvailable: boolean;
  carpenterId: number;
  carpenterName: string;
}

export interface Booking {
  id: number;
  slotId: number;
  userId: number;
  carpenterId: number;
  bookingTime: string;
  status: 'confirmed' | 'cancelled';
}

export interface Carpenter {
  id: number;
  name: string;
  expertise?: string;
}

import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api'; // Update if your backend runs elsewhere

export interface Slot {
  id: number;
  time: string;
  isAvailable: boolean;
  carpenterId: number;
}

export interface BookingData {
  slotId: number;
  userId: number; // Assume userId is passed or managed
}

// Fetch all available slots
export const fetchAvailableSlots = async (): Promise<Slot[]> => {
  const response = await axios.get(`${API_BASE_URL}/slots`);
  return response.data;
};

// Book a slot
export const bookSlot = async (bookingData: BookingData): Promise<{ success: boolean }> => {
  const response = await axios.post(`${API_BASE_URL}/bookings`, bookingData);
  return response.data;
};

// Fetch booking details by ID (used for review)
export const getBookingDetails = async (bookingId: number) => {
  const response = await axios.get(`${API_BASE_URL}/bookings/${bookingId}`);
  return response.data;
};

// Cancel a booking
export const cancelBooking = async (bookingId: number) => {
  const response = await axios.delete(`${API_BASE_URL}/bookings/${bookingId}`);
  return response.data;
};

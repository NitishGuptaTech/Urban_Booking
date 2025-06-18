// SlotBooking.tsx
import React, { useEffect, useState } from 'react';
import SlotCard from '../components/SlotCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

type Slot = {
  id: number;
  startTime: string;
  endTime: string;
  available: boolean;
  carpenter?: {
    id: number;
    name: string;
  };
};

const SlotBooking: React.FC = () => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const navigate = useNavigate();

  const formatSlotTime = (start: string, end: string) => {
    const startTime = new Date(start).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
    const endTime = new Date(end).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });
    return `${startTime} - ${endTime}`;
  };

  useEffect(() => {
    axios.get('http://localhost:3000/slots/available')
      .then((res) => setSlots(res.data))
      .catch(() => toast.error('❌ Failed to load available slots.'))
      .finally(() => setLoading(false));
  }, []);

  const handleBooking = () => {
    if (!selectedSlot) return;

    setBooking(true);
    axios.post(`http://localhost:3000/slots/book/${selectedSlot.id}`)
      .then(() => {
        const bookedSlots = JSON.parse(localStorage.getItem('bookedSlots') || '[]');
        const updatedBookings = [...bookedSlots, selectedSlot];
        localStorage.setItem('bookedSlots', JSON.stringify(updatedBookings));
        toast.success('✅ Slot booked successfully!');
        navigate('/ReviewBooking');
      })
      .catch((error) => {
        if (error.response?.status === 409) {
          toast.error('⚠️ Slot is already booked. Please choose another.');
        } else {
          toast.error('❌ Booking failed. Please try again later.');
        }
      })
      .finally(() => setBooking(false));
  };

  return (
    <div className="container mx-auto px-4 py-6 min-h-screen bg-white">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">Book Your Time Slot</h2>
      <p className="text-center text-gray-600 mb-6">Select a slot that suits your schedule</p>

      {loading ? (
        <div className="flex justify-center items-center py-40">
          <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <span className="ml-3 text-blue-600 font-medium">Loading slots...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {slots.map((slot) => (
            <SlotCard
              key={slot.id}
              time={formatSlotTime(slot.startTime, slot.endTime)}
              available={slot.available}
              selected={selectedSlot?.id === slot.id}
              onClick={() => {
                if (slot.available) setSelectedSlot(slot);
              }}
              carpenterName={slot.carpenter?.name}
            />
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <button
          disabled={!selectedSlot || booking}
          onClick={handleBooking}
          className={`px-6 py-3 rounded text-white font-semibold transition duration-200 shadow-md
            ${selectedSlot && !booking
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-red-400 cursor-not-allowed'}
          `}
        >
          {booking ? 'Booking...' : 'Confirm Booking'}
        </button>
      </div>
    </div>
  );
};

export default SlotBooking;

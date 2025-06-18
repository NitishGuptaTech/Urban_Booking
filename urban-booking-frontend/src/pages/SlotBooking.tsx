import React, { useEffect, useState } from 'react';
import SlotCard from '../components/SlotCard';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

type Slot = {
  id: string;
  time: string;
  available: boolean;
};

const SlotBooking: React.FC = () => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3000/slots')
      .then((res) => setSlots(res.data))
      .catch(() => toast.error('❌ Failed to load available slots.'))
      .finally(() => setLoading(false));
  }, []);

  const handleBooking = () => {
    if (!selectedSlot) return;

    setBooking(true);
    axios.post('http://localhost:3000/book', { slotId: selectedSlot.id })
      .then(() => {
        localStorage.setItem('selectedSlot', JSON.stringify(selectedSlot));
        toast.success('✅ Slot booked successfully!');
        navigate('/review');
      })
      .catch(() => toast.error('⚠️ Slot already taken or booking failed.'))
      .finally(() => setBooking(false));
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-2">Book Your Time Slot</h2>
      <p className="text-center text-gray-600 mb-6">Select a slot that suits your schedule</p>

      {loading ? (
       <div className="flex justify-center items-center py-40">
    <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    <span className="ml-3 text-blue-600 font-medium">Loading slots...</span>
  </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {slots.map((slot) => (
            <SlotCard
              key={slot.id}
              time={slot.time}
              available={slot.available}
              selected={selectedSlot?.id === slot.id}
              onClick={() => {
                if (slot.available) setSelectedSlot(slot);
              }}
            />
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <button
          disabled={!selectedSlot || booking}
          onClick={handleBooking}
          className={`px-6 py-3 rounded text-white font-semibold transition duration-200 
            ${selectedSlot && !booking
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-400 cursor-not-allowed'
            }`}
        >
          {booking ? 'Booking...' : 'Confirm Booking'}
        </button>
      </div>
    </div>
  );
};

export default SlotBooking;

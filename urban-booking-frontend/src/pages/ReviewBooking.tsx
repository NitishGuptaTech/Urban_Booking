
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { FaTimesCircle, FaCheckCircle, FaUserTie } from 'react-icons/fa';

type Slot = {
  id: number;
  startTime: string;
  endTime: string;
  time?: string;
  carpenter?: {
    id: number;
    name: string;
  };
  isConfirmed?: boolean;
};

const ReviewBooking: React.FC = () => {
  const [bookedSlots, setBookedSlots] = useState<Slot[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [now, setNow] = useState(Date.now());
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('bookedSlots') || '[]');
    setBookedSlots(stored);

    const interval = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(interval);
  }, []);

  const handleCancel = async (slotId: number) => {
    setIsProcessing(true);
    try {
      await axios.post('http://localhost:3000/slots/cancel', { slotId });

      const updated = bookedSlots.filter((s) => s.id !== slotId);
      localStorage.setItem('bookedSlots', JSON.stringify(updated));
      setBookedSlots(updated);

      toast.info('ℹ️ Booking cancelled.');
      setTimeout(() => navigate('/SlotBooking'), 1500);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('❌ Failed to cancel slot. Try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirm = (slotId: number) => {
    const updatedSlots = bookedSlots.map((slot) =>
      slot.id === slotId ? { ...slot, isConfirmed: true } : slot
    );
    setBookedSlots(updatedSlots);
    localStorage.setItem('bookedSlots', JSON.stringify(updatedSlots));
    toast.success('✅ Booking confirmed successfully!');
  };

  const isExpired = (endTime: string) => {
    return new Date(endTime).getTime() < now;
  };

  if (bookedSlots.length === 0) {
    return (
      <div className="p-10 text-center text-red-600 font-semibold text-lg">
        ⚠️ No booked slots to show. Please book a slot first.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
        ✅ Your Booked Slots
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {bookedSlots.map((slot) => (
          <div
            key={slot.id}
            className="bg-white shadow-md hover:shadow-lg transition-shadow border border-blue-200 rounded-xl p-6 text-center relative"
          >
            {/* Confirmed badge */}
            {slot.isConfirmed && !isExpired(slot.endTime) && (
              <div className="absolute top-2 right-2 flex items-center text-green-600 font-medium text-sm">
                <FaCheckCircle className="mr-1" />
                Confirmed
              </div>
            )}

            {isExpired(slot.endTime) && (
              <div className="absolute top-2 right-2 flex items-center text-red-600 font-medium text-sm">
                Expired
              </div>
            )}

            <p className="text-blue-700 text-lg font-semibold mb-2">
              🕒 {slot.time || `${slot.startTime} - ${slot.endTime}`}
            </p>

            <p className="text-gray-600 flex justify-center items-center gap-2 text-sm mb-4">
              <FaUserTie />
              {slot.carpenter?.name || 'Carpenter Not Assigned'}
            </p>

            <button
              disabled={isProcessing || isExpired(slot.endTime)}
              onClick={() => handleCancel(slot.id)}
              className={`mt-2 px-4 py-2 rounded text-white flex items-center justify-center gap-2 mx-auto
              ${isProcessing || isExpired(slot.endTime)
                ? 'bg-red-300 cursor-not-allowed'
                : 'bg-red-500 hover:bg-red-600'}`}
            >
              <FaTimesCircle />
              Cancel Slot
            </button>

            <button
              onClick={() => handleConfirm(slot.id)}
              disabled={slot.isConfirmed || isExpired(slot.endTime)}
              className={`mt-3 px-4 py-2 rounded text-white flex items-center justify-center gap-2 mx-auto
              ${slot.isConfirmed || isExpired(slot.endTime)
                ? 'bg-green-300 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-600'}`}
            >
              <FaCheckCircle />
              {slot.isConfirmed ? 'Confirmed' : 'Confirm Slot'}
            </button>
          </div>
        ))}
      </div>

      <ToastContainer position="top-center" />
    </div>
  );
};

export default ReviewBooking;

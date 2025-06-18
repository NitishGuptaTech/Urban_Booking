import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const ReviewBooking: React.FC = () => {
  const navigate = useNavigate();
  const storedSlot = localStorage.getItem('selectedSlot');
  const selectedSlot = storedSlot ? JSON.parse(storedSlot) : null;

  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirm = () => {
    setIsProcessing(true);
    toast.success('✅ Booking confirmed successfully!');
    localStorage.removeItem('selectedSlot');
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  const handleCancel = async () => {
    if (!selectedSlot) return;

    setIsProcessing(true);
    try {
      await axios.post('http://localhost:3000/cancel', { slotId: selectedSlot.id });
      toast.info('ℹ️ Booking cancelled.');
      localStorage.removeItem('selectedSlot');
      setTimeout(() => navigate('/'), 1500);
    } catch {
      toast.error('❌ Failed to cancel booking.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!selectedSlot) {
    return (
      <div className="p-30 text-center text-red-600 font-semibold text-lg">
        ⚠️ No slot selected. Please book a slot first.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg border border-gray-200 transition-all duration-300">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-2">Review Your Booking</h2>
          <p className="text-gray-600">Please confirm or cancel your selected time slot below.</p>
        </div>

        <div className="bg-blue-50 p-4 rounded-md mb-6 border border-blue-200">
          <p className="text-md text-blue-700 font-medium text-center">
            🕒 <strong>Selected Slot:</strong> {selectedSlot.time}
          </p>
        </div>

        <div className="flex justify-between gap-4">
          <button
            onClick={handleCancel}
            disabled={isProcessing}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded transition 
              ${isProcessing ? 'bg-red-300 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'} text-white`}
          >
            <FaTimesCircle />
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            disabled={isProcessing}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded transition 
              ${isProcessing ? 'bg-green-300 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'} text-white`}
          >
            <FaCheckCircle />
            Confirm
          </button>
        </div>

        <ToastContainer position="top-center" />
      </div>
    </div>
  );
};

export default ReviewBooking;

// SlotCard.tsx
import React from 'react';

interface SlotCardProps {
  time: string;
  carpenterName?: string;
  available: boolean;
  onClick: () => void;
  selected: boolean;
}

const SlotCard: React.FC<SlotCardProps> = ({
  time,
  carpenterName,
  available,
  onClick,
  selected,
}) => {
  return (
    <div
      onClick={available ? onClick : undefined}
      className={`cursor-pointer p-4 rounded-lg text-center font-medium shadow-md border 
        transition-all duration-200 ease-in-out text-sm sm:text-base
        ${
          available
            ? selected
              ? 'bg-blue-100 border-blue-500 text-blue-800'
              : 'bg-green-100 hover:bg-green-200 border-green-400 text-gray-700'
            : 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed'
        }
      `}
    >
      <p className="mb-1 font-semibold">{time}</p>
      {carpenterName && (
        <p className="text-xs text-gray-500">👨‍🔧 {carpenterName}</p>
      )}
    </div>
  );
};

export default SlotCard;

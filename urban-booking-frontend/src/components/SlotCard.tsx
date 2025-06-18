import React from 'react';

type SlotCardProps = {
  time: string;
  available: boolean;
  onClick: () => void;
  selected: boolean;
};

const SlotCard: React.FC<SlotCardProps> = ({ time, available, onClick, selected }) => {
  return (
    <div
      onClick={available ? onClick : undefined}
      className={` rounded-lg cursor-pointer transition-all duration-200 text-center 
        ${available ? 'bg-white hover:bg-blue-100' : 'bg-gray-200 cursor-not-allowed'}
        ${selected ? 'bg-blue-500 text-white' : ''}
      `}
    >
      {time}
    </div>
  );
};

export default SlotCard;

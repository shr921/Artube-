

import React, { useState } from 'react';
import { Short } from '../types';

interface ShortsCardProps {
  short: Short;
  onSelect: (short: Short) => void;
}

export const ShortsCard: React.FC<ShortsCardProps> = ({ short, onSelect }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSubscribed(true);
    // In a real app, you would dispatch an action here.
  };

  return (
    <div 
      onClick={() => onSelect(short)}
      className="relative w-48 flex-shrink-0 aspect-[9/16] rounded-xl overflow-hidden group cursor-pointer"
    >
      <img src={short.thumbnailUrl} alt={short.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      <div className="absolute bottom-0 left-0 p-3 text-white w-full">
        <h3 className="font-bold text-sm line-clamp-2 mb-2">{short.title}</h3>
        <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 overflow-hidden">
                <img src={short.channel.avatarUrl} alt={short.channel.name} className="w-5 h-5 rounded-full flex-shrink-0" />
                <p className="font-semibold truncate">{short.channel.name}</p>
            </div>
            <button
                onClick={handleSubscribe}
                disabled={isSubscribed}
                className="bg-white text-black font-bold px-3 py-1 rounded-full text-xs hover:bg-gray-200 transition-colors flex-shrink-0 ml-2 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
            >
                {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </button>
        </div>
      </div>
    </div>
  );
};
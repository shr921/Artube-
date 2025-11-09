

import React from 'react';
import { CreativeImage } from '../types';

interface ImageCardProps {
  image: CreativeImage;
  onSelect: (image: CreativeImage) => void;
}

export const ImageCard: React.FC<ImageCardProps> = ({ image, onSelect }) => {
  return (
    <div className="flex flex-col group cursor-pointer" onClick={() => onSelect(image)}>
      <div className="relative aspect-video">
        <img src={image.imageUrl} alt={image.title} className="w-full h-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105" />
      </div>
      <div className="flex mt-3">
        <img src={image.channel.avatarUrl} alt={image.channel.name} className="w-9 h-9 rounded-full mr-3" />
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 line-clamp-2">{image.title}</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{image.channel.name}</p>
        </div>
      </div>
    </div>
  );
};
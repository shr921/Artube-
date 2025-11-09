import React from 'react';
import { Video } from '../types';

interface VideoCardProps {
  video: Video;
  onSelect: (video: Video) => void;
}

export const VideoCard: React.FC<VideoCardProps> = ({ video, onSelect }) => {
  return (
    <div className="flex flex-col group cursor-pointer" onClick={() => onSelect(video)}>
      <div className="relative">
        <img src={video.thumbnailUrl} alt={video.title} className="w-full h-auto rounded-lg object-cover transition-transform duration-300 group-hover:scale-105" />
        <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </span>
      </div>
      <div className="flex mt-3">
        <img src={video.channel.avatarUrl} alt={video.channel.name} className="w-9 h-9 rounded-full mr-3" />
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 line-clamp-2">{video.title}</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{video.channel.name}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {video.views} views &bull; {video.uploadedAt}
          </p>
        </div>
      </div>
    </div>
  );
};
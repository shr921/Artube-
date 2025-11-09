


import React from 'react';
import { Short, User } from '../types';
import { Icon } from './Icons';
import { CommentSection } from './CommentSection';

interface ShortsPlayerProps {
  short: Short;
  onClose: () => void;
  currentUser: User | null;
}

export const ShortsPlayer: React.FC<ShortsPlayerProps> = ({ short, onClose, currentUser }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
        <div className="relative max-w-6xl w-full max-h-[90vh] flex bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
            <div className="w-auto bg-black flex items-center justify-center">
                 <video src={short.videoUrl} controls autoPlay loop className="h-full aspect-[9/16] object-contain"></video>
            </div>
            <div className="flex-grow flex flex-col p-6 overflow-y-auto">
                <div className="flex-shrink-0">
                    <h1 className="text-2xl font-bold">{short.title}</h1>
                    <div className="flex items-center justify-between mt-4 flex-wrap gap-4">
                        <div className="flex items-center space-x-3">
                            <img src={short.channel.avatarUrl} alt={short.channel.name} className="w-12 h-12 rounded-full"/>
                            <div>
                                <p className="font-semibold">{short.channel.name}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{short.views} views</p>
                            </div>
                        </div>
                         <button className="bg-pink-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-pink-700">
                            Subscribe
                        </button>
                    </div>

                    <div className="flex items-center space-x-2 my-4">
                        <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full">
                        <button className="flex items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-l-full">
                            <Icon name="like" className="w-5 h-5 mr-2"/> {short.likes.toLocaleString()}
                        </button>
                        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
                        <button className="flex items-center px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-r-full">
                            <Icon name="dislike" className="w-5 h-5 mr-2"/> {short.dislikes.toLocaleString()}
                        </button>
                        </div>
                    </div>
                </div>
                
                <div className="mt-8 flex-grow flex flex-col min-h-0">
                    <CommentSection initialComments={short.comments} currentUser={currentUser} />
                </div>
            </div>
        </div>
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75">
            <Icon name="close" className="w-8 h-8"/>
        </button>
    </div>
  );
};
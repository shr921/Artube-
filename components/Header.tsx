import React from 'react';
import { Icon } from './Icons';
import { User, Theme } from '../types';

interface HeaderProps {
  toggleSidebar: () => void;
  currentUser: User | null;
  onSignInClick: () => void;
  onSignUpClick: () => void;
  onSignOut: () => void;
  onUploadClick: () => void;
  theme: Theme;
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar, currentUser, onSignInClick, onSignUpClick, onSignOut, onUploadClick, theme, toggleTheme }) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 backdrop-blur-sm z-40 h-16 flex items-center px-4 shadow-md border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center flex-shrink-0">
        <button onClick={toggleSidebar} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 mr-2">
          <Icon name="menu" />
        </button>
        <div className="flex items-center">
            <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center">
                <Icon name="play" className="w-5 h-5 text-white"/>
            </div>
            <span className="text-xl font-bold ml-2 tracking-tighter text-gray-800 dark:text-white">CreatiTube</span>
        </div>
      </div>

      <div className="flex-1 flex justify-center px-4 lg:px-16">
        <div className="w-full max-w-2xl relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
            <Icon name="search" className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button
            onClick={toggleTheme}
            className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            aria-label="Toggle theme"
        >
            <Icon name={theme === 'light' ? 'moon' : 'sun'} className="w-6 h-6" />
        </button>
        <button 
          onClick={onUploadClick}
          className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
          aria-label="Upload video"
        >
          <Icon name="upload" className="w-6 h-6" />
        </button>
        {currentUser ? (
          <>
            <button onClick={onSignOut} className="px-4 py-2 text-sm font-semibold text-pink-500 border border-pink-500 rounded-full hover:bg-pink-500 hover:text-white transition">
                Sign Out
            </button>
            <img src={currentUser.avatarUrl} alt={currentUser.name} className="w-10 h-10 rounded-full" />
          </>
        ) : (
          <>
            <button onClick={onSignUpClick} className="px-4 py-2 text-sm font-semibold text-pink-500 border border-pink-500 rounded-full hover:bg-pink-500 hover:text-white transition">
              Sign Up
            </button>
            <button onClick={onSignInClick} className="px-4 py-2 text-sm font-semibold bg-pink-600 text-white rounded-full hover:bg-pink-700 transition">
              Sign In
            </button>
          </>
        )}
      </div>
    </header>
  );
};
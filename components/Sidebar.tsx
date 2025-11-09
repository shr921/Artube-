


import React from 'react';
import { Icon } from './Icons';
import { View, User } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: View;
  onNavigate: (view: View) => void;
  currentUser: User | null;
}

const SidebarItem: React.FC<{ icon: string; label: string; active?: boolean; onClick: () => void; }> = ({ icon, label, active, onClick }) => (
  <button onClick={onClick} className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 w-full text-left ${active ? 'bg-pink-600 text-white font-bold' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}>
    <Icon name={icon} className="w-6 h-6 mr-4" />
    <span>{label}</span>
  </button>
);

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, currentView, onNavigate, currentUser }) => {
  return (
    <>
      <aside className={`fixed top-0 left-0 h-full bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 w-64 pt-20 px-4 z-30 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <nav className="flex flex-col space-y-2">
          <SidebarItem icon="home" label="Home" active={currentView === 'home'} onClick={() => onNavigate('home')} />
          <SidebarItem icon="shorts" label="Shorts" active={currentView === 'shorts'} onClick={() => onNavigate('shorts')} />
          <SidebarItem icon="upload" label="My Creations" active={currentView === 'myCreations'} onClick={() => onNavigate('myCreations')} />
          <SidebarItem icon="library" label="Subscriptions" active={currentView === 'subscriptions'} onClick={() => onNavigate('subscriptions')} />
        </nav>

        {currentUser?.email === 'admin@creati.tube' && (
            <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
                <SidebarItem icon="library" label="Admin" active={currentView === 'admin'} onClick={() => onNavigate('admin')} />
            </div>
        )}

      </aside>
      {isOpen && <div onClick={onClose} className="fixed inset-0 bg-black bg-opacity-50 z-20"></div>}
    </>
  );
};
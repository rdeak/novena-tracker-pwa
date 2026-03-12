import React, { useState } from 'react';
import { PrayerLibraryItem } from '../../types/prayer';

interface HeaderProps {
  currentPage: 'weekly' | 'novena';
  onPageChange: (page: 'weekly' | 'novena') => void;
  onHomeClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  currentPage, 
  onPageChange,
  onHomeClick
}) => {
  const formattedDate = new Intl.DateTimeFormat('hr-HR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-30 safe-top">
      <div className="container mx-auto px-6">
        <div className="h-16 flex items-center justify-between">
          <button 
            onClick={onHomeClick}
            className="flex flex-col text-left focus:outline-none"
          >
            <h1 className="text-xl font-black text-indigo-600 tracking-tight leading-tight">
              Molitveni Dnevnik
            </h1>
            <span className="text-xs font-medium text-gray-400">
              {formattedDate}
            </span>
          </button>
        </div>

        <div className="flex gap-8 pb-1">
          <button 
            onClick={() => onPageChange('weekly')}
            className={`pb-2 text-sm font-bold transition-all border-b-2 ${
              currentPage === 'weekly' 
                ? 'text-indigo-600 border-indigo-600' 
                : 'text-gray-400 border-transparent hover:text-gray-600'
            }`}
          >
            Tjedne molitve
          </button>
          <button 
            onClick={() => onPageChange('novena')}
            className={`pb-2 text-sm font-bold transition-all border-b-2 ${
              currentPage === 'novena' 
                ? 'text-indigo-600 border-indigo-600' 
                : 'text-gray-400 border-transparent hover:text-gray-600'
            }`}
          >
            Devetnice
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

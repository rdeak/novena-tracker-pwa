import React, { useState } from 'react';
import { PrayerCycle } from '../../types/prayer';

interface HeaderProps {
  title: string;
  cycles: PrayerCycle[];
  currentCycleId: string;
  onCycleChange: (id: string) => void;
}

const Header: React.FC<HeaderProps> = ({ title, cycles, currentCycleId, onCycleChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-30 safe-top">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 text-xl font-black text-indigo-600 tracking-tight hover:opacity-80 transition-opacity"
          >
            {title}
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          {isDropdownOpen && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setIsDropdownOpen(false)}
              ></div>
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20 overflow-hidden">
                {cycles.map(cycle => (
                  <button
                    key={cycle.id}
                    onClick={() => {
                      onCycleChange(cycle.id);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 text-sm font-bold transition-colors ${
                      currentCycleId === cycle.id 
                        ? 'bg-indigo-50 text-indigo-600' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {cycle.title}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button className="text-gray-400 hover:text-indigo-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

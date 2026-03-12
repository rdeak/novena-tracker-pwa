import React from 'react';
import { useStore } from '../../store/useStore';

interface FooterProps {
  type: 'weekly' | 'novena';
  totalDays: number;
}

const weeklyDays = [
  { label: 'N', value: 0 },
  { label: 'P', value: 1 },
  { label: 'U', value: 2 },
  { label: 'S', value: 3 },
  { label: 'Č', value: 4 },
  { label: 'P', value: 5 },
  { label: 'S', value: 6 },
];

const Footer: React.FC<FooterProps> = ({ type, totalDays }) => {
  const { currentDayIndex, setCurrentDayIndex } = useStore();
  const items = type === 'weekly' 
    ? weeklyDays 
    : Array.from({ length: totalDays }, (_, i) => ({ label: (i + 1).toString(), value: i + 1 }));

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-100 px-6 py-4 flex justify-between items-center safe-bottom shadow-[0_-1px_10px_rgba(0,0,0,0.05)] z-20 overflow-x-auto">
      <div className="flex justify-between w-full max-w-md mx-auto gap-2">
        {items.map((item) => (
          <button
            key={item.value}
            onClick={() => setCurrentDayIndex(item.value)}
            className={`
              flex-shrink-0 flex flex-col items-center justify-center w-10 h-10 rounded-full transition-all duration-200
              ${currentDayIndex === item.value 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-110' 
                : 'text-gray-400 hover:bg-gray-50'}
            `}
          >
            <span className="text-xs font-bold">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Footer;

import React from 'react';
import { useStore } from '../../store/useStore';

interface PrayerNotFoundProps {
  currentLibraryItemType?: 'weekly' | 'novena';
}

const PrayerNotFound: React.FC<PrayerNotFoundProps> = ({ currentLibraryItemType }) => {
  const { resetToToday } = useStore();
  return (
    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
      <p className="text-gray-400 text-lg">Molitva nije pronađena.</p>
      <button
        onClick={() => resetToToday(currentLibraryItemType)}
        className="mt-4 text-indigo-600 font-bold hover:underline"
      >
        Povratak na početak
      </button>
    </div>
  );
};

export default PrayerNotFound;

import React from 'react';
import { Verse } from '../../types/prayer';

interface PrayerVerseProps {
  verse: Verse;
}

const PrayerVerse: React.FC<PrayerVerseProps> = ({ verse }) => {
  return (
    <div className="flex gap-3 text-sm sm:text-base leading-relaxed mb-2 last:mb-0">
      <span className={`font-bold min-w-[1.25rem] ${verse.role === 'P' ? 'text-indigo-600' : 'text-emerald-600'}`}>
        {verse.role}:
      </span>
      <div className="flex-grow text-gray-700">
        {verse.text}
        {verse.repeat && verse.repeat > 1 && (
          <span className="ml-2 font-medium text-gray-400 italic">({verse.repeat}x)</span>
        )}
      </div>
    </div>
  );
};

export default PrayerVerse;

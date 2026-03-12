import React from 'react';
import { Prayer, Verse } from '../../types/prayer';
import PrayerSection from './PrayerSection';

interface PrayerCardProps {
  prayer: Prayer;
  commonPrayers: Record<string, string | Verse[]>;
  litanies: Record<string, Verse[]>;
}

const PrayerCard: React.FC<PrayerCardProps> = ({ prayer, commonPrayers, litanies }) => {
  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto pb-12">
      <header className="text-center px-4">
        {prayer.day && (
          <div className="text-indigo-600 font-bold text-sm tracking-widest uppercase mb-1">
            {prayer.day}
          </div>
        )}
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2 leading-tight">
          {prayer.title}
        </h2>
        {prayer.theme && (
          <p className="text-lg text-gray-500 italic">
            {prayer.theme}
          </p>
        )}
      </header>

      <div className="space-y-4">
        {prayer.sections.map((section, idx) => (
          <PrayerSection 
            key={idx} 
            section={section} 
            commonPrayers={commonPrayers} 
            litanies={litanies} 
          />
        ))}
      </div>
    </div>
  );
};

export default PrayerCard;

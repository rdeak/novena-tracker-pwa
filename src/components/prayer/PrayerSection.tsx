import React from 'react';
import { Section } from '../../types/prayer';
import PrayerVerse from './PrayerVerse';

interface PrayerSectionProps {
  section: Section;
}

const PrayerSection: React.FC<PrayerSectionProps> = ({ section }) => {
  const getSectionTitle = (type: string) => {
    switch (type) {
      case 'velika_zrnca': return 'Velika zrnca';
      case 'mala_zrnca': return 'Mala zrnca';
      case 'završetak': return 'Završetak';
      default: return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  return (
    <div className="bg-white/60 rounded-xl p-4 mb-4 border border-indigo-100 last:mb-0">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400">
          {getSectionTitle(section.section)}
          {section.repeat && section.repeat > 1 && (
            <span className="ml-1 text-gray-400"> — {section.repeat}x</span>
          )}
        </h4>
        {section.reference && (
          <span className="text-[10px] text-gray-400 italic">{section.reference}</span>
        )}
      </div>
      <div className="space-y-1">
        {section.verses.map((verse, idx) => (
          <PrayerVerse key={idx} verse={verse} />
        ))}
      </div>
    </div>
  );
};

export default PrayerSection;

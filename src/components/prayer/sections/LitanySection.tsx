import React from 'react';
import LitanyCarousel from '../LitanyCarousel';
import PrayerVerse from '../PrayerVerse';
import { SectionProps } from './sectionUtils';
import { Verse } from '../../../types/prayer';

const LitanySection: React.FC<SectionProps> = ({ section, commonPrayers, litanies }) => {
  if (!litanies) return null;

  return (
    <div className="space-y-6">
      {section.verses.map((v, idx) => {
        const verse = typeof v === 'string' ? { role: 'P', text: v } as Verse : v;
        const litany = litanies[verse.text.trim()];
        if (litany) {
          return (
            <LitanyCarousel 
              key={idx} 
              verses={litany} 
              title={verse.text.trim()} 
            />
          );
        }
        return (
          <PrayerVerse 
            key={idx} 
            verse={verse} 
            commonPrayers={commonPrayers} 
            litanies={litanies} 
          />
        );
      })}
    </div>
  );
};

export default LitanySection;

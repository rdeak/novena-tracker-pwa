import React from 'react';
import LitanyCarousel from '../LitanyCarousel';
import PrayerVerse from '../PrayerVerse';
import { SectionProps } from './sectionUtils';

const LitanySection: React.FC<SectionProps> = ({ section, commonPrayers, litanies }) => {
  if (!litanies) return null;

  return (
    <div className="space-y-4">
      {section.verses.map((verse, idx) => {
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

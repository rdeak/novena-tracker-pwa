import React from 'react';
import SectionHeader from './SectionHeader';
import { SectionProps, renderVerses } from './sectionUtils';

export const DailySection: React.FC<SectionProps> = ({ section, commonPrayers, litanies }) => (
  <div className="bg-white/60 rounded-xl p-4 mb-4 border border-indigo-100 last:mb-0">
    <SectionHeader 
      title="Dnevna molitva" 
      repeat={section.repeat} 
      reference={section.reference} 
    />
    <div className="space-y-1 text-lg">
      {renderVerses(section.verses, commonPrayers, litanies)}
    </div>
  </div>
);

export default DailySection;

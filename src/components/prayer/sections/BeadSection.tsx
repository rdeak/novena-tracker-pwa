import React from 'react';
import SectionHeader from './SectionHeader';
import { SectionProps, renderVerses } from './sectionUtils';

export const BeadSection: React.FC<SectionProps & { title: string }> = ({ section, title, commonPrayers, litanies }) => (
  <div className="bg-white/40 rounded-xl p-4 mb-4 border border-indigo-50 last:mb-0 shadow-sm">
    <SectionHeader 
      title={title} 
      repeat={section.repeat} 
      reference={section.reference} 
    />
    <div className="space-y-1">
      {renderVerses(section.verses, commonPrayers, litanies)}
    </div>
  </div>
);

export default BeadSection;

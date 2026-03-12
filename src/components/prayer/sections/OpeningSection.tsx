import React from 'react';
import SectionHeader from './SectionHeader';
import { SectionProps, renderVerses } from './sectionUtils';

export const OpeningSection: React.FC<SectionProps & { title?: string }> = ({ section, title = 'Uvodna molitva', commonPrayers, litanies }) => (
  <div className="bg-indigo-50/50 rounded-xl p-4 mb-4 border border-indigo-100 last:mb-0">
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

export default OpeningSection;

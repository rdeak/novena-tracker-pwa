import React from 'react';
import SectionHeader from './SectionHeader';
import { SectionProps, renderVerses } from './sectionUtils';

export const ClosingSection: React.FC<SectionProps & { title?: string }> = ({ section, title = 'Zaključna molitva', commonPrayers, litanies }) => (
  <div className="bg-emerald-50/50 rounded-xl p-4 mb-4 border border-emerald-100 last:mb-0">
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

export default ClosingSection;

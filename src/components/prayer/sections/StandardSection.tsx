import React from 'react';
import SectionHeader from './SectionHeader';
import { SectionProps, renderVerses } from './sectionUtils';

const StandardSection: React.FC<SectionProps & { title: string }> = ({ section, title, commonPrayers, litanies }) => (
  <div className="bg-white/60 rounded-xl p-4 border border-indigo-100 last:mb-0">
    <SectionHeader 
      title={title} 
      repeat={section.repeat} 
      reference={section.reference} 
    />
    <div className="space-y-5">
      {renderVerses(section.verses, commonPrayers, litanies)}
    </div>
  </div>
);

export default StandardSection;

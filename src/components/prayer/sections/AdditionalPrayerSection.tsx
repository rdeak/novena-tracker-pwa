import React from 'react';
import { SectionProps } from './sectionUtils';

const AdditionalPrayerSection: React.FC<SectionProps> = ({ section }) => {
  return (
    <section className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100 shadow-sm mt-4">
      <div className="flex flex-col gap-1 mb-4">
        <h3 className="text-emerald-800 font-bold flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
          {section.title || 'Dodatna molitva'}
        </h3>
        {section.attribution && (
          <span className="text-xs text-emerald-600/70 italic ml-4">
            — {section.attribution}
          </span>
        )}
      </div>
      <div className="text-gray-700 leading-relaxed italic whitespace-pre-line">
        {section.verses.map((v, idx) => (
          <p key={idx}>{typeof v === 'string' ? v : v.text}</p>
        ))}
      </div>
    </section>
  );
};

export default AdditionalPrayerSection;

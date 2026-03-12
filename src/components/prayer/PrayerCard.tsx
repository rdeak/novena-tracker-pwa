import React from 'react';
import { Prayer } from '../../types/prayer';
import PrayerSection from './PrayerSection';

interface PrayerCardProps {
  prayer: Prayer;
  commonOpening: string[];
}

const PrayerCard: React.FC<PrayerCardProps> = ({ prayer, commonOpening }) => {
  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto pb-12">
      <header className="text-center px-4">
        <div className="text-indigo-600 font-bold text-sm tracking-widest uppercase mb-1">
          {prayer.day}
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2 leading-tight">
          {prayer.title}
        </h2>
        <p className="text-lg text-gray-500 italic">
          {prayer.theme}
        </p>
      </header>

      <section className="bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100 shadow-sm">
        <h3 className="text-indigo-800 font-bold mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
          Uvodne molitve
        </h3>
        <ul className="space-y-2">
          {commonOpening.map((p, i) => (
            <li key={i} className="flex items-center gap-3 text-gray-700">
              <span className="text-indigo-300 font-serif">†</span>
              {p}
            </li>
          ))}
        </ul>
      </section>

      <div className="space-y-4">
        {prayer.sections.map((section, idx) => (
          <PrayerSection key={idx} section={section} />
        ))}
      </div>

      {prayer.additionalPrayer && (
        <section className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100 shadow-sm mt-4">
          <div className="flex flex-col gap-1 mb-4">
            <h3 className="text-emerald-800 font-bold flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              {prayer.additionalPrayer.title || 'Dodatna molitva'}
            </h3>
            {prayer.additionalPrayer.attribution && (
              <span className="text-xs text-emerald-600/70 italic ml-4">
                — {prayer.additionalPrayer.attribution}
              </span>
            )}
          </div>
          <p className="text-gray-700 leading-relaxed italic">
            {prayer.additionalPrayer.text}
          </p>
        </section>
      )}
    </div>
  );
};

export default PrayerCard;

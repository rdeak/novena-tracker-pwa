import React from 'react';
import { Prayer, Verse } from '../../types/prayer';
import PrayerSection from './PrayerSection';

interface PrayerCardProps {
  prayer: Prayer;
  commonOpening: string[];
  commonPrayers: Record<string, string | Verse[]>;
}

const PrayerCard: React.FC<PrayerCardProps> = ({ prayer, commonOpening, commonPrayers }) => {
  const renderCommonPrayerText = (p: string) => {
    const cp = commonPrayers[p];
    if (!cp) return null;

    if (typeof cp === 'string') {
      return (
        <p className="ml-6 text-sm text-gray-600 leading-relaxed italic">
          {cp}
        </p>
      );
    }

    return (
      <div className="ml-6 mt-1 space-y-1">
        {cp.map((v, idx) => (
          <div key={idx} className="text-sm leading-relaxed italic text-gray-600">
            <span className={`font-bold mr-1.5 ${v.role === 'P' ? 'text-indigo-600/60' : 'text-emerald-600/60'}`}>
              {v.role}:
            </span>
            {v.text}
          </div>
        ))}
      </div>
    );
  };

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
        <div className="space-y-4">
          {commonOpening.map((p, i) => (
            <div key={i} className="text-gray-700">
              <div className="flex items-center gap-3 font-bold text-indigo-900 mb-1">
                <span className="text-indigo-300 font-serif">†</span>
                {p}
              </div>
              {renderCommonPrayerText(p)}
            </div>
          ))}
        </div>
      </section>

      <div className="space-y-4">
        {prayer.sections.map((section, idx) => (
          <PrayerSection key={idx} section={section} commonPrayers={commonPrayers} />
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

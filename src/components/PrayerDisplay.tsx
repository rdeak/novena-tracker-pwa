import React from 'react';
import type { Stanza as StanzaType, BasePrayer, PrayerItem, Section } from '../schemas/data';
import data from '../data/data.json';
import { LitanyCarousel } from './LitanyCarousel';

interface Props {
  id: string;
}

export const BasePrayerDisplay: React.FC<Props> = ({ id }) => {
  const prayer = (data.basePrayers as BasePrayer[]).find(p => p.id === id);
  if (!prayer) return <div className="text-red-500">Prayer not found: {id}</div>;

  const isLitany = id.startsWith('litanije') || id.toLowerCase().includes('litany');

  if (isLitany) {
    return <LitanyCarousel key={id} title={prayer.title} stanzas={prayer.stanzas} />;
  }

  return (
    <div className="my-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-xl font-semibold mb-3 text-gray-800 border-b pb-2">{prayer.title}</h3>
      <div className="space-y-3">
        {prayer.stanzas.map((stanza, idx) => (
          <div key={idx} className="flex gap-3">
            <span className="font-bold text-blue-600 min-w-[1.5rem]">{stanza.role}:</span>
            <p className="text-gray-700 leading-relaxed">{stanza.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const PrayerItemDisplay: React.FC<{ item: PrayerItem }> = ({ item }) => {
  if (item.type === 'reference') {
    return <BasePrayerDisplay id={item.refId} />;
  }

  return (
    <div className="my-2 flex gap-3">
      {item.role && <span className="font-bold text-blue-600 min-w-[1.5rem]">{item.role}:</span>}
      <div className="flex-1">
        <p className="text-gray-700 leading-relaxed">
           {item.content}
           {item.repeat && <span className="ml-2 text-sm font-medium text-gray-500 italic">(x{item.repeat})</span>}
        </p>
      </div>
    </div>
  );
};

export const SectionDisplay: React.FC<{ section: Section }> = ({ section }) => {
  return (
    <div className="my-6">
      {section.title && <h4 className="text-lg font-bold mb-3 text-gray-900">{section.title}</h4>}
      {section.type && !section.title && (
         <div className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-2">{section.type.replace('_', ' ')}</div>
      )}
      {section.reference && <div className="text-sm text-gray-500 italic mb-2">{section.reference}</div>}
      
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
        {section.repeat && section.repeat > 1 && (
           <div className="text-sm font-bold text-blue-700 mb-2 uppercase">Repeat {section.repeat} times</div>
        )}
        <div className="space-y-2">
          {section.items.map((item, idx) => (
            <PrayerItemDisplay key={idx} item={item} />
          ))}
        </div>
      </div>
      {section.attribution && <div className="text-right text-sm text-gray-400 mt-2">— {section.attribution}</div>}
    </div>
  );
};

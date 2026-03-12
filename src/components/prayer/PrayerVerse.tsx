import React from 'react';
import { Verse } from '../../types/prayer';
import LitanyCarousel from './LitanyCarousel';

interface PrayerVerseProps {
  verse: Verse;
  commonPrayers?: Record<string, string | Verse[]>;
  litanies?: Record<string, Verse[]>;
  showRole?: boolean;
}

const PrayerVerse: React.FC<PrayerVerseProps> = ({ verse, commonPrayers, litanies, showRole = true }) => {
  const litany = litanies ? litanies[verse.text.trim()] : null;

  const renderTextWithCommonPrayers = (text: string) => {
    // Check if the text matches a common prayer name
    const trimmedText = text.trim();
    const commonPrayer = commonPrayers ? commonPrayers[trimmedText] : null;

    if (commonPrayer) {
      if (typeof commonPrayer === 'string') {
        return (
          <span>
            <span className="font-bold">{text}</span>
            <br />
            <span className="text-base italic text-gray-500">{commonPrayer}</span>
          </span>
        );
      } else {
        // It's Verse[]
        return (
          <span>
            <span className="font-bold mb-1 block">{text}</span>
            <div className="pl-4 border-l-2 border-indigo-50 space-y-2">
              {commonPrayer.map((v, i) => (
                <div key={i} className="text-base sm:text-lg leading-relaxed">
                  <span className={`font-bold mr-2 ${v.role === 'P' ? 'text-indigo-600/70' : 'text-emerald-600/70'}`}>
                    {v.role}:
                  </span>
                  <span className="text-gray-500 italic">{v.text}</span>
                </div>
              ))}
            </div>
          </span>
        );
      }
    }

    // Check if the text matches a litany name
    if (litany) {
      return (
        <div className="mt-4">
          <LitanyCarousel verses={litany} title={text} />
        </div>
      );
    }

    // Split by common prayer names and highlight them if they are in the text
    const commonPrayerNames = commonPrayers ? Object.keys(commonPrayers) : [];
    const litanyNames = litanies ? Object.keys(litanies) : [];
    const allNames = [...commonPrayerNames, ...litanyNames];

    let parts: (string | React.ReactNode)[] = [text];
    
    // Sort names by length descending to avoid partial matches of shorter names inside longer names
    const sortedNames = allNames.sort((a, b) => b.length - a.length);

    sortedNames.forEach(name => {
      const newParts: (string | React.ReactNode)[] = [];
      parts.forEach(part => {
        if (typeof part !== 'string') {
          newParts.push(part);
          return;
        }
        
        // Escape special characters in name for regex
        const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${escapedName})`, 'g');
        const segments = part.split(regex);
        segments.forEach((seg, i) => {
          if (seg === name) {
            const cp = (commonPrayers ? commonPrayers[name] : null) || (litanies ? litanies[name] : null);
            if (!cp) {
              newParts.push(seg);
              return;
            }
            const title = typeof cp === 'string' ? cp : cp.map(v => `${v.role}: ${v.text}`).join('\n');
            newParts.push(
              <span 
                key={name + i} 
                className="font-bold text-indigo-900 underline decoration-indigo-200 decoration-2 underline-offset-4 cursor-help" 
                title={title}
              >
                {seg}
              </span>
            );
          } else if (seg !== '') {
            newParts.push(seg);
          }
        });
      });
      parts = newParts;
    });

    return parts;
  };

  return (
    <div className={`${litany ? 'w-full' : 'flex gap-3 text-lg sm:text-xl md:text-2xl leading-relaxed'} mb-4 last:mb-0`}>
      {!litany && showRole && (
        <span className={`font-bold min-w-[1.5rem] mt-0.5 ${verse.role === 'P' ? 'text-indigo-600' : 'text-emerald-600'}`}>
          {verse.role}:
        </span>
      )}
      <div className={`${litany ? 'w-full' : 'flex-grow text-gray-700'}`}>
        {renderTextWithCommonPrayers(verse.text)}
        {!litany && verse.repeat && verse.repeat > 1 && (
          <span className="ml-2 font-medium text-gray-400 italic text-base sm:text-lg">({verse.repeat}x)</span>
        )}
      </div>
    </div>
  );
};

export default PrayerVerse;

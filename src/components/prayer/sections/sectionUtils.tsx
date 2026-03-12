import React from 'react';
import { Section, Verse } from '../../../types/prayer';
import PrayerVerse from '../PrayerVerse';

export interface SectionProps {
  section: Section;
  commonPrayers?: Record<string, string | Verse[]>;
  litanies?: Record<string, Verse[]>;
}

export const renderVerses = (verses: (Verse | string)[], commonPrayers?: Record<string, string | Verse[]>, litanies?: Record<string, Verse[]>) => {
  return verses.map((v, idx) => {
    const isString = typeof v === 'string';
    const verse: Verse = isString ? { role: 'P', text: v } : v;
    return (
      <PrayerVerse 
        key={idx} 
        verse={verse} 
        commonPrayers={commonPrayers} 
        litanies={litanies}
        showRole={!isString}
      />
    );
  });
};

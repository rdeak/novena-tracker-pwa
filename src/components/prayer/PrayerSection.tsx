import React from 'react';
import { Section, Verse } from '../../types/prayer';
import LitanySection from './sections/LitanySection';
import AdditionalPrayerSection from './sections/AdditionalPrayerSection';
import StandardSection from './sections/StandardSection';
import OpeningSection from './sections/OpeningSection';
import DailySection from './sections/DailySection';
import ClosingSection from './sections/ClosingSection';
import BeadSection from './sections/BeadSection';

interface PrayerSectionProps {
  section: Section;
  commonPrayers?: Record<string, string | Verse[]>;
  litanies?: Record<string, Verse[]>;
}

const PrayerSection: React.FC<PrayerSectionProps> = ({ section, commonPrayers, litanies }) => {
  const getSectionTitle = (type: string) => {
    switch (type) {
      case 'uvod': return 'Uvodne molitve';
      case 'zaključak': return 'Zaključne molitve';
      case 'velika_zrnca': return 'Velika zrnca';
      case 'mala_zrnca': return 'Mala zrnca';
      case 'završetak': return 'Završetak';
      case 'uvodna_molitva': return 'Uvodna molitva';
      case 'dnevna_molitva': return 'Dnevna molitva';
      case 'molitva_na_kraju': return 'Zaključna molitva';
      case 'litanije': return 'Litanije';
      case 'dodatna_molitva': return 'Dodatna molitva';
      default: return type.replace(/_/g, ' ').charAt(0).toUpperCase() + type.replace(/_/g, ' ').slice(1);
    }
  };

  switch (section.type) {
    case 'litanije':
      return (
        <LitanySection 
          section={section} 
          commonPrayers={commonPrayers} 
          litanies={litanies} 
        />
      );
    case 'dodatna_molitva':
      return <AdditionalPrayerSection section={section} />;
    case 'uvod':
    case 'uvodna_molitva':
      return (
        <OpeningSection 
          section={section} 
          title={section.type === 'uvod' ? 'Uvodne molitve' : 'Uvodna molitva'}
          commonPrayers={commonPrayers} 
          litanies={litanies} 
        />
      );
    case 'dnevna_molitva':
      return (
        <DailySection 
          section={section} 
          commonPrayers={commonPrayers} 
          litanies={litanies} 
        />
      );
    case 'zaključak':
    case 'molitva_na_kraju':
      return (
        <ClosingSection 
          section={section} 
          title={section.type === 'zaključak' ? 'Zaključne molitve' : 'Zaključna molitva'}
          commonPrayers={commonPrayers} 
          litanies={litanies} 
        />
      );
    case 'završetak':
      return (
        <ClosingSection 
          section={section} 
          title="Završetak"
          commonPrayers={commonPrayers} 
          litanies={litanies} 
        />
      );
    case 'velika_zrnca':
      return (
        <BeadSection 
          section={section} 
          title="Velika zrnca"
          commonPrayers={commonPrayers} 
          litanies={litanies} 
        />
      );
    case 'mala_zrnca':
      return (
        <BeadSection 
          section={section} 
          title="Mala zrnca"
          commonPrayers={commonPrayers} 
          litanies={litanies} 
        />
      );
    default:
      return (
        <StandardSection 
          section={section} 
          title={getSectionTitle(section.type)}
          commonPrayers={commonPrayers} 
          litanies={litanies} 
        />
      );
  }
};

export default PrayerSection;

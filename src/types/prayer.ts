export interface Verse {
  role: 'P' | 'S';
  text: string;
  repeat?: number;
}

export interface Section {
  section: 'velika_zrnca' | 'mala_zrnca' | 'završetak' | 'uvodna_molitva' | 'dnevna_molitva' | 'molitva_na_kraju' | 'litanije' | string;
  repeat: number | null;
  verses: Verse[];
  reference?: string;
}

export interface AdditionalPrayer {
  title?: string;
  attribution?: string;
  text: string;
}

export interface Prayer {
  day?: string;
  dayIndex: number;
  title: string;
  theme: string;
  opening?: 'commonOpening' | string;
  sections: Section[];
  additionalPrayer?: AdditionalPrayer;
}

export interface PrayerCycle {
  id: string;
  title: string;
  type: 'weekly' | 'novena';
  prayers: Prayer[];
  commonOpening?: string[];
  description?: string;
}

export interface DataStructure {
  title: string;
  source: {
    publisher: string;
    contact: string;
    address: string;
    phone: string;
    fax: string;
    email: string;
    website: string;
    year: number;
    imprimatur: {
      authority: string;
      reference: string;
    };
  };
  roles: Record<string, string>;
  commonPrayers?: Record<string, string | Verse[]>;
  cycles: PrayerCycle[];
}

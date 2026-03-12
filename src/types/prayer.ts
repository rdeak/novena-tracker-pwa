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

export interface PrayerLibraryItem {
  id: string;
  title: string;
  type: 'weekly' | 'novena';
  prayers: Prayer[];
  commonOpening?: string[];
  description?: string;
}

export interface DataStructure {
  roles: Record<string, string>;
  commonPrayers?: Record<string, string | Verse[]>;
  litanies?: Record<string, Verse[]>;
  library: PrayerLibraryItem[];
}

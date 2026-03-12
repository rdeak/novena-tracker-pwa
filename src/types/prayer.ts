export interface Verse {
  role: 'P' | 'S';
  text: string;
  repeat?: number;
}

export interface Section {
  type: 'velika_zrnca' | 'mala_zrnca' | 'završetak' | 'uvodna_molitva' | 'dnevna_molitva' | 'molitva_na_kraju' | 'litanije' | 'uvod' | 'zaključak' | string;
  repeat: number | null;
  verses: (Verse | string)[];
  reference?: string;
  title?: string;
  attribution?: string;
}

export interface Prayer {
  day?: string;
  dayIndex: number;
  title: string;
  theme?: string;
  sections: Section[];
}

export interface WeeklyPrayer {
  id: string;
  title: string;
  type: 'weekly';
  prayers: Prayer[];
  description?: string;
}

export interface Novena {
  id: string;
  title: string;
  type: 'novena';
  prayers: Prayer[];
  description?: string;
}

export type PrayerLibraryItem = WeeklyPrayer | Novena;

export interface DataStructure {
  roles: Record<string, string>;
  commonPrayers?: Record<string, string | Verse[]>;
  litanies?: Record<string, Verse[]>;
  library: (WeeklyPrayer | Novena)[];
}

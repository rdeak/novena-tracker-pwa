export interface Verse {
  role: 'P' | 'S';
  text: string;
  repeat?: number;
}

export interface Section {
  section: 'velika_zrnca' | 'mala_zrnca' | 'završetak' | string;
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
  day: string;
  dayIndex: number;
  title: string;
  theme: string;
  opening: 'commonOpening' | string;
  sections: Section[];
  additionalPrayer?: AdditionalPrayer;
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
  commonOpening: string[];
  prayers: Prayer[];
}

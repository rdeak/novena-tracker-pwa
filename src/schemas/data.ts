import { z } from "zod";

export const RoleSchema = z.string();

export const MetadataSchema = z.object({
  version: z.string(),
  roles: z.record(z.string(), z.string()),
});

export const StanzaSchema = z.object({
  role: RoleSchema,
  text: z.string(),
});

export const BasePrayerSchema = z.object({
  id: z.string(),
  title: z.string(),
  stanzas: z.array(StanzaSchema),
});

export const ReferenceItemSchema = z.object({
  type: z.literal("reference"),
  refId: z.string(),
});

export const TextItemSchema = z.object({
  type: z.literal("text"),
  role: RoleSchema.optional(),
  content: z.string(),
  repeat: z.number().optional(),
});

export const PrayerItemSchema = z.discriminatedUnion("type", [
  ReferenceItemSchema,
  TextItemSchema,
]);

export const SectionSchema = z.object({
  type: z.string(),
  repeat: z.number().optional(),
  reference: z.string().optional(),
  title: z.string().optional(),
  attribution: z.string().optional(),
  items: z.array(PrayerItemSchema),
});

export const WeeklyPrayerSchema = z.object({
  day: z.string(),
  dayIndex: z.number(),
  title: z.string(),
  theme: z.string(),
  sections: z.array(SectionSchema),
});

export const WeeklyLibraryItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  type: z.literal("weekly"),
  prayers: z.array(WeeklyPrayerSchema),
});

export const NovenaDaySchema = z.object({
  dayIndex: z.number(),
  title: z.string(),
  theme: z.string().optional(),
  dnevna_molitva: z.array(PrayerItemSchema),
});

export const NovenaLibraryItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  type: z.literal("novena"),
  description: z.string().optional(),
  template: z.record(z.string(), z.array(PrayerItemSchema)),
  days: z.array(NovenaDaySchema),
});

export const LibraryItemSchema = z.discriminatedUnion("type", [
  WeeklyLibraryItemSchema,
  NovenaLibraryItemSchema,
]);

export const DataSchema = z.object({
  metadata: MetadataSchema,
  basePrayers: z.array(BasePrayerSchema),
  library: z.array(LibraryItemSchema),
});

export type Role = z.infer<typeof RoleSchema>;
export type Metadata = z.infer<typeof MetadataSchema>;
export type Stanza = z.infer<typeof StanzaSchema>;
export type BasePrayer = z.infer<typeof BasePrayerSchema>;
export type ReferenceItem = z.infer<typeof ReferenceItemSchema>;
export type TextItem = z.infer<typeof TextItemSchema>;
export type PrayerItem = z.infer<typeof PrayerItemSchema>;
export type Section = z.infer<typeof SectionSchema>;
export type WeeklyPrayer = z.infer<typeof WeeklyPrayerSchema>;
export type WeeklyLibraryItem = z.infer<typeof WeeklyLibraryItemSchema>;
export type NovenaDay = z.infer<typeof NovenaDaySchema>;
export type NovenaLibraryItem = z.infer<typeof NovenaLibraryItemSchema>;
export type LibraryItem = z.infer<typeof LibraryItemSchema>;
export type Data = z.infer<typeof DataSchema>;

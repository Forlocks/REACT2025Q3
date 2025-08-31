export type Countries = Record<string, {
  iso_code: string;
  data: Record<string, Record<string, number>>;
}>;
export interface EmissionEntry {
  year: number;
  population: number;
  co2: number;
  co2_per_capita: number;
  [key: string]: number; // для дополнительных колонок
}

export type CountryData = {
  iso_code: string;
  data: EmissionEntry[];
};

export type Countries = Record<string, CountryData>;
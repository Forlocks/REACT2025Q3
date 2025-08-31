export interface EmissionAttributes {
  year: number;
  population: number;
  co2: number;
  co2_per_capita: number;
  [key: string]: number;
}

export type CountryData = {
  iso_code: string;
  data: EmissionEntry[];
};

export type Countries = Record<string, CountryData>;

interface CountryData {
  code: string;
  emissions: Record<string, string>;
}

export type Countries = Record<string, CountryData>;

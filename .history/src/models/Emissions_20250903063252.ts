interface CountryData {
  code: string;
  emissions: Record<string, string>;
}

type Countries = Record<string, CountryData>;
interface CountryData {
  code: string;
  emissions: Record<string, string>; // объект с произвольными строковыми ключами и строковыми значениями
}

type Countries = Record<string, CountryData>;
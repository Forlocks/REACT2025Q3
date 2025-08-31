export default async function fetchEmissions(): Promise<ProcessedEmissionsData> {
  const response = await fetch('c02-data.json');

  if (!response.ok) {
    throw new Error(`Failed to fetch data`);
  }

  const countriesData: EmissionsData = await response.json();

  const availableYears = getAvailableYears(countriesData);
  const firstSelectedYear = availableYears.length > 0 ? availableYears[0] : 2020;
  const firstCountriesAnnualData = transformEmissionsData(countriesData, firstSelectedYear);

  return {
    countriesData,
    availableYears,
    firstSelectedYear,
    firstCountriesAnnualData,
  };
}
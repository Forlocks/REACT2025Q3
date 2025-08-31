import { use } from 'react';
import React, { useCallback, useMemo } from 'react';
import { getColumnDisplayName } from '../../controllers/getColumnDisplayName';
import { getEmissions } from '../../controllers/getEmissions';
import { formatNumber } from '../../controllers/formatNumber';
import { Countries, EmissionAttributes } from '../../models/Countries';
import './List.scss';

interface ListProps {
  additionColumns: string[];
  country: string;
  year: number;
  sortAttribute: string;
  sortOrder: string;
}

const emissionPromise = getEmissions();

export const List: React.FC<ListProps> = ({
  additionColumns,
  country,
  year,
  sortAttribute,
  sortOrder,
}) => {
  const PLACEHOLDER_TEXT = 'N/A';

  const emissions: Countries = use(emissionPromise);

  const handleSearch = useCallback(
    (data: Countries) =>
      Object.entries(data).filter(([countryName]) =>
        countryName.toLowerCase().includes(country.toLowerCase())
      ),
    [country]
  );

  // Сортировка
  const handleSort = useCallback(
    (entries: [string, Countries[string]][]) =>
      entries.sort(([aName, aData], [bName, bData]) => {
        const aDto = aData.data.find(item => item.year === year);
        const bDto = bData.data.find(item => item.year === year);

        if (!aDto && !bDto) return 0;
        if (!aDto) return 1;
        if (!bDto) return -1;

        let aValue: number | string = '';
        let bValue: number | string = '';

        if (sortAttribute === 'country') {
          aValue = aName.toLowerCase();
          bValue = bName.toLowerCase();
        } else {
          aValue = aDto.population ?? 0;
          bValue = bDto.population ?? 0;
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortOrder === 'ascending'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else {
          return sortOrder === 'ascending'
            ? (aValue as number) - (bValue as number)
            : (bValue as number) - (aValue as number);
        }
      }),
    [year, sortAttribute, sortOrder]
  );

  const handleColumns = useCallback(
    (columns: string[]) => columns.map(id => getColumnDisplayName(id)),
    []
  );

  // ----------------- 🔹 useMemo для обработки -----------------
  const processedEmissions = useMemo(() => {
    const searched = handleSearch(emissions);
    const sorted = handleSort(searched);
    return Object.fromEntries(sorted) as Countries;
  }, [emissions, handleSearch, handleSort]);

  const displayedColumns = useMemo(
    () => handleColumns(additionColumns),
    [additionColumns, handleColumns]
  );

  // ----------------- 🔹 Render -----------------
  return (
    <table>
      <thead>
        <tr>
          <th>Country</th>
          <th>Iso code</th>
          <th>Year</th>
          <th>Population</th>
          <th>Co2</th>
          <th>Co2 per capita</th>
          {displayedColumns.map((name, idx) => (
            <th key={additionColumns[idx]}>{name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.entries(processedEmissions).map(([countryName, countryData]) => {
          const countryAttributes = countryData.data.find(
            (item: EmissionAttributes) => item.year === year
          );

          if (!countryAttributes) {
            return null;
          }

          return (
            <tr key={countryName}>
              <td>{countryName}</td>
              <td>{countryData.iso_code ?? PLACEHOLDER_TEXT}</td>
              <td>{countryAttributes.year}</td>
              <td>{countryAttributes.population ?? PLACEHOLDER_TEXT}</td>
              <td>{formatNumber(countryAttributes.co2)}</td>
              <td>{formatNumber(countryAttributes.co2_per_capita)}</td>
              {additionColumns.map(id => (
                <td key={id}>{formatNumber(countryAttributes[id])}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

import React, { useEffect, useState } from 'react';
import { getColumnDisplayName } from '../../controllers/getColumnDisplayName';
import { getEmissions } from '../../controllers/getEmissions';
import { formatNumber } from '../../controllers/formatNumber';
import { Countries } from '../../models/Countries';
import './List.scss';

interface ListProps {
  additionColumns: string[];
  country: string;
  year: number;
  sortAttribute: string;
  sortOrder: string;
}

export const List: React.FC<ListProps> = ({
  additionColumns,
  country,
  year,
  sortAttribute,
  sortOrder,
}) => {
  const [emissions, setEmissions] = useState<Countries>({});
  const [loading, setLoading] = useState(true);

  const PLACEHOLDER_TEXT = 'N/A';

  useEffect(() => {
    const fetchData = async () => {
        const emissions = await getEmissions();
  
        setEmissions(emissions);
        setLoading(false);
    };

    fetchData();

    const filteredAndSorted = Object.entries(emissions)
    // фильтр по country
    .filter(([countryName]) => countryName.toLowerCase().includes(country.toLowerCase()))
    // сортировка
    .sort(([aName, aData], [bName, bData]) => {
      // для каждого country берём dto для выбранного года
      const aDto = aData.data.find(item => item.year === year);
      const bDto = bData.data.find(item => item.year === year);

      let aValue: number | string = '';
      let bValue: number | string = '';

      if (!aDto && !bDto) return 0;
      if (!aDto) return sortOrder === 'ascending' ? 1 : -1;
      if (!bDto) return sortOrder === 'ascending' ? -1 : 1;

      if (sortAttribute === 'country') {
        aValue = aName.toLowerCase();
        bValue = bName.toLowerCase();
      } else if (sortAttribute === 'population') {
        aValue = aDto.population;
        bValue = bDto.population;
      } else {
        // для других колонок можно добавить
        aValue = aDto[sortAttribute] ?? 0;
        bValue = bDto[sortAttribute] ?? 0;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'ascending' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      } else {
        return sortOrder === 'ascending' ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number);
      }
    });
  }, []);

  if (loading) {
    return <p>Загрузка...</p>;
  }

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

          {additionColumns.map(id => (
            <th key={id}>{getColumnDisplayName(id)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.entries(emissions).filter(countryName => !countryName.toLowerCase().includes(country.toLowerCase()))

          const dto = countryData.data.find((item: Record<string, number>) => item.year === year);

          if (!dto) {
            return null;
          }

          return (
            <tr key={countryName}>
              <td>{countryName}</td>
              <td>{countryData.iso_code ?? PLACEHOLDER_TEXT}</td>
              <td>{dto.year}</td>
              <td>{dto.population ?? PLACEHOLDER_TEXT}</td>
              <td>{formatNumber(dto.co2)}</td>
              <td>{formatNumber(dto.co2_per_capita)}</td>

              {additionColumns.map(id => (
                <td key={id}>{formatNumber(dto[id])}</td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </table>
  );
};

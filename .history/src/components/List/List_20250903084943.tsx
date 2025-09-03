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
        {Object.entries(em).map(([countryName, countryData]) => {
          if (!countryName.toLowerCase().includes(country.toLowerCase())) {
            return;
          }

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

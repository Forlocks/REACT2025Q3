import React, { useEffect, useState } from 'react';
import { getColumnDisplayName } from '../../controllers/getColumnDisplayName';
import { getEmissions } from '../../controllers/getEmissions';
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
  const [data, setData] = useState<Countries>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
        const emissions = await getEmissions();
        console.log(emissions);
        setData(emissions);
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
        {Object.entries(data).map(([countryName, countryData]) => {
          if (!countryName.toLowerCase().includes(country.toLowerCase())) {
            return;
          }

          const dto = countryData.data.find((item: Record<string, string | number>) => item.year === year);

          return (
            <tr key={countryName}>
              <td>{countryName}</td>
              <td>{countryData.iso_code}</td>
              <td>{countryData.data.year}</td>
              <td>{countryData.data.population}</td>
              <td>{countryData.data.co2}</td>
              <td>{countryData.data.co2_per_capita}</td>

              {additionColumns.map(id => (
                <td key={id}>{countryData.emissions[id]}</td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </table>
  );
};

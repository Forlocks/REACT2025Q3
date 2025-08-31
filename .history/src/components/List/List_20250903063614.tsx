import React, { useEffect, useState } from 'react';
import { getColumnDisplayName } from '../../controllers/getColumnDisplayName';
import { getEmissions } from '../../controllers/getEmissions';
import { Countries } from '../../models/Emissions';
import './List.scss';

interface ListProps {
  additionColumns: string[];
}

export const List: React.FC<ListProps> = ({ additionColumns }) => {
  const [data, setData] = useState<Countries>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
        const emissions = await getEmissions();
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
          {/* Базовые поля */}
          {additionColumns.map(col => (
            <th key={col}>{getColumnDisplayName(col)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Object.entries(data).map(([countryName, countryData]) => (
          <tr key={countryName}>
            <td>{countryName}</td>
            <td>{countryData.code}</td>

            {additionColumns.map(col => (
              <td key={col}>{countryData.emissions[col]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

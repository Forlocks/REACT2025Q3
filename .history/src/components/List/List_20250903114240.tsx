
import { use } from 'react';
import React, { useEffect, useState } from 'react';
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

export const List: React.FC<ListProps> = ({
  additionColumns,
  country,
  year,
  sortAttribute,
  sortOrder,
}) => {
  const [emissions, setEmissions] = useState<Countries>({});
  const [processedEmissions, setProcessedEmissions] = useState<Countries>({})
  const [loading, setLoading] = useState(true);

  const PLACEHOLDER_TEXT = 'N/A';

    const fetchData = async () => {
      const data: Countries = use(getEmissions());
      setEmissions(data);
      setLoading(false);
    };
    fetchData();

  useEffect(() => {
    if (loading) {
       return;
    }

    const entries = Object.entries(emissions)
      .filter(([countryName]) => countryName.toLowerCase().includes(country.toLowerCase()))
      .sort(([aName, aData], [bName, bData]) => {
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
      });

    setProcessedEmissions(Object.fromEntries(entries));
  }, [country, year, sortAttribute, sortOrder, emissions, loading]);

  

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
        {Object.entries(processedEmissions).map(([countryName, countryData]) => {
          const countryAttributes = countryData.data.find((item: EmissionAttributes) => item.year === year);

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

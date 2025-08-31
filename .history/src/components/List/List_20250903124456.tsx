import { use, Profiler } from 'react';
import React, { useMemo } from 'react';
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

function onRender(
  id: string,
  phase: string,
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number
) {
  console.log(id, phase, actualDuration, baseDuration, startTime, commitTime);
}

const emissionPromise = getEmissions();

export const List: React.FC<ListProps> = ({
  additionColumns,
  country,
  year,
  sortAttribute,
  sortOrder,
}) => {
  const emissions = use(emissionPromise);

  const PLACEHOLDER_TEXT = 'N/A';

  const processedEmissions = useMemo(() => {
    const entries = Object.entries(emissions)
      .filter(([countryName]) =>
        countryName.toLowerCase().includes(country.toLowerCase())
      )
      .sort(([aName, aData], [bName, bData]) => {
        const aDataTyped = aData as Countries[string];
        const bDataTyped = bData as Countries[string];
        const aDto = aDataTyped.data.find(item => item.year === year);
        const bDto = bDataTyped.data.find(item => item.year === year);

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

    return Object.fromEntries(entries) as Countries;
  }, [emissions, country, year, sortAttribute, sortOrder]);

  const processedAdditionColumns = useMemo(
    () => additionColumns.map(id => ({ id, name: getColumnDisplayName(id) })),
    [additionColumns]
  );

  return (
    <Profiler id="CountriesList" onRender={onRender}>
      
    </Profiler>
  );
};

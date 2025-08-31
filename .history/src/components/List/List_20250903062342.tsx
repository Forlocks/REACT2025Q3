import React from 'react';
import { getColumnDisplayName } from '../../controllers/getColumnDisplayName';
import './List.scss';
import { getEmissions } from '../../controllers/getEmissions';

interface ListProps {
  additionColumns: string[];
}

export const List:React.FC<ListProps> = async ({additionColumns}) => {
  console.log(await getEmissions());

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
          {additionColumns.map(col => (
            <th key={col}>{getColumnDisplayName(col)}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>9.1</td>
          <td>Зелёная миля</td>
          <td>1999</td>
          <td>Same same</td>
          <td>Same same</td>
          <td>Same same</td>
          <td>Same same</td>
          <td>Same same</td>
          <td>Same same</td>
          <td>Same same</td>
          <td>Same same</td>
          <td>Same same</td>
        </tr>
      </tbody>
    </table>
  )
};

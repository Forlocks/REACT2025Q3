import React from 'react';
import { getColumnDisplayName } from '../../controllers/getColumnDisplayName';
import './List.scss';

interface ListProps {
  additionColumns: string[];
}

export const List:React.FC<ListProps> = ({additionColumns}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Country</th>
          <th>Year</th>
          <th>Population</th>
          <th>co2</th>
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

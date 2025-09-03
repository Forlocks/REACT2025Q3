import React from 'react';
import { Columns } from '../../context/ColumnsContext';
import './List.scss';

interface ListProps {
  additionColumns: Columns;
}

export const List:React.FC = ({additionColumns}) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Country</th>
          <th>Year</th>
          <th>Population</th>
          <th>CO2 Emissions</th>
          <th>Same same</th>
          <th>Same same</th>
          <th>Same same</th>
          <th>Same same</th>
          <th>Same same</th>
          <th>Same same</th>
          <th>Same same</th>
          <th>Same same</th>
          <th>Same same</th>
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

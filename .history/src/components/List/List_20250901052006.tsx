import React from 'react';

export const List:React.FC = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>Country</th>
          <th>Year</th>
          <th>Population</th>
          <th>CO2 Emissions</th>
          <td>Same same</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>9.1</td>
          <td>Зелёная миля</td>
          <td>1999</td>
          <td>Same same</td>
        </tr>
        <tr>
          <td>1</td>
          <td>9.1</td>
          <td>Зелёная миля</td>
          <td>1999</td>
          <td>Same same</td>
        </tr>
        <tr>
          <td>1</td>
          <td>9.1</td>
          <td>Зелёная миля</td>
          <td>1999</td>
        </tr>
      </tbody>
    </table>
  )
};

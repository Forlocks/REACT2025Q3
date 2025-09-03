export function getColumnDisplayName(columnName) {
  return columnNamecolumnName.replace('_', ' ').slice(1);
}
export function getColumnDisplayName(columnName) {
  return columnName[0].toUpperCase() + columnName.replace('_', ' ').slice(1);
}
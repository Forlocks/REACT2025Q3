export function getColumnDisplayName(columnName) {
  return columnName.replace('_', ' ').slice(1);
}
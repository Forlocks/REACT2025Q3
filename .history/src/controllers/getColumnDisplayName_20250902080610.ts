export function getColumnDisplayName(columnName) {
  return columnName[0]columnName.replace('_', ' ').slice(1);
}
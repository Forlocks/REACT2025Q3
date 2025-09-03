export function getColumnDisplayName(columnName) {
  return columnName[0columnName.replace('_', ' ').slice(1);
}
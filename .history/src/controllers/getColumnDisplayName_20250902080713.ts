export function getColumnDisplayName(columnName: string) {
  return `columnName[0].toUpperCase() ${columnName.replace('_', ' ').slice(1)}`;
}
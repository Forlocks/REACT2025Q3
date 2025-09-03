export function getColumnDisplayName(columnName: string) {
  return `${columnName[0].toUpperCase()}${columnName.replaceAll('_', ' ').slice(1)}`;
}

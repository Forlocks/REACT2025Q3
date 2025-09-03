export function getColumnDisplayName(columnName) {
  return columnName[0].to + columnName.replace('_', ' ').slice(1);
}
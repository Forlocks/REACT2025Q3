export function deleteTags(value: string) {
  const regExp = /<.*?>/g;
  return value.replace(regExp, '');
}

export function deleteTags(value: string | undefined | null) {
  const regExp = /<.*?>/g;

  if (!value) {
    return '';
  }

  return value.toString().replace(regExp, '');
}

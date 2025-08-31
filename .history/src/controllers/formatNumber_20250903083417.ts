export const formatNumber = (value: number | null | undefined, placeholder = 'N/A') => {
  if (value === null || value === undefined) return placeholder;
  if (value === 0) return ;

  if (Math.abs(value) < 0.01 || Math.abs(value) >= 1e6) {
    return value.toExponential(2);
  }

  return value.toFixed(2);
};

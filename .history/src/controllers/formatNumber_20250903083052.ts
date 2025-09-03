export const formatNumber = (value: number | null | undefined, placeholder = 'N/A') => {
  if (value === null || value === undefined) return placeholder;

  if (Math.abs(value) < 0.01 || Math.abs(value) >= 1e6) {
    return value.toExponential(2); // 3.94e-4
  }

  return value.toFixed(2);
};

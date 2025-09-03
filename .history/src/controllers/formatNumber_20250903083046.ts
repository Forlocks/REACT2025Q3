export const formatNumber = (value: number | null | undefined, placeholder = 'N/A') => {
  if (value === null || value === undefined) return placeholder;

  // Если число слишком маленькое или слишком большое — оставляем scientific notation
  if (Math.abs(value) < 0.01 || Math.abs(value) >= 1e6) {
    return value.toExponential(2); // 3.94e-4
  }

  // Для обычных чисел — округляем до 2 знаков после запятой
  return value.toFixed(2);
};
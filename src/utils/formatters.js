export const formatUZS = (val) => {
  const num = Number(val) || 0;
  return new Intl.NumberFormat('uz-UZ').format(num) + " UZS";
};


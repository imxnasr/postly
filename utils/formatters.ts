export const formatNumber = (count: number): string => {
  if (count >= 1_000_000) {
    return (count / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (count >= 1_000) {
    return (count / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return count.toString();
};

export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };

  if (d.getFullYear() !== now.getFullYear()) {
    options.year = "numeric";
  }

  return d.toLocaleDateString("en-US", options);
};

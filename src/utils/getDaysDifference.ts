export function getDaysDifference(day: string) {
  const diffTime = new Date().valueOf() - new Date(day).valueOf();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}
export function getFormattedDate(date) {
  return new Date(date).toISOString().slice(0, 10);
}

export function getDateBeforeNumberOfDays(date, day) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - day);
}

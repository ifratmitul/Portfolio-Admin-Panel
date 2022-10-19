export const dateFormatter = (date: Date) => {
  let hoursDiff = date?.getHours() - date?.getTimezoneOffset() / 60;
  let minutesDiff = (date?.getHours() - date?.getTimezoneOffset()) % 60;
  date.setHours(hoursDiff);
  date.setMinutes(minutesDiff);
  return date;
}

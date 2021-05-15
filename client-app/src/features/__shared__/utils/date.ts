const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export function formatNoteUpdateDate(date: Date): string {
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const hours = toStringWithLeadingZero(date.getHours());
  const minutes = toStringWithLeadingZero(date.getMinutes());

  return `${day} ${month} ${year}, ${hours}:${minutes}`;
}

function toStringWithLeadingZero(num: number) {
  return num < 10 ? '0' + num : num.toString();
}

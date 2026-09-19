const deadlineFormat = new Intl.DateTimeFormat("ru-RU", {
  day: "numeric",
  month: "short",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Minsk",
});

export function formatDeadline(iso: string) {
  return deadlineFormat.format(new Date(iso));
}

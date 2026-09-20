import dayjs, { type Dayjs } from "dayjs";
import "dayjs/locale/ru";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

const APP_TIME_ZONE = "Europe/Minsk";

const PICKER_FORMAT = "YYYY-MM-DDTHH:mm";

export function formatDeadline(iso: string) {
  const deadline = dayjs(iso).tz(APP_TIME_ZONE).locale("ru");
  const isCurrentYear = deadline.year() === dayjs().tz(APP_TIME_ZONE).year();

  return deadline.format(isCurrentYear ? "D MMM, HH:mm" : "D MMM YYYY, HH:mm");
}

export function toPickerValue(iso?: string) {
  return iso ? dayjs(iso).tz(APP_TIME_ZONE) : null;
}

export function fromPickerValue(value: Dayjs | null) {
  return value
    ? dayjs.tz(value.format(PICKER_FORMAT), APP_TIME_ZONE).toISOString()
    : undefined;
}

import { BUSINESS_HOURS } from "@/config/site";

function toMinutes(t: string) {
  const m = t.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!m) return 0;
  let h = Number(m[1]) % 12;
  if (m[3]?.toUpperCase() === "PM") h += 12;
  return h * 60 + Number(m[2]);
}

/** Current time at the dealership (America/Chicago). */
export function dealershipNow(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(date);
  const wd = parts.find((p) => p.type === "weekday")?.value ?? "Sun";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(wd);
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0) % 24;
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  return { day, minutes: hour * 60 + minute };
}

export function openStatus(date = new Date()) {
  const { day, minutes } = dealershipNow(date);
  const today = BUSINESS_HOURS[day] ?? BUSINESS_HOURS[0];
  const open = today.open;
  const close = today.close;
  const isOpen = open != null && close != null && minutes >= toMinutes(open) && minutes < toMinutes(close);
  return {
    day,
    isOpen,
    todayLabel: open && close ? `${open.toLowerCase()} - ${close.toLowerCase()}` : "Closed",
  };
}

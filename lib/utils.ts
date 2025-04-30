import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function combineDateAndTime(date: Date, time: string): Date {
  const [hours, minutes] = time.split(":");
  const combined = new Date(date);
  combined.setHours(parseInt(hours));
  combined.setMinutes(parseInt(minutes));
  combined.setSeconds(0);
  combined.setMilliseconds(0);

  return combined;
}

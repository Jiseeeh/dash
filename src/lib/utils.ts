import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomDate() {
  const start = new Date(new Date().getFullYear() - 1, 0, 1); // Start of last year
  const end = new Date(); // Now
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

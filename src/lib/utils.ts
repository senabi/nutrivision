import { type ClassValue, clsx } from "clsx"
import { type NextPage } from "next";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type NextLayoutPage = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

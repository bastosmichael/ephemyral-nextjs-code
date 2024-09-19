import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sanitizeFileContent(content: string): string {
  // Remove or replace invalid UTF-8 characters
  return content.replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\uD800-\uDFFF]/g, '')
    .replace(/\uFFFD/g, ''); // Replace replacement character with empty string
}

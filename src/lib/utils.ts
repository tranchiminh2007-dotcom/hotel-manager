import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function placeholderImage(width: number, height: number, text?: string) {
  const label = text || `${width}x${height}`
  return `https://placehold.co/${width}x${height}/1a365d/ffffff?text=${encodeURIComponent(label)}`
}

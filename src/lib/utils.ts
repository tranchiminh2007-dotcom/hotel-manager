import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Ảnh dùng tạm khi chưa có ảnh riêng cho phòng / địa điểm. */
export const FALLBACK_IMAGE = '/images/hotel-hero.jpg'

export function placeholderImage(_width?: number, _height?: number, _text?: string) {
  return FALLBACK_IMAGE
}

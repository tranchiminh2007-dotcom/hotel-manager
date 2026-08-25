import Image from 'next/image'
import { cn } from '@/lib/utils'

interface CoverImageProps {
  src: string
  alt: string
  /** Ảnh đầu trang — tải ngay, không lazy. */
  priority?: boolean
  sizes?: string
  /** Ảnh nền bị lớp phủ tối che gần hết thì hạ chất lượng cho nhẹ. */
  quality?: number
  className?: string
}

/**
 * Ảnh phủ kín khung cha (cha phải có `relative`).
 * Dùng next/image để tự chuyển WebP/AVIF, cắt đúng kích thước màn hình và lazy-load.
 */
export default function CoverImage({
  src,
  alt,
  priority = false,
  sizes = '100vw',
  quality,
  className,
}: CoverImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      quality={quality}
      className={cn('object-cover', className)}
    />
  )
}

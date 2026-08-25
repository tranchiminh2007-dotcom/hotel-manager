import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="text-center">
        <p className="text-5xl font-light tracking-[0.12em] text-brand lg:text-6xl">404</p>
        <h1 className="mt-8 text-xl h-section text-ink lg:text-2xl">
          Trang không tồn tại
        </h1>
        <span className="mx-auto mt-5 block h-px w-14 bg-brand" />
        <p className="mt-6 text-base text-ink-soft">
          Page not found — xin lỗi, trang bạn tìm không tồn tại.
        </p>
        <Link
          href="/"
          className="mt-10 inline-block border border-ink/25 px-10 py-4 eyebrow text-ink transition-colors hover:bg-ink hover:text-white"
        >
          Trang chủ / Home
        </Link>
      </div>
    </div>
  )
}

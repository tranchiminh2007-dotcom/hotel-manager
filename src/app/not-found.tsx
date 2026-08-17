import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6">
      <div className="text-center">
        <p className="text-5xl font-extralight tracking-[0.2em] text-brand lg:text-6xl">404</p>
        <h1 className="mt-8 text-xl font-light uppercase tracking-[0.22em] text-ink lg:text-2xl">
          Trang không tồn tại
        </h1>
        <span className="mx-auto mt-5 block h-px w-14 bg-brand" />
        <p className="mt-6 text-sm font-light text-ink-soft">
          Page not found — xin lỗi, trang bạn tìm không tồn tại.
        </p>
        <Link
          href="/"
          className="mt-10 inline-block border border-ink/25 px-10 py-4 text-xs uppercase tracking-[0.22em] text-ink transition-all hover:bg-ink hover:text-white"
        >
          Trang chủ / Home
        </Link>
      </div>
    </div>
  )
}

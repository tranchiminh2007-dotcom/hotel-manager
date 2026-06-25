import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { LanguageProvider } from '@/lib/language-context'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </LanguageProvider>
  )
}

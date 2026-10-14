import { Header, Footer } from '@/components/layout'
import { HomePage } from '@/pages'

/**
 * Root Application Component
 */
export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-navy">
      <Header />
      <HomePage />
      <Footer />
    </div>
  )
}

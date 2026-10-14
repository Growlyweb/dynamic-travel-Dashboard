import Header from './components/Header'
import Hero from './components/Hero'
import SearchWidget from './components/SearchWidget'
import FeaturesBar from './components/FeaturesBar'
import VisaSection from './components/VisaSection'
import TourPackages from './components/TourPackages'
import ServicesSection from './components/ServicesSection'
import BangladeshSection from './components/BangladeshSection'
import Footer from './components/footer/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-navy">
      <Header />
      <main>
        <Hero />
        <SearchWidget />
        <FeaturesBar />
        <VisaSection />
        <TourPackages />
        <ServicesSection />
      </main>
      <Footer />
    </div>
  )
}

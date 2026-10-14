import {
  FeaturesBar,
  Hero,
  SearchWidget,
  ServicesSection,
  TourPackages,
  VisaSection,
} from '@/components/sections'

/**
 * HomePage View
 * Orchestrates main landing page sections
 */
export default function HomePage() {
  return (
    <main>
      <Hero />
      <SearchWidget />
      <FeaturesBar />
      <VisaSection />
      <TourPackages />
      <ServicesSection />
    </main>
  )
}

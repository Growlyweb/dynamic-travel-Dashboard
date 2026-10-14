import {
  FeaturesBar,
  Hero,
  SearchWidget,
  ServicesSection,
  TourPackages,
  VisaExplorer,
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
      <VisaExplorer />
      <TourPackages />
      <ServicesSection />
    </main>
  )
}

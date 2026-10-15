import {
  FeaturesBar,
  Hero,
  SearchWidget,
  ServicesSection,
  TourPackages,
  VisaExplorer,
  VisaSection,
  TrustedWorldwide,
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
      <TrustedWorldwide />
      <VisaSection />
      <VisaExplorer />
      <TourPackages />
      <ServicesSection />
    </main>
  )
}

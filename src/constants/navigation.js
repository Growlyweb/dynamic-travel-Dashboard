/**
 * Navigation and Link Constants for ABL Travels
 */

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Visa', href: '#visa', hasDropdown: true },
  { label: 'Tour Packages', href: '#packages', hasDropdown: true },
  { label: 'Become a Partner', href: '#partner' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact Us', href: '#contact' },
]

// In page order. navHref is the nav link lit while the section is on screen, null lights none.
export const NAV_SECTIONS = [
  { id: 'home', navHref: '#home' },
  { id: 'china-visa', navHref: '#visa' },
  { id: 'visa', navHref: '#visa' },
  { id: 'packages', navHref: '#packages' },
  { id: 'services', navHref: null },
  { id: 'about', navHref: '#about' },
  { id: 'contact', navHref: '#contact' },
]

export const FOOTER_LINKS = {
  quick: [
    'Home',
    'About Us',
    'Visa Services',
    'Tour Packages',
    'Custom Tour',
    'Become a Partner',
    'Corporate Travel',
    'Contact Us',
  ],
  services: [
    'China Visa Processing',
    'Tour Packages',
    'Custom Tour Planning',
    'Corporate Travel',
    'Group Tours',
    'Visa Consultation',
    'Travel Insurance',
    'Travel Support',
  ],
  destinations: [
    'China',
    'Thailand',
    'Malaysia',
    'Singapore',
    'Dubai',
    'Bali',
    'Vietnam',
    'Bangladesh',
  ],
}

/* Shared content + imagery for the ABL Travels storefront */

export const IMAGES = {
  heroGreatWall:
    'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=2100&q=80',
  cardChinaVisa:
    'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=700&q=80',
  cardTourPackages:
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=700&q=80',
  cardBangladesh:
    'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?auto=format&fit=crop&w=700&q=80',
  bgBangladesh:
    'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?auto=format&fit=crop&w=2100&q=80',
  newsletter:
    'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1100&q=80',
}

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

export const VALUE_BADGES = [
  { icon: 'ShieldCheck', title: 'Secure & Safe', sub: 'Processing' },
  { icon: 'Headset', title: 'Dedicated', sub: 'Support' },
  { icon: 'ThumbsUp', title: 'Trusted by', sub: 'Thousands' },
  { icon: 'Globe2', title: 'Global', sub: 'Partnerships' },
  { icon: 'Award', title: 'Best Travel', sub: 'Solutions' },
]


export const NAV_LINKS = [
  { label: 'Home', href: '#home', active: true },
  { label: 'Visa', href: '#visa', hasDropdown: true },
  { label: 'Tour Packages', href: '#packages', hasDropdown: true },
  { label: 'Become a Partner', href: '#partner' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact Us', href: '#contact' },
]

export const HERO_SLIDES = [
  { image: IMAGES.heroGreatWall, label: 'China Visa' },
  { image: IMAGES.cardTourPackages, label: 'Tour Packages' },
  { image: IMAGES.cardBangladesh, label: 'Bangladesh' },
]

export const FEATURES = [
  {
    icon: 'Stamp',
    title: 'China Visa Specialist',
    sub: 'Fast & reliable processing',
  },
  {
    icon: 'ShieldCheck',
    title: 'Trusted & Experienced',
    sub: '98% success rate',
  },
  {
    icon: 'Globe2',
    title: 'Wide Range of Tour Packages',
    sub: '20+ destinations',
  },
  {
    icon: 'Route',
    title: 'Custom Travel Planning',
    sub: 'Tailored itineraries',
  },
  {
    icon: 'Briefcase',
    title: 'Corporate Travel',
    sub: 'Business solutions',
  },
  {
    icon: 'Headset',
    title: 'Support from Start to Finish',
    sub: "We're with you always",
  },
]

export const DESTINATIONS = [
  {
    name: 'Thailand',
    packages: 4,
    image:
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=700&q=80',
  },
  {
    name: 'Malaysia',
    packages: 5,
    image:
      'https://images.unsplash.com/photo-1537956965359-7573183d1f57?auto=format&fit=crop&w=700&q=80',
  },
  {
    name: 'Singapore',
    packages: 3,
    image:
      'https://images.unsplash.com/photo-1508964942454-1a56651d54ac?auto=format&fit=crop&w=700&q=80',
  },
  {
    name: 'Dubai',
    packages: 6,
    image:
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=700&q=80',
  },
  {
    name: 'Bali',
    packages: 4,
    image:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=700&q=80',
  },
]

export const SERVICES = [
  {
    icon: 'Stamp',
    title: 'Visa Services',
    desc: 'Hassle-free visa processing for China and 20+ countries with expert documentation support.',
    tile: 'bg-[#eaf2fc] text-primary',
  },
  {
    icon: 'Plane',
    title: 'Tour Packages',
    desc: 'Carefully curated group and family tour packages to the world’s most loved destinations.',
    tile: 'bg-[#fef0dd] text-accent',
  },
  {
    icon: 'Route',
    title: 'Custom Tour Planning',
    desc: 'Tell us your dream trip — we design a personalized itinerary around your budget and dates.',
    tile: 'bg-[#e6f7f3] text-[#0d9488]',
  },
  {
    icon: 'Briefcase',
    title: 'Corporate Travel',
    desc: 'End-to-end business travel management, from visa and flights to accommodation on the ground.',
    tile: 'bg-[#eef0fe] text-[#4f46e5]',
  },
]

export const VISA_POINTS = [
  {
    title: 'Expert documentation support',
    sub: 'Error-free applications, prepared by specialists',
  },
  {
    title: '98% visa success rate',
    sub: 'Trusted by thousands of happy travelers',
  },
  {
    title: 'End-to-end handling',
    sub: 'From form filling to embassy submission',
  },
  {
    title: 'Real-time application tracking',
    sub: 'Stay updated at every single step',
  },
  {
    title: 'Dedicated support team',
    sub: 'Personal help whenever you need it',
  },
]

export const STATS = [
  { icon: 'Users', value: '10,000+', label: 'Happy Travelers', tile: 'bg-[#eaf2fc] text-primary' },
  { icon: 'Trophy', value: '98%', label: 'Success Rate', tile: 'bg-[#fef0dd] text-accent' },
  {
    icon: 'CalendarClock',
    value: '5+ Years',
    label: 'Industry Experience',
    tile: 'bg-[#eaf2fc] text-primary',
  },
]

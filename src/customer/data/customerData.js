const photo = (id, width = 360, height = 240) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&h=${height}&q=75`

export const TOUR_IMAGES = {
  bangkok: photo('1508009603885-50cf7c579365'),
  thailand: photo('1552465011-b4e21bf6e79a'),
  nepal: photo('1544735716-392fe2489ffa'),
  kualaLumpur: photo('1596422846543-75c6fc197f07'),
  singapore: photo('1525625293386-3f8f99389edd'),
  gardensByTheBay: photo('1508964942454-1a56651d54ac'),
  dubai: photo('1512453979798-5ea266f8880c'),
  bali: photo('1537996194471-e657df975ab4'),
  japan: photo('1493976040374-85c8e12f0c0e'),
  europe: photo('1502602898657-3e91760cbb34'),
  switzerland: photo('1530122037265-a5f1f91d3b99'),
  greatWall: photo('1508804185872-d7badad00f7d'),
}

export const PROFILE_DEFAULTS = {
  dob: '1995-03-15',
  address: 'House #1/B, Road #126, Gulshan 01, Dhaka 1212',
  location: 'Dhaka, Bangladesh',
}

export const PREFERENCE_DEFAULTS = {
  visaUpdates: true,
  tourUpdates: true,
  promotions: true,
  language: 'en',
}

export const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'bn', label: 'বাংলা (Bangla)' },
  { value: 'zh', label: '中文 (Chinese)' },
]

export const VISA_STATUS_TONES = {
  'In Process': 'amber',
  Approved: 'green',
  Completed: 'blue',
  Rejected: 'red',
  Draft: 'gray',
}

export const TOUR_STATUS_TONES = {
  Upcoming: 'blue',
  'In Progress': 'amber',
  Completed: 'green',
  Cancelled: 'red',
}

export const CUSTOM_STATUS_TONES = {
  Pending: 'amber',
  'In Discussion': 'blue',
  'Quotation Sent': 'green',
  Confirmed: 'blue',
  Cancelled: 'red',
  Completed: 'green',
}

export const VISA_APPLICATIONS = [
  { id: 'VISA-2026-001', countryCode: 'cn', country: 'China', visaType: 'Tourist Visa', appliedDate: '2026-10-12', travelDate: '2026-11-20', status: 'In Process' },
  { id: 'VISA-2026-002', countryCode: 'th', country: 'Thailand', visaType: 'Tourist Visa', appliedDate: '2026-09-05', travelDate: '2026-10-18', status: 'Approved' },
  { id: 'VISA-2026-003', countryCode: 'my', country: 'Malaysia', visaType: 'Tourist e-Visa', appliedDate: '2026-08-20', travelDate: '2026-10-15', status: 'Completed' },
  { id: 'VISA-2026-004', countryCode: 'sg', country: 'Singapore', visaType: 'Tourist Visa', appliedDate: '2026-08-10', travelDate: '2026-09-25', status: 'Rejected' },
  { id: 'VISA-2026-005', countryCode: 'ae', country: 'UAE', visaType: 'Tourist Visa', appliedDate: '2026-07-28', travelDate: '2026-09-10', status: 'Approved' },
  { id: 'VISA-2026-006', countryCode: 'tr', country: 'Turkey', visaType: 'Business Visa', appliedDate: '2026-07-15', travelDate: '2026-09-01', status: 'In Process' },
  { id: 'VISA-2026-007', countryCode: 'in', country: 'India', visaType: 'Tourist Visa', appliedDate: '2026-07-10', travelDate: '2026-08-20', status: 'Completed' },
  { id: 'VISA-2026-008', countryCode: 'eu', country: 'Schengen', visaType: 'Tourist Visa', appliedDate: '2026-07-01', travelDate: '2026-08-15', status: 'Draft' },
]

export const TOUR_BOOKINGS = [
  { id: 'TP-2026-001', name: 'Bangkok & Pattaya Tour', duration: '5 Days 4 Nights', destination: 'Thailand', startDate: '2026-11-20', endDate: '2026-11-24', travelers: '2 Adults', status: 'Upcoming', image: TOUR_IMAGES.bangkok },
  { id: 'TP-2026-002', name: 'Nepal Discovery Tour', duration: '6 Days 5 Nights', destination: 'Nepal', startDate: '2026-04-10', endDate: '2026-04-15', travelers: '2 Adults', status: 'Completed', image: TOUR_IMAGES.nepal },
  { id: 'TP-2026-003', name: 'Malaysia City Tour', duration: '4 Days 3 Nights', destination: 'Malaysia', startDate: '2026-10-17', endDate: '2026-10-21', travelers: '3 Adults', status: 'In Progress', image: TOUR_IMAGES.kualaLumpur },
  { id: 'TP-2026-004', name: 'Singapore Explorer', duration: '4 Days 3 Nights', destination: 'Singapore', startDate: '2026-09-05', endDate: '2026-09-08', travelers: '2 Adults', status: 'Cancelled', image: TOUR_IMAGES.singapore },
  { id: 'TP-2026-005', name: 'Dubai City Tour', duration: '5 Days 4 Nights', destination: 'UAE', startDate: '2026-06-18', endDate: '2026-06-22', travelers: '2 Adults', status: 'Completed', image: TOUR_IMAGES.dubai },
  { id: 'TP-2026-006', name: 'Bali Holiday Package', duration: '6 Days 5 Nights', destination: 'Indonesia', startDate: '2026-12-12', endDate: '2026-12-17', travelers: '2 Adults', status: 'Upcoming', image: TOUR_IMAGES.bali },
]

export const CUSTOM_TOURS = [
  { id: 'CT-2026-001', name: 'Thailand Family Tour', destinations: 'Thailand', startDate: '2026-11-20', endDate: '2026-11-25', travelers: '4 Adults, 1 Child', status: 'Pending', image: TOUR_IMAGES.thailand, summary: 'Custom itinerary with Bangkok, Phuket and Krabi.' },
  { id: 'CT-2026-002', name: 'Japan Holiday Plan', destinations: 'Japan', startDate: '2027-04-15', endDate: '2027-04-22', travelers: '2 Adults', status: 'In Discussion', image: TOUR_IMAGES.japan, summary: 'Cherry blossom season across Tokyo, Kyoto and Osaka.' },
  { id: 'CT-2026-003', name: 'Europe Multi-Country Tour', destinations: 'France, Italy, Switzerland', startDate: '2027-08-12', endDate: '2027-08-25', travelers: '2 Adults', status: 'Quotation Sent', image: TOUR_IMAGES.europe, summary: 'Paris, Rome and the Swiss Alps by rail.' },
  { id: 'CT-2026-004', name: 'Malaysia City Tour', destinations: 'Malaysia', startDate: '2026-12-10', endDate: '2026-12-15', travelers: '3 Adults', status: 'Confirmed', image: TOUR_IMAGES.kualaLumpur, summary: 'Kuala Lumpur, Penang and Langkawi.' },
  { id: 'CT-2026-005', name: 'Bali Leisure Trip', destinations: 'Indonesia', startDate: '2026-12-18', endDate: '2026-12-24', travelers: '2 Adults', status: 'Cancelled', image: TOUR_IMAGES.bali, summary: 'Beach resort stay with temple visits.' },
  { id: 'CT-2026-006', name: 'Singapore Short Tour', destinations: 'Singapore', startDate: '2026-10-05', endDate: '2026-10-09', travelers: '2 Adults', status: 'Completed', image: TOUR_IMAGES.singapore, summary: 'Marina Bay, Sentosa and Gardens by the Bay.' },
]

export const SAVED_ITEMS = [
  { id: 'sv-1', kind: 'visa', title: 'China Tourist Visa', place: 'China', countryCode: 'cn', image: TOUR_IMAGES.greatWall, meta: [{ icon: 'entry', text: 'Single Entry' }, { icon: 'time', text: 'Processing: 15 Days (±)' }], href: '/visa#visa/cn/tourist' },
  { id: 'sv-2', kind: 'visa', title: 'Thailand Tourist e-Visa', place: 'Thailand', countryCode: 'th', image: TOUR_IMAGES.thailand, meta: [{ icon: 'entry', text: 'Multiple Entry' }, { icon: 'time', text: 'Processing: 7 Days (±)' }], href: '/visa#visa/th' },
  { id: 'sv-3', kind: 'tour', title: 'Dubai City Tour', place: 'UAE', image: TOUR_IMAGES.dubai, meta: [{ icon: 'date', text: '5 Days 4 Nights' }, { icon: 'people', text: '2 Adults' }], href: '/tour-packages/dubai-city-tour' },
  { id: 'sv-4', kind: 'tour', title: 'Bali Holiday Package', place: 'Indonesia', image: TOUR_IMAGES.bali, meta: [{ icon: 'date', text: '6 Days 5 Nights' }, { icon: 'people', text: '2 Adults' }], href: '/tour-packages/bali-holiday-package' },
  { id: 'sv-5', kind: 'visa', title: 'Singapore Tourist Visa', place: 'Singapore', countryCode: 'sg', image: TOUR_IMAGES.singapore, meta: [{ icon: 'entry', text: 'Single Entry' }, { icon: 'time', text: 'Processing: 5 Days (±)' }], href: '/visa#visa/sg' },
  { id: 'sv-6', kind: 'tour', title: 'Nepal Discovery Tour', place: 'Nepal', image: TOUR_IMAGES.nepal, meta: [{ icon: 'date', text: '7 Days 6 Nights' }, { icon: 'people', text: '2 Adults' }], href: '/tour-packages/nepal-discovery-tour' },
]

export const RECENT_UPDATES = [
  { id: 'up-1', text: 'Your visa application is in process', date: '2026-10-12', tone: 'blue' },
  { id: 'up-2', text: 'Document approved', date: '2026-09-05', tone: 'green' },
  { id: 'up-3', text: 'Payment received', date: '2026-08-20', tone: 'amber' },
  { id: 'up-4', text: 'Your visa is ready for collection', date: '2026-08-10', tone: 'blue' },
]

const TIMELINE_STEPS = [
  'Application submitted',
  'Documents verified',
  'Submitted to embassy',
  'Decision',
  'Visa collected',
]

const COMPLETED_STEPS = { Draft: 0, 'In Process': 3, Approved: 4, Rejected: 3, Completed: 5 }

export function buildVisaTimeline(status) {
  const done = COMPLETED_STEPS[status] ?? 0

  return TIMELINE_STEPS.map((label, index) => {
    if (index < done) return { label, state: 'done' }
    if (index === done) {
      return { label, state: status === 'Rejected' && index === 3 ? 'failed' : 'current' }
    }
    return { label, state: 'pending' }
  })
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function formatDate(isoDate) {
  const [year, month, day] = isoDate.split('-')
  return `${day} ${MONTHS[Number(month) - 1]} ${year}`
}

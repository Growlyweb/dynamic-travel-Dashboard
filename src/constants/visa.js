export const DEFAULT_VISA_COUNTRY = 'cn'

export const VISA_PINNED_COUNTRIES = [
  'cn',
  'th',
  'my',
  'sg',
  'ae',
  'sa',
  'tr',
  'bd',
  'in',
  'gb',
  'us',
  'ca',
  'au',
  'jp',
  'kr',
  'eu',
]

// The "eu" flag stands in for Schengen
export const VISA_NAME_OVERRIDES = {
  eu: 'Schengen',
  gb: 'UK',
  us: 'USA',
  ae: 'UAE',
}

export const VISA_CATALOG = {
  cn: {
    heroImage: '/images/hero-china.webp',
    summary:
      'Explore China’s rich history, vibrant cities and breathtaking landscapes with our hassle-free visa process.',
    visaTypes: [
      {
        id: 'tourist',
        label: 'Tourist Visa',
        tagline: 'Travel, sightseeing & family visit',
        details: {
          title: 'China Tourist Visa (Single Entry)',
          facts: {
            processing: '15 Days (+/-)',
            stay: 'Up to 30 Days',
            entry: 'Single Entry',
            validity: 'As per approval',
          },
          fee: { currency: 'BDT', amount: 12500, note: 'All Inclusive' },
          includes: [
            'Professional document support',
            'Application assistance',
            'Real-time status updates',
            'End-to-end support',
          ],
          requirements: [
            'Original Passport (valid for at least 6 months from the date of departure)',
            'Recent 33 mm × 48 mm size photo with white background (2 copies, mat paper)',
            'Completed China Visa Application Form',
            'Copy of National ID Card',
            'Bank Statement for last 6 months (minimum balance: BDT 300,000)',
            'Confirmed Return Air Ticket',
            'Hotel Booking (for the travel period)',
            'Personal Cover Letter (purpose of visit)',
            'Marriage Certificate (only for newly married couples, if applicable)',
          ],
          terms: [
            'Visa fee is non-refundable, regardless of the outcome.',
            'Visa approval is at the sole discretion of the Chinese Embassy.',
            'Client must provide authentic and complete documents.',
            'We provide guidance, support, and document processing assistance only.',
            'Processing time may vary depending on the Embassy operations.',
          ],
        },
      },
      {
        id: 'medical',
        label: 'Medical Visa',
        tagline: 'Medical treatment in China',
        details: null,
      },
      {
        id: 'canton-fair',
        label: 'Canton Fair Visa',
        tagline: 'For business & trade fair visit',
        details: null,
      },
      {
        id: 'student',
        label: 'Student Visa',
        tagline: 'Study in China',
        details: null,
      },
    ],
  },
}

export function getVisaContent(code) {
  return VISA_CATALOG[code] ?? null
}

export function getCountryLabel(country) {
  return VISA_NAME_OVERRIDES[country.code] ?? country.name
}

export function buildCountryList(countries) {
  const toItem = (country) => {
    const name = getCountryLabel(country)
    return { code: country.code, name, searchText: `${name} ${country.name} ${country.code}` }
  }

  const byCode = new Map(countries.map((country) => [country.code, country]))
  const pinned = VISA_PINNED_COUNTRIES.filter((code) => byCode.has(code)).map((code) =>
    toItem(byCode.get(code)),
  )
  const rest = countries
    .filter((country) => !VISA_PINNED_COUNTRIES.includes(country.code))
    .map(toItem)

  return [...pinned, ...rest]
}

export function formatFee({ currency, amount }) {
  return `${currency} ${amount.toLocaleString('en-US')}/-`
}

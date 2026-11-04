/**
 * Tour Adapter Utility
 * Normalizes backend tour objects from GET /api/tours and GET /api/tours/:id
 * into the format expected by Storefront components:
 * - VerticalActivityCard
 * - HorizontalActivityCard
 * - SearchResultCard
 * - DestinationCard
 * - TourDetailPage
 */

export function mapBackendTour(tour) {
  if (!tour) return null

  const id = tour._id || tour.id || tour.legacyId
  const title = tour.name || tour.title || 'Tour Package'
  const coverImage =
    tour.coverImage ||
    tour.image ||
    (Array.isArray(tour.gallery) && tour.gallery[0] && (typeof tour.gallery[0] === 'string' ? tour.gallery[0] : tour.gallery[0].url)) ||
    'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80'

  const price = typeof tour.price === 'number' ? tour.price : 0
  const currencyCode = tour.priceCurrency || 'USD'
  const currency = currencyCode === 'BDT' ? '৳' : currencyCode === 'EUR' ? '€' : '$'

  const durationDays = tour.durationDays || (tour.duration ? parseInt(tour.duration, 10) : 1)
  const duration =
    tour.duration ||
    (durationDays ? `${durationDays} ${durationDays === 1 ? 'day' : 'days'}` : '1 day')

  const rating = typeof tour.rating === 'number' ? tour.rating : 4.8
  const reviewsCount =
    tour.reviewsCount || `${Math.floor(rating * 150 + (parseInt(String(id).slice(-3), 16) % 300 || 200))}`

  const city = tour.destination
    ? tour.destination.split(',')[0].trim()
    : tour.city || 'Tour Destination'
  const country = tour.country || 'International'
  const context = `${city.toUpperCase()} • ${country.toUpperCase()}`

  const categoryName =
    typeof tour.category === 'object' && tour.category?.name
      ? tour.category.name
      : tour.category || 'Sightseeing'

  const badge = tour.badge || (rating >= 4.8 ? 'Top rated' : 'Popular')
  const badgeType = tour.badgeType || (rating >= 4.8 ? 'best-match' : 'standard')

  const perk =
    tour.perk ||
    (Array.isArray(tour.included) && tour.included.length > 0
      ? tour.included[0]
      : tour.description || 'Guided tour with hotel pickup')

  const gallery =
    Array.isArray(tour.gallery) && tour.gallery.length > 0
      ? tour.gallery.map((item, idx) =>
          typeof item === 'string'
            ? {
                id: idx + 1,
                url: item,
                fullUrl: item,
                title: `${title} photo ${idx + 1}`,
                alt: `${title} photo ${idx + 1}`,
              }
            : item
        )
      : [
          {
            id: 1,
            url: coverImage,
            fullUrl: coverImage,
            title: title,
            alt: title,
          },
        ]

  const highlights =
    Array.isArray(tour.highlights) && tour.highlights.length > 0
      ? tour.highlights
      : Array.isArray(tour.included) && tour.included.length > 0
      ? tour.included.slice(0, 3)
      : ['Scenic destinations', 'Local guide included', 'Flexible schedule']

  return {
    ...tour,
    id,
    _id: tour._id || id,
    legacyId: tour.legacyId || id,
    slug: tour.slug || tour.legacyId || id,
    name: title,
    title,
    shortTitle: title,
    image: coverImage,
    coverImage,
    heroImage: coverImage,
    price,
    originalPrice: tour.originalPrice || Math.round(price * 1.15),
    discounted: true,
    currency,
    currencyCode,
    duration,
    durationDays,
    rating,
    reviewsCount,
    city,
    country,
    location: tour.destination || `${city}, ${country}`,
    destination: tour.destination || `${city}, ${country}`,
    context,
    category: categoryName,
    badge,
    badgeType,
    isOriginal: Boolean(tour.isOriginal),
    perk,
    description: tour.description || '',
    shortDescription: tour.description || '',
    highlights,
    included: Array.isArray(tour.included) ? tour.included : [],
    excluded: Array.isArray(tour.excluded) ? tour.excluded : [],
    hotels: Array.isArray(tour.hotels) ? tour.hotels : [],
    itinerary: Array.isArray(tour.itinerary) ? tour.itinerary : [],
    gallery,
  }
}

/**
 * Ensures all deep fields needed by TourDetailPage are populated
 * from a live backend tour or fallback.
 */
export function buildTourDetailData(backendTour, fallbackTour) {
  const base = mapBackendTour(backendTour)
  if (!base) return fallbackTour

  // Options array for booking pricing
  const options = [
    {
      id: 'opt-standard',
      name: 'Standard Package',
      description: 'Complete guided package including all activities and local transport.',
      price: base.price,
      currency: base.currency,
      duration: base.duration,
      cancellation: 'Free cancellation up to 24 hours in advance',
      pickup: 'Hotel pickup & drop-off included',
    },
    {
      id: 'opt-all-inclusive',
      name: 'All-Inclusive VIP Experience',
      description: 'Includes 5-star hotel accommodations, meals, VIP entry, and private chauffeur.',
      price: Math.round(base.price * 1.35),
      currency: base.currency,
      duration: base.duration,
      cancellation: 'Free cancellation up to 48 hours in advance',
      pickup: 'VIP Airport & hotel transfer',
    },
  ]

  // Key details icons
  const keyDetails = [
    {
      id: 'cancellation',
      icon: 'CalendarCheck',
      title: 'Free cancellation',
      description: 'Cancel up to 24 hours in advance for a full refund',
    },
    {
      id: 'reserve',
      icon: 'CreditCard',
      title: 'Reserve now & pay later',
      description: 'Keep your travel plans flexible — book your spot and pay nothing today',
    },
    {
      id: 'duration',
      icon: 'Clock',
      title: `Duration: ${base.duration}`,
      description: 'Flexible starting time with coordinated local schedule',
    },
    {
      id: 'skip',
      icon: 'Zap',
      title: 'Skip the ticket line',
      description: 'Priority entrance included for featured attractions',
    },
    {
      id: 'guide',
      icon: 'Flag',
      title: 'Live tour guide',
      description: 'English, Bengali, and multilingual guides available',
    },
    {
      id: 'pickup',
      icon: 'Bus',
      title: 'Pickup included',
      description: `Pickup from central accommodations in ${base.city}`,
    },
    {
      id: 'group',
      icon: 'Users',
      title: 'Private or Small group',
      description: 'Personalized attention and flexible pace throughout the tour',
    },
  ]

  return {
    ...fallbackTour,
    ...base,
    options,
    keyDetails,
    cancellation: 'Free cancellation up to 24 hours in advance for a full refund',
    reservePolicy: 'Reserve now & pay later — Keep your travel plans flexible',
    guideLanguages: ['English', 'Bengali', 'Hindi'],
    groupType: 'Private / Small Group',
    accessibility: 'Wheelchair accessible on request',
    skipTheLine: 'Skip the ticket line through priority entrance',
    pickup: `Pickup included from anywhere in ${base.city}`,
    travelerFavorite: {
      title: 'Top Rated by Travelers',
      subtitle: `${Math.round(base.rating * 20)}% of travelers gave this package a 5-star rating`,
    },
    experience: {
      highlights: base.highlights,
      fullDescription: base.description || fallbackTour?.experience?.fullDescription || '',
      includes: base.included.length > 0 ? base.included : fallbackTour?.experience?.includes || [],
      excludes: base.excluded.length > 0 ? base.excluded : fallbackTour?.experience?.excludes || [],
    },
    itineraryStops:
      Array.isArray(base.itinerary) && base.itinerary.length > 0
        ? base.itinerary.map((step, idx) => ({
            id: idx + 1,
            time: `Day ${step.day || idx + 1}`,
            title: step.title || `Day ${step.day || idx + 1} Program`,
            type: 'Stop',
            duration: 'Flexible',
            admissionIncluded: true,
            description: step.description || '',
            image: base.coverImage,
          }))
        : fallbackTour?.itineraryStops || [],
    hotels: base.hotels || [],
  }
}

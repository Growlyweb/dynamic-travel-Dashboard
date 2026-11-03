import { useState } from 'react'
import { useListFilters } from '@/hooks'
import DataTable from '../components/DataTable'
import DetailsModal from '../components/DetailsModal'
import FilterBar from '../components/FilterBar'
import PageHeader from '../components/PageHeader'
import RowAction from '../components/RowAction'
import { TourStatusBadge } from '../components/StatusBadge'
import TourCell, { DateRange } from '../components/TourCell'
import { TOUR_BOOKINGS, TOUR_STATUS_TONES, formatDate } from '../data/customerData'

const DESTINATION_OPTIONS = [...new Set(TOUR_BOOKINGS.map((tour) => tour.destination))]
  .sort()
  .map((value) => ({ value, label: value }))
const STATUS_OPTIONS = Object.keys(TOUR_STATUS_TONES).map((value) => ({ value, label: value }))
const DATE_OPTIONS = [
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'past', label: 'Past' },
]

const INITIAL_FILTERS = { query: '', destination: '', date: '', status: '' }

function matches(tour, filters) {
  if (filters.destination && tour.destination !== filters.destination) return false
  if (filters.status && tour.status !== filters.status) return false

  const today = new Date().toISOString().slice(0, 10)
  if (filters.date === 'upcoming' && tour.endDate < today) return false
  if (filters.date === 'past' && tour.endDate >= today) return false

  const query = filters.query.trim().toLowerCase()
  return !query || `${tour.name} ${tour.destination} ${tour.id}`.toLowerCase().includes(query)
}

export default function TourPackagesPage() {
  const list = useListFilters(TOUR_BOOKINGS, { initial: INITIAL_FILTERS, predicate: matches })
  const [selected, setSelected] = useState(null)

  const columns = [
    {
      key: 'package',
      header: 'Package',
      className: 'min-w-[260px]',
      render: (tour) => <TourCell image={tour.image} name={tour.name} caption={tour.duration} />,
    },
    { key: 'destination', header: 'Destination', render: (tour) => tour.destination },
    {
      key: 'date',
      header: 'Travel Date',
      className: 'whitespace-nowrap',
      render: (tour) => <DateRange start={tour.startDate} end={tour.endDate} format={formatDate} />,
    },
    { key: 'id', header: 'Booking ID', className: 'whitespace-nowrap', render: (tour) => tour.id },
    {
      key: 'travelers',
      header: 'Travelers',
      className: 'whitespace-nowrap',
      render: (tour) => tour.travelers,
    },
    { key: 'status', header: 'Status', render: (tour) => <TourStatusBadge status={tour.status} /> },
    {
      key: 'action',
      header: 'Action',
      render: (tour) => (
        <RowAction label="View Details" subject={tour.name} onOpen={() => setSelected(tour)} />
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        crumb="My Tour Packages"
        title="My Tour Packages"
        subtitle="View and manage all your booked tour packages."
        action={{ label: 'Book a New Tour Package', to: '/tour-packages' }}
      />

      <FilterBar
        search={{
          value: list.filters.query,
          onChange: (value) => list.setFilter('query', value),
          placeholder: 'Search by destination, package name or booking ID...',
        }}
        filters={[
          {
            id: 'destination',
            label: 'Destination',
            allLabel: 'All Destinations',
            value: list.filters.destination,
            onChange: (value) => list.setFilter('destination', value),
            options: DESTINATION_OPTIONS,
          },
          {
            id: 'date',
            label: 'Travel Date',
            allLabel: 'All Dates',
            value: list.filters.date,
            onChange: (value) => list.setFilter('date', value),
            options: DATE_OPTIONS,
          },
          {
            id: 'status',
            label: 'Status',
            allLabel: 'All Status',
            value: list.filters.status,
            onChange: (value) => list.setFilter('status', value),
            options: STATUS_OPTIONS,
          },
        ]}
        onReset={list.reset}
      />

      <DataTable
        columns={columns}
        rows={list.pageItems}
        rowKey={(tour) => tour.id}
        startIndex={(list.page - 1) * list.pageSize}
        emptyMessage="No tour packages match your filters."
        onReset={list.reset}
        pagination={{
          page: list.page,
          pageSize: list.pageSize,
          total: list.results.length,
          noun: 'packages',
          onPageChange: list.setPage,
        }}
      />

      {selected && (
        <DetailsModal
          title={selected.name}
          subtitle={`Booking ${selected.id}`}
          badge={<TourStatusBadge status={selected.status} />}
          rows={[
            ['Destination', selected.destination],
            ['Duration', selected.duration],
            ['Travel dates', `${formatDate(selected.startDate)} - ${formatDate(selected.endDate)}`],
            ['Travelers', selected.travelers],
          ]}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  )
}

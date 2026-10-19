import { useState } from 'react'
import CustomTourBuilderModal from '@/components/tour-packages/CustomTourBuilderModal'
import { useListFilters } from '@/hooks'
import DataTable from '../components/DataTable'
import DetailsModal from '../components/DetailsModal'
import FilterBar from '../components/FilterBar'
import PageHeader from '../components/PageHeader'
import RowAction from '../components/RowAction'
import { CustomTourStatusBadge } from '../components/StatusBadge'
import TourCell, { DateRange } from '../components/TourCell'
import { CUSTOM_STATUS_TONES, CUSTOM_TOURS, formatDate } from '../data/customerData'

const DESTINATION_OPTIONS = [...new Set(CUSTOM_TOURS.map((tour) => tour.destinations))]
  .sort()
  .map((value) => ({ value, label: value }))
const STATUS_OPTIONS = Object.keys(CUSTOM_STATUS_TONES).map((value) => ({ value, label: value }))
const DATE_OPTIONS = [
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'past', label: 'Past' },
]

const INITIAL_FILTERS = { query: '', destination: '', date: '', status: '' }

function matches(tour, filters) {
  if (filters.destination && tour.destinations !== filters.destination) return false
  if (filters.status && tour.status !== filters.status) return false

  const today = new Date().toISOString().slice(0, 10)
  if (filters.date === 'upcoming' && tour.endDate < today) return false
  if (filters.date === 'past' && tour.endDate >= today) return false

  const query = filters.query.trim().toLowerCase()
  return !query || `${tour.name} ${tour.destinations} ${tour.id}`.toLowerCase().includes(query)
}

export default function CustomToursPage() {
  const list = useListFilters(CUSTOM_TOURS, { initial: INITIAL_FILTERS, predicate: matches })
  const [selected, setSelected] = useState(null)
  const [isBuilderOpen, setIsBuilderOpen] = useState(false)

  const columns = [
    {
      key: 'name',
      header: 'Tour Name',
      className: 'min-w-[260px]',
      render: (tour) => <TourCell image={tour.image} name={tour.name} caption="Custom itinerary" />,
    },
    { key: 'destinations', header: 'Destinations', render: (tour) => tour.destinations },
    {
      key: 'date',
      header: 'Travel Date',
      className: 'whitespace-nowrap',
      render: (tour) => <DateRange start={tour.startDate} end={tour.endDate} format={formatDate} />,
    },
    {
      key: 'travelers',
      header: 'Travelers',
      className: 'whitespace-nowrap',
      render: (tour) => tour.travelers,
    },
    { key: 'id', header: 'Request ID', className: 'whitespace-nowrap', render: (tour) => tour.id },
    {
      key: 'status',
      header: 'Status',
      render: (tour) => <CustomTourStatusBadge status={tour.status} />,
    },
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
        crumb="My Custom Tours"
        title="My Custom Tours"
        subtitle="View and manage your custom tour requests. Our team will contact you with the best itinerary and quotation."
        action={{ label: 'Request a New Custom Tour', onClick: () => setIsBuilderOpen(true) }}
      />

      <FilterBar
        search={{
          value: list.filters.query,
          onChange: (value) => list.setFilter('query', value),
          placeholder: 'Search by destination, tour name or request ID...',
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
        emptyMessage="No custom tour requests match your filters."
        onReset={list.reset}
        pagination={{
          page: list.page,
          pageSize: list.pageSize,
          total: list.results.length,
          noun: 'custom tour requests',
          onPageChange: list.setPage,
        }}
      />

      {selected && (
        <DetailsModal
          title={selected.name}
          subtitle={`Request ${selected.id}`}
          badge={<CustomTourStatusBadge status={selected.status} />}
          rows={[
            ['Destinations', selected.destinations],
            ['Travel dates', `${formatDate(selected.startDate)} - ${formatDate(selected.endDate)}`],
            ['Travelers', selected.travelers],
            ['Itinerary', selected.summary],
          ]}
          onClose={() => setSelected(null)}
        />
      )}

      <CustomTourBuilderModal isOpen={isBuilderOpen} onClose={() => setIsBuilderOpen(false)} />
    </div>
  )
}

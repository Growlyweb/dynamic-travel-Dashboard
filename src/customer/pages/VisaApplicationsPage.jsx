import { useState } from 'react'
import CountryFlag from '@/components/sections/VisaExplorer/CountryFlag'
import { useListFilters } from '@/hooks'
import DataTable from '../components/DataTable'
import VisaDetailsModal from '../components/VisaDetailsModal'
import FilterBar from '../components/FilterBar'
import PageHeader from '../components/PageHeader'
import RowAction from '../components/RowAction'
import { VisaStatusBadge } from '../components/StatusBadge'
import { VISA_APPLICATIONS, VISA_STATUS_TONES, formatDate } from '../data/customerData'

const COUNTRY_OPTIONS = [...new Map(VISA_APPLICATIONS.map((app) => [app.countryCode, app.country]))]
  .map(([value, label]) => ({ value, label }))
  .sort((a, b) => a.label.localeCompare(b.label))
const TYPE_OPTIONS = [...new Set(VISA_APPLICATIONS.map((app) => app.visaType))].map((value) => ({
  value,
  label: value,
}))
const STATUS_OPTIONS = Object.keys(VISA_STATUS_TONES).map((value) => ({ value, label: value }))

const INITIAL_FILTERS = { query: '', country: '', type: '', status: '' }

function matches(app, filters) {
  if (filters.country && app.countryCode !== filters.country) return false
  if (filters.type && app.visaType !== filters.type) return false
  if (filters.status && app.status !== filters.status) return false

  const query = filters.query.trim().toLowerCase()
  return !query || `${app.country} ${app.visaType} ${app.id}`.toLowerCase().includes(query)
}

export default function VisaApplicationsPage() {
  const list = useListFilters(VISA_APPLICATIONS, { initial: INITIAL_FILTERS, predicate: matches })
  const [selected, setSelected] = useState(null)

  const columns = [
    {
      key: 'country',
      header: 'Country',
      render: (app) => (
        <div className="flex items-center gap-3">
          <CountryFlag code={app.countryCode} name={app.country} width={32} />
          <span className="font-semibold text-ink">{app.country}</span>
        </div>
      ),
    },
    { key: 'type', header: 'Visa Type', render: (app) => app.visaType },
    { key: 'id', header: 'Application ID', render: (app) => app.id },
    { key: 'applied', header: 'Applied Date', render: (app) => formatDate(app.appliedDate) },
    { key: 'travel', header: 'Travel Date', render: (app) => formatDate(app.travelDate) },
    { key: 'status', header: 'Status', render: (app) => <VisaStatusBadge status={app.status} /> },
    {
      key: 'action',
      header: 'Action',
      render: (app) => (
        <RowAction label="Track Visa" subject={app.id} onOpen={() => setSelected(app)} />
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader
        crumb="My Visa Applications"
        title="My Visa Applications"
        subtitle="Track and manage all your visa applications in one place."
        action={{ label: 'Apply for New Visa', to: '/visa' }}
      />

      <FilterBar
        search={{
          label: 'Search Application',
          value: list.filters.query,
          onChange: (value) => list.setFilter('query', value),
          placeholder: 'Search by country, visa type or application ID...',
        }}
        filters={[
          {
            id: 'country',
            label: 'Country',
            allLabel: 'All Countries',
            value: list.filters.country,
            onChange: (value) => list.setFilter('country', value),
            options: COUNTRY_OPTIONS,
          },
          {
            id: 'type',
            label: 'Visa Type',
            allLabel: 'All Visa Types',
            value: list.filters.type,
            onChange: (value) => list.setFilter('type', value),
            options: TYPE_OPTIONS,
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
        rowKey={(app) => app.id}
        startIndex={(list.page - 1) * list.pageSize}
        emptyMessage="No visa applications match your filters."
        onReset={list.reset}
        pagination={{
          page: list.page,
          pageSize: list.pageSize,
          total: list.results.length,
          noun: 'applications',
          onPageChange: list.setPage,
        }}
      />

      {selected && <VisaDetailsModal application={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}

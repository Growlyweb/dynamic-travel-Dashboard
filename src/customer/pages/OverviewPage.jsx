import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight } from 'lucide-react'
import Avatar from '@/components/common/Avatar'
import { useCustomerProfile } from '@/context/CustomerProfileContext'
import DataTable from '../components/DataTable'
import { outlineButton } from '../components/PageHeader'
import RowAction from '../components/RowAction'
import { CustomTourStatusBadge, TourStatusBadge, VisaStatusBadge } from '../components/StatusBadge'
import VisaDetailsModal from '../components/VisaDetailsModal'
import {
  CUSTOM_TOURS,
  RECENT_UPDATES,
  TOUR_BOOKINGS,
  VISA_APPLICATIONS,
  formatDate,
} from '../data/customerData'

const DOT_TONES = { blue: 'bg-blue-600', green: 'bg-emerald-600', amber: 'bg-amber-500' }

function ViewAllLink({ to }) {
  return (
    <Link
      to={to}
      className="flex shrink-0 items-center gap-1 text-sm font-semibold text-brand hover:underline"
    >
      View All
      <ArrowRight className="size-3.5" aria-hidden="true" />
    </Link>
  )
}

function SectionCard({ title, to, children }) {
  return (
    <section className="min-w-0 rounded-2xl border border-slate-100 bg-white p-5 shadow-card sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-extrabold tracking-tight text-ink sm:text-2xl">{title}</h2>
        {to && <ViewAllLink to={to} />}
      </div>
      {children}
    </section>
  )
}

function StatCard({ label, value, to, tone }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-3.5 shadow-card">
      <div className={`flex h-full min-h-[132px] flex-col justify-center rounded-xl border px-5 py-4 ${tone}`}>
        <p className="text-[15px] font-semibold text-ink">{label}</p>
        <p className="mt-1 text-3xl font-extrabold leading-tight text-ink">{value}</p>
        <Link to={to} className="mt-1 text-sm font-semibold text-brand hover:underline">
          View All
        </Link>
      </div>
    </div>
  )
}

export default function OverviewPage() {
  const { profile } = useCustomerProfile()
  const [selectedVisa, setSelectedVisa] = useState(null)

  const visaColumns = [
    { key: 'country', header: 'Country', render: (app) => <span className="font-bold text-ink">{app.country}</span> },
    { key: 'type', header: 'Visa Type', render: (app) => app.visaType },
    { key: 'id', header: 'Application ID', render: (app) => app.id },
    { key: 'applied', header: 'Applied Date', render: (app) => formatDate(app.appliedDate) },
    { key: 'travel', header: 'Travel Date', render: (app) => formatDate(app.travelDate) },
    {
      key: 'status',
      header: 'Status',
      render: (app) => <VisaStatusBadge status={app.status} dot={false} size="lg" />,
    },
    {
      key: 'action',
      header: 'Action',
      render: (app) => (
        <RowAction
          label="Track Visa"
          subject={app.id}
          showChevron={false}
          onOpen={() => setSelectedVisa(app)}
        />
      ),
    },
  ]

  const featuredCustomTour = CUSTOM_TOURS[0]

  return (
    <div className="space-y-5">
      <section className="flex flex-col gap-5 rounded-2xl border border-slate-100 bg-white p-5 shadow-card sm:flex-row sm:items-center sm:p-6">
        <Avatar name={profile.fullName} src={profile.avatarUrl} size="xl" />

        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-extrabold tracking-tight text-ink sm:text-[28px]">
            {profile.fullName}
          </h1>
          <ul className="mt-3 flex flex-col gap-1 text-[15px] text-body sm:flex-row sm:flex-wrap sm:gap-x-4">
            <li className="truncate">{profile.email}</li>
            <li className="hidden text-slate-400 sm:block" aria-hidden="true">
              |
            </li>
            <li>
              {profile.dialCode} {profile.phone}
            </li>
            <li className="hidden text-slate-400 sm:block" aria-hidden="true">
              |
            </li>
            <li>{profile.location}</li>
          </ul>
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:self-start sm:pt-3">
          <span className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-5 py-2.5 text-sm font-semibold text-emerald-700">
            <span aria-hidden="true" className="size-2 rounded-full bg-emerald-600" />
            Active Member
          </span>
          <Link to="/account/settings" className={`${outlineButton} px-7 py-2.5`}>
            Edit Profile
          </Link>
        </div>
      </section>

      <div className="grid gap-5 sm:grid-cols-3 xl:grid-cols-[repeat(3,minmax(0,1fr))_minmax(0,1.5fr)]">
        <StatCard
          label="Visa Applications"
          value={VISA_APPLICATIONS.length}
          to="/account/visa-applications"
          tone="border-blue-200/70 bg-gradient-to-br from-[#e3eefc] to-[#edf4fd]"
        />
        <StatCard
          label="Tour Packages"
          value={TOUR_BOOKINGS.length}
          to="/account/tour-packages"
          tone="border-orange-200/70 bg-gradient-to-br from-[#fdeedd] to-[#fef5ea]"
        />
        <StatCard
          label="Custom Tours"
          value={CUSTOM_TOURS.length}
          to="/account/custom-tours"
          tone="border-emerald-200/70 bg-gradient-to-br from-[#e1f5e9] to-[#ecf9f1]"
        />

        <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-card sm:col-span-3 xl:col-span-1">
          <h2 className="text-lg font-extrabold tracking-tight text-ink">Notifications</h2>
          <ul className="mt-3 space-y-2.5">
            {RECENT_UPDATES.map((update) => (
              <li key={update.id} className="flex items-start gap-2.5 text-[13px]">
                <span
                  aria-hidden="true"
                  className={`mt-1.5 size-2 shrink-0 rounded-full ${DOT_TONES[update.tone]}`}
                />
                <span className="min-w-0 flex-1 text-ink/85">{update.text}</span>
                <span className="shrink-0 text-body">{formatDate(update.date)}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <SectionCard title="My Visa Applications" to="/account/visa-applications">
        <div className="mt-4">
          <DataTable
            bare
            columns={visaColumns}
            rows={VISA_APPLICATIONS.slice(0, 3)}
            rowKey={(app) => app.id}
            minWidth={820}
          />
        </div>
      </SectionCard>

      <div className="grid gap-5 lg:grid-cols-2">
        <SectionCard title="My Tour Packages" to="/account/tour-packages">
          <ul className="mt-4 divide-y divide-slate-100">
            {TOUR_BOOKINGS.slice(0, 2).map((tour) => (
              <li key={tour.id}>
                <Link
                  to="/account/tour-packages"
                  className="group flex items-center gap-4 py-3 first:pt-0 last:pb-0"
                >
                  <img
                    src={tour.image}
                    alt=""
                    loading="lazy"
                    className="h-20 w-36 shrink-0 rounded-xl bg-slate-100 object-cover sm:w-44"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[17px] font-bold text-ink group-hover:text-brand">
                      {tour.name}
                    </p>
                    <p className="mt-1 truncate text-[13px] text-body">
                      {tour.destination} | {formatDate(tour.startDate)} | {tour.travelers}
                    </p>
                  </div>
                  <TourStatusBadge status={tour.status} size="lg" />
                  <ChevronRight className="size-5 shrink-0 text-brand" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="My Custom Tours" to="/account/custom-tours">
          <Link
            to="/account/custom-tours"
            className="group mt-4 flex flex-col gap-4 rounded-xl border border-slate-100 p-1 sm:flex-row sm:items-center"
          >
            <img
              src={featuredCustomTour.image}
              alt=""
              loading="lazy"
              className="h-36 w-full shrink-0 rounded-xl bg-slate-100 object-cover sm:w-40"
            />
            <div className="min-w-0 flex-1 pr-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[17px] font-bold text-ink group-hover:text-brand">
                  {featuredCustomTour.name}
                </p>
                <CustomTourStatusBadge status={featuredCustomTour.status} dot={false} size="lg" />
              </div>
              <p className="mt-1 text-[13px] text-body">
                {formatDate(featuredCustomTour.startDate)} | {featuredCustomTour.travelers}
              </p>
              <p className="mt-4 text-[13px] text-body">{featuredCustomTour.summary}</p>
            </div>
            <ChevronRight className="mr-2 hidden size-5 shrink-0 text-brand sm:block" aria-hidden="true" />
          </Link>
        </SectionCard>
      </div>

      {selectedVisa && (
        <VisaDetailsModal application={selectedVisa} onClose={() => setSelectedVisa(null)} />
      )}
    </div>
  )
}

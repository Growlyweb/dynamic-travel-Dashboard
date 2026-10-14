import { useState, useMemo } from 'react'
import {
  Plus,
  Search,
  RotateCcw,
  Copy,
  Check,
  MoreVertical,
  Clock,
  CheckCircle2,
  Ban,
  FileText,
  XCircle,
  Eye,
  ChevronDown,
  Download,
  ExternalLink,
} from 'lucide-react'
import CountryFlag from '../common/CountryFlag'
import { APPLICATION_STATUS_TABS, APPLICATIONS_DATA } from '../../data/applicationsData'

export default function ApplicationsView({ onOpenNewModal, onSelectApplication }) {
  const [activeStatusTab, setActiveStatusTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedDateRange, setSelectedDateRange] = useState('')
  const [copiedPassport, setCopiedPassport] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [openActionMenuId, setOpenActionMenuId] = useState(null)

  // Copy Passport Number
  const handleCopyPassport = (passportNo) => {
    navigator.clipboard.writeText(passportNo)
    setCopiedPassport(passportNo)
    setTimeout(() => setCopiedPassport(null), 2000)
  }

  // Filter Data
  const filteredApplications = useMemo(() => {
    return APPLICATIONS_DATA.filter((app) => {
      // Status Filter
      if (activeStatusTab !== 'all' && app.statusKey !== activeStatusTab) {
        return false
      }
      // Type Filter
      if (selectedType && app.applicationType !== selectedType) {
        return false
      }
      // Country Filter
      if (selectedCountry && app.country !== selectedCountry) {
        return false
      }
      // Search Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        const matchesName = app.applicantName.toLowerCase().includes(query)
        const matchesPassport = app.passportNo.toLowerCase().includes(query)
        const matchesCountry = app.country.toLowerCase().includes(query)
        if (!matchesName && !matchesPassport && !matchesCountry) return false
      }
      return true
    })
  }, [activeStatusTab, selectedType, selectedCountry, searchQuery])

  // Reset all filters
  const handleReset = () => {
    setActiveStatusTab('all')
    setSearchQuery('')
    setSelectedType('')
    setSelectedCountry('')
    setSelectedDateRange('')
    setCurrentPage(1)
  }

  // Render Status Icon for filter tabs
  const renderStatusIcon = (tab) => {
    switch (tab.id) {
      case 'processing':
        return (
          <span className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
            <Clock className="w-3 h-3 text-amber-600" />
          </span>
        )
      case 'approved':
        return (
          <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          </span>
        )
      case 'on_hold':
        return (
          <span className="w-5 h-5 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
            <Ban className="w-3 h-3 text-rose-600" />
          </span>
        )
      case 'document_review':
        return (
          <span className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
            <FileText className="w-3 h-3 text-purple-600" />
          </span>
        )
      case 'rejected':
        return (
          <span className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0">
            <XCircle className="w-3 h-3 text-red-600" />
          </span>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Title & Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-[28px] font-bold text-[#0f172a] tracking-tight">
            My Applications
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Track and manage all your visa applications in one place.
          </p>
        </div>

        {/* Primary Action Button: + New Application */}
        <button
          onClick={onOpenNewModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#0d2b59] hover:bg-[#071933] text-white text-sm font-semibold shadow-sm transition-all hover:shadow cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" strokeWidth={2.5} />
          <span>New Application</span>
        </button>
      </div>

      {/* Status Filter Tabs / Status Bar */}
      <div className="border-b border-slate-200">
        <div className="flex items-center gap-4 sm:gap-8 overflow-x-auto no-scrollbar">
          {APPLICATION_STATUS_TABS.map((tab) => {
            const isActive = activeStatusTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveStatusTab(tab.id)
                  setCurrentPage(1)
                }}
                className={`relative pb-3.5 flex items-center gap-2 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'text-[#0066cc] font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {renderStatusIcon(tab)}
                <span>{tab.label}</span>

                {/* Badge Count */}
                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] font-semibold transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-[#0066cc]'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {tab.count}
                </span>

                {/* Active Underline Indicator */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#0066cc] rounded-t-full" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-3 sm:p-4 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by applicant name, passport number or country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-700 placeholder-slate-400 focus:bg-white focus:border-[#0066cc] focus:ring-1 focus:ring-[#0066cc] outline-none transition-all"
            />
          </div>

          {/* Application Type Dropdown */}
          <div className="md:col-span-2 relative">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full appearance-none px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-700 focus:bg-white focus:border-[#0066cc] outline-none cursor-pointer pr-8"
            >
              <option value="">Application Type</option>
              <option value="Tourist Visa">Tourist Visa</option>
              <option value="Business Visa">Business Visa</option>
              <option value="Visit Visa">Visit Visa</option>
              <option value="Umrah Visa">Umrah Visa</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Country Dropdown */}
          <div className="md:col-span-2 relative">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="w-full appearance-none px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-700 focus:bg-white focus:border-[#0066cc] outline-none cursor-pointer pr-8"
            >
              <option value="">Country</option>
              <option value="China">China</option>
              <option value="Thailand">Thailand</option>
              <option value="Malaysia">Malaysia</option>
              <option value="Singapore">Singapore</option>
              <option value="UAE">UAE</option>
              <option value="Saudi Arabia">Saudi Arabia</option>
              <option value="Turkey">Turkey</option>
              <option value="United Kingdom">United Kingdom</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Date Range Dropdown */}
          <div className="md:col-span-2 relative">
            <select
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
              className="w-full appearance-none px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-700 focus:bg-white focus:border-[#0066cc] outline-none cursor-pointer pr-8"
            >
              <option value="">Date Range</option>
              <option value="today">Today</option>
              <option value="last7">Last 7 Days</option>
              <option value="last30">Last 30 Days</option>
              <option value="month">This Month</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Reset Button */}
          <div className="md:col-span-1 flex justify-end">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-[#0066cc] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Applications Data Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left border-collapse text-xs sm:text-sm">
            {/* Table Header */}
            <thead>
              <tr className="bg-[#f8fafc] border-b border-slate-200 text-slate-600 font-semibold text-[11px] sm:text-xs tracking-wider whitespace-nowrap">
                <th className="py-3.5 px-4 w-12 text-center whitespace-nowrap">#</th>
                <th className="py-3.5 px-4 font-semibold whitespace-nowrap min-w-[170px]">Applicant Name</th>
                <th className="py-3.5 px-4 font-semibold whitespace-nowrap min-w-[140px]">Passport No.</th>
                <th className="py-3.5 px-4 font-semibold whitespace-nowrap min-w-[140px]">Country</th>
                <th className="py-3.5 px-4 font-semibold whitespace-nowrap min-w-[150px]">Application Type</th>
                <th className="py-3.5 px-4 font-semibold whitespace-nowrap min-w-[125px]">Apply Date</th>
                <th className="py-3.5 px-4 font-semibold text-center whitespace-nowrap min-w-[125px]">Status</th>
                <th className="py-3.5 px-4 font-semibold text-center whitespace-nowrap min-w-[100px]">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-100">
              {filteredApplications.length > 0 ? (
                filteredApplications.map((app, index) => (
                  <tr
                    key={app.id}
                    className="hover:bg-slate-50/80 transition-colors group"
                  >
                    {/* Index */}
                    <td className="py-3.5 px-4 text-center text-slate-500 font-medium text-xs">
                      {index + 1}
                    </td>

                    {/* Applicant Name */}
                    <td className="py-3.5 px-4 font-semibold text-slate-800">
                      <button
                        onClick={() => onSelectApplication(app)}
                        className="text-left hover:text-[#0066cc] transition-colors cursor-pointer"
                      >
                        {app.applicantName}
                      </button>
                    </td>

                    {/* Passport Number with Copy Icon */}
                    <td className="py-3.5 px-4 text-slate-600 font-mono text-xs">
                      <div className="flex items-center gap-1.5">
                        <span>{app.passportNo}</span>
                        <button
                          onClick={() => handleCopyPassport(app.passportNo)}
                          className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                          title="Copy passport number"
                        >
                          {copiedPassport === app.passportNo ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>

                    {/* Country with Flag */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <CountryFlag countryCode={app.countryCode} countryName={app.country} />
                        <span className="text-slate-700 font-medium">{app.country}</span>
                      </div>
                    </td>

                    {/* Application Type */}
                    <td className="py-3.5 px-4 text-slate-600">
                      {app.applicationType}
                    </td>

                    {/* Apply Date */}
                    <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                      {app.applyDate}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold ring-1 ${app.statusBadgeColor}`}
                      >
                        {app.status}
                      </span>
                    </td>

                    {/* Actions: View & 3-Dots */}
                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => onSelectApplication(app)}
                          className="text-[#0066cc] hover:text-[#004f9e] font-semibold text-xs px-2.5 py-1 rounded-md hover:bg-blue-50 transition-colors cursor-pointer"
                        >
                          View
                        </button>

                        <div className="relative">
                          <button
                            onClick={() =>
                              setOpenActionMenuId(
                                openActionMenuId === app.id ? null : app.id
                              )
                            }
                            className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {openActionMenuId === app.id && (
                            <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-30 text-left animate-fade-in">
                              <button
                                onClick={() => {
                                  setOpenActionMenuId(null)
                                  onSelectApplication(app)
                                }}
                                className="w-full px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                              >
                                <Eye className="w-3.5 h-3.5 text-slate-400" />
                                <span>View Full File</span>
                              </button>
                              <button
                                onClick={() => {
                                  setOpenActionMenuId(null)
                                  alert(`Downloading visa packet for ${app.applicantName}`)
                                }}
                                className="w-full px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                              >
                                <Download className="w-3.5 h-3.5 text-slate-400" />
                                <span>Download PDF</span>
                              </button>
                              <button
                                onClick={() => {
                                  setOpenActionMenuId(null)
                                  alert(`Requesting update from embassy desk for ${app.appRef}`)
                                }}
                                className="w-full px-3 py-1.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                              >
                                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                                <span>Track Embassy</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    <p className="text-sm">No applications found matching the selected filters.</p>
                    <button
                      onClick={handleReset}
                      className="mt-2 text-xs font-semibold text-[#0066cc] hover:underline"
                    >
                      Clear all filters
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer with Pagination matching Image 1 */}
        <div className="bg-white border-t border-slate-200 px-4 py-3 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-slate-600">
          <div>
            Showing <span className="font-semibold text-slate-800">1</span> to{' '}
            <span className="font-semibold text-slate-800">{filteredApplications.length}</span> of{' '}
            <span className="font-semibold text-slate-800">68</span> applications
          </div>

          <div className="flex items-center gap-1 self-center sm:self-auto">
            {/* Prev Button */}
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
            >
              &lt;
            </button>

            {/* Page 1 (Active) */}
            <button
              onClick={() => setCurrentPage(1)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-semibold cursor-pointer ${
                currentPage === 1
                  ? 'bg-[#0d2b59] text-white'
                  : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              1
            </button>

            {/* Page 2 */}
            <button
              onClick={() => setCurrentPage(2)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-semibold cursor-pointer ${
                currentPage === 2
                  ? 'bg-[#0d2b59] text-white'
                  : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              2
            </button>

            {/* Page 3 */}
            <button
              onClick={() => setCurrentPage(3)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-semibold cursor-pointer ${
                currentPage === 3
                  ? 'bg-[#0d2b59] text-white'
                  : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              3
            </button>

            {/* Ellipsis */}
            <span className="w-8 h-8 flex items-center justify-center text-slate-400">
              ...
            </span>

            {/* Page 9 */}
            <button
              onClick={() => setCurrentPage(9)}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold cursor-pointer"
            >
              9
            </button>

            {/* Next Button */}
            <button
              onClick={() => setCurrentPage((p) => Math.min(9, p + 1))}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

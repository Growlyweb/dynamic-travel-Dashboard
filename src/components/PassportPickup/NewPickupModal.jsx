import { useState } from 'react'
import { X, Truck, Calendar, MapPin, CheckCircle, Clock } from 'lucide-react'
import { PARTNER_INFO } from '../../data/partnerData'

export default function NewPickupModal({ isOpen, onClose, onCreated }) {
  const [formData, setFormData] = useState({
    applicantName: '',
    passportsCount: 2,
    pickupAddress: 'Gulshan, Dhaka',
    fullAddress: PARTNER_INFO.address,
    requestedDate: '2025-10-15',
    preferredTime: '11:00 AM - 01:00 PM',
    contactPerson: PARTNER_INFO.name,
    contactPhone: PARTNER_INFO.phone,
    notes: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSuccess(true)
      setTimeout(() => {
        onCreated &&
          onCreated({
            id: Date.now(),
            requestId: `PKP-2025-0${Math.floor(20 + Math.random() * 80)}`,
            applicantName: formData.applicantName || 'Partner Batch Order',
            passportsCount: Number(formData.passportsCount),
            applications: `${formData.passportsCount} Passports`,
            pickupAddress: formData.pickupAddress,
            fullAddress: formData.fullAddress,
            requestedDate: formData.requestedDate,
            preferredTime: formData.preferredTime,
            status: 'Scheduled',
            statusBadgeColor: 'bg-sky-50 text-sky-700 border-sky-200 ring-sky-100',
            assignedRider: {
              name: 'Tariqul Islam',
              phone: '+880 1911-223344',
              vehicle: 'Courier Van (DM-Cha 11-4021)',
            },
          })
        setSuccess(false)
        onClose()
      }, 1200)
    }, 700)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="bg-[#0d2b59] px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <Truck className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Request Passport Pickup</h3>
              <p className="text-xs text-white/70">Official ABL Courier Collection Service</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        {success ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-800">Pickup Request Scheduled!</h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              Courier dispatch has received your request. A designated rider will visit your office at the chosen time window.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Primary Applicant / Group Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Md. Saiful Islam"
                  value={formData.applicantName}
                  onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg outline-none focus:border-[#0066cc]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Total Passports to Collect *
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  required
                  value={formData.passportsCount}
                  onChange={(e) => setFormData({ ...formData, passportsCount: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg outline-none focus:border-[#0066cc]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pickup Area / Zone *
                </label>
                <select
                  value={formData.pickupAddress}
                  onChange={(e) => setFormData({ ...formData, pickupAddress: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg outline-none focus:border-[#0066cc]"
                >
                  <option value="Gulshan, Dhaka">Gulshan, Dhaka</option>
                  <option value="Banani, Dhaka">Banani, Dhaka</option>
                  <option value="Uttara, Dhaka">Uttara, Dhaka</option>
                  <option value="Dhanmondi, Dhaka">Dhanmondi, Dhaka</option>
                  <option value="Mirpur, Dhaka">Mirpur, Dhaka</option>
                  <option value="Mohammadpur, Dhaka">Mohammadpur, Dhaka</option>
                  <option value="Bashundhara, Dhaka">Bashundhara, Dhaka</option>
                  <option value="Motijheel, Dhaka">Motijheel, Dhaka</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Pickup Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.requestedDate}
                  onChange={(e) => setFormData({ ...formData, requestedDate: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg outline-none focus:border-[#0066cc]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Preferred Time Slot *
              </label>
              <select
                value={formData.preferredTime}
                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg outline-none focus:border-[#0066cc]"
              >
                <option value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM (Morning Slot)</option>
                <option value="12:00 PM - 02:00 PM">12:00 PM - 02:00 PM (Midday Slot)</option>
                <option value="02:00 PM - 04:00 PM">02:00 PM - 04:00 PM (Afternoon Slot)</option>
                <option value="04:00 PM - 06:00 PM">04:00 PM - 06:00 PM (Evening Slot)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Exact Office Address
              </label>
              <textarea
                rows="2"
                value={formData.fullAddress}
                onChange={(e) => setFormData({ ...formData, fullAddress: e.target.value })}
                className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg outline-none focus:border-[#0066cc]"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-[#0d2b59] hover:bg-[#071933] rounded-lg shadow-sm transition-all cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'Scheduling...' : 'Confirm Pickup Request'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

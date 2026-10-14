import { useState } from 'react'
import {
  X,
  UploadCloud,
  CheckCircle,
  FileText,
  User,
  CreditCard,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react'

export default function NewApplicationModal({ isOpen, onClose, onCreated }) {
  const [formData, setFormData] = useState({
    applicantName: '',
    passportNo: '',
    passportExpiry: '',
    country: 'China',
    applicationType: 'Tourist Visa',
    travelDate: '',
    contactPhone: '',
    notes: '',
  })

  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  if (!isOpen) return null

  // Calculate estimated partner commission
  const rates = {
    'Tourist Visa': { fee: 160, rate: 0.2 },
    'Business Visa': { fee: 250, rate: 0.2 },
    'Visit Visa': { fee: 190, rate: 0.2 },
    'Umrah Visa': { fee: 240, rate: 0.2 },
  }
  const pricing = rates[formData.applicationType] || { fee: 160, rate: 0.2 }
  const partnerCommission = (pricing.fee * pricing.rate).toFixed(2)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSuccess(true)
      setTimeout(() => {
        onCreated &&
          onCreated({
            ...formData,
            id: Date.now(),
            appRef: `APP-2025-${Math.floor(1000 + Math.random() * 9000)}`,
            applyDate: 'Today',
            status: 'Processing',
            statusKey: 'processing',
            statusBadgeColor: 'bg-amber-50 text-amber-700 border-amber-200 ring-amber-100',
            commission: `$${partnerCommission}`,
          })
        setSuccess(false)
        setStep(1)
        onClose()
      }, 1200)
    }, 800)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Modal Header */}
        <div className="bg-[#0d2b59] px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">New Visa Application</h3>
              <p className="text-xs text-white/70">Partner Quick Submission Portal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        {success ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-800">Application Submitted!</h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              Your application has been received and queued for embassy processing. Estimated partner commission of{' '}
              <span className="font-bold text-emerald-600">${partnerCommission}</span> has been logged.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Applicant Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mohammad Tariqul Islam"
                  value={formData.applicantName}
                  onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg outline-none focus:border-[#0066cc]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Passport Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. A12345678"
                  value={formData.passportNo}
                  onChange={(e) => setFormData({ ...formData, passportNo: e.target.value.toUpperCase() })}
                  className="w-full px-3 py-2 text-xs sm:text-sm font-mono border border-slate-200 rounded-lg outline-none focus:border-[#0066cc]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Destination Country *
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg outline-none focus:border-[#0066cc]"
                >
                  <option value="China">China</option>
                  <option value="Thailand">Thailand</option>
                  <option value="Malaysia">Malaysia</option>
                  <option value="Singapore">Singapore</option>
                  <option value="UAE">UAE</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="Turkey">Turkey</option>
                  <option value="United Kingdom">United Kingdom</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Visa Category *
                </label>
                <select
                  value={formData.applicationType}
                  onChange={(e) => setFormData({ ...formData, applicationType: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg outline-none focus:border-[#0066cc]"
                >
                  <option value="Tourist Visa">Tourist Visa</option>
                  <option value="Business Visa">Business Visa</option>
                  <option value="Visit Visa">Visit Visa</option>
                  <option value="Umrah Visa">Umrah Visa</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Travel Date
                </label>
                <input
                  type="date"
                  value={formData.travelDate}
                  onChange={(e) => setFormData({ ...formData, travelDate: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg outline-none focus:border-[#0066cc]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Applicant Phone
                </label>
                <input
                  type="text"
                  placeholder="+880 1700-000000"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg outline-none focus:border-[#0066cc]"
                />
              </div>
            </div>

            {/* Document Upload Box */}
            <div className="border-2 border-dashed border-slate-200 hover:border-[#0066cc] rounded-xl p-4 text-center bg-slate-50/50 transition-colors cursor-pointer">
              <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-1.5" />
              <p className="text-xs font-medium text-slate-700">
                Drag &amp; drop passport scan and photos here, or <span className="text-[#0066cc]">browse</span>
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">Supports PDF, JPG, PNG (Max 15MB)</p>
            </div>

            {/* Partner Incentive Box */}
            <div className="bg-blue-50/80 border border-blue-100 rounded-xl p-3 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-blue-900 block">
                  Partner Tier Commission
                </span>
                <span className="text-xs text-blue-700">
                  Standard 20% B2B Share on fee (${pricing.fee}.00)
                </span>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-emerald-700 block">
                  +${partnerCommission}
                </span>
                <span className="text-[10px] text-slate-500">Credited on issue</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-[#0d2b59] hover:bg-[#071933] rounded-lg shadow-sm transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

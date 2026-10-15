import { useState } from 'react'
import {
  User,
  Building,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  CreditCard,
  Award,
  Key,
  Check,
  Edit2,
  Save,
} from 'lucide-react'
import { PARTNER_INFO } from '../../data/partnerData'

export default function ProfileView() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState(PARTNER_INFO)
  const [savedSuccess, setSavedSuccess] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    setIsEditing(false)
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 2500)
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-[28px] font-bold text-[#0f172a] tracking-tight">
            Partner Profile &amp; Agency Settings
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your B2B account information, agency accreditations and banking details.
          </p>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-2xs self-start sm:self-auto"
        >
          {isEditing ? <Save className="w-4 h-4 text-emerald-600" /> : <Edit2 className="w-4 h-4" />}
          <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs font-semibold text-emerald-800 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Profile changes updated successfully!</span>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Agency & Account Overview (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card 1: Agency Information */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <Building className="w-5 h-5 text-[#0066cc]" />
                <h3 className="text-base font-bold text-slate-800">Agency Information</h3>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
                Verified B2B Entity
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <label className="text-slate-400 block text-xs mb-1">Agency Legal Name</label>
                <p className="font-semibold text-slate-800">{profile.agencyName}</p>
              </div>

              <div>
                <label className="text-slate-400 block text-xs mb-1">Partner ID</label>
                <p className="font-mono font-semibold text-[#0066cc]">{profile.partnerId}</p>
              </div>

              <div>
                <label className="text-slate-400 block text-xs mb-1">IATA Registration Number</label>
                <p className="font-semibold text-slate-800">{profile.iataNumber}</p>
              </div>

              <div>
                <label className="text-slate-400 block text-xs mb-1">ATAB Registration Number</label>
                <p className="font-semibold text-slate-800">{profile.atabNumber}</p>
              </div>

              <div className="sm:col-span-2">
                <label className="text-slate-400 block text-xs mb-1">Registered Office Address</label>
                <p className="font-medium text-slate-700">{profile.address}</p>
              </div>
            </div>
          </div>

          {/* Card 2: Primary Authorized Contact */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <User className="w-5 h-5 text-[#0066cc]" />
              <h3 className="text-base font-bold text-slate-800">Authorized Representative</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <label className="text-slate-400 block text-xs mb-1">Full Name</label>
                <p className="font-semibold text-slate-800">{profile.name}</p>
              </div>

              <div>
                <label className="text-slate-400 block text-xs mb-1">Designation</label>
                <p className="font-semibold text-slate-800">Managing Director &amp; Partner</p>
              </div>

              <div>
                <label className="text-slate-400 block text-xs mb-1">Official Email</label>
                <p className="font-semibold text-slate-800">{profile.email}</p>
              </div>

              <div>
                <label className="text-slate-400 block text-xs mb-1">Mobile / WhatsApp</label>
                <p className="font-semibold text-slate-800">{profile.phone}</p>
              </div>
            </div>
          </div>

          {/* Card 3: Bank & Settlement Accounts */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <CreditCard className="w-5 h-5 text-[#0066cc]" />
                <h3 className="text-base font-bold text-slate-800">Settlement &amp; Payout Bank</h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">Auto Payout: Bi-Weekly</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <label className="text-slate-400 block text-xs mb-1">Bank Name</label>
                <p className="font-semibold text-slate-800">{profile.bankDetails.bankName}</p>
              </div>

              <div>
                <label className="text-slate-400 block text-xs mb-1">Branch</label>
                <p className="font-semibold text-slate-800">{profile.bankDetails.branch}</p>
              </div>

              <div>
                <label className="text-slate-400 block text-xs mb-1">Account Name</label>
                <p className="font-semibold text-slate-800">{profile.bankDetails.accountName}</p>
              </div>

              <div>
                <label className="text-slate-400 block text-xs mb-1">Account Number</label>
                <p className="font-mono font-semibold text-slate-800">{profile.bankDetails.accountNumber}</p>
              </div>

              <div>
                <label className="text-slate-400 block text-xs mb-1">Routing Number</label>
                <p className="font-mono text-slate-700">{profile.bankDetails.routingNumber}</p>
              </div>

              <div>
                <label className="text-slate-400 block text-xs mb-1">bKash Merchant Account</label>
                <p className="font-mono text-slate-700">{profile.bankDetails.bkashMerchant}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Tier Benefits & Security (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Tier Badge Card */}
          <div className="bg-gradient-to-br from-[#0d2b59] to-[#041530] text-white rounded-2xl p-6 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-white/70 font-semibold">Partner Tier</span>
              <Award className="w-6 h-6 text-amber-400" />
            </div>

            <div>
              <h3 className="text-2xl font-black text-white">{profile.tier}</h3>
              <p className="text-xs text-white/80 mt-1">
                Highest B2B commission bracket with priority embassy queuing.
              </p>
            </div>

            <div className="bg-white/10 rounded-xl p-3 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-white/80">Commission Rate</span>
                <span className="font-bold text-amber-300">{profile.commissionRate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">Dedicated Account Mgr</span>
                <span className="font-bold text-emerald-300">Yes (Asif Mahmud)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/80">Complimentary Pickups</span>
                <span className="font-bold text-white">Unlimited in Dhaka</span>
              </div>
            </div>
          </div>

          {/* Account Security Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <h4 className="text-sm font-bold text-slate-800">Security &amp; API Keys</h4>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Your account has 2-Factor Authentication enabled with SMS verification to {profile.phone}.
            </p>

            <button
              onClick={() => alert('Generating new B2B API Token')}
              className="w-full py-2 px-3 border border-slate-200 hover:border-[#0066cc] text-slate-700 hover:text-[#0066cc] text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Regenerate API Integration Key
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

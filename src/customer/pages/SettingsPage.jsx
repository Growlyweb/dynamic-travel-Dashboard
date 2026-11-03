import { useRef, useState } from 'react'
import {
  Bell,
  Camera,
  ChevronDown,
  CircleCheck,
  Globe,
  Info,
  Lock,
  Plane,
  Tag,
  Ticket,
  Trash2,
  UserRound,
} from 'lucide-react'
import Avatar from '@/components/common/Avatar'
import { useCustomerProfile } from '@/context/CustomerProfileContext'
import { useFlash } from '@/hooks'
import ConfirmDialog from '../components/ConfirmDialog'
import {
  DateField,
  PasswordField,
  PhoneField,
  TextAreaField,
  TextField,
  Toggle,
} from '../components/FormFields'
import PageHeader, { primaryButton } from '../components/PageHeader'
import { LANGUAGES } from '../data/customerData'
import { useSignOut } from '../useSignOut'

const MAX_AVATAR_BYTES = 2 * 1024 * 1024
const AVATAR_TYPES = ['image/jpeg', 'image/png']

function SettingsCard({ icon: Icon, title, subtitle, aside, children, className = '' }) {
  return (
    <section className={`rounded-2xl border border-slate-100 bg-white p-5 shadow-card sm:p-6 ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-4">
          <Icon className="mt-1 size-6 shrink-0 text-brand" strokeWidth={1.8} aria-hidden="true" />
          <div className="min-w-0">
            <h2 className="text-xl font-extrabold tracking-tight text-ink">{title}</h2>
            <p className="mt-1 text-sm text-body">{subtitle}</p>
          </div>
        </div>
        {aside}
      </div>
      {children}
    </section>
  )
}

function Notice({ message }) {
  if (!message) return null

  return (
    <p
      role="status"
      className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 animate-fade-in"
    >
      <CircleCheck className="size-4 shrink-0" aria-hidden="true" />
      {message}
    </p>
  )
}

function ProfileInformation() {
  const { profile, updateProfile } = useCustomerProfile()
  const [form, setForm] = useState({
    fullName: profile.fullName,
    dialCode: profile.dialCode,
    phone: profile.phone,
    dob: profile.dob,
    address: profile.address,
  })
  const [errors, setErrors] = useState({})
  const [photoError, setPhotoError] = useState('')
  const [notice, flash] = useFlash()
  const [today] = useState(() => new Date().toISOString().slice(0, 10))
  const fileInput = useRef(null)

  const setField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const handlePhoto = (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    if (!AVATAR_TYPES.includes(file.type) || file.size > MAX_AVATAR_BYTES) {
      setPhotoError('Please choose a JPG or PNG image up to 2MB.')
      return
    }

    setPhotoError('')
    const reader = new FileReader()
    reader.onload = () => {
      updateProfile({ avatarUrl: reader.result })
      flash('Profile photo updated.')
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const next = {}

    if (form.fullName.trim().length < 2) next.fullName = 'Enter your full name.'
    if (!/^[0-9\s-]{6,15}$/.test(form.phone.trim())) next.phone = 'Enter a valid phone number.'
    if (form.dob && new Date(form.dob) > new Date()) next.dob = 'Date of birth cannot be in the future.'

    setErrors(next)
    if (Object.keys(next).length > 0) return

    updateProfile({
      fullName: form.fullName.trim(),
      dialCode: form.dialCode,
      phone: form.phone.trim(),
      dob: form.dob,
      address: form.address.trim(),
    })
    flash('Your profile has been updated.')
  }

  return (
    <SettingsCard
      icon={UserRound}
      title="Profile Information"
      subtitle="Update your personal information and contact details."
      aside={
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            aria-label="Change profile photo"
            className="relative cursor-pointer rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
          >
            <Avatar name={profile.fullName} src={profile.avatarUrl} size="lg" />
            <span className="absolute -bottom-0.5 -right-0.5 flex size-6 items-center justify-center rounded-full bg-brand text-white ring-2 ring-white">
              <Camera className="size-3.5" aria-hidden="true" />
            </span>
          </button>
          <div className="hidden text-xs text-body sm:block">
            <p className="font-medium text-ink">Click to change photo</p>
            <p>JPG, PNG (Max 2MB)</p>
          </div>
          <input
            ref={fileInput}
            type="file"
            name="avatar"
            accept="image/png,image/jpeg"
            onChange={handlePhoto}
            className="sr-only"
            tabIndex={-1}
          />
        </div>
      }
    >
      {photoError && (
        <p role="alert" className="mt-3 text-xs font-medium text-red-600">
          {photoError}
        </p>
      )}

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <TextField
            label="Full Name"
            name="fullName"
            value={form.fullName}
            onChange={setField('fullName')}
            error={errors.fullName}
            autoComplete="name"
          />
          <TextField label="Email Address" name="email" value={profile.email} disabled readOnly />
          <PhoneField
            label="Phone Number"
            dialCode={form.dialCode}
            onDialCodeChange={(dialCode) => setForm((current) => ({ ...current, dialCode }))}
            value={form.phone}
            onChange={setField('phone')}
            error={errors.phone}
          />
          <DateField
            label="Date of Birth"
            name="dob"
            value={form.dob}
            onChange={setField('dob')}
            error={errors.dob}
            max={today}
          />
        </div>

        <TextAreaField
          label="Address"
          name="address"
          value={form.address}
          onChange={setField('address')}
          autoComplete="street-address"
        />

        <div className="flex flex-wrap items-center justify-end gap-3">
          <Notice message={notice} />
          <button type="submit" className={`${primaryButton} rounded-lg px-6 py-2.5`}>
            Save Changes
          </button>
        </div>
      </form>
    </SettingsCard>
  )
}

function ChangePassword() {
  const [form, setForm] = useState({ current: '', next: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [notice, flash] = useFlash()

  const setField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const next = {}

    if (!form.current) next.current = 'Enter your current password.'
    if (form.next.length < 6) next.next = 'Use at least 6 characters.'
    else if (form.next === form.current) next.next = 'Choose a password you have not used before.'
    if (form.confirm !== form.next) next.confirm = 'The passwords do not match.'

    setErrors(next)
    if (Object.keys(next).length > 0) return

    setForm({ current: '', next: '', confirm: '' })
    flash('Your password has been updated.')
  }

  return (
    <SettingsCard
      icon={Lock}
      title="Change Password"
      subtitle="Keep your account secure with a strong password."
    >
      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
        <PasswordField
          label="Current Password"
          name="currentPassword"
          autoComplete="current-password"
          value={form.current}
          onChange={setField('current')}
          error={errors.current}
        />
        <PasswordField
          label="New Password"
          name="newPassword"
          autoComplete="new-password"
          value={form.next}
          onChange={setField('next')}
          error={errors.next}
        />
        <PasswordField
          label="Confirm New Password"
          name="confirmPassword"
          autoComplete="new-password"
          value={form.confirm}
          onChange={setField('confirm')}
          error={errors.confirm}
        />

        <p className="flex items-center gap-2.5 rounded-lg bg-brand-soft px-3.5 py-3 text-[13px] text-brand-dark">
          <Info className="size-4 shrink-0" aria-hidden="true" />
          Password must be at least 6 characters long.
        </p>

        <div className="flex flex-wrap items-center justify-end gap-3">
          <Notice message={notice} />
          <button type="submit" className={`${primaryButton} rounded-lg px-6 py-2.5`}>
            Update Password
          </button>
        </div>
      </form>
    </SettingsCard>
  )
}

const NOTIFICATION_OPTIONS = [
  {
    key: 'visaUpdates',
    icon: Plane,
    title: 'Visa Application Updates',
    text: 'Get notified about your visa application status.',
  },
  {
    key: 'tourUpdates',
    icon: Ticket,
    title: 'Tour Package Updates',
    text: 'Get notified about tour package bookings and offers.',
  },
  {
    key: 'promotions',
    icon: Tag,
    title: 'Promotional Offers',
    text: 'Receive special offers and travel deals.',
  },
]

function NotificationPreferences() {
  const { preferences, updatePreferences } = useCustomerProfile()

  return (
    <SettingsCard
      icon={Bell}
      title="Notification Preferences"
      subtitle="Choose how you want to receive updates from us."
    >
      <ul className="mt-5 divide-y divide-slate-100 border-t border-slate-100">
        {NOTIFICATION_OPTIONS.map(({ key, icon: Icon, title, text }) => (
          <li key={key} className="flex items-center gap-4 py-4">
            <Icon className="size-5 shrink-0 text-ink" strokeWidth={1.8} aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-ink">{title}</p>
              <p className="text-[13px] text-body">{text}</p>
            </div>
            <Toggle
              label={title}
              checked={preferences[key]}
              onChange={(value) => updatePreferences({ [key]: value })}
            />
          </li>
        ))}
      </ul>
    </SettingsCard>
  )
}

function LanguagePreference() {
  const { preferences, updatePreferences } = useCustomerProfile()
  const [notice, flash] = useFlash()

  return (
    <SettingsCard
      icon={Globe}
      title="Language Preference"
      subtitle="Choose your preferred language for the website."
    >
      <div className="mt-5 border-t border-slate-100 pt-4">
        <label htmlFor="language" className="mb-1.5 block text-sm font-semibold text-ink">
          Language
        </label>
        <div className="relative">
          <select
            id="language"
            value={preferences.language}
            onChange={(event) => {
              updatePreferences({ language: event.target.value })
              flash('Language preference saved.')
            }}
            className="h-11 w-full cursor-pointer appearance-none rounded-lg border border-slate-200 bg-white pl-3 pr-9 text-sm text-ink outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10"
          >
            {LANGUAGES.map((language) => (
              <option key={language.value} value={language.value}>
                {language.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-ink"
            aria-hidden="true"
          />
        </div>
        {notice && (
          <div className="mt-3">
            <Notice message={notice} />
          </div>
        )}
      </div>
    </SettingsCard>
  )
}

function DeactivateAccount() {
  const { clearStoredProfile } = useCustomerProfile()
  const signOut = useSignOut()
  const [isConfirming, setIsConfirming] = useState(false)

  const handleConfirm = () => {
    clearStoredProfile()
    signOut()
  }

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-card sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="flex items-start gap-4">
        <Trash2 className="mt-1 size-6 shrink-0 text-red-500" strokeWidth={1.8} aria-hidden="true" />
        <div>
          <h2 className="text-lg font-extrabold tracking-tight text-ink">Deactivate Account</h2>
          <p className="mt-1 max-w-sm text-[13px] text-body">
            If you no longer want to use your account, you can deactivate it.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setIsConfirming(true)}
        className="shrink-0 cursor-pointer rounded-lg border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
      >
        Deactivate Account
      </button>

      {isConfirming && (
        <ConfirmDialog
          title="Deactivate your account?"
          message="You will be signed out and your saved preferences on this device will be cleared. Your visa applications and bookings stay on file with our team."
          confirmLabel="Deactivate"
          onConfirm={handleConfirm}
          onCancel={() => setIsConfirming(false)}
        />
      )}
    </section>
  )
}

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        crumb="Settings"
        title="Settings"
        subtitle="Manage your account information, security, and preferences."
      />

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <ProfileInformation />
        <ChangePassword />
        <NotificationPreferences />
        <div className="space-y-6">
          <LanguagePreference />
          <DeactivateAccount />
        </div>
      </div>
    </div>
  )
}

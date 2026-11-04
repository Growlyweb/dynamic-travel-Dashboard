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
import { useAuth } from '@/context/AuthContext'
import { apiChangePassword } from '@/services/api'
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
    <section className={`flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-5 shadow-card sm:p-6 ${className}`}>
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

      <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-1 flex-col justify-between space-y-4">
        <div className="space-y-4">
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
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-end gap-3 pt-4">
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
  const { accessToken, currentUser, updateCurrentUser } = useAuth()
  const [form, setForm] = useState({ current: '', next: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [notice, flash] = useFlash()
  const [submitting, setSubmitting] = useState(false)

  const isGoogleAccountWithoutPassword =
    currentUser?.hasPassword === false ||
    (currentUser?.authProvider === 'firebase' && !currentUser?.hasPassword)

  const isGoogleAccountWithPassword =
    currentUser?.authProvider === 'firebase' && Boolean(currentUser?.hasPassword)

  const setField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const next = {}

    if (!isGoogleAccountWithoutPassword) {
      if (!form.current) next.current = 'Enter your current password.'
      if (form.next && form.next === form.current) next.next = 'Choose a password you have not used before.'
    }

    if (!form.next || form.next.length < 6) {
      next.next = 'Use at least 6 characters.'
    }
    if (form.confirm !== form.next) {
      next.confirm = 'The passwords do not match.'
    }

    setErrors(next)
    if (Object.keys(next).length > 0) return

    setSubmitting(true)
    try {
      if (accessToken) {
        await apiChangePassword(
          isGoogleAccountWithoutPassword ? undefined : form.current,
          form.next,
          accessToken
        )
      }
      updateCurrentUser?.({ hasPassword: true })
      setForm({ current: '', next: '', confirm: '' })
      flash(
        isGoogleAccountWithoutPassword
          ? 'Your password has been created! You can now log in using either Google or your email & password.'
          : 'Your password has been updated.'
      )
    } catch (err) {
      const errMsg = err?.message || 'Failed to update password.'
      if (isGoogleAccountWithoutPassword) {
        setErrors({ next: errMsg })
      } else {
        setErrors({ current: errMsg })
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <SettingsCard
      icon={Lock}
      title={isGoogleAccountWithoutPassword ? 'Create Password' : 'Change Password'}
      subtitle={
        isGoogleAccountWithoutPassword
          ? 'Set a password so you can sign in using either Google or your email address.'
          : 'Keep your account secure with a strong password.'
      }
    >
      {isGoogleAccountWithoutPassword ? (
        <div className="mt-4 flex items-start gap-3 rounded-xl border border-sky-200 bg-sky-50/80 p-4 text-[13px] leading-relaxed text-sky-900">
          <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-600">
            <svg className="size-3.5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          </div>
          <div className="space-y-1">
            <p className="font-semibold text-sky-950">
              Google Account Connected
            </p>
            <p className="text-sky-800/90">
              You registered with Google and haven't created a password yet. Set a password below so you can sign in directly with your email and password as well as with Google.
            </p>
          </div>
        </div>
      ) : isGoogleAccountWithPassword ? (
        <div className="mt-4 flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50/70 px-4 py-3 text-[13px] text-emerald-900">
          <CircleCheck className="size-4 shrink-0 text-emerald-600" aria-hidden="true" />
          <span>
            Your account is connected to Google and has a password enabled for direct email login.
          </span>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-1 flex-col justify-between space-y-4">
        <div className="space-y-4">
          {!isGoogleAccountWithoutPassword && (
            <PasswordField
              label="Current Password"
              name="currentPassword"
              autoComplete="current-password"
              value={form.current}
              onChange={setField('current')}
              error={errors.current}
            />
          )}
          <PasswordField
            label={isGoogleAccountWithoutPassword ? 'Create Password' : 'New Password'}
            name="newPassword"
            autoComplete="new-password"
            value={form.next}
            onChange={setField('next')}
            error={errors.next}
          />
          <PasswordField
            label={isGoogleAccountWithoutPassword ? 'Confirm Password' : 'Confirm New Password'}
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
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-end gap-3 pt-4">
          <Notice message={notice} />
          <button
            type="submit"
            disabled={submitting}
            className={`${primaryButton} rounded-lg px-6 py-2.5 disabled:opacity-60`}
          >
            {submitting
              ? 'Saving...'
              : isGoogleAccountWithoutPassword
              ? 'Create Password'
              : 'Update Password'}
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

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <ProfileInformation />
        <ChangePassword />
        <NotificationPreferences />
        <div className="flex flex-col gap-6">
          <LanguagePreference />
          <DeactivateAccount />
        </div>
      </div>
    </div>
  )
}

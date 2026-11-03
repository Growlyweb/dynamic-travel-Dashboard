import { FileText, Heart, Map, Plane, Settings, UserRound } from 'lucide-react'

export const PORTAL_NAV = [
  { to: '/account', label: 'My Profile', icon: UserRound, end: true },
  { to: '/account/visa-applications', label: 'My Visa Applications', icon: FileText },
  { to: '/account/tour-packages', label: 'My Tour Packages', icon: Plane },
  { to: '/account/custom-tours', label: 'My Custom Tours', icon: Map },
  { to: '/account/saved', label: 'Saved Items', icon: Heart },
  { to: '/account/settings', label: 'Settings', icon: Settings },
]

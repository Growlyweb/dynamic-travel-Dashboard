import { startTransition } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

// The router applies navigation inside a transition, so logging out outside one lets the
// portal guard render first and redirect to /login instead of Home
export function useSignOut() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  return () => {
    startTransition(() => {
      navigate('/')
      logout()
    })
  }
}

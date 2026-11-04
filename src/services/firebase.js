import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

const DEFAULT_PROJECT_ID = 'travelms-dev'
const DEFAULT_AUTH_DOMAIN = 'travelms-dev.firebaseapp.com'

/**
 * Firebase Client SDK configuration.
 * Public client keys are loaded strictly from the environment (Vite env variables).
 */
const getFirebaseConfig = () => {
  const apiKey = import.meta.env.VITE_FIREBASE_API_KEY || ''
  return {
    apiKey,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || DEFAULT_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || DEFAULT_PROJECT_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
  }
}

let firebaseAuthInstance = null

/**
 * Returns true if the client Firebase environment configuration is populated.
 */
export const isFirebaseConfigured = () => {
  return Boolean(import.meta.env.VITE_FIREBASE_API_KEY)
}

/**
 * Lazily initialises and returns the Firebase Auth instance.
 */
export const getFirebaseAuth = () => {
  const config = getFirebaseConfig()
  if (!config.apiKey) return null

  if (firebaseAuthInstance) return firebaseAuthInstance

  const app = getApps().length > 0 ? getApp() : initializeApp(config)
  firebaseAuthInstance = getAuth(app)
  return firebaseAuthInstance
}

/**
 * Initiates the Google OAuth Popup and retrieves a cryptographic idToken.
 */
export const signInWithGooglePopup = async () => {
  const auth = getFirebaseAuth()
  if (!auth) {
    console.error('[Firebase] Google Sign-In requires VITE_FIREBASE_API_KEY to be defined in dynamic-tracel-frontend/.env')
    throw new Error('Google Sign-In is currently unavailable. Please check system configuration.')
  }

  const provider = new GoogleAuthProvider()
  provider.setCustomParameters({ prompt: 'select_account' })

  const result = await signInWithPopup(auth, provider)
  const idToken = await result.user.getIdToken(true)

  return {
    user: result.user,
    idToken,
    email: result.user.email,
    displayName: result.user.displayName,
    photoURL: result.user.photoURL,
  }
}

/**
 * Signs out from Firebase Client.
 */
export const signOutFirebase = async () => {
  try {
    const auth = getFirebaseAuth()
    if (auth) await signOut(auth)
  } catch (err) {
    console.warn('Firebase signout warning:', err?.message)
  }
}

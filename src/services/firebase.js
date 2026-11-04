import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

const DEFAULT_PROJECT_ID = 'travelms-dev'
const DEFAULT_AUTH_DOMAIN = 'travelms-dev.firebaseapp.com'

/**
 * Retrieves the Firebase Web API Key from Vite env or browser localStorage.
 */
export const getFirebaseApiKey = () => {
  return (
    import.meta.env.VITE_FIREBASE_API_KEY ||
    localStorage.getItem('abl_firebase_web_api_key') ||
    ''
  )
}

/**
 * Stores or clears a custom Firebase Web API Key in localStorage for testing.
 */
export const setFirebaseApiKey = (key) => {
  if (key && key.trim()) {
    localStorage.setItem('abl_firebase_web_api_key', key.trim())
  } else {
    localStorage.removeItem('abl_firebase_web_api_key')
  }
}

let firebaseAuthInstance = null

/**
 * Lazily initialises and returns the Firebase Auth instance.
 */
export const getFirebaseAuth = () => {
  const apiKey = getFirebaseApiKey()
  if (!apiKey) return null

  if (firebaseAuthInstance) return firebaseAuthInstance

  const config = {
    apiKey,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || DEFAULT_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || DEFAULT_PROJECT_ID,
  }

  const app = getApps().length > 0 ? getApp() : initializeApp(config)
  firebaseAuthInstance = getAuth(app)
  return firebaseAuthInstance
}

/**
 * Initiates the Google OAuth Popup and retrieves a cryptographic idToken.
 */
export const signInWithGooglePopup = async (customApiKey) => {
  if (customApiKey) {
    setFirebaseApiKey(customApiKey)
    firebaseAuthInstance = null
  }

  const auth = getFirebaseAuth()
  if (!auth) {
    throw new Error('MISSING_FIREBASE_API_KEY')
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

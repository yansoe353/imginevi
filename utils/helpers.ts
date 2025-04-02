/**
 * Checks if the code is running in a browser environment
 */
export const isBrowser = () => {
  return typeof window !== 'undefined' 
    && typeof document !== 'undefined'
    && typeof navigator !== 'undefined'
}

/**
 * Gets the base URL for the current environment
 */
export const getBaseUrl = () => {
  if (isBrowser()) {
    return window.location.origin
  }
  
  // When running on the server side
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  
  return `http://localhost:${process.env.PORT || 3000}`
}

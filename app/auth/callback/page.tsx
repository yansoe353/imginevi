'use client'

import { useEffect, useState, Suspense } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'

function AuthCallbackContent() {
  const router = useRouter()
  const supabase = createClient()
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Supabase automatically handles the OAuth flow in the browser
    // We just need to detect if we're on this page and handle any errors
    
    const handleRedirect = async () => {
      try {
        // Let Supabase handle the OAuth session setup automatically
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Error getting session after OAuth redirect:', error)
          setError('Authentication failed. Please try again.')
          return
        }

        if (data.session) {
          // Successfully authenticated
          console.log('Successfully authenticated')
          router.push('/') // Redirect to home page
        } else {
          // No session created
          if (searchParams.has('error')) {
            setError(searchParams.get('error_description') || 'Authentication failed')
          } else {
            setError('Authentication failed. No session created.')
          }
        }
      } catch (err) {
        console.error('Error in auth callback:', err)
        setError('An unexpected error occurred. Please try again.')
      }
    }

    handleRedirect()
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="flex flex-col items-center gap-4 p-8 max-w-md bg-gray-900 border border-gray-800 rounded-lg">
        {error ? (
          <>
            <div className="text-red-500 text-xl mb-4">Authentication Error</div>
            <p className="text-gray-300 text-center mb-4">{error}</p>
            <button 
              onClick={() => router.push('/')}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded"
            >
              Return to Home
            </button>
          </>
        ) : (
          <>
            <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
            <h1 className="text-xl font-bold text-white">Completing Sign In...</h1>
            <p className="text-gray-400 text-center">
              Please wait while we complete your authentication.
            </p>
          </>
        )}
      </div>
    </div>
  )
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="flex flex-col items-center gap-4 p-8 max-w-md bg-gray-900 border border-gray-800 rounded-lg">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
          <h1 className="text-xl font-bold text-white">Loading...</h1>
        </div>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  )
}
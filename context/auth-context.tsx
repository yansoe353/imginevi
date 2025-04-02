'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { User, Session } from '@supabase/supabase-js'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

type AuthContextType = {
  user: User | null
  session: Session | null
  isLoading: boolean
  signOut: () => Promise<void>
  signInWithGoogle: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        console.error('Error fetching session:', error)
      }
      setSession(data.session)
      setUser(data.session?.user ?? null)
      setIsLoading(false)
    }

    fetchSession()

    const { data } = supabase.auth.onAuthStateChange((event, newSession) => {
      setSession(newSession)
      setUser(newSession?.user ?? null)
      setIsLoading(false)

      // Only show welcome toast on a genuine new sign-in, not on session recovery
      if (event === 'SIGNED_IN') {
        // Check if we've shown the welcome toast for this user in this browser session
        const welcomeShown = localStorage.getItem(`welcome_shown_${newSession?.user?.id}`)
        
        if (!welcomeShown) {
          toast({
            title: "Welcome!",
            description: `You're now signed in as ${newSession?.user?.email}`,
          })
          
          // Mark that we've shown the welcome toast for this user
          if (newSession?.user?.id) {
            localStorage.setItem(`welcome_shown_${newSession.user.id}`, 'true')
          }
        }
      }
    })

    return () => {
      data.subscription.unsubscribe()
    }
  }, [])

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        throw error
      }
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      })
      router.push('/')
    } catch (error) {
      console.error('Error signing out:', error)
      toast({
        title: "Error",
        description: "There was a problem signing you out. Please try again.",
        variant: "destructive"
      })
    }
  }

  const signInWithGoogle = async () => {
    try {
      // Use the built-in Supabase OAuth flow with proper redirectTo
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        }
      })
      
      if (error) {
        throw error
      }
    } catch (error) {
      console.error('Error signing in with Google:', error)
      toast({
        title: "Sign in failed",
        description: "Could not initiate Google sign-in. Please try again later.",
        variant: "destructive"
      })
    }
  }

  return (
    <AuthContext.Provider value={{ user, session, isLoading, signOut, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

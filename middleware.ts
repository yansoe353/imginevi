import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  try {
    // Skip auth callback routes - important for preventing middleware interference
    if (request.nextUrl.pathname.startsWith('/auth/callback')) {
      return NextResponse.next()
    }
    
    const { supabase, response } = createClient(request)
    
    // Refresh session if needed
    await supabase.auth.getSession()
    
    // Protect library route - only accessible to logged-in users
    if (request.nextUrl.pathname.startsWith('/library')) {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        return NextResponse.redirect(new URL('/', request.url))
      }
    }
    
    return response
  } catch (e) {
    // If there's an error, don't block the request
    console.error('Middleware error:', e)
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

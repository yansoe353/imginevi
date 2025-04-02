'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { ImageIcon, LogOut, User } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function SiteHeader() {
  const { user, signOut, signInWithGoogle } = useAuth()

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-800 bg-black py-2">
      <div className="container flex h-16 items-center justify-between">
        <MainNav />
        <div className="flex items-center space-x-3">
          <nav className="flex items-center space-x-3">
            <Link href="/generate">
              <Button variant="ghost" className="bg-transparent hover:bg-gray-900 text-white border-none flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-blue-400" />
                Generate
              </Button>
            </Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full bg-gray-800 p-0">
                    <span className="sr-only">Open user menu</span>
                    {user.user_metadata?.avatar_url ? (
                      <img
                        src={user.user_metadata.avatar_url}
                        alt="User avatar"
                        className="h-10 w-10 rounded-full"
                      />
                    ) : (
                      <User className="h-5 w-5 text-blue-400" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-gray-900 border border-gray-800 text-white">
                  <DropdownMenuLabel>
                    {user.user_metadata?.full_name || user.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-800" />
                  <Link href="/library">
                    <DropdownMenuItem className="cursor-pointer hover:bg-gray-800">
                      My Library
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator className="bg-gray-800" />
                  <DropdownMenuItem 
                    onClick={() => signOut()}
                    className="cursor-pointer hover:bg-gray-800 text-red-400"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                variant="outline" 
                className="bg-transparent hover:bg-gray-900 text-white border border-gray-700"
                onClick={() => signInWithGoogle()}
              >
                Sign in with Google
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}


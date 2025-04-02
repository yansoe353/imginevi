'use client'

import Link from "next/link"
import { ImageIcon } from "lucide-react"
import { useAuth } from "@/context/auth-context"

export function MainNav() {
  const { user } = useAuth()
  
  return (
    <div className="flex items-center gap-8">
      <Link href="/" className="flex items-center space-x-2">
        <ImageIcon className="h-7 w-7 text-blue-500" />
        <span className="text-xl font-bold text-white">AI Image Generator</span>
      </Link>
      <nav className="hidden gap-8 md:flex">
        <Link
          href="/generate"
          className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
        >
          Generate
        </Link>

        {user && (
          <Link
            href="/library"
            className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
          >
            My Library
          </Link>
        )}
      </nav>
    </div>
  )
}



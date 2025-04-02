import Link from "next/link"
import { ImageIcon } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-gray-800 bg-black pt-10 pb-8 mt-16">
      <div className="container flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex flex-col items-center gap-4 md:items-start">
          <Link href="/" className="flex items-center gap-2">
            <ImageIcon className="h-7 w-7 text-blue-500" />
            <span className="text-xl font-bold text-white">AI Image Generator</span>
          </Link>
          <p className="text-center text-sm text-gray-400 md:text-left">
            &copy; {new Date().getFullYear()} AI Image Generator. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  )
}


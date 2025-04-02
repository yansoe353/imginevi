import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { FileQuestion, Home, ImageIcon } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Page Not Found | AI Image Generator",
  description: "Sorry, the page you are looking for does not exist.",
}

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center">
        <div className="container flex flex-col items-center justify-center py-12 md:py-24 text-center">
          <div className="relative mb-8 flex h-40 w-40 items-center justify-center rounded-full bg-gray-900/20">
            <FileQuestion className="h-20 w-20 text-blue-500 animate-pulse" />
          </div>
          <h1 className="font-heading text-4xl md:text-6xl text-white mb-4">404 - Page Not Found</h1>
          <p className="mb-8 max-w-[42rem] text-xl text-gray-400">
            Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/">
              <Button size="lg" className="gap-2">
                <Home className="h-5 w-5" />
                Return Home
              </Button>
            </Link>
            <Link href="/generate">
              <Button variant="outline" size="lg" className="gap-2 bg-transparent hover:bg-gray-900 text-white border border-gray-700">
                <ImageIcon className="h-5 w-5 text-blue-400" />
                Generate Images
              </Button>
            </Link>
          </div>
          <div className="mt-16 max-w-3xl mx-auto p-6 bg-gray-900/30 rounded-lg border border-gray-800">
            <h2 className="text-xl font-semibold text-white mb-4">Looking for something?</h2>
            <ul className="grid gap-3 text-gray-300">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <Link href="/generate" className="text-blue-400 hover:underline">Generate AI Images</Link> - Create custom images with our AI
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <Link href="/examples" className="text-blue-400 hover:underline">View Examples</Link> - See what our AI can create
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <Link href="/library" className="text-blue-400 hover:underline">My Library</Link> - Access your generated images
              </li>
            </ul>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

import Link from "next/link"
import { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Basic Home | AI Image Generator",
  description: "A simplified home page for the AI Image Generator",
}

export default function BasicHomePage() {
  return (
    <>
      <div className="flex min-h-screen flex-col bg-black text-white">
        <SiteHeader />
        <main className="flex-1">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              AI Image Generator
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Create stunning AI-generated images in seconds with our powerful image generation tool
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/generate">
                <div className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors">
                  Generate Images
                </div>
              </Link>
              <Link href="/examples">
                <div className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-8 rounded-lg transition-colors">
                  View Examples
                </div>
              </Link>
            </div>
            
            <div className="mt-16 bg-gray-900 p-8 rounded-xl max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
              <p className="text-gray-300 mb-6">
                Simply describe what you want to see, and our AI will create it for you. Choose from different styles and aspect ratios for the perfect custom image.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Step 1</h3>
                  <p className="text-sm text-gray-400">Describe your image</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Step 2</h3>
                  <p className="text-sm text-gray-400">Choose style & aspect ratio</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Step 3</h3>
                  <p className="text-sm text-gray-400">Generate & download</p>
                </div>
              </div>
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    </>
  )
}

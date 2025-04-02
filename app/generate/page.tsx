import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ImageGenerator } from "@/components/image-generator"
import { StructuredData } from "@/components/structured-data"

export const metadata: Metadata = {
  title: "Generate Images | AI Image Generator",
  description:
    "Create custom AI-generated images with our powerful image generator. Turn your ideas into stunning visuals in seconds.",
  alternates: {
    canonical: "https://ai-image-generator.vercel.app/generate",
  },
}

export default function GeneratePage() {
  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Generate Images | AI Image Generator",
          description:
            "Create custom AI-generated images with our powerful image generator. Turn your ideas into stunning visuals in seconds.",
          url: "https://ai-image-generator.vercel.app/generate",
          mainEntity: {
            "@type": "SoftwareApplication",
            name: "AI Image Generator",
            applicationCategory: "DesignApplication",
            operatingSystem: "Web",
          },
        }}
      />
      <div className="flex min-h-screen flex-col bg-black text-white">
        <SiteHeader />
        <main className="flex-1 w-full">
          <div className="container py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="mx-auto flex flex-col items-center justify-center gap-4 text-center mb-8">
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Generate Images</h1>
              <p className="max-w-[85%] leading-normal text-gray-300 sm:text-lg sm:leading-7">
                Describe what you want to see, and our AI will create it for you
              </p>
            </div>
            <div className="mx-auto w-full max-w-5xl py-6">
              <ImageGenerator />
            </div>
          </div>
        </main>
        <SiteFooter />
      </div>
    </>
  )
}


import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/components/hero-section"
import { Features } from "@/components/features"

import { FAQ } from "@/components/faq"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { StructuredData } from "@/components/structured-data"

export const metadata: Metadata = {
  title: "AI Image Generator | Create Custom Images with AI",
  description:
    "Generate custom images with our AI image generator. Create unique artwork, illustrations, and designs in seconds.",
  alternates: {
    canonical: "https://ai-image-generator.vercel.app",
  },
}

export default function Home() {
  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "AI Image Generator",
          url: "https://ai-image-generator.vercel.app",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://ai-image-generator.vercel.app/search?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }}
      />
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <HeroSection />
          <Features />
          <section className="container py-8 md:py-12 lg:py-24">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
                Ready to create amazing images?
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Start generating custom AI images in seconds. No credit card required.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link href="/generate">
                  <Button size="lg">Get Started</Button>
                </Link>
                <Link href="/examples">
                  <Button variant="outline" size="lg">
                    View Examples
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          <FAQ />
        </main>
        <SiteFooter />
      </div>
    </>
  )
}


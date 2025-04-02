import type React from "react"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@/components/analytics"
import type { Metadata } from "next"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/context/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-image-generator.vercel.app"),
  title: {
    default: "AI Image Generator | Create Custom Images with AI",
    template: "%s | AI Image Generator",
  },
  description:
    "Generate custom images with our AI image generator. Create unique artwork, illustrations, and designs in seconds.",
  keywords: ["AI image generator", "AI art", "image creation", "AI design", "custom illustrations"],
  authors: [{ name: "AI Image Generator Team" }],
  creator: "AI Image Generator",
  publisher: "AI Image Generator",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ai-image-generator.vercel.app",
    title: "AI Image Generator | Create Custom Images with AI",
    description:
      "Generate custom images with our AI image generator. Create unique artwork, illustrations, and designs in seconds.",
    siteName: "AI Image Generator",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AI Image Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Image Generator | Create Custom Images with AI",
    description:
      "Generate custom images with our AI image generator. Create unique artwork, illustrations, and designs in seconds.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            {children}
            <Analytics />
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'
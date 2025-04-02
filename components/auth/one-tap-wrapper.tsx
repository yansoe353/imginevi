'use client'

import dynamic from 'next/dynamic'

// Use dynamic import in this client component
const OneTapComponent = dynamic(
  () => import("@/components/auth/one-tap"),
  { ssr: false }
)

export default function OneTapWrapper() {
  return <OneTapComponent />
}

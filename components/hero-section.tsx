import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl lg:text-5xl lg:leading-[1.1]">
          Create Stunning Images with AI <br className="hidden sm:inline" />
          in Seconds
        </h1>
        <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
          Our AI-powered image generator creates beautiful, unique images from your text descriptions. Perfect for
          designers, marketers, and creators.
        </p>
      </div>
      <div className="flex gap-4">
        <Link href="/generate">
          <Button size="lg">Start Generating</Button>
        </Link>
        <Link href="/examples">
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </Link>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <Image
            src="/landscape.png"
            alt="AI generated landscape with mountains and a lake"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <p className="text-sm font-medium text-white">Landscape with mountains</p>
          </div>
        </div>
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <Image
            src="/bluehair.png"
            alt="AI generated portrait of a woman with blue hair"
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <p className="text-sm font-medium text-white">Portrait with blue hair</p>
          </div>
        </div>
        <div className="relative aspect-square overflow-hidden rounded-lg md:col-span-2 lg:col-span-1">
          <Image
            src="/futuristic.png"
            alt="AI generated futuristic cityscape"
            fill
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <p className="text-sm font-medium text-white">Futuristic cityscape</p>
          </div>
        </div>
      </div>
    </section>
  )
}


import type { Metadata } from "next"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { StructuredData } from "@/components/structured-data"

export const metadata: Metadata = {
  title: "How It Works | AI Image Generator",
  description:
    "Learn how our AI image generator works and browse example images to get inspired for your next creation.",
  alternates: {
    canonical: "https://ai-image-generator.vercel.app/examples",
  },
}

const examples = [
  {
    id: 1,
    title: "Mountain landscape at sunset",
    prompt: "A serene mountain landscape at sunset with snow-capped peaks reflected in a crystal clear lake",
    style: "Realistic",
    image: "/Mountain.png",
  },
  {
    id: 2,
    title: "Cyberpunk cityscape",
    prompt:
      "Futuristic cyberpunk cityscape with neon lights, flying cars, and towering skyscrapers during a rainy night",
    style: "3D Render",
    image: "/Cyperpunk.png",
  },
  {
    id: 3,
    title: "Fantasy character portrait",
    prompt:
      "Portrait of an elven warrior with long silver hair, glowing blue eyes, and intricate armor in a mystical forest",
    style: "Digital Art",
    image: "/Elves.png",
  },
  {
    id: 4,
    title: "Abstract art composition",
    prompt: "Abstract geometric composition with vibrant colors, flowing shapes, and dynamic movement",
    style: "Abstract",
    image: "/abstract art.png",
  },
  {
    id: 5,
    title: "Underwater scene",
    prompt:
      "Underwater scene with colorful coral reef, tropical fish, and sunlight filtering through the water surface",
    style: "Realistic",
    image: "/underwater.png",
  },
  {
    id: 6,
    title: "Steampunk invention",
    prompt:
      "Detailed steampunk flying machine with brass gears, copper pipes, and steam engines against a Victorian cityscape",
    style: "Steampunk",
    image: "/Steampunk.png",
  },
  {
    id: 7,
    title: "Space exploration",
    prompt:
      "Astronaut standing on an alien planet with two moons in the sky, strange vegetation, and a distant space colony",
    style: "Sci-Fi",
    image: "/scifi.png",
  },
  {
    id: 8,
    title: "Oil painting landscape",
    prompt:
      "Traditional oil painting of a countryside landscape with rolling hills, a small cottage, and autumn trees",
    style: "Painting",
    image: "/oilpainting.png",
  },
]

export default function ExamplesPage() {
  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "How AI Image Generator Works",
          description:
            "Learn how our AI image generator works and browse example images to get inspired for your next creation.",
          url: "https://ai-image-generator.vercel.app/examples",
          mainEntity: {
            "@type": "ItemList",
            itemListElement: examples.map((example, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "ImageObject",
                name: example.title,
                description: example.prompt,
                contentUrl: example.image,
              },
            })),
          },
        }}
      />
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <section className="container py-8 md:py-12">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h1 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">How It Works</h1>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Our AI image generator creates stunning visuals from simple text descriptions. Browse these examples to see what's possible!
              </p>
            </div>
            <div className="mx-auto grid max-w-6xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {examples.map((example) => (
                <div
                  key={example.id}
                  className="group overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md"
                >
                  <div className="aspect-square relative overflow-hidden">
                    <Image
                      src={example.image || "/placeholder.svg"}
                      alt={example.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold">{example.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{example.prompt}</p>
                    <div className="mt-2 inline-block rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                      {example.style}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
        <SiteFooter />
      </div>
    </>
  )
}


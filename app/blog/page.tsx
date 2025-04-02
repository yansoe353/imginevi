import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { StructuredData } from "@/components/structured-data"

export const metadata: Metadata = {
  title: "Blog | AI Image Generator",
  description: "Read the latest articles about AI image generation, tips, tutorials, and industry insights.",
  alternates: {
    canonical: "https://ai-image-generator.vercel.app/blog",
  },
}

const blogPosts = [
  {
    id: 1,
    title: "How to Create Stunning AI Art: A Beginner's Guide",
    description: "Learn the basics of creating beautiful AI-generated images with simple prompts and techniques.",
    date: "April 15, 2023",
    readTime: "5 min read",
    slug: "how-to-create-stunning-ai-art",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    title: "The Evolution of AI Image Generation: From GANs to Diffusion Models",
    description: "Explore the technological advancements that have revolutionized AI image generation over the years.",
    date: "March 22, 2023",
    readTime: "8 min read",
    slug: "evolution-of-ai-image-generation",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    title: "10 Creative Ways to Use AI-Generated Images in Marketing",
    description:
      "Discover innovative strategies to incorporate AI art into your marketing campaigns for better engagement.",
    date: "February 10, 2023",
    readTime: "6 min read",
    slug: "10-creative-ways-to-use-ai-images-in-marketing",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 4,
    title: "The Ethics of AI Art: Copyright, Attribution, and Ownership",
    description: "A deep dive into the complex ethical questions surrounding AI-generated artwork.",
    date: "January 5, 2023",
    readTime: "10 min read",
    slug: "ethics-of-ai-art",
    image: "/placeholder.svg?height=400&width=600",
  },
]

export default function BlogPage() {
  return (
    <>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "AI Image Generator Blog",
          description: "Articles about AI image generation, tips, tutorials, and industry insights.",
          url: "https://ai-image-generator.vercel.app/blog",
          blogPost: blogPosts.map((post) => ({
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            url: `https://ai-image-generator.vercel.app/blog/${post.slug}`,
          })),
        }}
      />
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <section className="container py-8 md:py-12">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h1 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">Blog</h1>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                Insights, tutorials, and news about AI image generation
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-2">
              {blogPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`}>
                  <Card className="overflow-hidden transition-all hover:shadow-md">
                    <div className="aspect-video relative">
                      <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                    </div>
                    <CardHeader>
                      <CardTitle>{post.title}</CardTitle>
                      <CardDescription>{post.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        </main>
        <SiteFooter />
      </div>
    </>
  )
}


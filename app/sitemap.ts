import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ai-image-generator.vercel.app"

  // Main pages
  const routes = [
    "",
    "/generate",
    "/examples",
    "/pricing",
    "/blog",
    "/login",
    "/signup",
    "/contact",
    "/terms",
    "/privacy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }))

  // Blog posts
  const blogSlugs = [
    "how-to-create-stunning-ai-art",
    "evolution-of-ai-image-generation",
    "10-creative-ways-to-use-ai-images-in-marketing",
    "ethics-of-ai-art",
  ]

  const blogPosts = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...routes, ...blogPosts]
}


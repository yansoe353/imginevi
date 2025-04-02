import Image from "next/image"

export function Testimonials() {
  return (
    <section className="container py-8 md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">Trusted by Creators</h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          See what our users are saying about our AI image generator
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
        <div className="rounded-lg border bg-background p-8">
          <div className="flex items-center gap-4">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="Sarah Johnson"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <h3 className="font-bold">Sarah Johnson</h3>
              <p className="text-sm text-muted-foreground">Graphic Designer</p>
            </div>
          </div>
          <p className="mt-4 text-muted-foreground">
            "This AI image generator has revolutionized my workflow. I can quickly create concept art that would have
            taken hours to make manually."
          </p>
        </div>
        <div className="rounded-lg border bg-background p-8">
          <div className="flex items-center gap-4">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="Michael Chen"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <h3 className="font-bold">Michael Chen</h3>
              <p className="text-sm text-muted-foreground">Marketing Director</p>
            </div>
          </div>
          <p className="mt-4 text-muted-foreground">
            "We've cut our content creation time in half. The quality of images is impressive and our engagement rates
            have increased significantly."
          </p>
        </div>
        <div className="rounded-lg border bg-background p-8">
          <div className="flex items-center gap-4">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="Emily Rodriguez"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <h3 className="font-bold">Emily Rodriguez</h3>
              <p className="text-sm text-muted-foreground">Content Creator</p>
            </div>
          </div>
          <p className="mt-4 text-muted-foreground">
            "As a content creator, I need unique visuals constantly. This tool has been a game-changer for my creative
            process."
          </p>
        </div>
      </div>
    </section>
  )
}


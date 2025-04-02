import { ImageIcon, ZapIcon, PaletteIcon, DownloadIcon, ShareIcon, LockIcon } from "lucide-react"

export function Features() {
  return (
    <section className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">Features</h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Our AI image generator offers powerful features to help you create the perfect images
        </p>
      </div>
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <ImageIcon className="h-12 w-12 text-primary" />
            <div className="space-y-2">
              <h3 className="font-bold">High Quality Images</h3>
              <p className="text-sm text-muted-foreground">
                Generate high-resolution images suitable for professional use
              </p>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <ZapIcon className="h-12 w-12 text-primary" />
            <div className="space-y-2">
              <h3 className="font-bold">Fast Generation</h3>
              <p className="text-sm text-muted-foreground">Create images in seconds with our optimized AI models</p>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <PaletteIcon className="h-12 w-12 text-primary" />
            <div className="space-y-2">
              <h3 className="font-bold">Style Customization</h3>
              <p className="text-sm text-muted-foreground">Choose from various artistic styles to match your vision</p>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <DownloadIcon className="h-12 w-12 text-primary" />
            <div className="space-y-2">
              <h3 className="font-bold">Easy Downloads</h3>
              <p className="text-sm text-muted-foreground">
                Download your creations in multiple formats and resolutions
              </p>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <ShareIcon className="h-12 w-12 text-primary" />
            <div className="space-y-2">
              <h3 className="font-bold">Social Sharing</h3>
              <p className="text-sm text-muted-foreground">Share your creations directly to social media platforms</p>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-lg border bg-background p-2">
          <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
            <LockIcon className="h-12 w-12 text-primary" />
            <div className="space-y-2">
              <h3 className="font-bold">Content Safety</h3>
              <p className="text-sm text-muted-foreground">
                Built-in content filters ensure appropriate image generation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


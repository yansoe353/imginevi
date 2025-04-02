'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageIcon, DownloadIcon, ShareIcon, Loader2, Lock, Facebook, Twitter, Linkedin, Copy, Mail, ExternalLink } from "lucide-react"
import Image from "next/image"
import { generateImage } from "@/lib/generate-image"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/context/auth-context"
import { createClient } from "@/utils/supabase/client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ImageGenerator() {
  const [prompt, setPrompt] = useState("")
  const [style, setStyle] = useState("realistic")
  const [aspectRatio, setAspectRatio] = useState("1:1")
  const [loading, setLoading] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [debugInfo, setDebugInfo] = useState<string | null>(null)
  const [hasGeneratedImage, setHasGeneratedImage] = useState(false)
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const { toast } = useToast()
  const { user, signInWithGoogle } = useAuth()
  const supabase = createClient()

  useEffect(() => {
    // Check if user has already generated an image (persists after reload)
    if (!user) {
      const hasGeneratedBefore = localStorage.getItem('hasGeneratedImage') === 'true'
      setHasGeneratedImage(hasGeneratedBefore)
      
      if (hasGeneratedBefore) {
        toast({
          title: "Free trial used",
          description: "You've already used your free image generation. Please sign in to continue.",
        })
      }
    }
  }, [user, toast])

  // Save image to Supabase
  const saveImageToSupabase = async (imageUrl: string) => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('images')
        .insert([
          {
            user_id: user.id,
            image_url: imageUrl,
            prompt,
            style,
            aspect_ratio: aspectRatio
          }
        ])

      if (error) throw error

      console.log('Image saved to Supabase:', data)
    } catch (err) {
      console.error('Error saving image to Supabase:', err)
      toast({
        title: "Error saving image",
        description: "Your image was generated but couldn't be saved to your library.",
        variant: "destructive",
      })
    }
  }

  const handleGenerate = async () => {
    if (!prompt) {
      toast({
        title: "Prompt required",
        description: "Please enter a description of the image you want to generate.",
        variant: "destructive",
      })
      return
    }

    // Check if non-logged-in user has already generated an image
    if (!user && hasGeneratedImage) {
      setShowLoginDialog(true)
      return
    }

    setLoading(true)
    setError(null)
    setDebugInfo(null)

    console.log("Starting image generation with:", { prompt, style, aspectRatio })

    try {
      console.log("Calling generateImage function")
      const imageUrl = await generateImage(prompt, style, aspectRatio)
      console.log("Received response from generateImage:", imageUrl ? "Image URL received" : "No image URL")

      if (imageUrl.includes("Error")) {
        console.error("Error in image URL:", imageUrl)
        const errorMessage = imageUrl.split("Error+generating+image:")[1] || "Unknown error"
        throw new Error(decodeURIComponent(errorMessage.trim()))
      }

      setGeneratedImage(imageUrl)
      setHasGeneratedImage(true)
      
      // Store that the user has generated an image
      if (!user) {
        localStorage.setItem('hasGeneratedImage', 'true')
      }
      
      console.log("Image generation successful")

      // Save image to Supabase if user is logged in
      if (user) {
        await saveImageToSupabase(imageUrl)
      }

      toast({
        title: "Image generated",
        description: "Your image has been successfully generated!",
      })
    } catch (err) {
      console.error("Failed to generate image:", err)

      const errorMessage = err instanceof Error ? err.message : "Unknown error"
      const errorStack = err instanceof Error ? err.stack : ""

      setError(`Failed to generate image: ${errorMessage}`)
      setDebugInfo(errorStack || "No additional debug information")

      toast({
        title: "Error",
        description: `Failed to generate image: ${errorMessage}`,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDownload = () => {
    if (!generatedImage) return

    // For base64 images
    if (generatedImage.startsWith("data:")) {
      const link = document.createElement("a")
      link.href = generatedImage
      link.download = `ai-image-${Date.now()}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else {
      // For URL images
      window.open(generatedImage, "_blank")
    }
  }

  const handleShare = async () => {
    if (!generatedImage) return

    if (navigator.share) {
      try {
        await navigator.share({
          title: "My AI Generated Image",
          text: prompt,
          url: generatedImage.startsWith("data:") ? window.location.href : generatedImage,
        })
      } catch (err) {
        // Only show error if it's not a user cancellation
        if (err instanceof Error && !err.message.includes('canceled') && err.name !== 'AbortError') {
          console.error("Error sharing:", err)
          toast({
            title: "Sharing failed",
            description: "Could not share the image. Copied link to clipboard instead.",
          })
          // Fallback to clipboard
          navigator.clipboard.writeText(window.location.href)
        }
      }
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied",
        description: "Image link copied to clipboard!",
      })
    }
  }

  // Social sharing methods
  const shareToFacebook = () => {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
  }

  const shareToTwitter = () => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(`Check out this AI-generated image: ${prompt}`)
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank')
  }

  const shareToLinkedIn = () => {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank')
  }

  const shareByEmail = () => {
    const subject = encodeURIComponent('Check out this AI-generated image')
    const body = encodeURIComponent(`I created this image using an AI generator: ${prompt}\n\n${window.location.href}`)
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank')
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: "Link copied",
      description: "Image link copied to clipboard!",
    })
  }

  const handlePromptGoogleSignIn = () => {
    signInWithGoogle()
  }

  return (
    <div className="space-y-8 w-full">
      <Card className="border border-gray-800 bg-gray-900 shadow-xl overflow-hidden">
        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="prompt" className="text-lg font-medium text-white">Describe your image</Label>
              <Textarea
                id="prompt"
                placeholder="A futuristic cityscape with flying cars and neon lights"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[120px] resize-none bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="space-y-3">
                <Label htmlFor="style" className="text-gray-300">Style</Label>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger id="style" className="bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="realistic">Realistic</SelectItem>
                    <SelectItem value="cartoon">Cartoon</SelectItem>
                    <SelectItem value="3d">3D Render</SelectItem>
                    <SelectItem value="digitalArt">Digital Art</SelectItem>
                    <SelectItem value="anime">Anime</SelectItem>
                    <SelectItem value="scifi">Sci-fi</SelectItem>
                    <SelectItem value="pixel">Pixel Art</SelectItem>
                    <SelectItem value="painting">Oil Painting</SelectItem>
                    <SelectItem value="watercolor">Watercolor</SelectItem>
                    <SelectItem value="sketch">Sketch</SelectItem>
                    <SelectItem value="pencil">Pencil Drawing</SelectItem>
                    <SelectItem value="minimalist">Minimalist</SelectItem>
                    <SelectItem value="abstract">Abstract</SelectItem>
                    <SelectItem value="cyberpunk">Cyberpunk</SelectItem>
                    <SelectItem value="fantasy">Fantasy</SelectItem>
                    <SelectItem value="steampunk">Steampunk</SelectItem>
                    <SelectItem value="impressionist">Impressionist</SelectItem>
                    <SelectItem value="pop-art">Pop Art</SelectItem>
                    <SelectItem value="noir">Film Noir</SelectItem>
                    <SelectItem value="vintage">Vintage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-3">
                <Label htmlFor="aspect-ratio" className="text-gray-300">Aspect Ratio</Label>
                <Select value={aspectRatio} onValueChange={setAspectRatio}>
                  <SelectTrigger id="aspect-ratio" className="bg-gray-800 border-gray-700 text-white focus:ring-2 focus:ring-blue-500">
                    <SelectValue placeholder="Select aspect ratio" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="1:1">Square (1:1)</SelectItem>
                    <SelectItem value="4:3">Standard (4:3)</SelectItem>
                    <SelectItem value="16:9">Widescreen (16:9)</SelectItem>
                    <SelectItem value="9:16">Portrait (9:16)</SelectItem>
                    <SelectItem value="21:9">Ultrawide (21:9)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button onClick={handleGenerate} className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors" disabled={!prompt || loading || (!user && hasGeneratedImage)}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <ImageIcon className="mr-2 h-5 w-5" />
                      Generate Image
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            {!user && (
              <div className="bg-gray-800/50 border border-gray-700 rounded-md p-3 text-sm text-gray-300 flex items-center">
                <Lock className="h-4 w-4 mr-2 text-yellow-500" />
                <span>
                  <span className="font-medium">Free trial:</span> Generate 1 image without signing in. 
                  <span className="text-blue-400 underline cursor-pointer ml-1" onClick={handlePromptGoogleSignIn}>
                    Sign in with Google
                  </span> for unlimited generations.
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="bg-gray-900 border border-gray-700 text-white sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Sign in to continue</DialogTitle>
            <DialogDescription className="text-gray-400">
              You've used your free generation. Sign in with Google to unlock unlimited image generations.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-4">
            <ImageIcon className="h-24 w-24 text-blue-400" />
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowLoginDialog(false)} 
              className="border-gray-700 hover:bg-gray-800 text-white"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => {
                setShowLoginDialog(false)
                handlePromptGoogleSignIn()
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white">
              Sign in with Google
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight text-white">Your Generated Image</h2>
        {generatedImage ? (
          <div className="space-y-6">
            <div className="overflow-hidden rounded-xl border border-gray-700 shadow-2xl bg-gray-800">
              {generatedImage.startsWith("data:") ? (
                // For base64 images
                <div className="relative aspect-square w-full">
                  <img
                    src={generatedImage || "/placeholder.svg"}
                    alt={prompt}
                    className="h-full w-full object-contain"
                  />
                </div>
              ) : (
                // For URL images
                <Image
                  src={generatedImage || "/placeholder.svg"}
                  alt={prompt}
                  width={800}
                  height={800}
                  className="w-full object-cover"
                />
              )}
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="w-full py-6 text-white border-gray-700 hover:bg-gray-800 hover:text-blue-400 transition-all" onClick={handleDownload}>
                <DownloadIcon className="mr-2 h-5 w-5" />
                Download
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full py-6 text-white border-gray-700 hover:bg-gray-800 hover:text-blue-400 transition-all">
                    <ShareIcon className="mr-2 h-5 w-5" />
                    Share
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-gray-800 border border-gray-700 text-white w-52">
                  <DropdownMenuItem onClick={handleShare} className="cursor-pointer hover:bg-gray-700 focus:bg-gray-700">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Share via device
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={shareToFacebook} className="cursor-pointer hover:bg-gray-700 focus:bg-gray-700">
                    <Facebook className="mr-2 h-4 w-4" />
                    Facebook
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={shareToTwitter} className="cursor-pointer hover:bg-gray-700 focus:bg-gray-700">
                    <Twitter className="mr-2 h-4 w-4" />
                    Twitter
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={shareToLinkedIn} className="cursor-pointer hover:bg-gray-700 focus:bg-gray-700">
                    <Linkedin className="mr-2 h-4 w-4" />
                    LinkedIn
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={shareByEmail} className="cursor-pointer hover:bg-gray-700 focus:bg-gray-700">
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={copyToClipboard} className="cursor-pointer hover:bg-gray-700 focus:bg-gray-700">
                    <Copy className="mr-2 h-4 w-4" />
                    Copy link
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {!user && hasGeneratedImage && (
              <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4 text-white">
                <h3 className="font-bold mb-2">Want to save this image?</h3>
                <p className="text-gray-300 mb-4">Sign in to save this image to your library and generate more images!</p>
                <Button 
                  onClick={handlePromptGoogleSignIn}
                  className="bg-blue-600 hover:bg-blue-700 text-white">
                  Sign in with Google
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex h-[500px] items-center justify-center rounded-xl border border-dashed border-gray-700 bg-gray-900">
            <div className="flex flex-col items-center justify-center space-y-4 text-center px-4">
              {loading ? (
                <>
                  <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
                  <h3 className="text-xl font-medium text-white">Generating your image...</h3>
                  <p className="text-gray-400">This may take up to 30 seconds</p>
                </>
              ) : error ? (
                <>
                  <div className="text-red-400">
                    <p className="text-xl font-medium">{error}</p>
                    <p className="text-gray-400 mt-2">Please try again with a different prompt</p>

                    {debugInfo && (
                      <div className="mt-6 rounded-md bg-gray-800 p-4 text-left text-xs text-gray-300 border border-gray-700">
                        <p className="font-medium text-gray-200">Debug Information:</p>
                        <pre className="mt-2 overflow-auto whitespace-pre-wrap">{debugInfo}</pre>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <ImageIcon className="h-16 w-16 text-gray-600" />
                  <h3 className="text-xl font-medium text-white">No image generated yet</h3>
                  <p className="text-gray-400">
                    Enter a prompt and click generate to create your first image
                  </p>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-6 mt-10">
        <h2 className="text-3xl font-bold tracking-tight text-white">Tips for Better Results</h2>
        <Tabs defaultValue="details" className="mt-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800 p-1">
            <TabsTrigger value="details" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Add Details</TabsTrigger>
            <TabsTrigger value="style" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Style Words</TabsTrigger>
            <TabsTrigger value="examples" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Examples</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="space-y-4 mt-6 bg-gray-900 p-6 rounded-lg border border-gray-800">
            <p className="text-gray-300">Be specific and detailed in your descriptions. Include:</p>
            <ul className="list-disc pl-5 space-y-3 text-gray-300">
              <li>Subject matter (person, landscape, object)</li>
              <li>Setting or environment</li>
              <li>Lighting conditions (bright, dim, sunset)</li>
              <li>Color palette or mood</li>
              <li>Camera perspective (close-up, aerial view)</li>
            </ul>
          </TabsContent>
          <TabsContent value="style" className="space-y-4 mt-6 bg-gray-900 p-6 rounded-lg border border-gray-800">
            <p className="text-gray-300">Include style-specific words to guide the aesthetic:</p>
            <ul className="list-disc pl-5 space-y-3 text-gray-300">
              <li>
                <strong className="text-blue-400">Realistic:</strong> photorealistic, detailed, high-definition
              </li>
              <li>
                <strong className="text-blue-400">Artistic:</strong> impressionist, cubist, surrealist
              </li>
              <li>
                <strong className="text-blue-400">Lighting:</strong> golden hour, studio lighting, neon, dramatic
              </li>
              <li>
                <strong className="text-blue-400">Mood:</strong> serene, dystopian, whimsical, melancholic
              </li>
            </ul>
          </TabsContent>
          <TabsContent value="examples" className="space-y-4 mt-6 bg-gray-900 p-6 rounded-lg border border-gray-800">
            <p className="text-gray-300">Example prompts that produce great results:</p>
            <ul className="list-disc pl-5 space-y-3 text-gray-300">
              <li>"A serene mountain lake at sunset with snow-capped peaks reflected in crystal clear water"</li>
              <li>
                "Futuristic cyberpunk cityscape with neon lights, flying cars, and towering skyscrapers during a rainy
                night"
              </li>
              <li>
                "A cozy cottage in a forest clearing with smoke coming from the chimney, surrounded by autumn trees"
              </li>
            </ul>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

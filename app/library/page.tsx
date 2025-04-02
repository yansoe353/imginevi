'use client'

import { useEffect, useState } from 'react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { useAuth } from '@/context/auth-context'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { ImageIcon, TrashIcon, Loader2, ZoomInIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { ImagePreviewModal } from '@/components/ui/image-preview-modal'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

type UserImage = {
  id: string
  user_id: string
  image_url: string
  prompt: string
  style: string
  created_at: string
}

export default function LibraryPage() {
  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const supabase = createClient()
  const [images, setImages] = useState<UserImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const [deleteImageId, setDeleteImageId] = useState<string | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [previewImage, setPreviewImage] = useState<{ url: string; prompt: string } | null>(null)

  useEffect(() => {
    // If authentication is still loading, wait
    if (authLoading) return

    // If user is not logged in, redirect to login
    if (!user) {
      router.push('/')
      return
    }

    // Fetch user's images
    const fetchImages = async () => {
      try {
        setIsLoading(true)
        const { data, error } = await supabase
          .from('images')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (error) throw error

        setImages(data || [])
      } catch (error) {
        console.error('Error fetching images:', error)
        toast({
          title: 'Error',
          description: 'Failed to load your images. Please try again.',
          variant: 'destructive',
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchImages()
  }, [user, authLoading, router])

  const handleDeleteImage = async (id: string) => {
    setDeleteImageId(id)
    setShowDeleteDialog(true)
  }

  const confirmDelete = async () => {
    if (!deleteImageId) return

    try {
      const { error } = await supabase
        .from('images')
        .delete()
        .eq('id', deleteImageId)

      if (error) throw error

      setImages(images.filter((image) => image.id !== deleteImageId))
      toast({
        title: 'Image deleted',
        description: 'Your image has been successfully deleted.',
      })
    } catch (error) {
      console.error('Error deleting image:', error)
      toast({
        title: 'Error',
        description: 'Failed to delete the image. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setShowDeleteDialog(false)
      setDeleteImageId(null)
    }
  }

  const handleViewImage = (image: UserImage) => {
    setPreviewImage({
      url: image.image_url,
      prompt: image.prompt
    })
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <SiteHeader />
      <main className="flex-1 w-full">
        <div className="container py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="mx-auto flex flex-col items-center justify-center gap-4 text-center mb-8">
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              {user?.user_metadata?.full_name || user?.email}'s Library
            </h1>
            <p className="max-w-[85%] leading-normal text-gray-300 sm:text-lg sm:leading-7">
              All your generated images in one place
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
            </div>
          ) : images.length === 0 ? (
            <div className="text-center py-16">
              <ImageIcon className="mx-auto h-16 w-16 text-gray-600 mb-4" />
              <h3 className="text-xl font-medium text-white mb-2">No images yet</h3>
              <p className="text-gray-400 mb-6">
                Start generating images to build your personal collection
              </p>
              <Button
                onClick={() => router.push('/generate')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Generate Your First Image
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="overflow-hidden border border-gray-800 bg-gray-900 flex flex-col rounded-lg"
                >
                  <div 
                    className="aspect-square relative overflow-hidden cursor-pointer"
                    onClick={() => handleViewImage(image)}
                  >
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-all flex items-center justify-center opacity-0 hover:opacity-100 z-10">
                      <ZoomInIcon className="h-10 w-10 text-white" />
                    </div>
                    <img
                      src={image.image_url}
                      alt={image.prompt}
                      className="h-full w-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-medium text-white line-clamp-1 mb-1">{image.prompt}</h3>
                    <p className="text-sm text-gray-400 mb-4">{new Date(image.created_at).toLocaleDateString()}</p>
                    <div className="mt-auto">
                      <Button
                        variant="destructive"
                        size="sm"
                        className="w-full"
                        onClick={() => handleDeleteImage(image.id)}
                      >
                        <TrashIcon className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-gray-900 border border-gray-800 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              This action cannot be undone. This will permanently delete your image.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {previewImage && (
        <ImagePreviewModal
          isOpen={!!previewImage}
          onClose={() => setPreviewImage(null)}
          imageUrl={previewImage.url}
          prompt={previewImage.prompt}
        />
      )}
    </div>
  )
}

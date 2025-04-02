'use client'

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface ImagePreviewModalProps {
  isOpen: boolean
  onClose: () => void
  imageUrl: string
  prompt: string
}

export function ImagePreviewModal({ isOpen, onClose, imageUrl, prompt }: ImagePreviewModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[90vw] bg-gray-900 border border-gray-800 p-0 overflow-hidden">
        <div className="relative">
          <DialogClose asChild className="absolute right-4 top-4 z-10">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
          <div className="flex flex-col">
            <div className="relative bg-black flex items-center justify-center">
              <img
                src={imageUrl}
                alt={prompt}
                className="max-h-[80vh] object-contain"
              />
            </div>
            {prompt && (
              <div className="p-4 border-t border-gray-800">
                <DialogTitle className="text-lg font-medium text-white mb-2">Prompt</DialogTitle>
                <p className="text-gray-300">{prompt}</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

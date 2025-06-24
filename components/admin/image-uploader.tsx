"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, X, ImagePlus } from "lucide-react"

interface ImageUploaderProps {
  onImagesUploaded: (imageUrls: string[]) => void
  maxImages?: number
}

export default function ImageUploader({ onImagesUploaded, maxImages = 4 }: ImageUploaderProps) {
  const [images, setImages] = useState<string[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    handleFiles(files)
  }

  const handleFiles = (files: FileList) => {
    if (images.length >= maxImages) {
      alert(`You can only upload up to ${maxImages} images.`)
      return
    }

    const remainingSlots = maxImages - images.length
    const filesToProcess = Array.from(files).slice(0, remainingSlots)

    filesToProcess.forEach((file) => {
      // In a real app, you would upload the file to a server
      // For this demo, we'll use a local URL
      const imageUrl = URL.createObjectURL(file)
      setImages((prev) => {
        const newImages = [...prev, imageUrl]
        onImagesUploaded(newImages)
        return newImages
      })
    })
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    handleFiles(files)
  }

  const removeImage = (index: number) => {
    setImages((prev) => {
      const newImages = prev.filter((_, i) => i !== index)
      onImagesUploaded(newImages)
      return newImages
    })
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
        />
        <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
        <p className="text-sm font-medium">Drag and drop images here, or click to browse</p>
        <p className="text-xs text-gray-500 mt-1">Supports: JPG, PNG, WEBP (Max {maxImages} images, 5MB each)</p>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <Card key={index} className="relative overflow-hidden h-32">
              <Image
                src={image || "/placeholder.svg"}
                alt={`Uploaded image ${index + 1}`}
                fill
                className="object-cover"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 h-6 w-6 rounded-full"
                onClick={(e) => {
                  e.stopPropagation()
                  removeImage(index)
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </Card>
          ))}
          {images.length < maxImages && (
            <Card
              className="flex items-center justify-center h-32 border-dashed cursor-pointer hover:bg-gray-50"
              onClick={triggerFileInput}
            >
              <div className="text-center">
                <ImagePlus className="h-8 w-8 text-gray-400 mx-auto mb-1" />
                <p className="text-xs text-gray-500">Add Image</p>
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}

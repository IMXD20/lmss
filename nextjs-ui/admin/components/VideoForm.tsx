'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface VideoFormProps {
  courseId: string
  videoId?: string
}

export default function VideoForm({ courseId, videoId }: VideoFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [videoFile, setVideoFile] = useState<File | null>(null)

  useEffect(() => {
    if (videoId) {
      // Fetch video data if editing an existing video
      fetch(`/api/videos/${videoId}`)
        .then(response => response.json())
        .then(data => {
          setTitle(data.title)
          setDescription(data.description)
        })
    }
  }, [videoId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    let file_id = ''
    if (videoFile) {
      const formData = new FormData()
      formData.append('file', videoFile)
      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      const uploadData = await uploadResponse.json()
      file_id = uploadData.file_id
    }

    const videoData = {
      title,
      description,
      course_id: courseId,
      file_id
    }

    const url = videoId ? `/api/videos/${videoId}` : '/api/videos'
    const method = videoId ? 'PUT' : 'POST'

    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(videoData),
    })

    router.push(`/admin/courses/${courseId}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <Label htmlFor="video">Video File</Label>
        <Input
          id="video"
          type="file"
          onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
          accept="video/*"
        />
      </div>
      <Button type="submit">{videoId ? 'Update Video' : 'Add Video'}</Button>
    </form>
  )
}


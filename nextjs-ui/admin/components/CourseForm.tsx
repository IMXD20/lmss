'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface CourseFormProps {
  courseId?: string
}

export default function CourseForm({ courseId }: CourseFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)

  useEffect(() => {
    if (courseId) {
      // Fetch course data if editing an existing course
      fetch(`/api/courses/${courseId}`)
        .then(response => response.json())
        .then(data => {
          setTitle(data.title)
          setDescription(data.description)
        })
    }
  }, [courseId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    let thumbnail_id = ''
    if (thumbnailFile) {
      const formData = new FormData()
      formData.append('file', thumbnailFile)
      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      const uploadData = await uploadResponse.json()
      thumbnail_id = uploadData.file_id
    }

    const courseData = {
      title,
      description,
      thumbnail_id
    }

    const url = courseId ? `/api/courses/${courseId}` : '/api/courses'
    const method = courseId ? 'PUT' : 'POST'

    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(courseData),
    })

    router.push('/admin')
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
        <Label htmlFor="thumbnail">Thumbnail</Label>
        <Input
          id="thumbnail"
          type="file"
          onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
          accept="image/*"
        />
      </div>
      <Button type="submit">{courseId ? 'Update Course' : 'Create Course'}</Button>
    </form>
  )
}


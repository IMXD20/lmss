'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Video {
  id: string
  title: string
  description: string
  course_id: string
  file_id: string
}

interface VideoListProps {
  courseId: string
}

export default function VideoList({ courseId }: VideoListProps) {
  const [videos, setVideos] = useState<Video[]>([])

  useEffect(() => {
    // Fetch videos for the course from API
    fetch(`/api/courses/${courseId}/videos`)
      .then(response => response.json())
      .then(data => setVideos(data))
  }, [courseId])

  const deleteVideo = async (id: string) => {
    if (confirm('Are you sure you want to delete this video?')) {
      await fetch(`/api/videos/${id}`, { method: 'DELETE' })
      setVideos(videos.filter(video => video.id !== id))
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Videos</h2>
      <Link href={`/admin/courses/${courseId}/videos/new`}>
        <Button className="mb-4">Add New Video</Button>
      </Link>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {videos.map((video) => (
            <TableRow key={video.id}>
              <TableCell>{video.title}</TableCell>
              <TableCell>{video.description}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Link href={`/admin/courses/${courseId}/videos/${video.id}`}>
                    <Button variant="outline" size="sm">Edit</Button>
                  </Link>
                  <Button variant="destructive" size="sm" onClick={() => deleteVideo(video.id)}>Delete</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}


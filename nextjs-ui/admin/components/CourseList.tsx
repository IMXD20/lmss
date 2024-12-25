'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Course {
  id: string
  title: string
  description: string
  thumbnail_id: string
}

export default function CourseList() {
  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    // Fetch courses from API
    fetch('/api/courses')
      .then(response => response.json())
      .then(data => setCourses(data))
  }, [])

  const deleteCourse = async (id: string) => {
    if (confirm('Are you sure you want to delete this course?')) {
      await fetch(`/api/courses/${id}`, { method: 'DELETE' })
      setCourses(courses.filter(course => course.id !== id))
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Courses</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow key={course.id}>
              <TableCell>{course.title}</TableCell>
              <TableCell>{course.description}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Link href={`/admin/courses/${course.id}`}>
                    <Button variant="outline" size="sm">Edit</Button>
                  </Link>
                  <Button variant="destructive" size="sm" onClick={() => deleteCourse(course.id)}>Delete</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}


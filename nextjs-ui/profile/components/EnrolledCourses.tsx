import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Link from 'next/link'

interface EnrolledCourse {
  id: number;
  title: string;
  progress: number;
  lastAccessed: string;
}

export default function EnrolledCourses() {
  // In a real application, this data would come from a database or API
  const enrolledCourses: EnrolledCourse[] = [
    { id: 1, title: "Introduction to Python", progress: 75, lastAccessed: "2 days ago" },
    { id: 2, title: "Web Development Bootcamp", progress: 30, lastAccessed: "1 week ago" },
    { id: 3, title: "Data Science Fundamentals", progress: 50, lastAccessed: "3 days ago" },
    { id: 4, title: "Machine Learning A-Z", progress: 10, lastAccessed: "1 month ago" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enrolled Courses</CardTitle>
      </CardHeader>
      <CardContent>
        {enrolledCourses.map(course => (
          <div key={course.id} className="mb-6 last:mb-0">
            <div className="flex justify-between items-center mb-2">
              <Link href={`/courses/${course.id}`} className="text-lg font-medium hover:underline">
                {course.title}
              </Link>
              <span className="text-sm text-gray-500">Last accessed: {course.lastAccessed}</span>
            </div>
            <Progress value={course.progress} className="h-2" />
            <p className="text-sm text-gray-600 mt-1">{course.progress}% complete</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}


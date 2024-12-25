import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Circle } from 'lucide-react'

interface CourseContentProps {
  courseId: string
}

export default function CourseContent({ courseId }: CourseContentProps) {
  // In a real application, this data would come from an API or database
  const lessons = [
    { id: 1, title: "Introduction to Python", completed: true },
    { id: 2, title: "Variables and Data Types", completed: true },
    { id: 3, title: "Control Flow: If Statements", completed: true },
    { id: 4, title: "Control Flow: Loops", completed: true },
    { id: 5, title: "Functions", completed: false },
    { id: 6, title: "Lists and Tuples", completed: false },
    { id: 7, title: "Dictionaries", completed: false },
    { id: 8, title: "File Handling", completed: false },
    { id: 9, title: "Exception Handling", completed: false },
    { id: 10, title: "Object-Oriented Programming", completed: false },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Content</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {lessons.map((lesson) => (
            <li key={lesson.id} className="flex items-center">
              {lesson.completed ? (
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              ) : (
                <Circle className="h-5 w-5 text-gray-300 mr-2" />
              )}
              <Link href={`/courses/${courseId}/lessons/${lesson.id}`} className="text-sm hover:underline">
                {lesson.title}
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}


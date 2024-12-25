import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CourseInfoProps {
  title: string
  description: string
  instructor: string
}

export default function CourseInfo({ title, description, instructor }: CourseInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{description}</p>
        <p className="text-sm">Instructor: <span className="font-medium">{instructor}</span></p>
      </CardContent>
    </Card>
  )
}


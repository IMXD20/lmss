import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface CourseProgressProps {
  totalLessons: number
  completedLessons: number
}

export default function CourseProgress({ totalLessons, completedLessons }: CourseProgressProps) {
  const progressPercentage = (completedLessons / totalLessons) * 100

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Your Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <Progress value={progressPercentage} className="h-2 mb-2" />
        <p className="text-sm text-gray-600">
          {completedLessons} of {totalLessons} lessons completed ({progressPercentage.toFixed(0)}%)
        </p>
      </CardContent>
    </Card>
  )
}


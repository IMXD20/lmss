import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface CourseCardProps {
  title: string
  instructor: string
  image: string
}

export default function CourseCard({ title, instructor, image }: CourseCardProps) {
  return (
    <Card>
      <CardHeader className="p-0">
        <Image src={image} alt={title} width={300} height={200} className="w-full h-48 object-cover" />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg mb-2">{title}</CardTitle>
        <p className="text-sm text-gray-600">{instructor}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full">Enroll Now</Button>
      </CardFooter>
    </Card>
  )
}


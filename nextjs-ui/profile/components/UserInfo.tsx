import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function UserInfo() {
  // In a real application, this data would come from a database or API
  const user = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    joinDate: "January 2023",
    coursesCompleted: 5
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Information</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <Avatar className="w-24 h-24 mx-auto mb-4">
          <AvatarImage src="/placeholder.svg?height=96&width=96" alt={user.name} />
          <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
        <p className="text-gray-600 mb-2">{user.email}</p>
        <p className="text-sm text-gray-500 mb-4">Member since {user.joinDate}</p>
        <p className="font-medium">Courses Completed: {user.coursesCompleted}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Edit Profile</Button>
      </CardFooter>
    </Card>
  )
}


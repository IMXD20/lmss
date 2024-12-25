import CourseCard from './CourseCard'

const mockCourses = [
  { id: 1, title: "Introduction to Python", instructor: "John Doe", image: "/placeholder.svg?height=200&width=300" },
  { id: 2, title: "Web Development Bootcamp", instructor: "Jane Smith", image: "/placeholder.svg?height=200&width=300" },
  { id: 3, title: "Data Science Fundamentals", instructor: "Bob Johnson", image: "/placeholder.svg?height=200&width=300" },
  { id: 4, title: "Machine Learning A-Z", instructor: "Alice Brown", image: "/placeholder.svg?height=200&width=300" },
  { id: 5, title: "Digital Marketing Mastery", instructor: "Charlie Green", image: "/placeholder.svg?height=200&width=300" },
  { id: 6, title: "Graphic Design for Beginners", instructor: "Diana White", image: "/placeholder.svg?height=200&width=300" },
]

export default function CourseCatalog() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Featured Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {mockCourses.map(course => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </div>
    </section>
  )
}


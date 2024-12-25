import AdminHeader from '../../components/AdminHeader'
import CourseForm from '../../components/CourseForm'

export default function NewCoursePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Add New Course</h1>
        <CourseForm />
      </main>
    </div>
  )
}


import AdminHeader from '../../components/AdminHeader'
import CourseForm from '../../components/CourseForm'
import VideoList from '../../components/VideoList'

export default function EditCoursePage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Edit Course</h1>
        <CourseForm courseId={params.id} />
        <div className="mt-12">
          <VideoList courseId={params.id} />
        </div>
      </main>
    </div>
  )
}


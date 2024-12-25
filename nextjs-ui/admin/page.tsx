import AdminHeader from './components/AdminHeader'
import CourseList from './components/CourseList'

export default function AdminPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        <CourseList />
      </main>
    </div>
  )
}


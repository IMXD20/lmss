import AdminHeader from '../../../../components/AdminHeader'
import VideoForm from '../../../../components/VideoForm'

export default function NewVideoPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Add New Video</h1>
        <VideoForm courseId={params.id} />
      </main>
    </div>
  )
}


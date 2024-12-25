import AdminHeader from '../../../../components/AdminHeader'
import VideoForm from '../../../../components/VideoForm'

export default function EditVideoPage({ params }: { params: { id: string, videoId: string } }) {
  return (
    <div className="min-h-screen flex flex-col">
      <AdminHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Edit Video</h1>
        <VideoForm courseId={params.id} videoId={params.videoId} />
      </main>
    </div>
  )
}


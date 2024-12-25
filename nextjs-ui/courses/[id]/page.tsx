import Header from '../../components/Header'
import Footer from '../../components/Footer'
import VideoPlayer from './components/VideoPlayer'
import CourseInfo from './components/CourseInfo'
import CourseContent from './components/CourseContent'
import CourseProgress from './components/CourseProgress'

export default function CourseViewPage({ params }: { params: { id: string } }) {
  // In a real application, we would fetch the course data based on the id
  const course = {
    id: params.id,
    title: "Introduction to Python Programming",
    description: "Learn the basics of Python programming in this comprehensive course. Perfect for beginners!",
    videoUrl: "https://example.com/course-video.mp4",
    instructor: "John Doe",
    totalLessons: 10,
    completedLessons: 4,
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <VideoPlayer videoUrl={course.videoUrl} />
            <CourseInfo title={course.title} description={course.description} instructor={course.instructor} />
          </div>
          <div className="lg:col-span-1">
            <CourseProgress totalLessons={course.totalLessons} completedLessons={course.completedLessons} />
            <CourseContent courseId={course.id} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}


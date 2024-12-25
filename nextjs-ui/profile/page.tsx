import Header from '../components/Header'
import Footer from '../components/Footer'
import UserInfo from './components/UserInfo'
import EnrolledCourses from './components/EnrolledCourses'

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">User Profile</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <UserInfo />
          </div>
          <div className="md:col-span-2">
            <EnrolledCourses />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}


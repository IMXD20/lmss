import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function AdminHeader() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/admin" className="text-2xl font-bold">FreeLearning Admin</Link>
        <nav>
          <ul className="flex items-center space-x-4">
            <li><Link href="/admin/courses/new"><Button>Add New Course</Button></Link></li>
            <li><Link href="/"><Button variant="outline">Back to Site</Button></Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}


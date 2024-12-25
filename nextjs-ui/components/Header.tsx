import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">FreeLearning</Link>
        <div className="flex-1 max-w-xl mx-4">
          <Input type="search" placeholder="Search for anything" className="w-full" />
        </div>
        <nav>
          <ul className="flex items-center space-x-4">
            <li><Link href="/courses" className="text-sm">Courses</Link></li>
            <li><Link href="/login"><Button variant="outline">Log In</Button></Link></li>
            <li><Link href="/register"><Button>Sign Up</Button></Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}


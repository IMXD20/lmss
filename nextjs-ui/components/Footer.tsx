import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">FreeLearning</h3>
            <p className="text-sm">Learn anything, anytime, for free.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Courses</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#">Development</Link></li>
              <li><Link href="#">Business</Link></li>
              <li><Link href="#">IT & Software</Link></li>
              <li><Link href="#">Design</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Community</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#">Learners</Link></li>
              <li><Link href="#">Partners</Link></li>
              <li><Link href="#">Developers</Link></li>
              <li><Link href="#">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#">About us</Link></li>
              <li><Link href="#">Careers</Link></li>
              <li><Link href="#">Support</Link></li>
              <li><Link href="#">Contact us</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
          © 2023 FreeLearning. All rights reserved.
        </div>
      </div>
    </footer>
  )
}


import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="bg-gray-100 py-12 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Learn Anything, For Free</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">Discover a world of knowledge with our free online courses. No fees, no limits - just pure learning.</p>
        <Button size="lg">Explore Courses</Button>
      </div>
    </section>
  )
}


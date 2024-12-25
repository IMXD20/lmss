import Header from './components/Header'
import Hero from './components/Hero'
import CourseCatalog from './components/CourseCatalog'
import Footer from './components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <CourseCatalog />
      </main>
      <Footer />
    </div>
  )
}


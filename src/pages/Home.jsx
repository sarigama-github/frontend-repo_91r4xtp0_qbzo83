import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import GemCard from '../components/GemCard'
import Spline from '@splinetool/react-spline'
import { ShieldCheck, Star, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Home() {
  const [featured, setFeatured] = useState([])

  useEffect(() => {
    fetch(`${baseUrl}/api/gems?limit=6&sort_by=price&sort_order=desc`)
      .then(r => r.json())
      .then(d => setFeatured(d.items || []))
      .catch(() => setFeatured([]))
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navbar />

      <section className="relative h-[70vh] flex items-center">
        <div className="absolute inset-0">
          <Spline scene="https://prod.spline.design/HldEaEeFcKnMlQB3/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/40 to-slate-950/80 pointer-events-none" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-yellow-400 drop-shadow">Exquisite Certified Gemstones</h1>
          <p className="mt-4 text-slate-200 max-w-2xl">Discover a curated selection of rare, investment-grade gems. Elegantly presented, meticulously certified, and ready to inspire.</p>
          <div className="mt-8 flex gap-3">
            <a href="/collection" className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 font-semibold px-5 py-3 rounded-md shadow hover:shadow-amber-500/20 transition-all">View Collection</a>
            <a href="#contact" className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-white/20 text-slate-100 hover:bg-white/10 transition-colors">Contact</a>
          </div>
        </div>
      </section>

      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-6">Featured Collection</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featured.map(g => <GemCard key={g._id} gem={g} />)}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-900/40 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start gap-4">
            <ShieldCheck className="w-8 h-8 text-amber-300" />
            <div>
              <h3 className="text-white font-semibold">Certified Authenticity</h3>
              <p className="text-slate-400 text-sm">Every gem is lab-certified with complete provenance.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Star className="w-8 h-8 text-amber-300" />
            <div>
              <h3 className="text-white font-semibold">Premium Selection</h3>
              <p className="text-slate-400 text-sm">A handpicked curation of rare stones and investment pieces.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Sparkles className="w-8 h-8 text-amber-300" />
            <div>
              <h3 className="text-white font-semibold">Luxury Experience</h3>
              <p className="text-slate-400 text-sm">Concierge service with private viewings by appointment.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

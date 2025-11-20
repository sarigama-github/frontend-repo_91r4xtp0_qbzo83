import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function GemDetails() {
  const { id } = useParams()
  const [gem, setGem] = useState(null)
  const [recommended, setRecommended] = useState([])

  useEffect(() => {
    fetch(`${baseUrl}/api/gems/${id}`).then(r => r.json()).then(setGem)
    fetch(`${baseUrl}/api/gems?limit=4`).then(r=>r.json()).then(d=>setRecommended(d.items || []))
  }, [id])

  if (!gem) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="w-72 h-72 rounded-2xl bg-slate-900/40 border border-white/10 animate-pulse" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-10 text-slate-200">
        <div>
          <div className="aspect-square overflow-hidden rounded-xl border border-white/10 bg-slate-900/40">
            <img src={gem.image} alt={gem.name} className="w-full h-full object-cover" />
          </div>
          {gem.gallery?.length > 0 && (
            <div className="mt-4 grid grid-cols-4 gap-3">
              {gem.gallery.map((img, i) => (
                <img key={i} src={img} alt="thumb" className="h-20 w-full object-cover rounded border border-white/10" />
              ))}
            </div>
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">{gem.name}</h1>
          <p className="text-slate-400 mt-1">{gem.type} • {gem.weight} ct</p>
          <p className="text-amber-300 text-2xl font-semibold mt-2">${gem.price.toLocaleString()}</p>
          <p className="mt-4 text-slate-300 leading-relaxed">{gem.description}</p>
          {gem.certification && <p className="mt-2 text-sm text-slate-400">Certification: {gem.certification}</p>}

          <div className="mt-6 flex gap-3">
            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 font-semibold px-5 py-3 rounded-md shadow hover:shadow-amber-500/20 transition-all">Add to Cart</button>
            <button className="px-5 py-3 rounded-md border border-white/20 text-slate-100 hover:bg-white/10 transition-colors">Buy Now</button>
          </div>
        </div>
      </main>

      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h3 className="text-white font-semibold mb-4">Recommended</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommended.map(g => (
            <Link key={g._id} to={`/gems/${g._id}`} className="group relative overflow-hidden rounded-xl border border-white/10 bg-slate-900/50">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={g.image} alt={g.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-3 flex items-center justify-between">
                <span className="text-slate-200 text-sm">{g.name}</span>
                <span className="text-amber-300 text-sm font-semibold">${g.price.toLocaleString()}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import GemCard from '../components/GemCard'
import FilterSidebar from '../components/FilterSidebar'
import { useEffect, useState } from 'react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Collection() {
  const [params, setParams] = useState({ sortBy: 'price', sortOrder: 'asc' })
  const [data, setData] = useState({ items: [], total: 0 })
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const limit = 12

  useEffect(() => {
    const query = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      sort_by: params.sortBy,
      sort_order: params.sortOrder,
      ...(params.type ? { type: params.type } : {}),
      ...(params.search ? { search: params.search } : {}),
    }).toString()
    setLoading(true)
    fetch(`${baseUrl}/api/gems?${query}`)
      .then(r => r.json())
      .then(d => setData(d))
      .finally(() => setLoading(false))
  }, [params, page])

  const totalPages = Math.max(1, Math.ceil(data.total / limit))

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <FilterSidebar onChange={setParams} />
        </div>
        <div className="lg:col-span-3">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-64 rounded-xl bg-slate-900/40 border border-white/10 animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.items.map(g => <GemCard key={g._id} gem={g} />)}
              </div>
              <div className="flex items-center justify-center gap-3 mt-8">
                <button onClick={()=>setPage(p=>Math.max(1,p-1))} className="px-3 py-1 rounded bg-slate-800 text-slate-200 border border-white/10 disabled:opacity-50" disabled={page===1}>Prev</button>
                <span className="text-slate-300 text-sm">Page {page} of {totalPages}</span>
                <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} className="px-3 py-1 rounded bg-slate-800 text-slate-200 border border-white/10 disabled:opacity-50" disabled={page===totalPages}>Next</button>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

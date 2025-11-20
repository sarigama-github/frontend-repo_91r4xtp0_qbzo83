import { useEffect, useState } from 'react'

export default function FilterSidebar({ onChange }) {
  const [type, setType] = useState('')
  const [sortBy, setSortBy] = useState('price')
  const [sortOrder, setSortOrder] = useState('asc')
  const [search, setSearch] = useState('')

  useEffect(() => {
    const t = setTimeout(() => onChange({ type: type || undefined, sortBy, sortOrder, search: search || undefined }), 250)
    return () => clearTimeout(t)
  }, [type, sortBy, sortOrder, search])

  return (
    <aside className="bg-slate-900/40 border border-white/10 rounded-xl p-4 text-slate-200">
      <h4 className="font-semibold text-white mb-3">Filter & Sort</h4>

      <label className="block text-sm text-slate-400 mb-1">Search</label>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search gems..." className="w-full mb-4 px-3 py-2 rounded bg-slate-800 border border-white/10 focus:outline-none focus:ring-2 focus:ring-amber-400/40" />

      <label className="block text-sm text-slate-400 mb-1">Gem Type</label>
      <select value={type} onChange={e => setType(e.target.value)} className="w-full mb-4 px-3 py-2 rounded bg-slate-800 border border-white/10">
        <option value="">All</option>
        <option>Ruby</option>
        <option>Sapphire</option>
        <option>Emerald</option>
        <option>Diamond</option>
        <option>Topaz</option>
        <option>Amethyst</option>
      </select>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm text-slate-400 mb-1">Sort by</label>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="w-full px-3 py-2 rounded bg-slate-800 border border-white/10">
            <option value="price">Price</option>
            <option value="weight">Weight</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Order</label>
          <select value={sortOrder} onChange={e => setSortOrder(e.target.value)} className="w-full px-3 py-2 rounded bg-slate-800 border border-white/10">
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      </div>
    </aside>
  )
}

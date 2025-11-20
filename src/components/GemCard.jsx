import { Link } from 'react-router-dom'

export default function GemCard({ gem }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-slate-900/50 hover:bg-slate-900/70 transition-colors">
      <div className="aspect-[4/3] overflow-hidden">
        <img src={gem.image} alt={gem.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-medium">{gem.name}</h3>
          <span className="text-amber-300 font-semibold">${gem.price.toLocaleString()}</span>
        </div>
        <p className="text-sm text-slate-400 mt-1">{gem.type} • {gem.weight} ct</p>
        <p className="text-xs text-slate-500 mt-2 line-clamp-2">{gem.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <Link to={`/gems/${gem._id}`} className="text-amber-300 hover:text-amber-200 text-sm">View Details</Link>
          <button className="text-xs px-3 py-1 rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500/30">Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

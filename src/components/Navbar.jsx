import { Link, NavLink, useLocation } from 'react-router-dom'
import { Gem, ShoppingBag, ShieldCheck, Menu } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const linkClass = ({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'text-amber-300' : 'text-slate-200 hover:text-white'}`

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Gem className="w-6 h-6 text-amber-400" />
            <span className="text-white font-semibold tracking-wide">Aurelia Gems</span>
          </Link>
          <nav className="hidden md:flex items-center gap-2">
            <NavLink to="/" className={linkClass}>Home</NavLink>
            <NavLink to="/collection" className={linkClass}>Collection</NavLink>
            <NavLink to="/admin" className={linkClass}>Admin</NavLink>
          </nav>
          <div className="flex items-center gap-3">
            <button className="hidden md:inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 font-semibold px-4 py-2 rounded-md shadow hover:shadow-amber-500/20 transition-shadow">
              <ShoppingBag className="w-4 h-4" />
              Shop Now
            </button>
            <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-md border border-white/10 text-slate-100">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden py-3 border-t border-white/10">
            <div className="flex flex-col gap-2">
              <NavLink to="/" onClick={() => setOpen(false)} className={linkClass}>Home</NavLink>
              <NavLink to="/collection" onClick={() => setOpen(false)} className={linkClass}>Collection</NavLink>
              <NavLink to="/admin" onClick={() => setOpen(false)} className={linkClass}>Admin</NavLink>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

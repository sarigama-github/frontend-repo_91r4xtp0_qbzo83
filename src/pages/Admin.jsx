import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AdminForm from '../components/AdminForm'
import { useEffect, useState } from 'react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Admin() {
  const [token, setToken] = useState('')
  const [password, setPassword] = useState('')
  const [gems, setGems] = useState([])
  const [editing, setEditing] = useState(null)
  const [message, setMessage] = useState('')

  const load = () => fetch(`${baseUrl}/api/gems?limit=100`).then(r=>r.json()).then(d=>setGems(d.items || []))

  useEffect(() => { if (token) load() }, [token])

  const login = async () => {
    const res = await fetch(`${baseUrl}/api/admin/login`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ password }) })
    if (res.ok) { const d = await res.json(); setToken(d.token); setMessage(''); } else { setMessage('Invalid password') }
  }

  const saveGem = async (payload) => {
    const method = editing? 'PUT':'POST'
    const url = editing? `${baseUrl}/api/gems/${editing._id}` : `${baseUrl}/api/gems`
    const res = await fetch(url, { method, headers:{'Content-Type':'application/json', Authorization: `Bearer ${token}`}, body: JSON.stringify(payload) })
    if (res.ok) { setEditing(null); await load(); setMessage('Saved successfully') } else { setMessage('Save failed') }
  }

  const remove = async (id) => {
    const res = await fetch(`${baseUrl}/api/gems/${id}`, { method:'DELETE', headers:{ Authorization: `Bearer ${token}` }})
    if (res.ok) { await load(); setMessage('Deleted') } else { setMessage('Delete failed') }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-200">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-10">
        {!token ? (
          <div className="max-w-md mx-auto bg-slate-900/50 border border-white/10 rounded-xl p-6">
            <h2 className="text-white font-semibold mb-3">Admin Login</h2>
            <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter admin password" type="password" className="w-full px-3 py-2 rounded bg-slate-800 border border-white/10" />
            <button onClick={login} className="mt-3 w-full bg-amber-500 text-slate-900 font-semibold px-4 py-2 rounded">Login</button>
            {message && <p className="text-sm text-red-400 mt-2">{message}</p>}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-slate-900/50 border border-white/10 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">{editing? 'Edit Gem':'Create Gem'}</h3>
              <AdminForm onSave={saveGem} gem={editing} />
              {message && <p className="text-sm text-emerald-400 mt-3">{message}</p>}
            </div>
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {gems.map(g => (
                  <div key={g._id} className="rounded-xl border border-white/10 bg-slate-900/50 overflow-hidden">
                    <div className="aspect-[4/3] overflow-hidden"><img src={g.image} alt={g.name} className="w-full h-full object-cover" /></div>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-white font-medium">{g.name}</h4>
                        <span className="text-amber-300 font-semibold">${g.price.toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-slate-400">{g.type} • {g.weight} ct</p>
                      <div className="mt-3 flex gap-2">
                        <button onClick={()=>setEditing(g)} className="px-3 py-1 rounded bg-slate-800 border border-white/10">Edit</button>
                        <button onClick={()=>remove(g._id)} className="px-3 py-1 rounded bg-red-500/20 text-red-300">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

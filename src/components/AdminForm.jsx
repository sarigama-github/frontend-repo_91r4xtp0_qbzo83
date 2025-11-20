import { useEffect, useState } from 'react'

const initial = { name: '', type: 'Ruby', weight: '', price: '', description: '', certification: '', image: '' }

export default function AdminForm({ onSave, gem }) {
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (gem) setForm({ ...initial, ...gem, weight: gem.weight?.toString() || '', price: gem.price?.toString() || '' })
  }, [gem])

  const validate = () => {
    const e = {}
    if (!form.name || form.name.length < 2) e.name = 'Please enter a name (min 2 characters)'
    if (!form.type) e.type = 'Select a type'
    const w = parseFloat(form.weight)
    if (isNaN(w) || w < 0) e.weight = 'Weight must be a non-negative number'
    const p = parseFloat(form.price)
    if (isNaN(p) || p < 0) e.price = 'Price must be a non-negative number'
    if (!form.description || form.description.length < 10) e.description = 'Description must be at least 10 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    try {
      await onSave({
        name: form.name.trim(),
        type: form.type,
        weight: parseFloat(form.weight),
        price: parseFloat(form.price),
        description: form.description.trim(),
        certification: form.certification?.trim() || undefined,
        image: form.image?.trim() || undefined,
      })
      setForm(initial)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm text-slate-300 mb-1">Gem Name</label>
        <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="w-full px-3 py-2 rounded bg-slate-800 text-white border border-white/10" />
        {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-sm text-slate-300 mb-1">Type</label>
          <select value={form.type} onChange={e=>setForm({...form, type:e.target.value})} className="w-full px-3 py-2 rounded bg-slate-800 text-white border border-white/10">
            <option>Ruby</option>
            <option>Sapphire</option>
            <option>Emerald</option>
            <option>Diamond</option>
            <option>Topaz</option>
            <option>Amethyst</option>
          </select>
          {errors.type && <p className="text-xs text-red-400 mt-1">{errors.type}</p>}
        </div>
        <div>
          <label className="block text-sm text-slate-300 mb-1">Weight (ct)</label>
          <input value={form.weight} onChange={e=>setForm({...form, weight:e.target.value})} className="w-full px-3 py-2 rounded bg-slate-800 text-white border border-white/10" />
          {errors.weight && <p className="text-xs text-red-400 mt-1">{errors.weight}</p>}
        </div>
        <div>
          <label className="block text-sm text-slate-300 mb-1">Price (USD)</label>
          <input value={form.price} onChange={e=>setForm({...form, price:e.target.value})} className="w-full px-3 py-2 rounded bg-slate-800 text-white border border-white/10" />
          {errors.price && <p className="text-xs text-red-400 mt-1">{errors.price}</p>}
        </div>
      </div>
      <div>
        <label className="block text-sm text-slate-300 mb-1">Image URL</label>
        <input value={form.image} onChange={e=>setForm({...form, image:e.target.value})} className="w-full px-3 py-2 rounded bg-slate-800 text-white border border-white/10" />
      </div>
      <div>
        <label className="block text-sm text-slate-300 mb-1">Certification</label>
        <input value={form.certification} onChange={e=>setForm({...form, certification:e.target.value})} className="w-full px-3 py-2 rounded bg-slate-800 text-white border border-white/10" />
      </div>
      <div>
        <label className="block text-sm text-slate-300 mb-1">Description</label>
        <textarea value={form.description} onChange={e=>setForm({...form, description:e.target.value})} rows={4} className="w-full px-3 py-2 rounded bg-slate-800 text-white border border-white/10" />
        {errors.description && <p className="text-xs text-red-400 mt-1">{errors.description}</p>}
      </div>
      <button disabled={submitting} className="w-full sm:w-auto inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-900 font-semibold px-5 py-2 rounded-md shadow hover:shadow-amber-500/20 transition-all disabled:opacity-60">
        {submitting ? 'Saving...' : 'Save Gem'}
      </button>
    </form>
  )
}

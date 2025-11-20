export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-slate-950/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-slate-300">
        <div>
          <h4 className="text-white font-semibold mb-3">Aurelia Gems</h4>
          <p className="text-sm text-slate-400">Curated collection of premium gemstones with certified authenticity.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Visit Us</h4>
          <p className="text-sm text-slate-400">123 Regent Street, London W1B 5TB</p>
          <p className="text-sm text-slate-400">+44 20 7946 0958</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Follow</h4>
          <div className="flex gap-4 text-slate-300">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Pinterest</a>
            <a href="#" className="hover:text-white transition-colors">Facebook</a>
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-slate-500 py-4 border-t border-white/10">© {new Date().getFullYear()} Aurelia Gems. All rights reserved.</div>
    </footer>
  )
}

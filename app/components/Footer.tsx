'use client'

import { Globe, Film, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-surface-container/20 py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-8 md:px-16 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="flex flex-col items-center md:items-start gap-4">
          <h2 className="font-serif text-3xl text-on-background uppercase font-bold tracking-tighter">CineNoir</h2>
          <p className="font-sans text-sm text-white/40 max-w-xs text-center md:text-left">
            © 2026 CineNoir. Curated Cinema Excellence.
          </p>
        </div>
        
        <div className="flex gap-16">
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold tracking-widest uppercase text-primary">Company</span>
            <a href="#" className="text-xs font-bold tracking-widest uppercase text-white/40 hover:text-secondary transition-colors">Legal</a>
            <a href="#" className="text-xs font-bold tracking-widest uppercase text-white/40 hover:text-secondary transition-colors">Privacy</a>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold tracking-widest uppercase text-primary">Connect</span>
            <a href="#" className="text-xs font-bold tracking-widest uppercase text-white/40 hover:text-secondary transition-colors">Press</a>
            <a href="#" className="text-xs font-bold tracking-widest uppercase text-white/40 hover:text-secondary transition-colors">Terms</a>
          </div>
        </div>

        <div className="flex gap-6">
          {[Globe, Film, MessageCircle].map((Icon, i) => (
            <button key={i} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors text-white/60 hover:text-primary">
              <Icon className="w-5 h-5" />
            </button>
          ))}
        </div>
      </div>
    </footer>
  )
}

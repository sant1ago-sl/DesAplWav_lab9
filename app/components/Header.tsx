'use client'

import { useState, useEffect } from 'react'
import { Search, User } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500 px-8 md:px-16 flex justify-between items-center",
        isScrolled ? "py-4 bg-background/80 backdrop-blur-xl border-b border-white/5 shadow-2xl" : "py-8 bg-transparent"
      )}
    >
      <div className="flex items-center gap-12">
        <div className="font-serif text-2xl md:text-3xl tracking-tighter text-on-background uppercase font-bold cursor-pointer">
          CineNoir
        </div>
        <nav className="hidden md:flex gap-8">
          {[
            { name: 'Premieres', path: '#' },
            { name: 'Genres', path: '#' }
          ].map((item) => (
            <a 
              key={item.name}
              href={item.path} 
              className={cn(
                "text-[10px] font-bold tracking-widest uppercase transition-all duration-300 hover:text-primary text-white/60"
              )}
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center bg-white/5 px-4 py-2 rounded-full border border-white/10 group focus-within:border-primary/50 transition-all">
          <Search className="w-4 h-4 text-white/40 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search films..." 
            className="bg-transparent border-none focus:ring-0 text-sm px-2 w-40 placeholder:text-white/20 outline-none"
            readOnly
            onClick={() => {
                const searchSection = document.getElementById('search-section');
                searchSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </div>
        <button className="text-white hover:text-primary transition-colors">
          <Search className="md:hidden w-5 h-5" />
        </button>
      </div>

    </header>
  )
}

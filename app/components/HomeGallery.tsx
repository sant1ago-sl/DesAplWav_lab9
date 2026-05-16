'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Search, ChevronLeft, ChevronRight, Ticket, ArrowRight, Filter, SlidersHorizontal } from 'lucide-react'
import MovieCard from './MovieCard'
import MovieDetails from './MovieDetails'
import { cn } from '@/lib/utils'

import Logo from './Logo'

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface HomeGalleryProps {
  initialMovies: Movie[];
}

const GENRES = [
  { id: 'all', name: 'Todos', query: 'noir' },
  { id: 'noir', name: 'Cine Negro', query: 'detective' },
  { id: 'sci-fi', name: 'Ciencia Ficción', query: 'interstellar' },
  { id: 'action', name: 'Acción', query: 'john wick' },
  { id: 'drama', name: 'Drama', query: 'godfather' }
]

export default function HomeGallery({ initialMovies }: HomeGalleryProps) {
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [genreMovies, setGenreMovies] = useState<Movie[]>(initialMovies)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Search logic (Debounced)
  useEffect(() => {
    const searchMovies = async () => {
      if (query.trim().length < 3) {
        setSearchResults([])
        return
      }
      
      setLoading(true)
      try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=5fbbb434&s=${query}`)
        const data = await response.json()
        if (data.Search) {
          setSearchResults(data.Search)
        } else {
          setSearchResults([])
        }
      } catch (error) {
        console.error('Search error:', error)
      } finally {
        setLoading(false)
      }
    }

    const timer = setTimeout(searchMovies, 500)
    return () => clearTimeout(timer)
  }, [query])

  // Genre logic
  useEffect(() => {
    if (selectedGenre === 'all' && !query) {
      setGenreMovies(initialMovies)
      return
    }

    const fetchByGenre = async () => {
      setLoading(true)
      const genre = GENRES.find(g => g.id === selectedGenre)
      try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=5fbbb434&s=${genre?.query}`)
        const data = await response.json()
        setGenreMovies(data.Search || [])
      } catch (error) {
        console.error('Genre fetch error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchByGenre()
  }, [selectedGenre, initialMovies, query])

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  }

  return (
    <div className="bg-background">
      {/* Hero Section - Presentation */}
      <section id="hero" className="relative h-screen w-full flex items-center px-8 md:px-16 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Cinematic"
            className="w-full h-full object-cover grayscale-[0.4] contrast-125 brightness-[0.25]"
          />
          <div className="absolute inset-0 cinematic-gradient" />
          
          {/* Integrated Watermark Logo */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/4 -translate-y-1/2 w-[80vh] h-[80vh] text-primary/5 pointer-events-none rotate-12">
            <Logo className="w-full h-full" />
          </div>
        </div>

        
        <div className="relative z-10 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-[1px] bg-primary"></div>
            <span className="text-[10px] font-bold tracking-[0.4em] text-primary uppercase">Estética del Siglo XXI</span>
          </motion.div>

          <motion.h1 
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-serif text-6xl md:text-[10rem] text-white mb-10 leading-[0.9] tracking-tighter"
          >
            CineNoir
          </motion.h1>

          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl md:text-2xl text-white/40 mb-16 max-w-2xl font-light leading-relaxed italic"
          >
            "El cine no es un arte que filma vida, el cine está entre el arte y la vida."
            <span className="block mt-4 text-xs font-bold uppercase tracking-widest not-italic text-white/20">— Jean-Luc Godard</span>
          </motion.p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap items-center gap-8"
          >
            <button 
              onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary text-on-primary px-12 py-6 rounded-xl text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-primary-container transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-primary/20"
            >
              Explorar Catálogo
            </button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
            <span className="text-[8px] font-bold tracking-[0.4em] text-white/20 uppercase">Scroll</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent"></div>
        </motion.div>
      </section>

      {/* Catalog Section - Películas Disponibles */}
      <section id="catalog" className="py-40 px-8 md:px-16 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-24">
                <div className="max-w-2xl">
                    <span className="text-[10px] font-bold tracking-[0.3em] text-primary mb-4 block uppercase opacity-60">Archivo Curado</span>
                    <h2 className="font-serif text-4xl md:text-6xl text-white font-bold tracking-tight">Películas Disponibles</h2>
                    <p className="mt-6 text-white/40 font-light leading-relaxed">
                        Una selección manual de hitos cinematográficos, desde clásicos del noir hasta estrenos vanguardistas contemporáneos.
                    </p>
                </div>

                {/* Professional Filter Bar */}
                <div className="flex flex-col gap-6 w-full md:w-auto">
                    <div className="flex items-center gap-4 text-[10px] font-bold tracking-widest text-white/20 uppercase mb-2">
                        <SlidersHorizontal className="w-3 h-3" />
                        Filtrar por Género
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {GENRES.map((genre) => (
                            <button
                                key={genre.id}
                                onClick={() => setSelectedGenre(genre.id)}
                                className={cn(
                                    "px-6 py-3 rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all border",
                                    selectedGenre === genre.id 
                                        ? "bg-white text-background border-white shadow-xl" 
                                        : "bg-surface-container/40 text-white/40 border-white/5 hover:border-white/20 hover:text-white"
                                )}
                            >
                                {genre.name}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Integrated Search Bar */}
            <div className="relative group max-w-xl mb-24">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-primary transition-colors" />
                <input 
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Buscar por título en el archivo..."
                    className="w-full bg-surface-container/20 border border-white/5 focus:border-primary/30 rounded-2xl py-5 pl-14 pr-6 text-white placeholder:text-white/10 outline-none transition-all text-sm font-light"
                />
                {loading && (
                    <div className="absolute right-6 top-1/2 -translate-y-1/2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/10 border-t-primary"></div>
                    </div>
                )}
            </div>

            {/* Movies Grid */}
            <AnimatePresence mode="wait">
                <motion.div 
                    key={query ? 'search' : selectedGenre}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10"
                >
                    {(query ? searchResults : genreMovies).map((movie) => (
                        <MovieCard 
                            key={movie.imdbID} 
                            movie={movie} 
                            onClick={(id) => setSelectedId(id)}
                        />
                    ))}
                    {(query ? searchResults : genreMovies).length === 0 && !loading && (
                        <div className="col-span-full text-center py-40 border border-white/5 rounded-[3rem] bg-surface-container/10">
                            <p className="text-white/20 text-xs font-bold uppercase tracking-[0.3em]">No se han encontrado obras en esta categoría</p>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
      </section>

      {/* Editorial Section - Added for Professional look */}
      <section className="py-32 px-8 md:px-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative aspect-video rounded-[3rem] overflow-hidden group">
                <img 
                    src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=1000" 
                    className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105"
                    alt="Editorial"
                />
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
            </div>
            <div>
                <span className="text-[10px] font-bold tracking-[0.4em] text-secondary mb-6 block uppercase">Membresía CineNoir</span>
                <h3 className="font-serif text-4xl md:text-5xl text-white mb-8 leading-tight">Únete al club de los visionarios.</h3>
                <p className="text-white/60 font-light leading-relaxed mb-12 text-lg">
                    Accede a proyecciones exclusivas, ensayos críticos y una comunidad dedicada a la preservación de la excelencia cinematográfica.
                </p>
                <button className="group flex items-center gap-4 text-xs font-bold tracking-widest uppercase text-white hover:text-primary transition-all">
                    Saber más sobre la membresía 
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                </button>
            </div>
        </div>
      </section>

      {/* Global Details Modal */}
      <AnimatePresence>
        {selectedId && (
            <motion.div
                key="modal-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <MovieDetails 
                    movieId={selectedId} 
                    onClose={() => setSelectedId(null)} 
                />
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Search, ChevronLeft, ChevronRight, Ticket, ArrowRight, Play } from 'lucide-react'
import MovieCard from './MovieCard'
import MovieDetails from './MovieDetails'
import { cn } from '@/lib/utils'

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
  { id: 'all', name: 'All Masterpieces', query: 'marvel' },
  { id: 'noir', name: 'Film Noir', query: 'detective' },
  { id: 'sci-fi', name: 'Sci-Fi', query: 'interstellar' },
  { id: 'action', name: 'Action', query: 'john wick' },
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
    if (selectedGenre === 'all') {
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
  }, [selectedGenre, initialMovies])

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  }

  const heroMovie = initialMovies[0]

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center px-8 md:px-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero Cinematic"
            className="w-full h-full object-cover grayscale-[0.4] contrast-125 brightness-[0.3]"
          />
          <div className="absolute inset-0 cinematic-gradient" />
        </div>
        
        <div className="relative z-10 max-w-4xl">
          <motion.span 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="text-[10px] font-bold tracking-[0.3em] text-secondary mb-6 block uppercase"
          >
            Now Premiering
          </motion.span>
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="font-serif text-5xl md:text-8xl text-white mb-8 leading-[1.1] tracking-tight"
          >
            {heroMovie?.Title || "Cinema is an act of seeing."}
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/60 mb-12 max-w-xl font-light leading-relaxed"
          >
            Experience the latest cinematic milestones. From noir classics to contemporary avant-garde premieres, curated for the visionary soul.
          </motion.p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-8"
          >
            <button 
              onClick={() => {
                  const searchSection = document.getElementById('search-section');
                  searchSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-primary text-on-primary px-10 py-5 rounded-xl text-[10px] font-bold tracking-widest uppercase hover:bg-primary-container transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-primary/20"
            >
              Explore Catalog
            </button>
            <button 
              onClick={() => setSelectedId(heroMovie?.imdbID)}
              className="group flex items-center gap-4 text-white hover:text-primary transition-all"
            >
              <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md group-hover:bg-white group-hover:text-background transition-all">
                <Play className="w-6 h-6 fill-current" />
              </div>
              <span className="text-[10px] font-bold tracking-widest uppercase">View Details</span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Genres & Search Section */}
      <section id="search-section" className="py-32 px-8 md:px-16 scroll-mt-20">
        <div className="max-w-4xl mx-auto mb-20">
            <div className="text-center mb-16">
                <span className="text-[10px] font-bold tracking-widest text-primary mb-3 block uppercase">Curated Collections</span>
                <h2 className="font-serif text-3xl md:text-5xl text-white font-bold tracking-tight mb-12">Browse by Genre</h2>
                
                {/* Genre Pills */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {GENRES.map((genre) => (
                        <button
                            key={genre.id}
                            onClick={() => setSelectedGenre(genre.id)}
                            className={cn(
                                "px-8 py-3 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all border",
                                selectedGenre === genre.id 
                                    ? "bg-primary text-on-primary border-primary shadow-lg shadow-primary/20" 
                                    : "bg-white/5 text-white/40 border-white/10 hover:border-white/30 hover:text-white"
                            )}
                        >
                            {genre.name}
                        </button>
                    ))}
                </div>

                <div className="relative group max-w-2xl mx-auto">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-primary transition-colors" />
                    <input 
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Or search by title..."
                        className="w-full bg-white/5 border border-white/10 focus:border-primary/50 rounded-2xl py-6 pl-16 pr-6 text-white placeholder:text-white/20 outline-none transition-all text-lg font-light"
                    />
                    {loading && (
                        <div className="absolute right-6 top-1/2 -translate-y-1/2">
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/10 border-t-primary"></div>
                        </div>
                    )}
                </div>
            </div>
        </div>

        <AnimatePresence mode="wait">
            <motion.div 
                key={query ? 'search' : selectedGenre}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8"
            >
                {(query ? searchResults : genreMovies).map((movie) => (
                    <MovieCard 
                        key={movie.imdbID} 
                        movie={movie} 
                        onClick={(id) => setSelectedId(id)}
                    />
                ))}
                {(query ? searchResults : genreMovies).length === 0 && !loading && (
                    <div className="col-span-full text-center py-20 border border-white/5 rounded-3xl bg-white/[0.02]">
                        <p className="text-white/40 text-sm font-light uppercase tracking-widest">No masterpieces found in this category</p>
                    </div>
                )}
            </motion.div>
        </AnimatePresence>
      </section>

      {/* Trending Section (Horizontal Scroll) */}
      {!query && selectedGenre === 'all' && (
        <section className="py-32 border-t border-white/5">
            <div className="px-8 md:px-16 flex justify-between items-end mb-12">
            <div>
                <span className="text-[10px] font-bold tracking-widest text-primary mb-3 block uppercase">SSR Performance</span>
                <h2 className="font-serif text-3xl md:text-4xl text-white font-bold tracking-tight">Trending Now</h2>
            </div>
            <div className="flex gap-4">
                <button onClick={() => handleScroll('left')} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors text-white">
                <ChevronLeft className="w-6 h-6" />
                </button>
                <button onClick={() => handleScroll('right')} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors text-white">
                <ChevronRight className="w-6 h-6" />
                </button>
            </div>
            </div>

            <div 
                ref={scrollRef}
                className="flex gap-8 px-8 md:px-16 overflow-x-auto hide-scrollbar pb-12 cursor-grab active:cursor-grabbing"
            >
            {initialMovies.map((movie) => (
                <div key={movie.imdbID} className="w-[300px] flex-none">
                    <MovieCard 
                        movie={movie} 
                        onClick={(id) => setSelectedId(id)}
                    />
                </div>
            ))}
            </div>
        </section>
      )}

      {/* Weekly Journal Section */}
      <section className="px-8 md:px-16 py-32 border-t border-white/5">
        <div className="max-w-4xl mx-auto glass rounded-[2rem] p-12 md:p-20 flex flex-col justify-center text-center items-center">
          <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-8">
            <Ticket className="text-secondary w-8 h-8" />
          </div>
          <h4 className="font-serif text-3xl md:text-4xl text-white mb-4 font-bold tracking-tight">Weekly Journal</h4>
          <p className="text-lg text-white/60 mb-10 font-light leading-relaxed max-w-xl">Curated film essays and industry insights delivered to your inbox every Sunday.</p>
          <div className="relative w-full max-w-md">
            <input 
              type="email" 
              placeholder="email@example.com"
              className="w-full bg-transparent border-b border-white/10 focus:border-primary focus:ring-0 px-0 py-4 text-white placeholder:text-white/20 transition-colors outline-none"
            />
            <button className="absolute right-0 top-1/2 -translate-y-1/2 text-primary hover:text-white transition-colors">
              <ArrowRight className="w-5 h-5" />
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

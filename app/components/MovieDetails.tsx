'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Play, Plus, X, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DetailedMovie {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  imdbRating: string;
  imdbID: string;
  Type: string;
}

interface MovieDetailsProps {
  movieId: string;
  onClose: () => void;
}

export default function MovieDetails({ movieId, onClose }: MovieDetailsProps) {
  const [movie, setMovie] = useState<DetailedMovie | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=5fbbb434&i=${movieId}&plot=full`)
        const data = await response.json()
        setMovie(data)
      } catch (error) {
        console.error('Error fetching details:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchDetails()
  }, [movieId])

  if (!movieId) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/95 backdrop-blur-2xl animate-in fade-in duration-500"
        onClick={onClose}
      ></div>
      
      {/* Modal Container */}
      <div className="relative bg-background border border-white/10 rounded-[2rem] max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] animate-in zoom-in-95 fade-in duration-500 flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 z-50 bg-white/5 hover:bg-white text-white hover:text-black w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border border-white/10 group"
        >
          <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
        </button>

        {loading ? (
          <div className="flex flex-col items-center justify-center w-full py-60">
            <div className="animate-spin rounded-full h-12 w-12 border-2 border-white/10 border-t-primary"></div>
          </div>
        ) : movie ? (
          <>
            {/* Visual Side */}
            <div className="w-full md:w-[45%] relative">
              <img 
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=1500'} 
                alt={movie.Title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-background via-transparent to-transparent"></div>
            </div>
            
            {/* Content Side */}
            <div className="w-full md:w-[55%] p-10 md:p-16 overflow-y-auto custom-scrollbar flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-surface-container-highest px-3 py-1 text-[10px] font-bold tracking-widest uppercase border border-white/10 text-white/60">
                  {movie.Type}
                </span>
                <span className="text-primary text-[10px] font-bold tracking-widest uppercase">{movie.Runtime}</span>
                <span className="text-secondary text-[10px] font-bold tracking-widest uppercase flex items-center gap-1">
                   <Star className="w-3 h-3 fill-current" /> {movie.imdbRating}
                </span>
              </div>

              <h2 className="font-serif text-4xl md:text-6xl text-white font-bold leading-tight mb-8 tracking-tight">
                {movie.Title}
              </h2>
              
              <div className="flex flex-wrap gap-8 mb-10 text-white/40 font-bold text-[10px] uppercase tracking-[0.2em]">
                <div className="flex flex-col gap-1">
                  <span className="text-primary/60">Year</span>
                  <span className="text-white/80">{movie.Year}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-primary/60">Genre</span>
                  <span className="text-white/80">{movie.Genre}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-primary/60">Rated</span>
                  <span className="text-white/80">{movie.Rated}</span>
                </div>
              </div>

              <div className="space-y-10">
                <p className="text-white/60 leading-relaxed text-lg font-light max-w-xl">
                  {movie.Plot !== 'N/A' ? movie.Plot : 'No description available.'}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-white/5 pt-10">
                  <div>
                    <h4 className="text-primary text-[10px] font-bold uppercase tracking-widest mb-2">Director</h4>
                    <p className="text-white/80 text-sm font-medium">{movie.Director}</p>
                  </div>
                  <div>
                    <h4 className="text-primary text-[10px] font-bold uppercase tracking-widest mb-2">Starring</h4>
                    <p className="text-white/80 text-sm font-medium">{movie.Actors}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4">
                   <button className="flex items-center gap-3 bg-secondary text-on-secondary px-8 py-4 rounded-full text-[10px] font-bold tracking-widest uppercase hover:brightness-110 transition-all active:scale-95 shadow-xl shadow-secondary/10">
                      <Play className="w-4 h-4 fill-current" /> Watch Trailer
                   </button>
                   <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-all">
                      <Plus className="w-5 h-5" />
                   </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="p-20 text-center w-full">
            <p className="text-primary font-bold">Error loading details.</p>
          </div>
        )}
      </div>
    </div>
  )
}

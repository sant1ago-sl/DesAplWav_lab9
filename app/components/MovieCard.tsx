'use client'

import { cn } from '@/lib/utils'

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface MovieCardProps {
  movie: Movie;
  onClick: (id: string) => void;
  className?: string;
}

export default function MovieCard({ movie, onClick, className }: MovieCardProps) {
  return (
    <div 
      onClick={() => onClick(movie.imdbID)}
      className={cn("flex-none w-full relative rounded-2xl overflow-hidden group cursor-pointer aspect-[2/3]", className)}
    >
      <img 
        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=800'} 
        alt={movie.Title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.3] group-hover:grayscale-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
        <div className="flex gap-2 mb-3">
          <span className="bg-primary/20 backdrop-blur-md text-primary text-[8px] font-bold px-2 py-1 rounded tracking-widest uppercase">{movie.Year}</span>
          <span className="bg-white/10 backdrop-blur-md text-white/80 text-[8px] font-bold px-2 py-1 rounded tracking-widest uppercase">{movie.Type}</span>
        </div>
        <h3 className="font-serif text-xl text-white mb-2 line-clamp-2">{movie.Title}</h3>
        <p className="text-[10px] text-white/60 line-clamp-2 font-light uppercase tracking-widest">Click to view details</p>
      </div>
    </div>
  )
}

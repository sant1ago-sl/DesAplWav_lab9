'use client'

import { cn } from '@/lib/utils'

export default function Logo({ className, opacity = 1 }: { className?: string, opacity?: number }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={cn("w-10 h-10", className)}
      style={{ opacity }}
    >
      {/* Abstract Cinematic Frame */}
      <rect x="10" y="20" width="80" height="60" rx="4" stroke="currentColor" strokeWidth="2" />
      <path d="M10 40H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 60H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M80 40H90" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M80 60H90" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      
      {/* Stylized CN */}
      <path d="M40 45C38 45 35 47 35 50C35 53 38 55 40 55" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M55 45V55L65 45V55" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* Subtle Highlight Dot */}
      <circle cx="50" cy="50" r="1" fill="currentColor" />
    </svg>
  )
}

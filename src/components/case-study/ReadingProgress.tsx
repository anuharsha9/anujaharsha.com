'use client'

import { useState, useEffect } from 'react'
import { m, useSpring } from 'framer-motion'

export default function ReadingProgress() {
 const [progress, setProgress] = useState(0)

 // Use a spring for buttery smooth visual tracking instead of raw pixels
 const scaleX = useSpring(0, {
 stiffness: 100,
 damping: 30,
 restDelta: 0.001
 })

 useEffect(() => {
 if (typeof window === 'undefined') return

 const updateProgress = () => {
 const windowHeight = window.innerHeight
 const documentHeight = document.documentElement.scrollHeight
 const scrollTop = window.scrollY || document.documentElement.scrollTop
 
 // Calculate progress percentage (0 to 1)
 const scrollableHeight = documentHeight - windowHeight
 const progressVal = scrollableHeight > 0 
 ? Math.min(1, Math.max(0, scrollTop / scrollableHeight))
 : 0
 
 setProgress(progressVal)
 scaleX.set(progressVal)
 }

 window.addEventListener('scroll', updateProgress, { passive: true })
 updateProgress() // Initial calculation

 return () => window.removeEventListener('scroll', updateProgress)
 }, [scaleX])

 // Don't render anything if we're at the very top (or calculate it but hide it)
 if (progress === 0) return null

 return (
 <div className="fixed top-0 left-0 right-0 h-[2px] z-[100] pointer-events-none mix-blend-screen">
 {/* Main progress bar with spring smoothing and aurora gradient */}
 <m.div
 className="absolute top-0 left-0 bottom-0 right-0 origin-left"
 style={{ 
 scaleX, 
 background: 'linear-gradient(90deg, transparent 0%, rgba(var(--semantic-cyan-rgb),0.5) 40%, rgba(139,92,246,0.9) 80%, rgba(var(--white-rgb),1) 100%)',
 boxShadow: '0 0 12px rgba(139,92,246,0.6), 0 0 4px rgba(var(--white-rgb),0.8)' 
 }}
 >
 {/* The glowing "playhead" tip to simulate a comet head */}
 <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 rounded-full bg-white blur-[4px] opacity-90 mix-blend-overlay" />
 <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-[2px] h-[4px] rounded-full bg-white shadow-[0_0_8px_2px_#fff]" />
 </m.div>
 </div>
 )
}

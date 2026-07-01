'use client'

import React from 'react'
import { m } from 'framer-motion'
import { EASE_CINEMATIC as ease, DURATION } from '@/lib/motion'

export interface CinematicSceneProps {
 eyebrow?: string
 title: string
 body?: React.ReactNode
 bullets?: string[]
 children?: React.ReactNode // For putting BentoGallery inside
 alignment?: 'left' | 'center'
}

export default function CinematicScene({ eyebrow, title, body, bullets, children, alignment = 'left' }: CinematicSceneProps) {
 const textAlign = alignment === 'center' ? 'text-center items-center' : 'text-left items-start'

 return (
 <section className="relative min-h-[50vh] py-24 sm:py-32 flex flex-col justify-center">

 {/* Atmospheric glow — barely visible, matches trailer aesthetic */}
 <div
 className="absolute inset-0 pointer-events-none"
 aria-hidden="true"
 style={{
 background: 'radial-gradient(ellipse 60% 40% at 50% 30%, rgba(var(--accent-teal-rgb, 45,212,191), 0.03) 0%, transparent 70%)',
 }}
 />

 {/* 
 The Narrative Block (Sticky or just inline fading) 
 Here we use Framer motion whileInView for a simple, Apple-like smooth fade-in
 */}
 <m.div
 className={`w-full max-w-[1440px] mx-auto px-6 md:px-16 flex flex-col ${textAlign} mb-12 lg:mb-24`}
 initial={{ opacity: 0, scale: 0.95, y: 20 }}
 whileInView={{ opacity: 1, scale: 1, y: 0 }}
 viewport={{ once: true, margin: "-10%" }}
 transition={{ duration: DURATION.drift, ease }}
 >
 {eyebrow && (
 <span className="text-[var(--accent-teal)] font-mono text-[10px] sm:text-xs md:text-sm uppercase tracking-[0.4em] mb-6 drop-shadow-[0_1px_2px_rgba(var(--black-rgb),0.8)]">
 {eyebrow}
 </span>
 )}

 {/* Massive Apple-style Title -> Allowed to span wider */}
 <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-bold leading-[1.1] tracking-[-0.02em] text-white mb-8 max-w-[1200px] text-wrap-balance">
 {title}
 </h2>

 {/* Paragraphs - Expanded width significantly */}
 {body && (
 <div className="text-xl md:text-2xl lg:text-3xl text-zinc-200 font-light max-w-[1200px] leading-[1.5] md:leading-[1.4] space-y-6">
 {body}
 </div>
 )}

 {/* Minimalist Bullets replacing heavy "cards" */}
 {bullets && bullets.length > 0 && (
 <ul className="mt-12 space-y-6 max-w-3xl text-left">
 {bullets.map((b, i) => (
 <m.li
 key={i}
 initial={{ opacity: 0, x: -20 }}
 whileInView={{ opacity: 1, x: 0 }}
 viewport={{ once: true }}
 transition={{ duration: DURATION.slower, delay: 0.2 + (i * 0.1), ease }}
 className="flex items-start gap-4"
 >
 <span className="text-[var(--accent-teal)] font-mono text-xl leading-none mt-1">0{i + 1}</span>
 <p className="text-lg md:text-xl text-zinc-200 font-light leading-relaxed md:leading-relaxed">{b}</p>
 </m.li>
 ))}
 </ul>
 )}
 </m.div>

 {/* 
 Visual Payload (Bento grids, Carousels, Custom interactive elements)
 */}
 {children && (
 <m.div
 className="w-full max-w-[1440px] mx-auto px-6 md:px-16"
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: "-5%" }}
 transition={{ duration: DURATION.cinematic, delay: 0.15, ease }}
 >
 {children}
 </m.div>
 )}

 </section>
 )
}

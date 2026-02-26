'use client'

import React from 'react'
import Link from 'next/link'
import { useReducedMotion } from 'framer-motion'
import { Play } from 'lucide-react'

export function SecondaryCaseStudies() {
    const prefersReducedMotion = useReducedMotion()
    const shouldAutoPlay = !prefersReducedMotion

    return (
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 w-full items-stretch justify-center px-4 md:px-0">
            {/* ML Functions */}
            <Link
                href="/work/ml-functions"
                className="group relative w-full md:w-1/2 aspect-[4/5] md:aspect-[3/4] lg:aspect-[16/10] rounded-3xl overflow-hidden bg-[var(--surface-charcoal-950)] border border-white/10 block transition-transform duration-700 ease-out hover:scale-[0.98]"
            >
                {/* Background Video */}
                <video
                    src="/videos/ml-prototype-walkthrough.mp4"
                    autoPlay={shouldAutoPlay}
                    loop={shouldAutoPlay}
                    muted
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 transition-all duration-700 ease-in-out group-hover:opacity-40 group-hover:scale-105"
                />

                {/* Subtle Vignette Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none transition-opacity duration-700 ease-in-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                {/* Centered Play Button (Reveals text on hover) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <div className="flex items-center gap-3 overflow-hidden rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-3 text-white shadow-2xl transition-all duration-500 ease-out transform group-hover:scale-110 group-hover:bg-white flex-row pl-5 pr-5">
                        <Play className="w-4 h-4 fill-current transition-colors duration-500 group-hover:text-black" />
                        <span className="font-sans font-bold text-xs tracking-widest uppercase transition-colors duration-500 text-transparent group-hover:text-black w-0 group-hover:w-auto opacity-0 group-hover:opacity-100 whitespace-nowrap overflow-hidden">
                            Watch Case Study
                        </span>
                    </div>
                </div>

                {/* Content Overlay - Bottom Left */}
                <div className="absolute bottom-10 left-10 z-10 flex flex-col pointer-events-none transform transition-transform duration-700 ease-out group-hover:translate-y-[-8px]">
                    <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.2em] mb-4">
                        Secondary Case Study
                    </div>
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white mb-3">
                        ML Functions
                    </h3>
                    <p className="text-sm md:text-base text-[var(--neutral-zinc-400)] max-w-sm leading-relaxed">
                        12-Step ML Process → 4-Step Visual Wizard
                    </p>
                </div>
            </Link>

            {/* DSML Discovery */}
            <Link
                href="/work/iq-plugin"
                className="group relative w-full md:w-1/2 aspect-[4/5] md:aspect-[3/4] lg:aspect-[16/10] rounded-3xl overflow-hidden bg-[var(--surface-charcoal-950)] border border-white/10 block transition-transform duration-700 ease-out hover:scale-[0.98]"
            >
                {/* Background Video */}
                <video
                    src="/videos/iq-prototype-walkthrough.mp4"
                    autoPlay={shouldAutoPlay}
                    loop={shouldAutoPlay}
                    muted
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 transition-all duration-700 ease-in-out group-hover:opacity-40 group-hover:scale-105"
                />

                {/* Subtle Vignette Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none transition-opacity duration-700 ease-in-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

                {/* Centered Play Button (Reveals text on hover) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <div className="flex items-center gap-3 overflow-hidden rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-4 py-3 text-white shadow-2xl transition-all duration-500 ease-out transform group-hover:scale-110 group-hover:bg-white flex-row pl-5 pr-5">
                        <Play className="w-4 h-4 fill-current transition-colors duration-500 group-hover:text-black" />
                        <span className="font-sans font-bold text-xs tracking-widest uppercase transition-colors duration-500 text-transparent group-hover:text-black w-0 group-hover:w-auto opacity-0 group-hover:opacity-100 whitespace-nowrap overflow-hidden">
                            Watch Case Study
                        </span>
                    </div>
                </div>

                {/* Content Overlay - Bottom Left */}
                <div className="absolute bottom-10 left-10 z-10 flex flex-col pointer-events-none transform transition-transform duration-700 ease-out group-hover:translate-y-[-8px]">
                    <div className="text-[10px] font-mono text-amber-400 uppercase tracking-[0.2em] mb-4">
                        Secondary Case Study
                    </div>
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-white mb-3">
                        DSML Discovery
                    </h3>
                    <p className="text-sm md:text-base text-[var(--neutral-zinc-400)] max-w-sm leading-relaxed">
                        3 Siloed Tools → 1 Discovery Hub
                    </p>
                </div>
            </Link>
        </div>
    )
}

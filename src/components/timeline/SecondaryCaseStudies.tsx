'use client'

import React from 'react'
import Link from 'next/link'

export function SecondaryCaseStudies() {
    return (
        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 w-full items-stretch justify-center px-4 md:px-0">
            {/* ML Functions */}
            <Link
                href="/work/ml-functions"
                className="group relative w-full md:w-1/2 h-[400px] md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden bg-black border border-white/10 shadow-2xl block hover:scale-[1.02] transition-transform duration-400 ease-in-out"
            >
                {/* Background Video */}
                <video
                    src="/videos/ml-prototype-walkthrough.mp4"
                    autoPlay loop muted playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-70 blur-[2px] group-hover:opacity-100 group-hover:blur-0 transition-all duration-400 ease-in-out"
                />

                {/* Subtle gradient for text readability at bottom left */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/20 to-transparent pointer-events-none transition-opacity duration-400 ease-in-out group-hover:opacity-50" />

                {/* Content Overlay - Bottom Left */}
                <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-10 flex flex-col pointer-events-none">
                    <h3 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg mb-2">
                        ML Functions
                    </h3>
                    <p className="text-sm md:text-lg text-white/80 font-medium tracking-wide drop-shadow-md">
                        12-Step ML Process → 4-Step Visual Wizard
                    </p>
                </div>
            </Link>

            {/* DSML Discovery */}
            <Link
                href="/work/iq-plugin"
                className="group relative w-full md:w-1/2 h-[400px] md:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden bg-black border border-white/10 shadow-2xl block hover:scale-[1.02] transition-transform duration-400 ease-in-out"
            >
                {/* Background Video */}
                <video
                    src="/videos/iq-prototype-walkthrough.mp4"
                    autoPlay loop muted playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-70 blur-[2px] group-hover:opacity-100 group-hover:blur-0 transition-all duration-400 ease-in-out"
                />

                {/* Subtle gradient for text readability at bottom left */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/20 to-transparent pointer-events-none transition-opacity duration-400 ease-in-out group-hover:opacity-50" />

                {/* Content Overlay - Bottom Left */}
                <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-10 flex flex-col pointer-events-none">
                    <h3 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg mb-2">
                        DSML Discovery
                    </h3>
                    <p className="text-sm md:text-lg text-white/80 font-medium tracking-wide drop-shadow-md">
                        3 Siloed Tools → 1 Discovery Hub
                    </p>
                </div>
            </Link>
        </div>
    )
}

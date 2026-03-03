'use client'

import React from 'react'

interface SlideData {
    src: string
    alt: string
    caption?: string
}

interface AppleEndlessCarouselProps {
    slides: SlideData[]
}

export default function AppleEndlessCarousel({ slides }: AppleEndlessCarouselProps) {
    if (!slides || slides.length === 0) return null

    // Remove absolute duplicates just in case there are overlapping images passed in
    const uniqueSlides = Array.from(new Map(slides.map(slide => [slide.src, slide])).values());

    // Split slides into two rows for the Apple-style staggered effect
    const topRow = uniqueSlides.filter((_, i) => i % 2 === 0)
    const bottomRow = uniqueSlides.filter((_, i) => i % 2 !== 0)

    const Card = ({ slide }: { slide: SlideData }) => (
        <div className="w-[85vw] sm:w-[50vw] md:w-[45vw] lg:w-[35vw] shrink-0 flex flex-col gap-4 group-scope transition-transform duration-500 hover:scale-[1.02]">
            <img src={slide.src} alt={slide.alt} loading="lazy" className="w-full h-auto rounded-xl md:rounded-2xl border border-white/10 shadow-lg" />
            {slide.caption && (
                <p className="text-zinc-400 text-xs md:text-sm font-light leading-snug px-1">{slide.caption}</p>
            )}
        </div>
    )

    // Reusable Row Component for infinite marquee
    const MarqueeRow = ({ items, reverse = false, speed = 40 }: { items: SlideData[], reverse?: boolean, speed?: number }) => (
        <div className="flex overflow-hidden marquee-group w-[200vw] sm:w-[auto]">
            {/* Original Sequence */}
            <div
                className={`flex shrink-0 gap-4 md:gap-6 pr-4 md:pr-6 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
                style={{ animationDuration: `${speed}s` }}
            >
                {items.map((slide, i) => (
                    <Card key={`orig-${i}`} slide={slide} />
                ))}
            </div>
            {/* First Clone Seamless */}
            <div
                className={`flex shrink-0 gap-4 md:gap-6 pr-4 md:pr-6 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
                style={{ animationDuration: `${speed}s` }}
                aria-hidden="true"
            >
                {items.map((slide, i) => (
                    <Card key={`dup-${i}`} slide={slide} />
                ))}
            </div>
            {/* Second Clone For Widescreens */}
            <div
                className={`flex shrink-0 gap-4 md:gap-6 pr-4 md:pr-6 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
                style={{ animationDuration: `${speed}s` }}
                aria-hidden="true"
            >
                {items.map((slide, i) => (
                    <Card key={`dup2-${i}`} slide={slide} />
                ))}
            </div>
        </div>
    )

    return (
        <div className="w-full py-8 flex flex-col gap-4 md:gap-6 relative overflow-hidden group">
            <MarqueeRow items={topRow} speed={70} />
            <MarqueeRow items={bottomRow} reverse={false} speed={85} />

            <style jsx global>{`
                @keyframes marquee {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-100%); }
                }
                @keyframes marquee-reverse {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(100%); }
                }
                .animate-marquee {
                    animation: marquee linear infinite;
                }
                .animate-marquee-reverse {
                    /* Reverse shifts starting position so we don't jump on load */
                    animation: marquee-reverse linear infinite;
                    animation-direction: reverse;
                }
                
                /* Pause animation on hover anywhere in the carousel */
                .group:hover .animate-marquee,
                .group:hover .animate-marquee-reverse {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    )
}

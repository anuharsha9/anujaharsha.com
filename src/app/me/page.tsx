'use client'

import React, { useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { createPortal } from 'react-dom'
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence, animate as fmAnimate } from 'framer-motion'
import { articleLinks } from '@/data/home'
import ScrollGear from '@/components/ui/ScrollGear'
import { withHexAlpha } from '@/lib/color-utils'

/* ═══════════════════════════════════════════════════════════════════════════════
   CONSTANTS — All real content data
   ═══════════════════════════════════════════════════════════════════════════════ */

const HERO_VIDEO = '/videos/intro-video.mp4'
const HERO_TEXT = ['DESIGN', 'ENGINEER']

const EVOLUTION_VERSIONS = [
  {
    id: 'v1', label: 'Jan 2025', title: 'The Baseline',
    desc: 'Panic-built after team layoffs. Juggling a newborn and manual HTML/CSS.',
    tech: 'HTML • CSS • S3',
    video: '/videos/evolution/v1_web.mp4',
    keyLearning: '"Manual coding is too slow for modern iteration."',
    accent: 'var(--accent-teal)',
  },
  {
    id: 'v2', label: 'Nov 10', title: 'The Upgrade',
    desc: 'Post-layoff restart. "Black Pink" design. Fighting for traction.',
    tech: 'HTML • CSS • ChatGPT',
    video: '/videos/evolution/v2_web.mp4',
    keyLearning: '"AI is an accelerator, but without Architecture, it\'s just noise."',
    accent: 'var(--semantic-magenta-500)',
  },
  {
    id: 'v3', label: 'Nov 15', title: 'The Speedrun',
    desc: 'White/Pink Redesign. Built in 24 hours. First glimpse of high velocity.',
    tech: 'HTML • CSS • AIv1',
    video: '/videos/evolution/v3_web.mp4',
    keyLearning: '"Frameworks are not overhead; they are the scaffold for speed."',
    accent: 'var(--semantic-orange-vivid)',
  },
  {
    id: 'v4', label: 'Dec 1', title: 'The Architecture',
    desc: 'Next.js 14 + Git. Multi-agent orchestration for enterprise scalability.',
    tech: 'Next.js • Agents • AWS',
    video: '/videos/evolution/v4_web.mp4',
    keyLearning: '"Agents handle the build. The human focuses on Soul."',
    accent: 'var(--semantic-cyan-vivid)',
  },
  {
    id: 'v5', label: 'Dec 8', title: 'The Polish',
    desc: 'Refining the interaction layer. Achieving portfolio-market fit.',
    tech: 'Framer Motion • Vibe • UX',
    video: '/videos/evolution/v5_web.mp4',
    keyLearning: '"The final 10% of polish takes 50% of the effort."',
    accent: 'var(--semantic-purple-vivid)',
  },
]

const ORCHESTRATION_STACK = [
  { name: 'ChatGPT', role: 'Strategy', rotate: -3 },
  { name: 'Claude', role: 'Architecture', rotate: 2 },
  { name: 'Gemini', role: 'Polish', rotate: -1.5 },
  { name: 'Cursor', role: 'Build', rotate: 4 },
  { name: 'Antigravity', role: 'Logic', rotate: -2.5 },
  { name: 'AWS', role: 'Scale', rotate: 1.5 },
  { name: 'Next.js 16', role: 'Framework', rotate: -4 },
  { name: 'Framer Motion', role: 'Animation', rotate: 3 },
  { name: 'Tailwind', role: 'Style', rotate: -1 },
  { name: 'Figma', role: 'Design', rotate: 2.5 },
  { name: 'Git', role: 'Version Control', rotate: -3.5 },
  { name: 'TypeScript', role: 'Safety', rotate: 1 },
]

const POEM_STANZAS = [
  { lines: ['Opening my eyes to this beautiful world', 'I see the creator of my life,', 'Life gave me the gift of mother;', 'To be loved, nurtured, and cared for,'], gift: 'mother', giftLine: 2 },
  { lines: ['In the struggle to get up after a fall', 'I see the person who lifts me up,', 'Life gave me the gift of a father;', 'To be loved and feel secure,'], gift: 'father', giftLine: 2 },
  { lines: ["When I'm a blank canvas and lost", 'I see what helps me build my existence,', 'Life gave me the gift of a teacher;', "To guide me through it's path,"], gift: 'teacher', giftLine: 2 },
  { lines: ['Try to cope with the ups and downs of life', "I see the person who's always with me,", 'Life gave me the gift of a sister;', 'To share my happiness and sadness,'], gift: 'sister', giftLine: 2 },
  { lines: ["When love loses its meaning, and I'm fading", 'I see what helps me to hold on to it,', 'Life gave me the gift of motherhood;', 'To teach me the meaning of love,'], gift: 'motherhood', giftLine: 2 },
  { lines: ['In a world where everyone comes and goes alone', 'I see what helps me through this forsaken journey,', 'Life gave me the gift of a husband;', 'To have someone to belong to,'], gift: 'husband', giftLine: 2 },
  { lines: ['In the moments when I feel nothing is right', 'I see what brings me comfort,', 'Life gave me the gift of a friend;', 'To have a shoulder to cry on,'], gift: 'friend', giftLine: 2 },
  { lines: ['In the midst of all that is happening', 'I see a smile on my face, trying to push through,', 'Life gave me the gift of joy;', "To enjoy it's beauty and gifts,"], gift: 'joy', giftLine: 2 },
  { lines: ['When I start becoming scornful', 'I see what teaches me a lesson,', 'Life gave me the gift of pain;', 'To make me grounded and grateful,'], gift: 'pain', giftLine: 2 },
  { lines: ['When I go blind with my fantasies', 'I see what opens my eyes,', 'Life gave me the gift of loss;', 'To enlighten me of the world,'], gift: 'loss', giftLine: 2 },
  { lines: ['When agony and grief overwhelm me', 'I see what cuts through my bitterness,', 'Life gave me the gift of love;', 'To make me kind and benevolent,'], gift: 'love', giftLine: 2 },
  { lines: ['Where everything and everyone is just temporary', 'I see what helps me treasure the evanescent,', 'Life gave me the gift of art;', 'To be able to express myself.'], gift: 'art', giftLine: 2 },
]

const LIFE_PHOTOS = [
  { src: '/images/life/Bake4.jpg', label: 'Baking', alt: 'Pink Cake Patisserie' },
  { src: '/images/life/Painting1.jpg', label: 'Painting', alt: 'Canvas Art' },
  { src: '/images/life/family.jpeg', label: 'My World', alt: 'Family' },
  { src: '/images/life/Food1.jpeg', label: 'Cooking', alt: 'Culinary Arts' },
  { src: '/images/life/Food3.jpeg', label: 'Flavor', alt: 'Food Art' },
]

/* ═══════════════════════════════════════════════════════════════════════════════
   UTILITY: Touch detection
   ═══════════════════════════════════════════════════════════════════════════════ */
function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false)
  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])
  return isTouch
}

/* ═══════════════════════════════════════════════════════════════════════════════
   ACT 1: THE GLITCH PORTAL — Hero
   Desktop: Video plays full-screen, text acts as mask (video visible through letters).
   Mobile: Text rows shear left/right on scroll to reveal video.
   ═══════════════════════════════════════════════════════════════════════════════ */
function GlitchPortalHero() {
  const ref = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const [isWatching, setIsWatching] = useState(false)

  // Desktop: text explodes outward
  const textScale = useTransform(scrollYProgress, [0, 0.5], [1, 2.5])
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.6], [1, 0])

  // Mobile: shearing rows
  const row1X = useTransform(scrollYProgress, [0, 0.5], ['0%', '-60%'])
  const row2X = useTransform(scrollYProgress, [0, 0.5], ['0%', '60%'])

  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3], [0.6, 0])
  const videoScale = useTransform(scrollYProgress, [0, 0.7], [1.05, 1.2])

  // ── Watch-mode: smoothly animate overlays away, unmute video ──
  const watchMode = useMotionValue(0) // 0 = normal, 1 = watching
  const overlayFade = useTransform(watchMode, [0, 1], [1, 0])

  // Combined opacities: scroll-based × watch-mode fade
  const combinedTextOpacity = useTransform(
    [textOpacity, overlayFade],
    ([t, f]) => (t as number) * (f as number)
  )
  const combinedOverlayOpacity = useTransform(
    [overlayOpacity, overlayFade],
    ([o, f]) => (o as number) * (f as number)
  )

  // Enter / exit watch mode
  const enterWatchMode = useCallback(() => {
    setIsWatching(true)
    fmAnimate(watchMode, 1, { duration: 0.6, ease: [0.4, 0, 0.2, 1] })
    if (videoRef.current) {
      videoRef.current.muted = false
      videoRef.current.controls = true
      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => { })
    }
  }, [watchMode])

  const exitWatchMode = useCallback(() => {
    setIsWatching(false)
    fmAnimate(watchMode, 0, { duration: 0.6, ease: [0.4, 0, 0.2, 1] })
    if (videoRef.current) {
      videoRef.current.muted = true
      videoRef.current.controls = false
    }
  }, [watchMode])

  // Escape key to exit watch mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isWatching) exitWatchMode()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isWatching, exitWatchMode])

  // Lock body scroll when watching
  useEffect(() => {
    if (isWatching) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isWatching])

  return (
    <motion.section
      ref={ref}
      className="relative h-[200vh]"
      id="hero-glitch-portal"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Full-screen Video Background */}
        <motion.div className="absolute inset-0 z-0" style={{ scale: videoScale }}>
          <video
            ref={videoRef}
            autoPlay loop muted playsInline
            className="absolute inset-0 w-full h-full object-cover"
            src={HERO_VIDEO}
          />
        </motion.div>

        {/* Dark overlay that fades as you scroll */}
        <motion.div
          className="absolute inset-0 z-[1] bg-black"
          style={{ opacity: combinedOverlayOpacity }}
        />

        {/* DESKTOP: Text Mask — video visible through the letterforms */}
        <motion.div
          className="absolute inset-0 z-[2] hidden md:flex items-center justify-center will-change-transform"
          style={{ scale: textScale, opacity: combinedTextOpacity }}
        >
          <div className="relative">
            {HERO_TEXT.map((word, i) => (
              <h1
                key={word}
                className="font-black leading-[0.85] tracking-tighter select-none"
                style={{
                  fontSize: 'clamp(5rem, 18vw, 16rem)',
                  color: 'transparent',
                  WebkitTextStroke: '2px var(--overlay-white-15)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  backgroundColor: 'white',
                  mixBlendMode: 'difference',
                }}
              >
                {word}
              </h1>
            ))}
          </div>
        </motion.div>

        {/* MOBILE: Shearing text rows */}
        <div className="absolute inset-0 z-[2] flex md:hidden flex-col items-center justify-center will-change-transform">
          <motion.h1
            className="font-black text-[18vw] leading-[0.9] tracking-tighter text-white select-none"
            style={{ x: row1X, opacity: combinedTextOpacity, mixBlendMode: 'difference' }}
          >
            DESIGN
          </motion.h1>
          <motion.h1
            className="font-black text-[18vw] leading-[0.9] tracking-tighter text-white select-none"
            style={{ x: row2X, opacity: combinedTextOpacity, mixBlendMode: 'difference' }}
          >
            ENGINEER
          </motion.h1>
        </div>

        {/* Bottom info bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-[3] px-6 md:px-12 py-8"
          style={{ opacity: combinedTextOpacity }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] md:text-xs text-white/40 uppercase tracking-[0.2em] mb-1">
                Senior Product Designer · 13 Years
              </p>
              <p className="text-white/70 text-sm md:text-base max-w-md leading-relaxed">
                I specialize in untangling the most complex enterprise systems through code-first architecture.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Watch My Intro — prominent CTA */}
              <button
                onClick={enterWatchMode}
                className="group relative inline-flex items-center gap-2.5 px-5 py-2.5 bg-white text-black text-xs font-mono uppercase tracking-widest hover:bg-white/90 transition-all duration-300 cursor-pointer"
                id="watch-intro-btn"
              >
                {/* Pulsing ring behind button */}
                <span className="absolute inset-0 rounded-[1px] animate-[ping_2.5s_ease-in-out_infinite] bg-white/20 pointer-events-none" />

                {/* Play icon */}
                <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span className="whitespace-nowrap">Watch My Intro</span>
              </button>

              <a
                href="mailto:anujanimmagadda@gmail.com"
                className="group inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 text-white/80 text-xs font-mono uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
              >
                <span>Let&apos;s Talk</span>
                <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3]"
          style={{ opacity: combinedTextOpacity }}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/40 to-white/0" />
        </motion.div>

        {/* ── Watch-mode close button ── */}
        <AnimatePresence>
          {isWatching && (
            <motion.button
              className="absolute top-6 right-6 z-[10] w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors cursor-pointer"
              onClick={exitWatchMode}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.3 }}
              aria-label="Close video"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>


    </motion.section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   ACT 2: THE TIME TUNNEL — Evolution
   Desktop: Pinned z-axis scroll. Cards fly towards camera.
   Mobile: Horizontal snap carousel with background color flicker.
   ═══════════════════════════════════════════════════════════════════════════════ */
function TimeTunnel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [mobileIndex, setMobileIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Desktop: map scroll progress to active card index AND fractional progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      setProgress(v)
      const count = EVOLUTION_VERSIONS.length
      // Map progress [0, 1] to card index, clamping at the last card
      const idx = Math.min(Math.floor(v * count), count - 1)
      setActiveIndex(idx)
    })
    return unsubscribe
  }, [scrollYProgress])

  // Mobile snap scroll handler
  const handleMobileScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const cardWidth = el.offsetWidth * 0.85
    const idx = Math.round(el.scrollLeft / cardWidth)
    setMobileIndex(Math.min(idx, EVOLUTION_VERSIONS.length - 1))
  }, [])

  const mobileAccent = EVOLUTION_VERSIONS[mobileIndex]?.accent || 'var(--accent-teal)'

  // Compute per-card visual properties based on continuous scroll progress
  const getCardStyle = (i: number) => {
    const count = EVOLUTION_VERSIONS.length
    // Each card occupies a 1/count segment of the total scroll
    const cardStart = i / count
    const cardEnd = (i + 1) / count
    const cardMid = (cardStart + cardEnd) / 2

    // How far through this card's segment we are (-0.5 to 0.5 centered at peak)
    let distFromCenter = (progress - cardMid) * count

    // Edge clamping: first card should be fully visible at scroll start (no fade-in),
    // last card should hold until scroll end (no fade-out)
    if (i === 0 && distFromCenter < 0) distFromCenter = 0
    if (i === count - 1 && distFromCenter > 0) distFromCenter = 0

    // Hold zone: card stays at full opacity for the middle portion of its segment.
    // |-- fade-in --|---- hold (full opacity) ----|-- fade-out --|
    const holdRadius = 0.25 // card is fully opaque when |distFromCenter| < this
    const absDist = Math.abs(distFromCenter)
    let opacity: number
    if (absDist <= holdRadius) {
      opacity = 1 // fully visible — user can read comfortably
    } else {
      // fade region: from holdRadius to 0.5 (edge of segment)
      const fadeRange = 0.5 - holdRadius
      opacity = Math.max(0, 1 - (absDist - holdRadius) / fadeRange)
    }

    // Only apply transforms once past the hold zone
    const effectiveDist = absDist <= holdRadius ? 0 : Math.sign(distFromCenter) * (absDist - holdRadius)

    // Scale: active = 1, past cards grow (flew past camera), future cards shrink (approaching)
    const scale = 1 + effectiveDist * 1.2

    // Z-depth: past = behind camera, future = in front approaching
    const z = effectiveDist * -300

    // Slight tilt for drama
    const rotateX = effectiveDist * -15

    return { opacity, scale: Math.max(0.3, Math.min(2, scale)), z, rotateX }
  }

  return (
    <>
      {/* ─── DESKTOP: Z-Axis Tunnel ─── */}
      <div ref={containerRef} className="hidden md:block relative" style={{ height: `${EVOLUTION_VERSIONS.length * 200}vh` }}>
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-black"
          style={{ perspective: '1200px', perspectiveOrigin: '50% 50%' }}
        >
          {/* Tunnel lines */}
          <div className="absolute inset-0 z-0" style={{
            backgroundImage: `
              linear-gradient(var(--overlay-white-03) 1px, transparent 1px),
              linear-gradient(90deg, var(--overlay-white-03) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }} />

          {/* Cards stacked in z-space */}
          <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
            {EVOLUTION_VERSIONS.map((v, i) => {
              const style = getCardStyle(i)
              const isVisible = style.opacity > 0.01

              return (
                <div
                  key={v.id}
                  className="absolute inset-0 flex items-center justify-center p-8"
                  style={{
                    willChange: 'transform, opacity',
                    transform: `translateZ(${style.z}px) scale(${style.scale}) rotateX(${style.rotateX}deg)`,
                    opacity: style.opacity,
                    pointerEvents: isVisible ? 'auto' : 'none',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className="w-full max-w-4xl">
                    {/* Version badge */}
                    <div className="flex items-center gap-4 mb-6">
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">{v.label}</span>
                      <div className="flex-1 h-[1px]" style={{ background: `linear-gradient(90deg, ${withHexAlpha(v.accent, '40')}, transparent)` }} />
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: v.accent }}>{v.tech}</span>
                    </div>

                    {/* Title */}
                    <h2 className="font-black text-5xl lg:text-7xl text-white leading-[0.9] tracking-tight mb-4">{v.title}</h2>
                    <p className="text-white/50 text-lg max-w-lg leading-relaxed mb-8">{v.desc}</p>

                    {/* Video preview */}
                    <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10">
                      <video
                        ref={(el) => {
                          if (el) {
                            if (i === activeIndex) {
                              el.play().catch(() => { })
                            } else {
                              el.pause()
                            }
                          }
                        }}
                        src={v.video}
                        muted playsInline loop
                        className="w-full h-full object-contain bg-black"
                      />
                      {/* Scanline overlay */}
                      <div className="absolute inset-0 pointer-events-none opacity-10"
                        style={{
                          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, var(--overlay-black-30) 2px, var(--overlay-black-30) 4px)',
                        }}
                      />
                    </div>

                    {/* Key learning */}
                    <div className="mt-6 flex items-start gap-3">
                      <div className="w-[2px] h-8 shrink-0 rounded-full" style={{ backgroundColor: v.accent }} />
                      <p className="text-white/40 text-sm italic font-light">{v.keyLearning}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Progress dots */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
            {EVOLUTION_VERSIONS.map((v, i) => (
              <div
                key={v.id}
                className="w-2 h-2 rounded-full transition-all duration-500"
                style={{
                  backgroundColor: i === activeIndex ? v.accent : 'var(--overlay-white-15)',
                  transform: i === activeIndex ? 'scale(1.5)' : 'scale(1)',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ─── MOBILE: Horizontal Snap Carousel ─── */}
      <div className="block md:hidden relative overflow-hidden transition-colors duration-500" style={{ backgroundColor: mobileIndex % 2 === 0 ? 'var(--bg-monitor)' : 'var(--surface-charcoal-950)' }}>
        {/* Background accent pulse */}
        <div className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(circle at 50% 50%, ${withHexAlpha(mobileAccent, '15')}, transparent 70%)` }}
        />

        <div className="py-12 px-4">
          <div className="flex items-center gap-3 mb-6 px-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">Evolution Log</span>
            <div className="flex-1 h-[1px] bg-white/10" />
            <span className="font-mono text-[10px] text-white/30">{mobileIndex + 1}/{EVOLUTION_VERSIONS.length}</span>
          </div>

          <div
            ref={scrollContainerRef}
            onScroll={handleMobileScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-4 px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {EVOLUTION_VERSIONS.map((v, i) => (
              <div
                key={v.id}
                className="snap-center flex-shrink-0"
                style={{ width: '85vw' }}
              >
                <div className="rounded-xl border border-white/10 overflow-hidden bg-black/50 p-1">
                  {/* Video */}
                  <div className="relative aspect-video rounded-lg overflow-hidden mb-4">
                    <video
                      src={v.video}
                      autoPlay muted playsInline loop
                      className="w-full h-full object-contain bg-black"
                    />
                    <div className="absolute inset-0 pointer-events-none opacity-10"
                      style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, var(--overlay-black-30) 2px, var(--overlay-black-30) 4px)' }}
                    />
                  </div>

                  <div className="px-3 pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">{v.label}</span>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full border border-white/10 text-white/40">{v.tech}</span>
                    </div>
                    <h3 className="font-black text-xl text-white leading-tight mb-1">{v.title}</h3>
                    <p className="text-white/40 text-xs leading-relaxed mb-3">{v.desc}</p>
                    <div className="flex items-start gap-2">
                      <div className="w-[2px] h-6 shrink-0 rounded-full" style={{ backgroundColor: v.accent }} />
                      <p className="text-white/30 text-[11px] italic">{v.keyLearning}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Snap dots */}
          <div className="flex justify-center gap-2 mt-4">
            {EVOLUTION_VERSIONS.map((v, i) => (
              <div
                key={v.id}
                className="h-1 rounded-full transition-all duration-500"
                style={{
                  width: i === mobileIndex ? 24 : 8,
                  backgroundColor: i === mobileIndex ? v.accent : 'var(--overlay-white-15)',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   ACT 3: THE FLOATING SHARDS — Orchestration Stack
   Broken glass layout. Cards randomly rotated.
   Desktop: Mouse parallax. Mobile: Gentle auto-float.
   ═══════════════════════════════════════════════════════════════════════════════ */
function FloatingShards() {
  const isTouch = useIsTouchDevice()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isTouch) return
    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window
    mouseX.set((clientX - innerWidth / 2) / innerWidth * 30)
    mouseY.set((clientY - innerHeight / 2) / innerHeight * 30)
  }, [isTouch, mouseX, mouseY])

  return (
    <section
      className="relative py-24 md:py-32 bg-black overflow-hidden"
      onMouseMove={handleMouseMove}
      id="orchestration-shards"
    >
      {/* Section label */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 mb-16">
        <div className="flex items-center gap-4">
          <h2 className="font-black text-3xl md:text-5xl text-white tracking-tight">The System</h2>
          <div className="flex-1 h-[1px] bg-white/10" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/20">Orchestration Stack</span>
        </div>
        <p className="text-white/30 text-sm md:text-base mt-4 max-w-lg">
          1 Architect. 6 AI Agents. A relentless product-design system.
        </p>
      </div>

      {/* Shard Grid */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {ORCHESTRATION_STACK.map((tool, i) => (
            <motion.div
              key={tool.name}
              className="group relative"
              initial={{ opacity: 0, y: 40, rotate: tool.rotate }}
              whileInView={{ opacity: 1, y: 0, rotate: tool.rotate }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              style={isTouch ? {} : {
                x: smoothX,
                y: smoothY,
              }}
            >
              <motion.div
                whileHover={isTouch ? {} : { rotate: 0, scale: 1.08, z: 20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="relative bg-white/[0.03] border border-white/[0.08] rounded-lg p-5 md:p-6
                           hover:bg-white/[0.06] hover:border-white/[0.15]
                           transition-colors duration-300 cursor-default"
              >
                {/* Glow dot */}
                <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-[var(--accent-teal)] opacity-0 group-hover:opacity-80 transition-opacity" />

                <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-white/20 mb-2">
                  {tool.role}
                </span>
                <span className="block font-bold text-sm md:text-base text-white/80 group-hover:text-white transition-colors">
                  {tool.name}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Capability Cards */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 mt-16 md:mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {[
            { label: 'Velocity', title: '1 Architect. 6 Weeks.', desc: 'Deployed MVP in 7 days. 5 full architectural pivots. I don\'t get stuck; I deliver.' },
            { label: 'Modernization', title: '13 Years Untangled.', desc: 'Enterprise-scale digital transformation. Bridging legacy systems with modern AI/ML UX.' },
            { label: 'Bridge', title: 'Product Design.', desc: 'Custom Design Token system for pixel-perfect consistency across a multi-agent automated build.' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="border border-white/[0.06] rounded-lg p-6 md:p-8 bg-white/[0.02]"
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--accent-teal)]/60 block mb-3">{item.label}</span>
              <h3 className="font-bold text-lg text-white mb-2">{item.title}</h3>
              <p className="text-white/30 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   ACT 4: THE DUALITY — Writing (Cinematic Poetry)
   Preview: First stanza fades into void. "OPEN ARTIFACT" trigger.
   Focus: Full-screen immersive poem with kinetic typography.
   ═══════════════════════════════════════════════════════════════════════════════ */
function DualityWriting() {
  const [isPoemExpanded, setIsPoemExpanded] = useState(false)
  const [isButtonHovered, setIsButtonHovered] = useState(false)

  // Lock scroll when poem is expanded
  useEffect(() => {
    if (isPoemExpanded) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isPoemExpanded])

  // Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPoemExpanded) setIsPoemExpanded(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isPoemExpanded])

  const firstStanza = POEM_STANZAS[0]

  return (
    <section className="relative" id="writing-duality">
      {/* ═══════ PREVIEW STATE ═══════ */}
      <AnimatePresence>
        {!isPoemExpanded && (
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 min-h-screen"
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* ─── LEFT: The Poem as Graphic Art ─── */}
            <div className="relative bg-black text-white overflow-hidden flex flex-col justify-center items-center min-h-screen px-8 md:px-16 lg:px-20 py-20">
              {/* Decorative vertical line */}
              <div className="absolute top-0 right-0 w-[1px] h-full bg-white/[0.06] hidden lg:block" />

              {/* ─── WATERMARK: Giant faint "01" for visual mass ─── */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
                aria-hidden="true"
              >
                <span
                  className="font-mono font-black"
                  style={{
                    fontSize: 'clamp(300px, 40vw, 500px)',
                    lineHeight: 1,
                    color: 'var(--overlay-white-025)',
                    letterSpacing: '-0.05em',
                  }}
                >
                  01
                </span>
              </div>

              {/* Content — vertically centered */}
              <div className="relative z-10 max-w-lg w-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.8 }}
                  className="mb-10 md:mb-14"
                >
                  <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/20 block mb-4">Poetry</span>
                  <h2
                    className="tracking-tight mb-3"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: 'clamp(3.2rem, 6vw, 5rem)',
                      fontWeight: 200,
                      lineHeight: 1.05,
                      color: 'var(--overlay-white-90)',
                    }}
                  >
                    Gifts from Life
                  </h2>
                  <p className="text-white/20 text-xs font-mono uppercase tracking-[0.25em]">— Anuja Harsha</p>
                </motion.div>

                {/* First stanza preview — Pull Quote scale with fade mask */}
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  <div
                    className="relative"
                    style={{
                      maskImage: 'linear-gradient(to bottom, white 30%, white 55%, transparent 100%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, white 30%, white 55%, transparent 100%)',
                    }}
                  >
                    {firstStanza.lines.map((line, li) => (
                      <p
                        key={li}
                        className="leading-[2] transition-colors duration-500"
                        style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontSize: li === firstStanza.giftLine
                            ? 'clamp(1.4rem, 2.8vw, 1.8rem)'
                            : 'clamp(1.2rem, 2.4vw, 1.6rem)',
                          color: li === firstStanza.giftLine ? 'var(--accent-teal)' : 'var(--overlay-white-45)',
                          fontWeight: li === firstStanza.giftLine ? 500 : 300,
                          fontStyle: 'italic',
                          letterSpacing: '0.01em',
                        }}
                      >
                        {line}
                      </p>
                    ))}
                    {/* Ghost lines to extend the fade */}
                    <p
                      className="leading-[2] text-white/12"
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: 'clamp(1.2rem, 2.4vw, 1.6rem)',
                        fontStyle: 'italic',
                        fontWeight: 300,
                      }}
                    >
                      {POEM_STANZAS[1].lines[0]}
                    </p>
                    <p
                      className="leading-[2] text-white/6"
                      style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: 'clamp(1.2rem, 2.4vw, 1.6rem)',
                        fontStyle: 'italic',
                        fontWeight: 300,
                      }}
                    >
                      {POEM_STANZAS[1].lines[1]}
                    </p>
                  </div>

                  {/* OPEN ARTIFACT trigger — Glowing outline button */}
                  <div className="mt-14">
                    <button
                      onClick={() => setIsPoemExpanded(true)}
                      onMouseEnter={() => setIsButtonHovered(true)}
                      onMouseLeave={() => setIsButtonHovered(false)}
                      className="group relative cursor-pointer"
                      id="open-artifact-btn"
                    >
                      {/* Glow backdrop */}
                      <motion.div
                        className="absolute -inset-4 rounded-xl pointer-events-none"
                        animate={{
                          opacity: isButtonHovered ? 0.2 : 0,
                          scale: isButtonHovered ? 1.05 : 1,
                        }}
                        transition={{ duration: 0.4 }}
                        style={{ background: 'radial-gradient(circle, var(--accent-teal) 0%, transparent 70%)' }}
                      />

                      {/* Outline pill button */}
                      <motion.div
                        className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full border transition-colors duration-300"
                        animate={{
                          borderColor: isButtonHovered ? 'var(--accent-teal)' : 'var(--overlay-white-10)',
                          boxShadow: isButtonHovered
                            ? '0 0 30px var(--overlay-accent-20), inset 0 0 20px var(--overlay-accent-05)'
                            : '0 0 0px transparent',
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg className="w-3.5 h-3.5 text-white/30 group-hover:text-[var(--accent-teal)] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                        </svg>
                        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30 group-hover:text-[var(--accent-teal)] transition-colors duration-300">
                          Open Artifact
                        </span>
                      </motion.div>
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* ─── RIGHT: Articles — Clean & Spaced ─── */}
            <div className="relative bg-[var(--surface-charcoal-950)] text-white flex flex-col justify-center px-6 md:px-12 lg:px-16 py-20 min-h-screen">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-14"
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-[var(--accent-teal)]/40 block mb-2">Thought Leadership</span>
                <a
                  href="https://medium.com/@anu.anuja"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-3xl md:text-4xl font-bold tracking-tight hover:text-[var(--accent-teal)] transition-colors"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Medium_Articles
                </a>
              </motion.div>

              {/* Show only first 4 articles for visual balance */}
              <div className="space-y-2">
                {articleLinks.slice(0, 4).map((article, i) => (
                  <motion.a
                    key={article.title}
                    href={article.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="group flex items-start gap-4 py-5 border-b border-white/[0.06] last:border-b-0 hover:bg-white/[0.02] -mx-4 px-4 rounded-lg transition-colors"
                  >
                    <span className="flex-shrink-0 font-mono text-[11px] text-white/15 mt-1.5 group-hover:text-[var(--accent-teal)] transition-colors">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 min-w-0">
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--accent-teal)]/30 block mb-2">
                        {article.topic}
                      </span>
                      <h3
                        className="text-white/70 text-base font-medium leading-relaxed group-hover:text-[var(--accent-teal)] transition-colors line-clamp-2"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {article.title}
                      </h3>
                      <span className="mt-2.5 text-[9px] text-white/15 font-mono uppercase tracking-wider block">
                        {article.readTime || '5 min'} read
                      </span>
                    </div>
                    <div className="flex-shrink-0 mt-3 opacity-0 group-hover:opacity-100 transition-all translate-x-0 group-hover:translate-x-1">
                      <svg className="w-3 h-3 text-[var(--accent-teal)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                      </svg>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* View All link */}
              {articleLinks.length > 4 && (
                <motion.a
                  href="https://medium.com/@anu.anuja"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-10 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/20 hover:text-[var(--accent-teal)] transition-colors duration-300"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  View all articles on Medium
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </motion.a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════ FOCUS STATE — Full-Screen Immersive Poem (Portal) ═══════ */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isPoemExpanded && (
            <motion.div
              className="fixed inset-0 z-[9999] bg-black overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Ambient glow */}
              <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full"
                  style={{
                    background: 'radial-gradient(circle, var(--overlay-accent-06) 0%, transparent 60%)',
                    filter: 'blur(100px)',
                  }}
                />
              </div>

              {/* Close button */}
              <motion.button
                className="fixed top-6 right-6 z-[10000] w-10 h-10 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
                onClick={() => setIsPoemExpanded(false)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.4 }}
                aria-label="Close poem"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              {/* Poem content — Two Column Layout */}
              <div className="relative z-10 min-h-screen flex flex-col items-center justify-start py-20 md:py-28 px-6 md:px-12">
                {/* Title */}
                <motion.div
                  className="text-center mb-16 md:mb-20"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-[var(--accent-teal)]/40 block mb-3">The Artifact</span>
                  <h2
                    className="tracking-tight text-white mb-3"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                      fontWeight: 200,
                      lineHeight: 1.1,
                    }}
                  >
                    Gifts from Life
                  </h2>
                  <p className="text-white/15 text-xs font-mono uppercase tracking-[0.3em]">— Anuja Harsha</p>
                </motion.div>

                {/* All Stanzas — Two Column Grid */}
                <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-x-16 lg:gap-x-24 gap-y-10 md:gap-y-14">
                  {POEM_STANZAS.map((stanza, si) => (
                    <motion.div
                      key={si}
                      className="relative pl-8 md:pl-10"
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.9,
                        delay: 0.4 + si * 0.08,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {/* Stanza number whisper */}
                      <motion.span
                        className="absolute left-0 top-0 font-mono text-[9px] text-white/[0.08] select-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 + si * 0.08 }}
                      >
                        {String(si + 1).padStart(2, '0')}
                      </motion.span>

                      {stanza.lines.map((line, li) => (
                        <motion.p
                          key={li}
                          className="leading-[2.2] md:leading-[2.4]"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.7,
                            delay: 0.5 + si * 0.08 + li * 0.05,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          style={{
                            fontFamily: "'Playfair Display', Georgia, serif",
                            fontSize: li === stanza.giftLine
                              ? 'clamp(14px, 1.6vw, 18px)'
                              : 'clamp(13px, 1.4vw, 16px)',
                            color: li === stanza.giftLine ? 'var(--accent-teal)' : 'var(--overlay-white-45)',
                            fontWeight: li === stanza.giftLine ? 500 : 400,
                            fontStyle: 'italic',
                            letterSpacing: '0.01em',
                          }}
                        >
                          {line}
                        </motion.p>
                      ))}
                    </motion.div>
                  ))}
                </div>

                {/* Bottom return link */}
                <motion.button
                  className="mt-20 md:mt-28 font-mono text-[10px] uppercase tracking-[0.3em] text-white/15 hover:text-[var(--accent-teal)] transition-colors duration-300 cursor-pointer flex items-center gap-2"
                  onClick={() => setIsPoemExpanded(false)}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                  </svg>
                  Return to Terminal
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   ACT 5: THE CHAOS CLOUD — Life Photos
   Desktop: Draggable canvas with scattered photos.
   Mobile: Auto-floating grid. Tap = glitch/scale animation.
   ═══════════════════════════════════════════════════════════════════════════════ */
function ChaosCloud() {
  const isTouch = useIsTouchDevice()
  const [tappedIndex, setTappedIndex] = useState<number | null>(null)

  // Random but deterministic positions for desktop
  const positions = [
    { x: '10%', y: '15%', w: 340, rotate: -4, z: 3 },
    { x: '55%', y: '8%', w: 220, rotate: 3, z: 1 },
    { x: '35%', y: '55%', w: 260, rotate: -2, z: 4 },
    { x: '70%', y: '45%', w: 280, rotate: 5, z: 2 },
    { x: '15%', y: '65%', w: 200, rotate: -6, z: 5 },
  ]

  const handleTap = (i: number) => {
    setTappedIndex(i)
    setTimeout(() => setTappedIndex(null), 600)
  }

  return (
    <section className="relative bg-black py-16 md:py-0 overflow-hidden" id="life-chaos-cloud">
      {/* Section Header */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 md:pt-24 mb-8 md:mb-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-black text-3xl md:text-5xl text-white tracking-tight">Life Outside the Terminal</h2>
          <p className="text-white/20 text-sm mt-3 max-w-md">
            Parent, baker, painter, poet. The raw material that shapes my design thinking.
          </p>
        </motion.div>
      </div>

      {/* ─── DESKTOP: Draggable Canvas ─── */}
      <div className="hidden md:block relative h-[700px] w-full cursor-grab active:cursor-grabbing">
        {LIFE_PHOTOS.map((photo, i) => {
          const pos = positions[i]
          return (
            <motion.div
              key={photo.label}
              className="absolute group"
              drag
              dragMomentum={false}
              dragElastic={0.1}
              initial={{ opacity: 0, scale: 0.8, rotate: pos.rotate }}
              whileInView={{ opacity: 1, scale: 1, rotate: pos.rotate }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.12 }}
              whileHover={{ rotate: 0, scale: 1.05, zIndex: 20 }}
              style={{
                left: pos.x,
                top: pos.y,
                width: pos.w,
                zIndex: pos.z,
                willChange: 'transform',
              }}
            >
              <div className="relative rounded-lg overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={0}
                  height={0}
                  sizes="340px"
                  style={{ width: '100%', height: 'auto' }}
                  className="block"
                  draggable={false}
                />
                {/* Label on hover */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/70">{photo.label}</span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* ─── MOBILE: Auto-floating grid with tap-to-glitch ─── */}
      <div className="block md:hidden px-4">
        <div className="grid grid-cols-2 gap-3">
          {LIFE_PHOTOS.map((photo, i) => {
            const isTapped = tappedIndex === i
            return (
              <motion.div
                key={photo.label}
                className={`relative rounded-lg overflow-hidden border border-white/10 ${i === 0 ? 'col-span-2 aspect-[16/10]' : 'aspect-square'}`}
                onClick={() => handleTap(i)}
                animate={isTapped
                  ? { scale: [1, 1.1, 0.95, 1.02, 1], rotate: [0, 2, -2, 1, 0] }
                  : { y: [0, -4, 0] }
                }
                transition={isTapped
                  ? { duration: 0.5, ease: 'easeOut' }
                  : { duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }
                }
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 px-3 py-2">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-white/60">{photo.label}</span>
                </div>
                {/* Glitch overlay on tap */}
                <AnimatePresence>
                  {isTapped && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.5, 0] }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-[var(--accent-teal)]/20 mix-blend-overlay pointer-events-none"
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   ACT 6: THE CONNECTION — Dramatic dark close
   ═══════════════════════════════════════════════════════════════════════════════ */
function ConnectionClose() {
  return (
    <section className="relative bg-black py-24 md:py-32 overflow-hidden" id="connect">
      {/* Subtle glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, var(--overlay-accent-40) 0%, transparent 60%)', filter: 'blur(80px)' }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
        {/* Line decoration */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-12 h-[1px] bg-white/10" />
          <div className="w-1.5 h-1.5 bg-[var(--accent-teal)] rotate-45 opacity-40" />
          <div className="w-12 h-[1px] bg-white/10" />
        </motion.div>

        {/* Heading */}
        <div className="overflow-hidden mb-6">
          <motion.h2
            className="font-black text-5xl md:text-7xl lg:text-8xl text-white leading-[0.9] tracking-tight"
            initial={{ y: '100%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            Let&apos;s connect.
          </motion.h2>
        </div>

        <motion.p
          className="text-white/30 text-base md:text-lg max-w-md mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Always open to meaningful conversations about design, engineering, and everything in between.
        </motion.p>

        {/* Links */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {[
            { label: 'anujanimmagadda@gmail.com', href: 'mailto:anujanimmagadda@gmail.com' },
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/anu159', external: true },
            { label: '+1 781-354-7394', href: 'tel:+17813547394' },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="group font-mono text-xs text-white/40 hover:text-[var(--accent-teal)] transition-colors duration-300 min-h-[44px] flex items-center gap-2"
            >
              {link.label}
              <svg className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
              </svg>
            </a>
          ))}
        </motion.div>

        {/* Signature */}
        <motion.p
          className="text-white/10 text-[10px] font-mono uppercase tracking-widest"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Designed by Anuja. Orchestrated via Multi-Agent AI.
        </motion.p>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════════
   PAGE ASSEMBLY
   ═══════════════════════════════════════════════════════════════════════════════ */
export default function AboutPage() {
  return (
    <div className="bg-black relative" style={{ overflowX: 'clip' }}>
      <GlitchPortalHero />
      <DualityWriting />
      <ChaosCloud />
      <ConnectionClose />
      <ScrollGear />
    </div>
  )
}

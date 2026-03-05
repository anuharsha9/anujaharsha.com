'use client'

import React, { useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { createPortal } from 'react-dom'
import { motion, useScroll, useTransform, useMotionValue, AnimatePresence, animate as fmAnimate } from 'framer-motion'
import { articleLinks } from '@/data/home'
import ScrollGear from '@/components/ui/ScrollGear'


/* ═══════════════════════════════════════════════════════════════════════════════
   CONSTANTS — All real content data
   ═══════════════════════════════════════════════════════════════════════════════ */

const HERO_VIDEO = '/videos/intro-video.mp4'
const HERO_TEXT = ['PRODUCT', 'DESIGNER']



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
          <h1 className="relative">
            {HERO_TEXT.map((word) => (
              <span
                key={word}
                className="block font-black leading-[0.85] tracking-tighter select-none"
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
              </span>
            ))}
          </h1>
        </motion.div>

        {/* MOBILE: Shearing text rows */}
        <div className="absolute inset-0 z-[2] flex md:hidden flex-col items-center justify-center will-change-transform" aria-hidden="true">
          <motion.span
            className="block font-black text-[18vw] leading-[0.9] tracking-tighter text-white select-none"
            style={{ x: row1X, opacity: combinedTextOpacity, mixBlendMode: 'difference' }}
          >
            PRODUCT
          </motion.span>
          <motion.span
            className="block font-black text-[18vw] leading-[0.9] tracking-tighter text-white select-none"
            style={{ x: row2X, opacity: combinedTextOpacity, mixBlendMode: 'difference' }}
          >
            DESIGNER
          </motion.span>
        </div>

        {/* Bottom info bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-[3] px-6 md:px-12 py-8"
          style={{ opacity: combinedTextOpacity }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] md:text-xs text-zinc-600 uppercase tracking-[0.2em] mb-1">
                Senior Product Designer · 13 Years
              </p>
              <p className="text-zinc-400 text-sm md:text-base max-w-md leading-relaxed">
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
                className="group inline-flex items-center gap-2 px-5 py-2.5 border border-white/20 text-zinc-200 text-xs font-mono uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
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


              {/* Content — vertically centered */}
              <div className="relative z-10 max-w-lg w-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.8 }}
                  className="mb-10 md:mb-14"
                >
                  <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-600 block mb-4">Poetry</span>
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
                  <p className="text-zinc-600 text-xs font-mono uppercase tracking-[0.25em]">— Anuja Harsha</p>
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
                      className="leading-[2] text-zinc-800"
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
                      className="leading-[2] text-zinc-800"
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
                        <svg className="w-3.5 h-3.5 text-zinc-600 group-hover:text-[var(--accent-teal)] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                        </svg>
                        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-600 group-hover:text-[var(--accent-teal)] transition-colors duration-300">
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
                    <span className="flex-shrink-0 font-mono text-[11px] text-zinc-800 mt-1.5 group-hover:text-[var(--accent-teal)] transition-colors">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 min-w-0">
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--accent-teal)]/30 block mb-2">
                        {article.topic}
                      </span>
                      <h3
                        className="text-zinc-400 text-base font-medium leading-relaxed group-hover:text-[var(--accent-teal)] transition-colors line-clamp-2"
                        style={{ fontFamily: "'JetBrains Mono', monospace" }}
                      >
                        {article.title}
                      </h3>
                      <span className="mt-2.5 text-[9px] text-zinc-800 font-mono uppercase tracking-wider block">
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
                  className="mt-10 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-800 hover:text-[var(--accent-teal)] transition-colors duration-300"
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
                className="fixed top-6 right-6 z-[10000] w-10 h-10 flex items-center justify-center rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-zinc-600 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
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
                  <p className="text-zinc-800 text-xs font-mono uppercase tracking-[0.3em]">— Anuja Harsha</p>
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
                  className="mt-20 md:mt-28 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-800 hover:text-[var(--accent-teal)] transition-colors duration-300 cursor-pointer flex items-center gap-2"
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
function LifeGallery() {
  return (
    <section className="relative bg-black py-20 md:py-28 overflow-hidden" id="life-gallery">
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, var(--overlay-accent-06) 0%, transparent 70%)', filter: 'blur(100px)' }}
        />
      </div>

      {/* Section Header */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-600">Beyond Work</span>
            <div className="flex-1 h-[1px] bg-white/[0.06]" />
          </div>
          <h2 className="font-black text-3xl md:text-5xl text-white tracking-tight">Life Outside the Terminal</h2>
          <p className="text-zinc-600 text-sm md:text-base mt-3 max-w-lg leading-relaxed">
            Parent, baker, painter, poet. The raw material that shapes my design thinking.
          </p>
        </motion.div>
      </div>

      {/* ─── Bento Grid Gallery ─── */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-4 auto-rows-[160px] md:auto-rows-[200px]">
          {LIFE_PHOTOS.map((photo, i) => {
            // Bento sizing: first image spans wide, others vary
            const spanClasses = [
              'col-span-2 md:col-span-7 row-span-2',      // Baking — hero card
              'col-span-1 md:col-span-5 row-span-2',      // Painting — tall right
              'col-span-2 md:col-span-4 row-span-1',      // Family — wide bottom-left
              'col-span-1 md:col-span-4 row-span-1',      // Cooking — square center
              'col-span-1 md:col-span-4 row-span-1',      // Flavor — square right
            ][i]

            return (
              <motion.div
                key={photo.label}
                className={`relative group rounded-xl overflow-hidden ${spanClasses}`}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Image with cinematic treatment */}
                <div className="absolute inset-0 transition-all duration-700 ease-out"
                  style={{ filter: 'saturate(0.4) brightness(0.7)' }}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Hover: restore full color */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Gradient overlay for text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent z-[1]" />

                {/* Border */}
                <div className="absolute inset-0 rounded-xl border border-white/[0.06] group-hover:border-white/[0.12] transition-colors duration-500 z-[2]" />

                {/* Label */}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-[3]">
                  <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-zinc-600 group-hover:text-zinc-400 transition-colors duration-500">
                    {photo.label}
                  </span>
                </div>
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
    <section className="relative bg-black py-20 md:py-28 overflow-hidden" id="connect">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, var(--overlay-accent-06) 0%, transparent 70%)', filter: 'blur(100px)' }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-4 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex-1 h-[1px] bg-white/[0.06]" />
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-600">Say Hello</span>
          <div className="w-1.5 h-1.5 bg-[var(--accent-teal)] rotate-45 opacity-40" />
          <div className="flex-1 h-[1px] bg-white/[0.06]" />
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
          className="text-zinc-500 text-base md:text-lg max-w-md mx-auto mb-14 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Whether it&apos;s about design, art, baking, or just life — I&apos;d love to hear from you.
        </motion.p>

        {/* Clean inline links */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <a href="mailto:anujanimmagadda@gmail.com"
            className="group inline-flex items-center gap-2.5 text-zinc-600 hover:text-[var(--accent-teal)] transition-colors duration-300">
            <svg className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <span className="font-mono text-xs tracking-wide">anujanimmagadda@gmail.com</span>
          </a>

          <a href="https://www.linkedin.com/in/anu159" target="_blank" rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 text-zinc-600 hover:text-[var(--accent-teal)] transition-colors duration-300">
            <svg className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <span className="font-mono text-xs tracking-wide">LinkedIn</span>
          </a>

          <a href="tel:+17813547394"
            className="group inline-flex items-center gap-2.5 text-zinc-600 hover:text-[var(--accent-teal)] transition-colors duration-300">
            <svg className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            <span className="font-mono text-xs tracking-wide">+1 781-354-7394</span>
          </a>
        </motion.div>

        {/* Signature */}
        <motion.p
          className="text-zinc-800 text-[10px] font-mono uppercase tracking-widest mt-16"
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
      <LifeGallery />
      <ConnectionClose />
      <ScrollGear />
    </div>
  )
}

'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import MotionSection from '@/components/ui/MotionSection'
import CustomVideoPlayer from '@/components/video/CustomVideoPlayer'
import AnimatedSignatureLogo from '@/components/brand/AnimatedSignatureLogo'
import ScrollGear from '@/components/ui/ScrollGear'
import PersistenceGallery from '@/components/me/PersistenceGallery'
import ParallaxImage from '@/components/ui/ParallaxImage'
import PoemExperience from '@/components/me/PoemExperience'
import {
  SectionDivider,
  ScrollCue,
  ChapterHeading,
  TiltCard,
  StaggerReveal,
} from '@/components/me/CinematicElements'

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  })

  const heroOpacity = useTransform(heroProgress, [0, 0.7], [1, 0])
  const heroScale = useTransform(heroProgress, [0, 0.7], [1, 0.92])
  const heroY = useTransform(heroProgress, [0, 0.7], [0, 80])

  return (
    <main className="min-h-screen bg-white relative overflow-hidden">

      {/* AmbientOrbs removed — 3 blurred 600px circles with infinite keyframe animations were causing GPU strain */}

      {/* ═══════════════════════════════════════════════════════════════════
          ACT 1: THE INVITATION
          Full-viewport cinematic hero with scroll-linked parallax.
      ═══════════════════════════════════════════════════════════════════ */}
      <motion.section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
      >
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />

        <div className="relative z-10 text-center max-w-5xl mx-auto px-4">
          {/* Animated Logo Mark */}
          <motion.div
            className="mb-8 flex justify-center"
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-16 h-16 text-[var(--accent-teal)]">
              <AnimatedSignatureLogo className="w-full h-full" duration={10000} pauseDuration={5000} />
            </div>
          </motion.div>

          {/* Dramatic Headline — overflow clip reveal */}
          <div className="overflow-hidden mb-2">
            <motion.h1
              className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-slate-900 leading-[0.95]"
              initial={{ y: '120%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              52 seconds.
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.p
              className="font-serif text-3xl sm:text-4xl md:text-5xl text-slate-400"
              initial={{ y: '120%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1.4, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              That&apos;s all I ask.
            </motion.p>
          </div>

          {/* Video Frame with 3D Tilt */}
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-[340px] mx-auto mb-10"
          >
            <TiltCard>
              <div className="relative bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xl shadow-slate-300/30">
                <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50/80 backdrop-blur-sm border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
                    </div>
                    <span className="font-mono text-[10px] text-slate-400">meet_anuja.mp4</span>
                  </div>
                  <span className="font-mono text-[10px] text-[var(--accent-teal)] tracking-widest">52s</span>
                </div>
                <CustomVideoPlayer src="/videos/intro-video.mp4" className="w-full" />
              </div>
            </TiltCard>
          </motion.div>

          {/* Bio */}
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
          >
            <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-serif mb-4">
              <strong className="block text-slate-900 mb-2">
                Senior Product Designer (13y) | Design Engineer | Enterprise Systems Architect
              </strong>
              I specialize in{' '}
              <span className="text-slate-900 font-semibold">untangling the most complex enterprise systems</span>{' '}
              through code-first architecture.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.6 }}
            >
              <a
                href="mailto:anujanimmagadda@gmail.com"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--accent-teal-800)] text-white text-sm font-medium hover:bg-[var(--accent-teal-900)] transition-all hover:scale-105 shadow-lg"
              >
                <span>Let&apos;s Talk</span>
                <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <ScrollCue />
        </div>
      </motion.section>


      {/* ═══════════════════════════════════════════════════════════════════
          ACT 2: THE BUILDER
          Portfolio evolution + orchestration stack — streamlined.
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-8 md:py-12 bg-slate-50/30">
        {/* Portfolio Evolution Log */}
        <PersistenceGallery />

        {/* Orchestration Stack — directly below evolution */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pt-8 md:pt-12 pb-4">
          <StaggerReveal>
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50">
              {/* Header: Orchestration Stack */}
              <div className="bg-slate-50 px-6 sm:px-10 py-5 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-slate-400 font-mono text-[10px] uppercase tracking-wider hidden sm:block">Orchestration Stack</span>
                <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2">
                  {[
                    { name: 'ChatGPT', desc: 'Strategy' },
                    { name: 'Claude', desc: 'Architecture' },
                    { name: 'Gemini', desc: 'Polish' },
                    { name: 'Cursor', desc: 'Build' },
                    { name: 'Antigravity', desc: 'Logic' },
                    { name: 'AWS', desc: 'Scale' },
                  ].map((tool) => (
                    <span
                      key={tool.name}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-600 text-[10px] sm:text-xs font-mono shadow-sm"
                    >
                      <span className="text-slate-900 font-semibold">{tool.name}</span>
                      <span className="text-[var(--accent-teal)] opacity-70">/ {tool.desc}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Body */}
              <div className="p-8 sm:p-10 space-y-12">
                {/* Context Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-slate-100">
                  {[
                    { label: 'The Mission', text: 'Build a high-performance portfolio website in 4 weeks with zero coding team.' },
                    { label: 'The Strategy', text: 'Treating AI as a specialized engineering team (Cursor + Antigravity).' },
                    { label: 'The Result', text: 'Version 5.0 is live. Delivered a functional MVP in week 1.' },
                  ].map((item) => (
                    <div key={item.label} className="space-y-2">
                      <span className="text-slate-400 font-mono text-[10px] uppercase tracking-widest">{item.label}</span>
                      <p className="text-slate-900 text-sm font-medium leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>

                {/* Core Capabilities */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-slate-100">
                  {[
                    { num: 'Velocity', title: 'Building This Portfolio: 1 Architect. 6 Weeks.', desc: 'Deployed the functional MVP in 7 days. Iterated through 5 full architectural pivots to reach this level of fidelity. I don\'t get stuck; I deliver.' },
                    { num: 'Modernization', title: '13 Years of Complexity Untangled.', desc: 'Specializing in enterprise-scale digital transformation. Bridging the gap between legacy systems and modern AI/ML user experiences as a Senior Product Designer.' },
                    { num: 'Orchestration', title: 'Design-Engineering Bridge.', desc: 'Architected a custom Design Token system to ensure pixel-perfect consistency across a multi-agent automated build. I speak the language of code.' },
                  ].map((item) => (
                    <div key={item.num} className="space-y-2">
                      <span className="text-slate-400 font-mono text-[10px] uppercase tracking-widest">{item.num}</span>
                      <h3 className="font-serif text-lg text-slate-900">{item.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>

                {/* System Specs */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { label: 'Typography', content: <>Set in <span className="text-slate-900">Playfair Display</span> for headers, <span className="text-slate-900">Inter</span> for UI, and <span className="text-slate-900">JetBrains Mono</span> for code.</> },
                    { label: 'Environment', content: <>Built with <span className="text-slate-900">Next.js 16</span>, <span className="text-slate-900">Framer Motion</span>, and <span className="text-slate-900">Tailwind</span>. Deployed on <span className="text-slate-900">AWS</span>.</> },
                    { label: 'Design Source', content: <>Assets & SVGs in <span className="text-slate-900">Figma</span>. Entire website orchestrated via <span className="text-slate-900">Human-AI Collaboration</span>.</> },
                  ].map((item) => (
                    <div key={item.label} className="space-y-2">
                      <span className="text-slate-400 font-mono text-[10px] uppercase tracking-widest">{item.label}</span>
                      <p className="text-slate-600 text-xs font-serif leading-relaxed">{item.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </StaggerReveal>
        </div>
      </section>


      {/* ════════════════════ TRANSITION ════════════════════ */}
      <SectionDivider label="The Writer" />


      {/* ═══════════════════════════════════════════════════════════════════
          ACT 3: THE WRITER — Articles + Apple Music Poem, combined
      ═══════════════════════════════════════════════════════════════════ */}
      <PoemExperience />


      {/* ════════════════════ TRANSITION ════════════════════ */}
      <SectionDivider label="The Human" />


      {/* ═══════════════════════════════════════════════════════════════════
          ACT 4: THE HUMAN
          Bento Grid (life photos). The soul.
      ═══════════════════════════════════════════════════════════════════ */}
      <MotionSection animate={true} className="py-10 md:py-14">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 space-y-12">
          <ChapterHeading
            title="Life Outside the Terminal"
            subtitle="Parent, baker, painter, poet. The raw material that shapes my design thinking."
          />

          {/* Full-width Bento Grid */}
          <div className="h-[500px] md:h-[600px] grid grid-cols-4 grid-rows-2 gap-4">

            {/* 1. Cake (large left) */}
            <StaggerReveal className="col-span-2 row-span-2">
              <TiltCard className="h-full" intensity={5}>
                <div className="relative rounded-2xl overflow-hidden group border border-slate-200 h-full">
                  <ParallaxImage
                    src="/images/life/Bake4.jpg"
                    alt="Pink Cake Patisserie"
                    fill
                    enableParallax={false}
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    containerClassName="w-full h-full"
                    sizes="50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="font-mono text-xs text-white uppercase tracking-widest mb-1 block">Baking</span>
                    <p className="text-white/90 text-[10px] leading-tight opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Perfecting the sponge.
                    </p>
                  </div>
                </div>
              </TiltCard>
            </StaggerReveal>

            {/* 2. Painting (top middle) */}
            <StaggerReveal className="col-span-1 row-span-1" delay={0.1}>
              <TiltCard className="h-full" intensity={6}>
                <div className="relative rounded-2xl overflow-hidden group border border-slate-200 h-full">
                  <ParallaxImage
                    src="/images/life/Painting1.jpg"
                    alt="Painting"
                    fill
                    enableParallax={false}
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    containerClassName="w-full h-full"
                    sizes="25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4">
                    <span className="font-mono text-xs text-white uppercase tracking-widest">Painting</span>
                  </div>
                </div>
              </TiltCard>
            </StaggerReveal>

            {/* 3. Family (top right) */}
            <StaggerReveal className="col-span-1 row-span-1" delay={0.15}>
              <TiltCard className="h-full" intensity={4}>
                <div className="relative rounded-2xl overflow-hidden group border border-slate-200 h-full">
                  <ParallaxImage
                    src="/images/life/family.jpeg"
                    alt="My Family"
                    fill
                    enableParallax={false}
                    className="object-cover object-[50%_40%] group-hover:scale-105 transition-transform duration-700"
                    containerClassName="w-full h-full"
                    sizes="25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4">
                    <span className="font-mono text-xs text-white bg-black/30 backdrop-blur-md px-2 py-1 rounded border border-white/10">
                      My World
                    </span>
                  </div>
                </div>
              </TiltCard>
            </StaggerReveal>

            {/* 4. Food (bottom middle) */}
            <StaggerReveal className="col-span-1 row-span-1" delay={0.2}>
              <TiltCard className="h-full" intensity={6}>
                <div className="relative rounded-2xl overflow-hidden group border border-slate-200 h-full">
                  <ParallaxImage
                    src="/images/life/Food1.jpeg"
                    alt="Culinary Arts"
                    fill
                    enableParallax={false}
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    containerClassName="w-full h-full"
                    sizes="25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4">
                    <span className="font-mono text-xs text-white uppercase tracking-widest">Cooking</span>
                  </div>
                </div>
              </TiltCard>
            </StaggerReveal>

            {/* 5. Food2 (bottom right) */}
            <StaggerReveal className="col-span-1 row-span-1" delay={0.25}>
              <TiltCard className="h-full" intensity={6}>
                <div className="relative rounded-2xl overflow-hidden group border border-slate-200 h-full">
                  <ParallaxImage
                    src="/images/life/Food3.jpeg"
                    alt="Culinary Arts"
                    fill
                    enableParallax={false}
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    containerClassName="w-full h-full"
                    sizes="25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4">
                    <span className="font-mono text-xs text-white uppercase tracking-widest">Flavor</span>
                  </div>
                </div>
              </TiltCard>
            </StaggerReveal>

          </div>
        </div>
      </MotionSection>


      {/* ═══════════════════════════════════════════════════════════════════
          ACT 6: THE CONNECTION — Dramatic dark cinematic close
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-slate-950 py-24 md:py-32 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(7,139,156,0.3) 0%, transparent 60%)',
              filter: 'blur(80px)',
            }}
          />
        </div>

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 text-center">
          {/* Decorative accent — no number */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-12 h-[1px] bg-[var(--accent-teal)] opacity-40" />
            <div className="w-2 h-2 bg-[var(--accent-teal)] rotate-45 opacity-30" />
            <div className="w-12 h-[1px] bg-[var(--accent-teal)] opacity-40" />
          </motion.div>

          {/* Large dramatic heading */}
          <div className="overflow-hidden mb-8">
            <motion.h3
              className="font-serif text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight"
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Let&apos;s connect.
            </motion.h3>
          </div>

          <motion.p
            className="text-slate-400 text-base md:text-lg max-w-md mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            I&apos;m always open to meaningful conversations about design, engineering, and everything in between.
          </motion.p>

          {/* Contact links */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-x-6 md:gap-x-10 gap-y-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a
              href="mailto:anujanimmagadda@gmail.com"
              className="group flex items-center gap-2 text-white/70 hover:text-[var(--accent-teal)] transition-colors font-mono text-sm min-h-[44px]"
            >
              <svg className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              anujanimmagadda@gmail.com
            </a>
            <span className="text-slate-700 hidden md:inline">·</span>
            <a
              href="https://www.linkedin.com/in/anu159"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-white/70 hover:text-[var(--accent-teal)] transition-colors font-mono text-sm min-h-[44px]"
            >
              <svg className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              LinkedIn
            </a>
            <span className="text-slate-700 hidden md:inline">·</span>
            <a
              href="tel:+17813547394"
              className="group flex items-center gap-2 text-white/70 hover:text-[var(--accent-teal)] transition-colors font-mono text-sm min-h-[44px]"
            >
              <svg className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +1 781-354-7394
            </a>
          </motion.div>

          {/* Signature */}
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="w-10 h-10 text-[var(--accent-teal)] opacity-40">
              <AnimatedSignatureLogo className="w-full h-full" duration={10000} pauseDuration={5000} />
            </div>
            <p className="text-slate-600 text-xs">
              Designed by Anuja. Orchestrated via Multi-Agent AI.
            </p>
          </motion.div>

          <div className="h-safe-area-inset-bottom" />
        </div>
      </section>

      {/* Scroll-linked rotating gear */}
      <ScrollGear />
    </main>
  )
}

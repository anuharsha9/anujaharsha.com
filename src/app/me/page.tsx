'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import MotionSection from '@/components/ui/MotionSection'
import CustomVideoPlayer from '@/components/video/CustomVideoPlayer'
import AnimatedSignatureLogo from '@/components/brand/AnimatedSignatureLogo'
import ScrollGear from '@/components/ui/ScrollGear'
import PersistenceGallery from '@/components/me/PersistenceGallery'
import WritingSectionSimple from '@/components/me/WritingSectionSimple'






export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 1: THE INVITATION
          Video-first. Personal. "52 seconds. That's all I ask."
      ═══════════════════════════════════════════════════════════════════════ */}
      <MotionSection id="profile" className="py-16 sm:py-20 md:py-24 lg:py-28 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            {/* Logo mark at top */}
            <motion.div
              className="mb-6 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="w-12 h-12 text-[var(--accent-teal)]">
                <AnimatedSignatureLogo
                  className="w-full h-full"
                  duration={10000}
                  pauseDuration={5000}
                />
              </div>
            </motion.div>

            {/* Main headline */}
            <h1 className="font-serif text-slate-900 text-2xl xs:text-3xl sm:text-4xl md:text-4xl lg:text-5xl leading-tight mb-4 sm:mb-6 px-4">
              52 seconds.<br />
              <span className="text-slate-600">That&apos;s all I ask.</span>
            </h1>

            {/* Video - THE HERO (compact) */}
            <div className="max-w-[280px] xs:max-w-[320px] sm:max-w-sm mx-auto mb-6 sm:mb-8 px-4">
              <div className="relative bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xl">
                {/* Window Header Bar */}
                <div className="flex items-center justify-between px-3 py-2 bg-slate-100 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                    </div>
                    <span className="font-mono text-slate-500 text-[10px]">
                      meet_anuja.mp4
                    </span>
                  </div>
                  <span className="font-mono text-[var(--accent-teal)] text-[10px] tracking-widest">
                    52s
                  </span>
                </div>

                {/* Video */}
                <CustomVideoPlayer
                  src="/videos/intro-video.mp4"
                  className="w-full"
                />
              </div>
            </div>

            {/* Text block - narrative flow (MOVED HERE) */}
            <div className="max-w-3xl mx-auto mb-16 sm:mb-20 px-4">
              <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-serif mb-8">
                <strong className="block text-slate-900 mb-2">Senior Product Designer (13y) | Design Engineer | Enterprise Systems Architect</strong>
                I specialize in <span className="text-slate-900 font-semibold">untangling the most complex enterprise systems</span> through code-first architecture.
              </p>

              {/* CTA - Let's Talk (Moved) */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
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
            </div>

            {/* WRITING SECTION (MOVED) */}



            {/* Tool pills */}



          </motion.div>
        </div>
      </MotionSection>



      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 2.5: IMPACT GRID (ENTERPRISE PRINCIPAL)
      ═══════════════════════════════════════════════════════════════════════ */}

      <PersistenceGallery />

      {/* UNIFIED ARCHITECT PROFILE BLOCK (SPEC TABLE) - MOVED BELOW GALLERY */}
      <MotionSection animate={true} className="bg-slate-50/50 pb-16 pt-8">
        <div className="max-w-7xl mx-auto px-4 text-left">
          {/* Optional Section Title if desired, otherwise just spacing */}
          <div className="mb-6 text-center">
            <span className="text-[var(--accent-teal)] font-mono text-xs uppercase tracking-widest">The Build Process</span>
            <h2 className="font-serif text-2xl sm:text-3xl text-slate-900 mt-2">How this portfolio was created</h2>
          </div>

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

            {/* Body: The Specs (Mission/Strategy/Result) */}
            <div className="p-8 sm:p-10 space-y-12">
              {/* Context Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-slate-100">
                <div className="space-y-2">
                  <span className="text-slate-400 font-mono text-[10px] uppercase tracking-widest">The Mission</span>
                  <p className="text-slate-900 text-sm font-medium leading-relaxed">Build a high-performance portfolio website in 4 weeks with zero coding team.</p>
                </div>

                <div className="space-y-2">
                  <span className="text-slate-400 font-mono text-[10px] uppercase tracking-widest">The Strategy</span>
                  <p className="text-slate-900 text-sm font-medium leading-relaxed">Treating AI as a specialized engineering team (Cursor + Antigravity).</p>
                </div>

                <div className="space-y-2">
                  <span className="text-slate-400 font-mono text-[10px] uppercase tracking-widest">The Result</span>
                  <p className="text-slate-900 text-sm font-medium leading-relaxed">Version 5.0 is live. Delivered a functional MVP in week 1.</p>
                </div>
              </div>

              {/* Core Capabilities (Merged from Impact Grid) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-slate-100">
                {/* Metric 1 */}
                <div className="space-y-2">
                  <span className="text-slate-400 font-mono text-[10px] uppercase tracking-widest">01_Velocity</span>
                  <h3 className="font-serif text-lg text-slate-900">Building This Portfolio: 1 Architect. 6 Weeks.</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Deployed the functional MVP in 7 days. Iterated through 5 full architectural pivots to reach this level of fidelity. I don&apos;t get stuck; I deliver.
                  </p>
                </div>

                {/* Metric 2 */}
                <div className="space-y-2">
                  <span className="text-slate-400 font-mono text-[10px] uppercase tracking-widest">02_Modernization</span>
                  <h3 className="font-serif text-lg text-slate-900">13 Years of Complexity Untangled.</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Specializing in enterprise-scale digital transformation. Bridging the gap between legacy systems and modern AI/ML user experiences as a Senior Product Designer.
                  </p>
                </div>

                {/* Metric 3 */}
                <div className="space-y-2">
                  <span className="text-slate-400 font-mono text-[10px] uppercase tracking-widest">03_Orchestration</span>
                  <h3 className="font-serif text-lg text-slate-900">Design-Engineering Bridge.</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Architected a custom Design Token system to ensure pixel-perfect consistency across a multi-agent automated build. I speak the language of code.
                  </p>
                </div>
              </div>

              {/* System Specs (Typography, Env, Design) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2">
                  <span className="text-slate-400 font-mono text-[10px] uppercase tracking-widest">Typography</span>
                  <p className="text-slate-600 text-xs font-serif leading-relaxed">
                    Set in <span className="text-slate-900">Playfair Display</span> for headers, <span className="text-slate-900">Inter</span> for UI, and <span className="text-slate-900">JetBrains Mono</span> for code.
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-slate-400 font-mono text-[10px] uppercase tracking-widest">Environment</span>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Built with <span className="text-slate-900">Next.js 16</span>, <span className="text-slate-900">Framer Motion</span>, and <span className="text-slate-900">Tailwind</span>. Deployed on <span className="text-slate-900">AWS</span>.
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-slate-400 font-mono text-[10px] uppercase tracking-widest">Design Source</span>
                  <p className="text-slate-600 text-xs leading-relaxed">
                    Assets & SVGs in <span className="text-slate-900">Figma</span>. Entire website orchestrated via <span className="text-slate-900">Human-AI Collaboration</span>.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </MotionSection >

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4: WRITING
      ═══════════════════════════════════════════════════════════════ */}
      < MotionSection animate={true} className="py-10 md:py-14" >
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
          <WritingSectionSimple />
        </div>
      </MotionSection >




      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 6: THE HUMAN (Compact)
      ═══════════════════════════════════════════════════════════════════════ */}
      < MotionSection animate={true} className="py-10 md:py-14" >
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">

            {/* Left - Context */}
            <div className="lg:col-span-1 space-y-4">
              <h2 className="font-serif text-slate-900 text-2xl md:text-3xl leading-tight">
                Life Outside the Terminal
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                Parent of two — a 4-year-old boy and 1-year-old girl — with the most supportive husband.
                Motherhood shapes my discipline, resilience, and systems thinking more than anything else.
              </p>
            </div>

            {/* Right - Hobbies Grid (Bento Box) */}
            <div className="lg:col-span-2 h-[800px] md:h-[720px] grid grid-cols-2 md:grid-cols-4 grid-rows-4 md:grid-rows-3 gap-4">
              {/* 1. BAKING (2x2) */}
              <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden group border border-slate-200">
                <Image
                  src="/images/life/Bake4.jpg"
                  alt="Pink Cake Patisserie"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4">
                  <span className="font-mono text-xs text-white bg-black/30 backdrop-blur-md px-2 py-1 rounded border border-white/10">
                    Patisserie
                  </span>
                </div>
              </div>

              {/* 2. POETRY (1x3) - Tall Pillar */}
              <div className="col-span-1 row-span-2 md:row-span-3 relative rounded-2xl overflow-hidden group border border-slate-200 order-last md:order-none hidden md:block">
                <Image
                  src="/images/life/Poem on life.png"
                  alt="Poetry"
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  sizes="25vw"
                />
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/0 transition-colors duration-500" />
                <div className="absolute bottom-4 left-4">
                  <span className="font-mono text-xs text-white bg-black/30 backdrop-blur-md px-2 py-1 rounded border border-white/10">
                    Poetry
                  </span>
                </div>
              </div>

              {/* 3. PAINTING (1x1) */}
              <div className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden group border border-slate-200">
                <Image
                  src="/images/life/Painting1.jpg"
                  alt="Oil Painting"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="25vw"
                />
                <div className="absolute bottom-4 left-4">
                  <span className="font-mono text-xs text-white bg-black/30 backdrop-blur-md px-2 py-1 rounded border border-white/10">
                    Oil Painting
                  </span>
                </div>
              </div>

              {/* 4. CULINARY 1 (1x1) */}
              <div className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden group border border-slate-200">
                <Image
                  src="/images/life/Food1.jpeg"
                  alt="Culinary Arts"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="25vw"
                />
              </div>

              {/* 5. FAMILY (2x1) - The Foundation */}
              <div className="col-span-2 md:col-span-2 row-span-1 relative rounded-2xl overflow-hidden group border border-slate-200">
                <Image
                  src="/images/life/family.jpeg"
                  alt="My Family"
                  fill
                  className="object-cover object-[50%_40%] group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4">
                  <span className="font-mono text-xs text-white bg-black/30 backdrop-blur-md px-2 py-1 rounded border border-white/10">
                    My World
                  </span>
                </div>
              </div>

              {/* 6. CULINARY 2 (1x1) */}
              <div className="col-span-1 row-span-1 relative rounded-2xl overflow-hidden group border border-slate-200">
                <Image
                  src="/images/life/Food3.jpeg"
                  alt="Culinary Arts"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="25vw"
                />
              </div>
            </div>
          </div>
        </div>
      </MotionSection >



      {/* ═══════════════════════════════════════════════════════════════════════
          SECTION 7: CONTACT (Simplified)
      ═══════════════════════════════════════════════════════════════════════ */}
      < MotionSection animate={true} className="py-10 md:py-14 pb-safe" >
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 text-center space-y-6">
          <h3 className="font-serif text-slate-900 text-2xl md:text-3xl">
            Let&apos;s connect.
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-x-4 md:gap-x-6 gap-y-2 text-sm md:text-base">
            <a href="mailto:anujanimmagadda@gmail.com" className="text-slate-700 font-mono hover:text-[var(--accent-teal)] transition-colors min-h-[44px] flex items-center">
              anujanimmagadda@gmail.com
            </a>
            <span className="text-slate-300 hidden md:inline">·</span>
            <a href="https://www.linkedin.com/in/anu159" target="_blank" rel="noopener noreferrer" className="text-slate-700 font-mono hover:text-[var(--accent-teal)] transition-colors min-h-[44px] flex items-center">
              LinkedIn
            </a>
            <span className="text-slate-300 hidden md:inline">·</span>
            <a href="tel:+17813547394" className="text-slate-700 font-mono hover:text-[var(--accent-teal)] transition-colors min-h-[44px] flex items-center">
              +1 781-354-7394
            </a>
          </div>

          <p className="text-slate-400 text-xs pt-4">
            Designed by Anuja. Orchestrated via Multi-Agent AI.
          </p>

          {/* Safe area for iPhone home indicator */}
          <div className="h-safe-area-inset-bottom" />
        </div>
      </MotionSection >

      {/* Scroll-linked rotating gear */}
      < ScrollGear />
    </main >
  )
}

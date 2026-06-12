'use client'

import TransitionLink from '@/components/transitions/TransitionLink'
import { motion } from 'framer-motion'
import { ArrowRight, Home, User } from 'lucide-react'
import { RCWireframe, MLWireframe, IQWireframe } from './CaseStudyWireframes'
import { type ReactNode } from 'react'
import { useTransition } from '@/components/transitions/TransitionContext'

interface ProjectMeta {
 id: string
 tag: string
 title: string
 subtitle: string
 hook: string
 link: string
 accent: string
 Wireframe: () => ReactNode
}

interface SystemIndexProps {
 currentId: 'REPORTCASTER' | 'ML_FUNCTIONS' | 'IQ_PLUGIN'
}

const allProjects: Record<string, ProjectMeta> = {
 REPORTCASTER: {
 id: 'REPORTCASTER',
 tag: '001',
 title: 'ReportCaster',
 subtitle: 'Enterprise Scheduling',
 hook: 'Customer retention success for Enterprise Scheduling.',
 link: '/work/reportcaster',
 accent: '#f59e0b',
 Wireframe: RCWireframe,
 },
 ML_FUNCTIONS: {
 id: 'ML_FUNCTIONS',
 tag: '002',
 title: 'ML Functions',
 subtitle: 'Machine Learning',
 hook: 'Feature adoption/simplification for Machine Learning workflows.',
 link: '/work/ml-functions',
 accent: '#2fc6d5',
 Wireframe: MLWireframe,
 },
 IQ_PLUGIN: {
 id: 'IQ_PLUGIN',
 tag: '003',
 title: 'IQ Plugin',
 subtitle: 'DSML Discovery Hub',
 hook: 'AI powered HUB to meet business needs.',
 link: '/work/iq-plugin',
 accent: '#a855f7',
 Wireframe: IQWireframe,
 },
}

/* ─── Sequential journey: RC → ML → IQ → (home) ─── */
const nextStepMap: Record<string, string[]> = {
 REPORTCASTER: ['ML_FUNCTIONS'],
 ML_FUNCTIONS: ['IQ_PLUGIN'],
 IQ_PLUGIN: ['REPORTCASTER', 'ML_FUNCTIONS'],
}

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

export default function SystemIndex({ currentId }: SystemIndexProps) {
 const { navigateTo } = useTransition()
 const nextIds = nextStepMap[currentId] || []
 const nextProjects = nextIds.map((id) => allProjects[id]).filter(Boolean)
 const isEndOfJourney = currentId === 'IQ_PLUGIN'

 const handleHomeClick = () => {
 navigateTo('/')
 setTimeout(() => {
 const heroHeight = window.innerHeight * 3
 const bioScrollPosition = heroHeight * 0.52
 window.scrollTo({ top: bioScrollPosition, behavior: 'instant' as ScrollBehavior })
 }, 100)
 }

 return (
 <motion.section
 className="w-full py-16 md:py-24"
 aria-labelledby="system-index-heading"
 initial={{ opacity: 0, y: 40 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, amount: 0.2 }}
 transition={{ duration: 0.8, ease }}
 >
 <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16">
 {/* Header */}
 <motion.div
 className="text-center mb-10 md:mb-14"
 initial={{ opacity: 0, y: 20 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6, ease }}
 >
 <span className="inline-block font-mono text-[10px] tracking-[0.25em] uppercase text-zinc-600 mb-3">
 {isEndOfJourney ? 'Explore More' : 'Up Next'}
 </span>
 <h2
 id="system-index-heading"
 className="text-2xl md:text-3xl font-semibold text-white tracking-tight"
 >
 {isEndOfJourney ? 'Continue Exploring' : 'Next Case Study'}
 </h2>
 </motion.div>

 {/* End of journey — Extended Portfolio + Me page */}
 {isEndOfJourney ? (
 <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-3xl mx-auto">
 <motion.div
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6, ease }}
 >
 <TransitionLink
 href="/#extended-portfolio"
 className="group relative block rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden transition-all duration-500 hover:border-white/[0.15] hover:bg-white/[0.04] hover:shadow-2xl hover:shadow-black/30 p-8 md:p-10 text-center"
 >
 <div className="w-14 h-14 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
 <Home className="w-6 h-6 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
 </div>
 <h3 className="text-lg md:text-xl font-semibold text-white mb-2">Fractional Leadership</h3>
 <p className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">
 Early-stage SaaS & zero-to-one architecture
 </p>
 </TransitionLink>
 </motion.div>

 <motion.div
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6, delay: 0.1, ease }}
 >
 <TransitionLink
 href="/me"
 className="group relative block rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden transition-all duration-500 hover:border-white/[0.15] hover:bg-white/[0.04] hover:shadow-2xl hover:shadow-black/30 p-8 md:p-10 text-center"
 >
 <div className="w-14 h-14 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
 <User className="w-6 h-6 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
 </div>
 <h3 className="text-lg md:text-xl font-semibold text-white mb-2">About Me</h3>
 <p className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">
 13 years of complexity, simplified
 </p>
 </TransitionLink>
 </motion.div>
 </div>
 ) : (
 <div
 className={`grid gap-5 md:gap-6 max-w-3xl mx-auto ${nextProjects.length > 1 ? 'grid-cols-1 md:grid-cols-2 max-w-4xl' : 'grid-cols-1'
 }`}
 >
 {nextProjects.map((project, idx) => (
 <motion.div
 key={project.id}
 initial={{ opacity: 0, y: 30 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true }}
 transition={{ duration: 0.6, delay: idx * 0.1, ease }}
 >
 <TransitionLink
 href={project.link}
 className="group relative block rounded-2xl border border-white/[0.06] overflow-hidden transition-all duration-500 hover:border-white/[0.12] hover:shadow-2xl hover:shadow-black/30"
 style={{
 background: `linear-gradient(135deg, ${project.accent}08 0%, transparent 50%, ${project.accent}04 100%)`,
 }}
 >
 {/* Wireframe background */}
 <div className="relative h-44 md:h-52 overflow-hidden">
 <div className="absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
 <project.Wireframe />
 </div>

 {/* Gradient overlay */}
 <div className="absolute inset-0 bg-gradient-to-t from-[rgb(12,12,20)] via-transparent to-transparent" />

 {/* Tag badge */}
 <div className="absolute top-4 left-4">
 <span
 className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-mono tracking-wider "
 style={{
 borderColor: `${project.accent}30`,
 backgroundColor: `${project.accent}15`,
 color: `${project.accent}cc`,
 }}
 >
 <span
 className="w-1.5 h-1.5 rounded-full"
 style={{ backgroundColor: project.accent }}
 />
 {project.tag}
 </span>
 </div>

 {/* "Up Next" pill for single card */}
 {nextProjects.length === 1 && (
 <div className="absolute top-4 right-4">
 <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.08] text-[10px] font-mono tracking-wider text-zinc-500 ">
 Up Next →
 </span>
 </div>
 )}
 </div>

 {/* Content */}
 <div className="px-5 md:px-6 pb-5 md:pb-6 -mt-2 relative z-10">
 <div className="flex items-start justify-between gap-4">
 <div>
 <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-white transition-colors mb-1">
 {project.title}
 </h3>
 <p
 className="text-xs font-mono uppercase tracking-wider mb-3"
 style={{ color: `${project.accent}90` }}
 >
 {project.subtitle}
 </p>
 <p className="text-sm text-zinc-600 leading-relaxed group-hover:text-zinc-500 transition-colors">
 {project.hook}
 </p>
 </div>

 {/* Arrow */}
 <div
 className="mt-1 w-9 h-9 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
 style={{
 borderColor: `${project.accent}25`,
 backgroundColor: `${project.accent}10`,
 }}
 >
 <ArrowRight
 className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
 style={{ color: project.accent }}
 />
 </div>
 </div>
 </div>

 {/* Hover glow */}
 <div
 className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
 style={{
 background: `radial-gradient(ellipse at 50% 0%, ${project.accent}08, transparent 70%)`,
 }}
 />
 </TransitionLink>
 </motion.div>
 ))}
 </div>
 )}
 </div>
 </motion.section >
 )
}

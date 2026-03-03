'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CaseStudyData } from '@/types/caseStudy'
import FloatingOrbs from '@/components/ui/FloatingOrbs'
import CinematicScene from './CinematicScene'
import ImpactDiff from '@/components/case-study/ImpactDiff'
import {
    BentoGrid, BentoRow, ImageTile, TextTile, StatTile,
    PullQuote, EyebrowLabel, CarouselTile,
} from './BentoGrid'
import {
    PeopleDotGrid, AvatarPair, ScreenshotStack, FlowDiagram,
    ScatterConverge, RejectionMark, PlusIconTree,
    OnboardingPath, KnowledgeTransfer, VideoGrid, ImpactClimax,
} from './illustrations'

/* ─── Act Navigation ─── */
const ACT_SECTIONS = [
    { id: 'act-i', label: 'I', title: 'The Beginning' },
    { id: 'act-ii', label: 'II', title: 'Research' },
    { id: 'act-iii', label: 'III', title: 'Discovery' },
    { id: 'act-iv', label: 'IV', title: 'Architecture' },
    { id: 'act-v', label: 'V', title: 'Team' },
    { id: 'act-vi', label: 'VI', title: 'Outcome' },
    { id: 'act-reflection', label: '✦', title: 'Reflection' },
]

/* ─── Headset icon for support rep ─── */
const HeadsetIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </svg>
)

/* ─── Code icon for engineer ─── */
const CodeIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
    </svg>
)

export default function CinematicCaseStudy({ data }: { data: CaseStudyData }) {
    const heroRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress: heroProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    })
    const opacity = useTransform(heroProgress, [0, 0.6], [1, 0])
    const scale = useTransform(heroProgress, [0, 0.6], [1, 0.96])

    const [activeAct, setActiveAct] = React.useState('act-i')
    const [showProgress, setShowProgress] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setShowProgress(window.scrollY > window.innerHeight * 0.5)
            for (const act of [...ACT_SECTIONS].reverse()) {
                const el = document.getElementById(act.id)
                if (el) {
                    const rect = el.getBoundingClientRect()
                    if (rect.top <= window.innerHeight * 0.4) {
                        setActiveAct(act.id)
                        break
                    }
                }
            }
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const getSection = (id: string) => data.sections?.find((s) => s.id === id)
    const section4 = getSection('section-04')

    return (
        <div className="bg-[var(--bg-cinematic)] relative min-h-screen text-white overflow-hidden pb-48">
            {/* Background */}
            <div className="scanline-overlay" aria-hidden="true" />
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,var(--overlay-accent-08),transparent)]" />
                <div
                    className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                        backgroundSize: '128px 128px',
                    }}
                />
            </div>
            <FloatingOrbs />

            {/* ═══ HERO ═══ */}
            <motion.section
                ref={heroRef}
                className="relative z-10 min-h-[100vh] flex flex-col justify-center px-6 md:px-16 sticky top-0"
                style={{ opacity, scale }}
            >
                <div className="max-w-[1440px] mx-auto w-full">
                    <span className="text-[var(--accent-teal)] font-mono text-sm sm:text-lg md:text-xl font-bold uppercase tracking-[0.4em] mb-8 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] block">
                        {data.role} • {data.company}
                    </span>

                    <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[1.05] tracking-tight max-w-5xl bg-clip-text text-transparent bg-gradient-to-br from-white via-slate-200 to-slate-500 mb-10 pb-2">
                        {data.heroTitle}
                    </h1>

                    <p className="text-xl md:text-3xl font-light text-zinc-400 max-w-4xl leading-relaxed">
                        {data.heroSubheading}
                    </p>

                    {data.scope && (
                        <div className="mt-8 flex flex-wrap gap-2">
                            {data.scope.map((tag, i) => (
                                <span key={i} className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 border border-white/5 rounded-full px-3 py-1">{tag}</span>
                            ))}
                        </div>
                    )}

                    {/* Stats — just type, no cards */}
                    <div className="mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 border-t border-white/5 pt-10">
                        <div>
                            <p className="text-[10px] uppercase font-mono tracking-widest text-[var(--accent-teal)] mb-2">Scale</p>
                            <h3 className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">20M+ Schedules</h3>
                            <p className="text-zinc-500 mt-2 font-light">Running every week</p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-mono tracking-widest text-[var(--accent-teal)] mb-2">Transformation</p>
                            <h3 className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">5 → 1 Hub</h3>
                            <p className="text-zinc-500 mt-2 font-light">Subsystems unified</p>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-mono tracking-widest text-[var(--accent-teal)] mb-2">Timeline</p>
                            <h3 className="text-2xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">{data.timeframe}</h3>
                            <p className="text-zinc-500 mt-2 font-light">Research to production</p>
                        </div>
                    </div>

                    {data.ownership && (
                        <div className="mt-16 border-t border-white/5 pt-10">
                            <p className="text-xs font-mono text-zinc-600 uppercase tracking-widest mb-6">Scope of Ownership</p>
                            <div className="flex flex-wrap gap-2">
                                {data.ownership.ownedFeatures.map((f, i) => (
                                    <span key={i} className="text-xs text-zinc-400 font-light rounded-lg px-3 py-1.5">{f}</span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </motion.section>


            {/* ═══════════════════════════════════════════════
                ACT I — HOW I LANDED THE PROJECT
               ═══════════════════════════════════════════════ */}
            <div className="relative z-20 bg-[var(--bg-cinematic)]" id="act-i">
                <CinematicScene
                    title="How I Landed the Project"
                    body={
                        <p>My director said — we have this project in the pipeline, I&apos;m yet to assign it to a designer. I said — I&apos;d like to do it. Give me a chance.</p>
                    }
                >
                    <BentoGrid className="mt-12">
                        {/* The Scenario Setting */}
                        <BentoRow layout="full">
                            <TextTile delay={0.1}>
                                <PeopleDotGrid />
                                <p className="text-zinc-300 font-light leading-relaxed mt-4">
                                    ~200 people in my business unit. They knew RC existed. They knew it was a scheduling tool. That&apos;s it. The only people who knew how to use it were the support team, and ONE engineer who did RC code in the 80s and 90s — still with the company.
                                </p>
                            </TextTile>
                        </BentoRow>
                    </BentoGrid>
                </CinematicScene>

                <PullQuote>
                    There was no documentation at ALL. No roadmap. No plans to add features. I had a sandbox. And that&apos;s it.
                </PullQuote>
            </div>


            {/* ═══════════════════════════════════════════════
                ACT II — I BUILT MY OWN RESEARCH NETWORK
               ═══════════════════════════════════════════════ */}
            <div className="relative z-20 bg-[var(--bg-cinematic)]" id="act-ii">
                <CinematicScene
                    title="I Built My Own Research Network"
                    body={
                        <p>I went into the sandbox and used RC as much as I could. The lead support guy shared a presentation — that became my bible. I took hundreds of screenshots. Grouped them. Mapped them.</p>
                    }
                >
                    <BentoGrid>
                        {/* Row 1 — 1:1 meetings */}
                        <BentoRow layout="50/50">
                            <TextTile>
                                <AvatarPair leftLabel="Support" leftIcon={<HeadsetIcon />} />
                                <p className="text-zinc-300 font-light leading-relaxed">
                                    1:1 with customer reps of RC. Regular calls. They knew every workaround, every hack users had invented.
                                </p>
                            </TextTile>
                            <TextTile delay={0.1}>
                                <AvatarPair leftLabel="Engineer" leftIcon={<CodeIcon />} />
                                <p className="text-zinc-300 font-light leading-relaxed">
                                    1:1 with that ONE engineer who knew about it. He did RC code in the 80s and 90s — still with the company. My window into decades of undocumented decisions.
                                </p>
                            </TextTile>
                        </BentoRow>

                        {/* Row 2 — Validation statement */}
                        <BentoRow layout="full">
                            <TextTile accent="teal" delay={0.15}>
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 pl-2">
                                    <ScreenshotStack />
                                    <p className="text-zinc-200 font-light leading-relaxed text-lg flex-1">
                                        I validated everything I had with customer support and customer reps over and over. I was the one person who knew more about ReportCaster workflows than anyone else.
                                    </p>
                                </div>
                            </TextTile>
                        </BentoRow>

                        {/* Row 3 — Research → Decision → Shipped */}
                        {data.researchDecisionMap && data.researchDecisionMap.length > 0 && (
                            <BentoRow layout="50/50">
                                {data.researchDecisionMap.map((d, i) => (
                                    <TextTile key={i} delay={i * 0.1}>
                                        <FlowDiagram steps={['Insight', 'Decision', 'Shipped']} />
                                        <p className="text-zinc-300 font-light text-sm">{d.insight}</p>
                                        <p className="text-[var(--accent-teal)] text-xs font-mono mt-2">→ {d.feature}</p>
                                    </TextTile>
                                ))}
                            </BentoRow>
                        )}
                    </BentoGrid>
                </CinematicScene>

                <PullQuote>
                    I&apos;m not an engineer. But I made sure I understood the constraints — legacy FOCUS code, customer dependency, no JS or React. I understood enough to design around it.
                </PullQuote>
            </div>


            {/* ═══════════════════════════════════════════════
                ACT III — WHAT I DISCOVERED
               ═══════════════════════════════════════════════ */}
            <div className="relative z-20 bg-[var(--bg-cinematic)]" id="act-iii">
                <CinematicScene
                    title="What I Discovered"
                    body={
                        <p>ReportCaster was a product in itself. So huge and so powerful. One customer had 13 million schedules running every day. I thought — that&apos;s some powerful shit.</p>
                    }
                >
                    {/* 5→1 Animation */}
                    <ScatterConverge />

                    <BentoGrid className="mt-12">
                        {/* Legacy Screenshots */}
                        <div className="flex items-end justify-between border-b border-white/10 pb-4 mb-8 mt-8">
                            <h3 className="text-xl md:text-2xl font-bold text-white tracking-widest uppercase">Legacy Context</h3>
                        </div>
                        <BentoRow layout="33/33/33">
                            <ImageTile src="/images/case-study/ReportCaster/RC legacy schedule dialog properties.png" alt="Schedule Workflow" caption="Buried under 4 clicks" />
                            <ImageTile src="/images/case-study/ReportCaster/RC legacy distribution list UI.png" alt="Distribution Lists" caption="Buried under 4 clicks" delay={0.06} />
                            <ImageTile src="/images/case-study/ReportCaster/RC legacy access list UI.png" alt="Access Lists" caption="Buried under 4 clicks" delay={0.12} />
                        </BentoRow>
                        <BentoRow layout="50/50">
                            <ImageTile src="/images/case-study/ReportCaster/RC legacy explorer.png" alt="RC Explorer" caption="Hidden in hamburger menu" delay={0.18} />
                            <ImageTile src="/images/case-study/ReportCaster/RC legacy admin status.png" alt="RC Status / Admin" caption="Buried inside Management Center → Admin Console" delay={0.24} />
                        </BentoRow>

                        {/* Sketches */}
                        <div className="flex items-end justify-between border-b border-white/10 pb-4 mb-8 mt-16">
                            <h3 className="text-xl md:text-2xl font-bold text-white tracking-widest uppercase">Mapping the chaos</h3>
                            <a href="/assets/rc-sketchbook.pdf" target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono text-[var(--accent-teal)] border border-[var(--accent-teal)]/30 px-4 py-2 rounded-full hover:bg-[var(--accent-teal)]/10 transition-colors flex items-center gap-2">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                VIEW PDF
                            </a>
                        </div>
                        <BentoRow layout="full">
                            <CarouselTile
                                delay={0.1}
                                autoPlay={true}
                                interval={2000}
                                images={[
                                    { src: "/images/case-study/ReportCaster/process/rc-sketchbook_Page_01_Image_0001.jpg", alt: "Sketch 1" },
                                    { src: "/images/case-study/ReportCaster/process/rc-sketchbook_Page_04_Image_0001.jpg", alt: "Sketch 2" },
                                    { src: "/images/case-study/ReportCaster/process/rc-sketchbook_Page_06_Image_0001.jpg", alt: "Sketch 3" },
                                    { src: "/images/case-study/ReportCaster/process/rc-sketchbook_Page_09_Image_0001.jpg", alt: "Sketch 4" },
                                    { src: "/images/case-study/ReportCaster/process/rc-sketchbook_Page_12_Image_0001.jpg", alt: "Sketch 5" },
                                    { src: "/images/case-study/ReportCaster/process/rc-sketchbook_Page_14_Image_0001.jpg", alt: "Sketch 6" }
                                ]}
                            />
                        </BentoRow>

                        {/* Consolidation Map */}
                        <BentoRow layout="full">
                            <ImageTile
                                src="/images/case-study/ReportCaster/ReportCaster Basic Map Workflow.png"
                                alt="System Consolidation Map"
                                caption="5 scattered subsystems → 1 unified model"
                                delay={0.1}
                            />
                        </BentoRow>
                    </BentoGrid>
                </CinematicScene>
            </div>


            {/* ═══════════════════════════════════════════════
                ACT IV — TWO REJECTIONS. ONE BREAKTHROUGH.
               ═══════════════════════════════════════════════ */}
            {section4 && (
                <div className="relative z-20 bg-[var(--bg-cinematic)]" id="act-iv">
                    <CinematicScene
                        title="Two Rejections. One Breakthrough."
                        body={
                            <p>I thought — let&apos;s create it like a unified product, with similar consistency. Beautiful. Rejected. Created a plugin version. I loved it the most. Also rejected.</p>
                        }
                    >
                        <BentoGrid>
                            {/* V1 — 30/70 */}
                            <EyebrowLabel>Version 1</EyebrowLabel>
                            <BentoRow layout="30/70">
                                <TextTile>
                                    <h4 className="text-white font-bold text-lg mb-3">V1: Independent Product</h4>
                                    <p className="text-zinc-400 font-light leading-relaxed mb-4">
                                        I created a fully independent version. Beautiful. Looked exactly like the rest of the product. Seamless and easy to use.
                                    </p>
                                    <RejectionMark />
                                    <p className="text-zinc-500 font-light text-sm italic">
                                        &ldquo;That&apos;s not the direction. They want the HUB to be central.&rdquo;
                                    </p>
                                </TextTile>
                                <CarouselTile
                                    images={(section4.v1Data?.images || []).map(img => ({
                                        src: img.src,
                                        alt: img.alt,
                                        caption: img.alt,
                                    }))}
                                />
                            </BentoRow>

                            {/* V2 — 30/70 */}
                            <div className="mt-8">
                                <EyebrowLabel>Version 2</EyebrowLabel>
                            </div>
                            <BentoRow layout="30/70">
                                <TextTile>
                                    <h4 className="text-white font-bold text-lg mb-3">V2: Plugin in the Hub</h4>
                                    <p className="text-zinc-400 font-light leading-relaxed mb-4">
                                        I created a version where the entire independent version was integrated in the HUB in a plugin form. I loved this version the most.
                                    </p>
                                    <RejectionMark />
                                    <p className="text-zinc-500 font-light text-sm italic">
                                        &ldquo;Too much to create a new plugin. Too much engineering effort.&rdquo;
                                    </p>
                                </TextTile>
                                <CarouselTile
                                    images={(section4.v2Data?.images || []).map(img => ({
                                        src: img.src,
                                        alt: img.alt,
                                        caption: img.alt,
                                    }))}
                                    delay={0.1}
                                />
                            </BentoRow>
                        </BentoGrid>
                    </CinematicScene>

                    {/* Pull Quote — the pivot moment */}
                    <PullQuote>
                        How does the platform WANT workflows to behave?
                    </PullQuote>

                    {/* V3 — The Breakthrough */}
                    <div className="w-full max-w-[1440px] mx-auto px-6 md:px-16">
                        <PlusIconTree branches={['Schedule Dialog', 'Distribution List', 'Access List']} />

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-center max-w-2xl mx-auto mb-16"
                        >
                            <p className="text-zinc-300 font-light leading-relaxed mb-4">
                                I decided to add &ldquo;Create Schedule&rdquo; to the Plus menu. A dialog box in the HUB. Same for distribution and access lists. Explorer integrated in the home view. Admin gets its own tab in the management center.
                            </p>
                            <p className="text-white font-bold text-lg">There it was — the final workflow of ReportCaster.</p>
                        </motion.div>

                        {/* Shipped screens — organized as Story Deck */}
                        <BentoGrid className="space-y-16 md:space-y-24 mt-12">
                            {/* Schedule Story */}
                            <BentoRow layout="30/70">
                                <TextTile accent="teal">
                                    <h4 className="text-white font-bold text-xl md:text-2xl mb-4">Unifying the Setup</h4>
                                    <p className="text-zinc-400 font-light leading-relaxed">
                                        Instead of separating basic scheduling and advanced settings across disjointed forms, I built a single intelligent dialog. It feels lightweight out of the gate but progressively scales up in capability, adapting directly to user requirements natively from the Hub.
                                    </p>
                                </TextTile>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <ImageTile src="/images/case-study/ReportCaster/Initiating ReportCaster from the HUB.png" alt="Hub + menu" caption="Initiated right from the + Menu" delay={0.1} />
                                    <ImageTile src="/images/case-study/ReportCaster/Schedule Dialog - Properties.png" alt="Schedule Properties" caption="Unified, progressive creation flow" delay={0.2} />
                                </div>
                            </BentoRow>

                            {/* Recurrence Story */}
                            <BentoRow layout="30/70">
                                <TextTile accent="teal" delay={0.1}>
                                    <h4 className="text-white font-bold text-xl md:text-2xl mb-4">A Natural Language System</h4>
                                    <p className="text-zinc-400 font-light leading-relaxed">
                                        Cryptic legacy codes were replaced with human-readable, auto-generating sentence summaries. The recurrence engine protects users from configuration errors using smart inline validation, hiding complexity like blackout days until absolutely needed.
                                    </p>
                                </TextTile>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                                    <div className="col-span-1 md:col-span-2">
                                        <ImageTile src="/images/case-study/ReportCaster/New SD - Recurrence - Weekly.png" alt="Recurrence Weekly" caption="Natural language summary auto-generates" delay={0.2} />
                                    </div>
                                    <ImageTile src="/images/case-study/ReportCaster/New SD - Recurrence - Monthly - Days of the week.png" alt="Monthly recurrence" caption="Monthly pattern granularity" delay={0.3} />
                                    <ImageTile src="/images/case-study/ReportCaster/New SD - Recurrence - Validation Error.png" alt="Validation Error" caption="Instant inline semantic verification" delay={0.4} />
                                </div>
                            </BentoRow>

                            {/* Distribution & Access Story */}
                            <BentoRow layout="30/70">
                                <TextTile accent="teal" delay={0.1}>
                                    <h4 className="text-white font-bold text-xl md:text-2xl mb-4">Elevating Access & Control</h4>
                                    <p className="text-zinc-400 font-light leading-relaxed">
                                        Managing distribution channels and security was previously an afterthought requiring complex navigation. We elevated them into first-class searchable assets. Whether you&apos;re configuring a network directory or an internal access list, the interaction paradigm remains identical.
                                    </p>
                                </TextTile>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <ImageTile src="/images/case-study/ReportCaster/Distribution List starting point.png" alt="DL Start" caption="Distribution Lists as first-class objects" delay={0.2} />
                                    <ImageTile src="/images/case-study/ReportCaster/Access List - Current List+context menu options.png" alt="AL Current" caption="Consistent context menu management" delay={0.3} />
                                </div>
                            </BentoRow>

                            {/* Job Log Story */}
                            <BentoRow layout="30/70">
                                <TextTile accent="teal" delay={0.1}>
                                    <h4 className="text-white font-bold text-xl md:text-2xl mb-4">Contextual Job Diagnostics</h4>
                                    <p className="text-zinc-400 font-light leading-relaxed">
                                        Historically, running job logs popped out as completely detached web pages spanning thousands of rows of code. By designing a native embedded viewer with filtering and deep search directly within the UI, diagnosing scheduling failures became an instant, seamless action.
                                    </p>
                                </TextTile>
                                <div className="h-full">
                                    <ImageTile src="/images/case-study/ReportCaster/Job log dialog.png" alt="Job Log Dialog" caption="Fully embedded contextual log analysis" delay={0.2} />
                                </div>
                            </BentoRow>

                            {/* Hub Explorer Story */}
                            <BentoRow layout="30/70">
                                <TextTile accent="teal" delay={0.1}>
                                    <h4 className="text-white font-bold text-xl md:text-2xl mb-4">The Unified Dashboard</h4>
                                    <p className="text-zinc-400 font-light leading-relaxed">
                                        Finally, the overarching environment. The ReportCaster Explorer aggregates schedules, access lists, and distribution rules in a single native Hub view. Administrators get dedicated, high-level status monitoring without jumping into an entirely separate enterprise module.
                                    </p>
                                </TextTile>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <ImageTile src="/images/case-study/ReportCaster/ReportCaster Explorer.png" alt="RC Explorer" caption="A unified asset overview" delay={0.2} />
                                    <ImageTile src="/images/case-study/ReportCaster/ReportCaster Status (Admin).png" alt="RC Admin" caption="Dedicated administrative monitoring" delay={0.3} />
                                </div>
                            </BentoRow>
                        </BentoGrid>
                    </div>
                </div>
            )}


            {/* ═══════════════════════════════════════════════
                ACT V — I ONBOARDED 20 PEOPLE.
               ═══════════════════════════════════════════════ */}
            <div className="relative z-20 bg-[#0a0f0f]" id="act-v">
                <CinematicScene
                    title="I Onboarded 20 People."
                    body={
                        <p>Hundreds of screens done. But the people who were going to work with me — lead architect, lead engineer, core engineers, QA, new PM — they were unaware of ReportCaster.</p>
                    }
                >
                    <BentoGrid>
                        {/* Row 1 — First contacts */}
                        <BentoRow layout="50/50">
                            <TextTile>
                                <OnboardingPath roles={[
                                    { name: 'Me', abbr: 'ME', active: true },
                                    { name: 'Lead Arch', abbr: 'LA' },
                                    { name: 'Lead Eng', abbr: 'LE' }
                                ]} />
                                <p className="text-zinc-300 font-light leading-relaxed">
                                    The first people I onboarded were the lead architect and the lead engineer. Design discussions were finalized with them.
                                </p>
                            </TextTile>
                            <TextTile delay={0.1}>
                                <OnboardingPath roles={[
                                    { name: 'Eng Team', abbr: 'EN' },
                                    { name: 'Product', abbr: 'PM' },
                                    { name: 'QA Team', abbr: 'QA' },
                                    { name: 'Sys Docs', abbr: 'DC' }
                                ]} />
                                <p className="text-zinc-300 font-light leading-relaxed">
                                    Then came the entire group of engineers, new PM, the QA team, the documentation team. Dozens of demos of the old and new ReportCaster to everyone.
                                </p>
                            </TextTile>
                        </BentoRow>

                        {/* Row 2 — The grind + trust */}
                        <BentoRow layout="50/50">
                            <TextTile delay={0.15}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex gap-1">
                                        <div className="px-2 py-1 rounded text-[9px] font-mono text-white/30 border border-white/10">RC</div>
                                        <div className="px-2 py-1 rounded text-[9px] font-mono text-white/30 border border-white/10">ML</div>
                                    </div>
                                    <span className="text-[10px] text-zinc-600">×</span>
                                    <div className="w-6 h-6 rounded-full border border-[var(--accent-teal)]/30 flex items-center justify-center">
                                        <span className="text-[8px] font-mono text-[var(--accent-teal)]/60">Me</span>
                                    </div>
                                </div>
                                <p className="text-zinc-300 font-light leading-relaxed">
                                    I was part of another feature team for ML. Managing both projects simultaneously. With a 1-year-old at home. All day.
                                </p>
                            </TextTile>
                            <TextTile delay={0.2}>
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex gap-0.5">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-5 h-5 rounded-full border border-white/10" />
                                        ))}
                                    </div>
                                    <span className="text-[10px] text-zinc-600 font-mono">→ 1 feature</span>
                                    <span className="text-zinc-600 mx-1">|</span>
                                    <div className="w-5 h-5 rounded-full border border-[var(--accent-teal)]/30" />
                                    <span className="text-[10px] text-[var(--accent-teal)] font-mono">→ 2 features</span>
                                </div>
                                <p className="text-zinc-300 font-light leading-relaxed">
                                    3 other designers working on one feature. Here I was, working on two features at the same time. That said something about the trust I had from leadership.
                                </p>
                            </TextTile>
                        </BentoRow>

                        {/* Row 3 — Handoff */}
                        <BentoRow layout="full">
                            <TextTile delay={0.25}>
                                <KnowledgeTransfer />
                                <p className="text-zinc-300 font-light leading-relaxed">
                                    I borrowed one junior designer. I onboarded her and made sure she knew everything I did. Eventually I left the team. Let that designer and another one take over. My job was mainly done — I had done all the heavy lifting.
                                </p>
                            </TextTile>
                        </BentoRow>
                    </BentoGrid>
                </CinematicScene>

                <PullQuote>
                    By the time I left the team, the senior engineers who&apos;d worked for decades — they&apos;d become my family. They were no longer intimidating. I had earned respect and trust from them. They valued my opinion. I was the youngest in the room with an unspoken authority on the experience of RC.
                </PullQuote>
            </div>


            {/* ═══════════════════════════════════════════════
                ACT VI — POWERING 20M+ SCHEDULES
               ═══════════════════════════════════════════════ */}
            <div className="relative z-20 bg-[var(--bg-cinematic)]" id="act-vi">
                <CinematicScene
                    title="Powering 20M+ Schedules"
                    body={
                        <p>Shipped. From 4 clicks to 1. No more individual browser tabs. Everything smoothly integrated within the hub ecosystem. Customers noticed.</p>
                    }
                >
                    <BentoGrid>
                        {/* Stats row */}
                        <BentoRow layout="full">
                            <ImpactClimax />
                        </BentoRow>

                        {/* Before/After Videos */}
                        {data.prototypeMedia?.beforeAfter && (
                            <BentoRow layout="50/50">
                                <div className="rounded-xl overflow-hidden aspect-[16/10]">
                                    <video
                                        src={data.prototypeMedia.beforeAfter.before.videoUrl}
                                        poster={data.prototypeMedia.beforeAfter.before.videoPoster}
                                        controls playsInline preload="none"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="rounded-xl overflow-hidden aspect-[16/10] relative">
                                    <video
                                        src={data.prototypeMedia.beforeAfter.after.videoUrl}
                                        poster={data.prototypeMedia.beforeAfter.after.videoPoster}
                                        controls playsInline preload="none"
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-3 right-3 bg-[var(--accent-teal)] text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Shipped</div>
                                </div>
                            </BentoRow>
                        )}

                        {/* ImpactDiff */}
                        <BentoRow layout="full">
                            <ImpactDiff
                                beforeImage="/images/case-study/ReportCaster/Before.png"
                                afterImage="/images/case-study/ReportCaster/After.png"
                                beforeLabel="Legacy UI"
                                afterLabel="Redesign"
                                beforeTitle="legacy_report.exe"
                                afterTitle="modern_hub.tsx"
                                className="rounded-xl shadow-2xl"
                            />
                        </BentoRow>

                        {/* Validation */}
                        <BentoRow layout="50/50">
                            <TextTile delay={0.1}>
                                <VideoGrid />
                                <p className="text-zinc-300 font-light leading-relaxed">
                                    Customer feedback was extremely positive. In a virtual user group I was hosting, a customer praised my work and said he&apos;s looking forward for what&apos;s next.
                                </p>
                            </TextTile>
                            <TextTile delay={0.2}>
                                <div className="flex gap-1 mb-4">
                                    {['v1.0', 'v1.1', 'v2.0', '...'].map((v, i) => (
                                        <div key={i} className="px-2 py-0.5 rounded text-[8px] font-mono text-zinc-600 border border-white/5">{v}</div>
                                    ))}
                                </div>
                                <p className="text-zinc-300 font-light leading-relaxed">
                                    What my revamped experience did was expand room for additional new features that the PM went on to add after the initial launch. I designed for the future, allowing room for more without restricting anything.
                                </p>
                            </TextTile>
                        </BentoRow>
                    </BentoGrid>
                </CinematicScene>
            </div>


            {/* ═══════════════════════════════════════════════
                ✦ REFLECTION — WHAT THIS PROJECT MADE ME
               ═══════════════════════════════════════════════ */}
            <div className="relative z-20 bg-[var(--bg-cinematic)]" id="act-reflection">
                <CinematicScene
                    title="What This Project Made Me"
                    body={
                        <p>I won some and I lost some with RC, but I grew immensely. I did things I never did before. I matured. I learned leadership.</p>
                    }
                >
                    <BentoGrid>
                        {/* Peer Reviews */}
                        {data.reflection?.people && data.reflection.people.length > 0 && (
                            <BentoRow layout="50/50">
                                {data.reflection.people.map((person: { quote: string; name: string; role: string; initials?: string }, i: number) => (
                                    <TextTile key={i} delay={i * 0.1}>
                                        <div className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center mb-4">
                                            <span className="text-[10px] font-mono text-white/40">{person.initials || person.name.slice(0, 2).toUpperCase()}</span>
                                        </div>
                                        <p className="text-zinc-200 italic font-light leading-relaxed mb-4">&ldquo;{person.quote}&rdquo;</p>
                                        <p className="text-xs text-zinc-500 font-mono uppercase tracking-wider">— {person.name}, {person.role}</p>
                                    </TextTile>
                                ))}
                            </BentoRow>
                        )}

                        {/* Retrospective */}
                        {data.reflection?.retrospective && (
                            <BentoRow layout="50/50">
                                <TextTile>
                                    <span className="text-[10px] text-[var(--accent-teal)] font-mono uppercase tracking-widest mb-2 block">What I&apos;d Push Harder For</span>
                                    <h4 className="text-white font-bold text-xl mb-3">{data.reflection.retrospective.pushHarder.title}</h4>
                                    <p className="text-zinc-400 font-light text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: data.reflection.retrospective.pushHarder.content }} />
                                </TextTile>
                                <TextTile delay={0.1}>
                                    <span className="text-[10px] text-[var(--accent-teal)] font-mono uppercase tracking-widest mb-2 block">Future Plans</span>
                                    <h4 className="text-white font-bold text-xl mb-3">{data.reflection.retrospective.doNext.title}</h4>
                                    <p className="text-zinc-400 font-light text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: data.reflection.retrospective.doNext.content }} />
                                </TextTile>
                            </BentoRow>
                        )}
                    </BentoGrid>
                </CinematicScene>

                {/* Closing */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full max-w-[1440px] mx-auto px-6 md:px-16 py-16 md:py-24 text-center"
                >
                    <div className="max-w-3xl mx-auto">
                        <div className="text-[var(--accent-teal)] text-4xl mb-6">&ldquo;</div>
                        <p className="text-xl md:text-2xl text-white font-light leading-relaxed italic mb-8">
                            From hearing from customer support and seeing tickets where our customers were hacking their way around the UI — to shipping an experience that made onboarding and training easy for new users and made life easy for existing users and getting praise and excitement from customers about upcoming things for RC.
                        </p>
                        <p className="text-xl md:text-2xl text-white font-bold">
                            I had never felt so proud of myself.
                        </p>
                        <div className="mt-8 pt-8 border-t border-white/5">
                            <p className="text-lg text-zinc-400 font-light italic">RC made me the design leader I am today.</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

'use client'

/**
 * DSMLFullContent — DSML/IQ Plugin full-view content in the cinematic bento pattern.
 * All images, data, and proof preserved. Copy tightened to 30-35 words per block.
 */

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { CaseStudyData } from '@/types/caseStudy'
import CinematicScene from './CinematicScene'
import SystemIndex from '@/components/case-study/SystemIndex'
import {
    BentoGrid, BentoRow, ImageTile, TextTile,
    PullQuote, EyebrowLabel, CarouselTile,
} from './BentoGrid'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

/* ─────────────────────────────────────────────────
   BEFORE-STATE NAVIGATION DIAGRAM
   Shows the two fragmented user paths — stays put.
   No transition. This IS the problem statement.
   ───────────────────────────────────────────────── */
function DSMLNavigationDiagram() {
    const [step, setStep] = useState(0)
    const timers = useRef<NodeJS.Timeout[]>([])

    useEffect(() => {
        const t = timers.current
        t.push(setTimeout(() => setStep(1), 400))
        t.push(setTimeout(() => setStep(2), 900))
        t.push(setTimeout(() => setStep(3), 1400))
        t.push(setTimeout(() => setStep(4), 1900))
        t.push(setTimeout(() => setStep(5), 2600))  // verdict
        return () => t.forEach(clearTimeout)
    }, [])

    const node = 'rounded-xl border px-4 py-2.5 md:px-5 md:py-3 text-center font-mono text-xs md:text-sm font-medium whitespace-nowrap'
    const nodeGray = `${node} border-zinc-600 bg-zinc-800/60 text-zinc-300`
    const arrow = 'text-zinc-500/50 font-mono text-lg md:text-xl select-none flex-shrink-0'

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease }}
            className="w-full"
        >
            {/* Header pill */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={step >= 1 ? { opacity: 1 } : {}}
                transition={{ duration: 0.4 }}
                className="text-center mb-8"
            >
                <span className="inline-block font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-rose-400/70 border border-rose-400/20 rounded-full px-4 py-1.5 bg-rose-400/[0.04]">
                    Two Paths — Zero Shared Context
                </span>
            </motion.div>

            {/* Two paths — side by side on desktop, stacked on mobile */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6">

                {/* PATH 1: NLQ & Insights */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={step >= 2 ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, ease }}
                    className="rounded-2xl border border-rose-400/15 bg-rose-400/[0.03] p-5 md:p-6"
                >
                    <p className="font-mono text-[10px] text-rose-400/50 uppercase tracking-[0.2em] mb-4">Path 1 — Finding NLQ or Insights</p>

                    {/* Horizontal flow */}
                    <div className="flex flex-wrap items-center gap-2 md:gap-2.5">
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={step >= 2 ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.3 }} className={nodeGray}>Hub</motion.div>
                        <motion.span initial={{ opacity: 0 }} animate={step >= 2 ? { opacity: 1 } : {}} className={arrow}>→</motion.span>
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={step >= 3 ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.3 }} className={nodeGray}>+ Menu</motion.div>
                        <motion.span initial={{ opacity: 0 }} animate={step >= 3 ? { opacity: 1 } : {}} className={arrow}>→</motion.span>
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={step >= 3 ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.3 }} className={nodeGray}>Explore Data</motion.div>
                        <motion.span initial={{ opacity: 0 }} animate={step >= 4 ? { opacity: 1 } : {}} className={arrow}>→</motion.span>
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={step >= 4 ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.3 }} className="flex gap-1.5">
                            <div className={`${node} border-purple-500/30 bg-purple-500/[0.08] text-purple-300`}>NLQ</div>
                            <div className={`${node} border-teal-500/30 bg-teal-500/[0.08] text-teal-300`}>Insights</div>
                        </motion.div>
                    </div>

                    <motion.p initial={{ opacity: 0 }} animate={step >= 4 ? { opacity: 1 } : {}} transition={{ delay: 0.15 }} className="text-[10px] md:text-xs text-rose-400/40 font-mono mt-4">
                        4 clicks · buried in a popup · side-by-side tabs
                    </motion.p>
                </motion.div>

                {/* PATH 2: ML / Predict Data */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={step >= 2 ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, ease, delay: 0.1 }}
                    className="rounded-2xl border border-rose-400/15 bg-rose-400/[0.03] p-5 md:p-6"
                >
                    <p className="font-mono text-[10px] text-rose-400/50 uppercase tracking-[0.2em] mb-4">Path 2 — Finding Predict Data (ML)</p>

                    {/* Horizontal flow */}
                    <div className="flex flex-wrap items-center gap-2 md:gap-2.5">
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={step >= 2 ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.3 }} className={nodeGray}>Hub</motion.div>
                        <motion.span initial={{ opacity: 0 }} animate={step >= 2 ? { opacity: 1 } : {}} className={arrow}>→</motion.span>
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={step >= 3 ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.3 }} className={nodeGray}>App Dirs</motion.div>
                        <motion.span initial={{ opacity: 0 }} animate={step >= 3 ? { opacity: 1 } : {}} className={arrow}>→</motion.span>
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={step >= 3 ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.3 }} className={nodeGray}>Right-click</motion.div>
                        <motion.span initial={{ opacity: 0 }} animate={step >= 4 ? { opacity: 1 } : {}} className={arrow}>→</motion.span>
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={step >= 4 ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.3 }} className={`${node} border-amber-500/30 bg-amber-500/[0.08] text-amber-300`}>Predict Data</motion.div>
                    </div>

                    <motion.p initial={{ opacity: 0 }} animate={step >= 4 ? { opacity: 1 } : {}} transition={{ delay: 0.15 }} className="text-[10px] md:text-xs text-rose-400/40 font-mono mt-4">
                        4 clicks · completely different path · different mental model
                    </motion.p>
                </motion.div>
            </div>

            {/* Verdict */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={step >= 5 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease }}
                className="text-center mt-8"
            >
                <p className="text-base md:text-lg text-rose-300/70 leading-relaxed">
                    Two separate paths. Two mental models.
                </p>
                <p className="text-lg md:text-xl font-bold text-rose-400 mt-1">
                    No wonder nobody found them.
                </p>
            </motion.div>
        </motion.div>
    )
}


export default function DSMLFullContent({ data }: { data: CaseStudyData }) {
    return (
        <>
            {/* ═══════════════════════════════════════════════
                ACT I — THREE POWERFUL AI FEATURES. NEAR-ZERO ADOPTION.
               ═══════════════════════════════════════════════ */}
            <div className="relative z-20" id="act-1-hook">
                <CinematicScene
                    title="Three Powerful AI Features. Near-Zero Adoption."
                    body={
                        <p>NLQ buried inside &ldquo;Explore Data.&rdquo; Insights in a submenu. ML in a data flow canvas. Millions invested. Nobody could find them.</p>
                    }
                >
                    <BentoGrid className="mt-12">
                        <BentoRow layout="50/50">
                            <TextTile delay={0.1}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg border border-purple-500/20 bg-purple-500/5 flex items-center justify-center">
                                        <span className="text-purple-400 text-lg">∅</span>
                                    </div>
                                    <span className="text-[10px] font-mono text-purple-400/60 uppercase tracking-widest">Invisible Features</span>
                                </div>
                                <p className="text-zinc-200 font-light leading-relaxed">
                                    Three AI features. Three different entry points. Three different mental models. Users didn&apos;t even know they existed.
                                </p>
                            </TextTile>
                            <TextTile delay={0.15}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center">
                                        <span className="text-zinc-400 text-sm font-mono">!</span>
                                    </div>
                                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Not Assigned — Co-Created</span>
                                </div>
                                <p className="text-zinc-200 font-light leading-relaxed">
                                    My PM Karishma and I conceived the Hub together. My Director of Design and Head PM shaped the vision with us. Karishma pitched. VP approved. We owned it end-to-end.
                                </p>
                            </TextTile>
                        </BentoRow>

                        <EyebrowLabel>The Fragmented Landscape</EyebrowLabel>
                        <BentoRow layout="full">
                            <DSMLNavigationDiagram />
                        </BentoRow>
                        <BentoRow layout="50/50">
                            <ImageTile src="/images/case-study/iq-plugin/Explore Data _ NLQ _ Empty State Illustration 1.png" alt="NLQ Empty State" caption="NLQ — buried in 'Explore Data' popup" delay={0.1} />
                            <ImageTile src="/images/case-study/iq-plugin/Insights in HUB - Empty state.png" alt="Insights — hidden alongside NLQ" delay={0.15} />
                        </BentoRow>

                        {data.prototypeMedia?.multiBeforeAfter && (
                            <>
                                <EyebrowLabel>Old Workflows</EyebrowLabel>
                                <BentoRow layout="33/33/33">
                                    {data.prototypeMedia.multiBeforeAfter.before.videos?.map((v, i) => (
                                        <div key={i}>
                                            <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest mb-3">{v.title}</p>
                                            <div className="rounded-xl overflow-hidden aspect-[16/10]">
                                                {v.videoEmbedUrl ? (
                                                    <iframe
                                                        src={v.videoEmbedUrl}
                                                        title={v.title}
                                                        className="w-full h-full"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    />
                                                ) : (
                                                    <video
                                                        src={v.videoUrl}
                                                        poster={v.videoPoster}
                                                        controls playsInline preload="none"
                                                        className="w-full h-full object-contain bg-black"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </BentoRow>
                            </>
                        )}
                    </BentoGrid>
                </CinematicScene>

                <PullQuote>
                    I already owned NLQ, ML, and Insights. IQ was the culmination &mdash; bringing everything I&apos;d built to the front and center of WebFOCUS.
                </PullQuote>
            </div>


            {/* ═══════════════════════════════════════════════
                ACT II — MODERNIZING THE BUILDING BLOCKS
               ═══════════════════════════════════════════════ */}
            <div className="relative z-20" id="act-2-investigation">
                <CinematicScene
                    title="Upgrading the Building Blocks."
                    body={
                        <p>I already owned NLQ and ML. Insights landed in my lap &mdash; same engineering team, same PM, same QA. Before unifying them, I modernized each one individually.</p>
                    }
                >
                    <BentoGrid>
                        <EyebrowLabel>NLQ Redesign</EyebrowLabel>
                        <BentoRow layout="50/50">
                            <ImageTile src="/images/case-study/iq-plugin/NLQ _ Empty State Illustration.png" alt="NLQ Redesigned Empty State" caption="Suggested queries, conversational errors" />
                            <ImageTile src="/images/case-study/iq-plugin/NLQ _ Suggested Questions.png" alt="NLQ Suggested Questions" caption="Zero-intimidation entry point" delay={0.1} />
                        </BentoRow>
                        <BentoRow layout="50/50">
                            <ImageTile src="/images/case-study/iq-plugin/NLQ _ Results View.png" alt="NLQ Results" caption="AI-generated chart from natural language" delay={0.15} />
                            <ImageTile src="/images/case-study/iq-plugin/NLQ _ Empty State Illustration - Error Screen with Back Button.png" alt="NLQ Error Handling" caption="Conversational errors — not stack traces" delay={0.2} />
                        </BentoRow>

                        <EyebrowLabel>Insights Redesign</EyebrowLabel>
                        <BentoRow layout="50/50">
                            <ImageTile src="/images/case-study/iq-plugin/Insights in HUB - Results view.png" alt="Insights Results" caption="Auto-generated insight cards" delay={0.1} />
                            <ImageTile src="/images/case-study/iq-plugin/Insights - Results - Tile View 1.png" alt="Insights Tile View" caption="Scannable card-based results" delay={0.15} />
                        </BentoRow>
                    </BentoGrid>
                </CinematicScene>

                <PullQuote>
                    Same PM. Same engineers. Same designer. NLQ, Insights, ML &mdash; I&apos;d modernized each one. IQ brought them all together. The culmination of everything I&apos;d pushed for.
                </PullQuote>
            </div>


            {/* ═══════════════════════════════════════════════
                ACT III — ARCHITECTURE BEFORE TICKETS
               ═══════════════════════════════════════════════ */}
            <div className="relative z-20" id="act-3-architecture">
                <CinematicScene
                    title="Architecture Before Tickets."
                    body={
                        <p>I pushed for things never done in the org. Karishma wrote tickets after seeing my mockups. 3&ndash;4 meetings a week across timezones &mdash; architecture already mapped before anyone asked.</p>
                    }
                >
                    <BentoGrid>
                        {/* After workflow — the elegant solution */}
                        <EyebrowLabel>The Solution — One Click</EyebrowLabel>
                        <BentoRow layout="full">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, ease }}
                                className="rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.03] p-5 md:p-6"
                            >
                                <p className="font-mono text-[10px] text-emerald-400/50 uppercase tracking-[0.2em] mb-4 text-center">After — Everything Under One Roof</p>
                                <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
                                    <div className="rounded-xl border border-zinc-600 bg-zinc-800/60 text-zinc-200 px-5 py-3 font-mono text-sm md:text-base font-medium">Hub</div>
                                    <span className="text-emerald-400/60 font-mono text-xl">→</span>
                                    <div className="rounded-2xl border-2 border-emerald-400/30 bg-emerald-400/[0.04] px-6 py-4 flex items-center gap-4 flex-wrap justify-center">
                                        <span className="font-mono text-sm font-bold text-emerald-300">IQ Plugin</span>
                                        <span className="text-emerald-400/40 hidden md:inline">│</span>
                                        <div className="flex gap-2">
                                            <div className="rounded-lg border border-purple-500/30 bg-purple-500/[0.08] text-purple-300 px-3 py-1.5 font-mono text-xs">NLQ</div>
                                            <div className="rounded-lg border border-teal-500/30 bg-teal-500/[0.08] text-teal-300 px-3 py-1.5 font-mono text-xs">Insights</div>
                                            <div className="rounded-lg border border-amber-500/30 bg-amber-500/[0.08] text-amber-300 px-3 py-1.5 font-mono text-xs">ML</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-center gap-10 md:gap-14 mt-6">
                                    <div className="text-center"><div className="text-xl font-bold text-emerald-300 font-mono">1</div><div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Click</div></div>
                                    <div className="text-center"><div className="text-xl font-bold text-emerald-300 font-mono">3→1</div><div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Entry Points</div></div>
                                    <div className="text-center"><div className="text-xl font-bold text-emerald-300 font-mono">0</div><div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">New Infra</div></div>
                                </div>
                            </motion.div>
                        </BentoRow>

                        {/* Flowchart + One Entry Point */}
                        <EyebrowLabel>IQ Architecture</EyebrowLabel>
                        <BentoRow layout="30/70">
                            <TextTile accent="teal">
                                <h4 className="text-white font-bold text-lg mb-3">One Entry Point</h4>
                                <p className="text-zinc-400 font-light leading-relaxed">
                                    Smart integration inside the existing Hub. No new infrastructure needed. Three scattered menus → one destination, one mental model.
                                </p>
                            </TextTile>
                            <ImageTile src="/images/case-study/iq-plugin/IQ Structure flowchart.png" alt="IQ Plugin Architecture Flowchart" caption="IQ Plugin architecture — NLQ, Insights, and ML under one Hub" />
                        </BentoRow>

                        <EyebrowLabel>Dataset Selection Workflow</EyebrowLabel>
                        <BentoRow layout="full">
                            <ImageTile src="/images/case-study/iq-plugin/IQ Dataset Selection Workflow 2.png" alt="Dataset Selection Workflow" caption="Unified dataset selection workflow" />
                        </BentoRow>

                        {/* Hub structure wireframe */}
                        <EyebrowLabel>Hub Layout</EyebrowLabel>
                        <BentoRow layout="full">
                            <ImageTile src="/images/case-study/iq-plugin/Structure Layout in HUB 1.png" alt="Hub Structure Layout" caption="How IQ fits into the existing Hub layout" />
                        </BentoRow>


                        {/* Sketches — full width first */}
                        <EyebrowLabel>Sketches &amp; Early Concepts</EyebrowLabel>
                        <BentoRow layout="full">
                            <ImageTile src="/images/case-study/iq-plugin/hand-drawn-sketches.png" alt="Hand-drawn Sketches" caption="Early concept sketching" />
                        </BentoRow>
                        <BentoRow layout="full">
                            <ImageTile src="/images/case-study/iq-plugin/IQ Wireframes.png" alt="IQ Wireframes" caption="Architecture wireframes" delay={0.1} />
                        </BentoRow>

                        {/* Responsive design */}
                        <EyebrowLabel>Responsive Design</EyebrowLabel>
                        <BentoRow layout="full">
                            <ImageTile src="/images/case-study/iq-plugin/Mockups for IQ Plugin Reponsive UI 1.png" alt="Responsive Mockups" caption="First fully responsive Hub app" delay={0.1} />
                        </BentoRow>
                    </BentoGrid>
                </CinematicScene>
            </div>


            {/* ═══════════════════════════════════════════════
                ACT IV — FOUR ITERATIONS TO THE FINAL HUB
               ═══════════════════════════════════════════════ */}
            <div className="relative z-20" id="act-4-craft">
                <CinematicScene
                    title="Four Iterations to the Final Hub."
                    body={
                        <p>V1 too dense. V2 too passive. V3 competed with Hub navigation. V4 &mdash; clean icon tiles &mdash; landed.</p>
                    }
                >
                    <BentoGrid>
                        <EyebrowLabel>Design Iterations</EyebrowLabel>

                        {/* Collage + V1 (Early concept) */}
                        <BentoRow layout="50/50">
                            <ImageTile src="/images/case-study/iq-plugin/IQ plugin - visual - 3 in 1 IQ Hub.png" alt="IQ Hub Concept — NLQ, Insights, ML" caption="IQ Hub concept: NLQ + Insights + ML in one place" />
                            <div>
                                <p className="font-mono text-xs text-rose-400/60 uppercase tracking-[0.2em] mb-2">V1 — Too Dense</p>
                                <ImageTile src="/images/case-study/iq-plugin/Early concept - 1.png" alt="V1 — Early Concept" caption="First concept — too much information" delay={0.1} />
                            </div>
                        </BentoRow>

                        {/* V2 + V3 side by side */}
                        <BentoRow layout="50/50">
                            <div>
                                <p className="font-mono text-xs text-amber-400/60 uppercase tracking-[0.2em] mb-2">V2 — Too Passive</p>
                                <ImageTile src="/images/case-study/iq-plugin/Mid-Iteration.png" alt="V2 — Mid Iteration" caption="Second iteration — too sparse" />
                            </div>
                            <div>
                                <p className="font-mono text-xs text-amber-400/60 uppercase tracking-[0.2em] mb-2">V3 — Competed with Hub Nav</p>
                                <ImageTile src="/images/case-study/iq-plugin/Mid-Iteration-1.png" alt="V3 — Competed with Hub Navigation" caption="Third iteration — competed with Hub navigation" delay={0.1} />
                            </div>
                        </BentoRow>

                        {/* V4 — Final shipped + Navigation Fight */}
                        <BentoRow layout="30/70">
                            <TextTile accent="teal">
                                <p className="font-mono text-xs text-emerald-400/60 uppercase tracking-[0.2em] mb-3">V4 — Shipped ✔</p>
                                <h4 className="text-white font-bold text-xl md:text-2xl mb-4">The Navigation Fight</h4>
                                <p className="text-zinc-400 font-light leading-relaxed">
                                    The lead architect &mdash; 20+ years &mdash; wanted list views. The WebFOCUS architect &mdash; 35+ years &mdash; backed him. My argument: lists are exactly why nobody found these features. Large tiles give immediate context.
                                </p>
                            </TextTile>
                            <ImageTile src="/images/case-study/iq-plugin/Final Look.png" alt="V4 — Final IQ Discover Page — Shipped" caption="The final IQ Discover page — shipped" delay={0.1} />
                        </BentoRow>

                        {/* Final IQ mockups — each feature with its own heading */}
                        <EyebrowLabel>Insights in IQ</EyebrowLabel>
                        <BentoRow layout="50/50">
                            <ImageTile src="/images/case-study/iq-plugin/IQ - Insights _ Empty State 1.png" alt="Insights Empty State" caption="Insights: Empty state" delay={0.1} />
                            <ImageTile src="/images/case-study/iq-plugin/IQ - Insights _ Data Selected 1.png" alt="Insights Data Selected" caption="Insights: Data selected" delay={0.15} />
                        </BentoRow>
                        <BentoRow layout="full">
                            <ImageTile src="/images/case-study/iq-plugin/IQ - Insights - Tile View 1.png" alt="Insights Tile View" caption="Insights: Scannable card-based results" delay={0.2} />
                        </BentoRow>

                        <EyebrowLabel>NLQ in IQ</EyebrowLabel>
                        <BentoRow layout="50/50">
                            <ImageTile src="/images/case-study/iq-plugin/IQ - Ask a Question _ Empty State 1.png" alt="NLQ Empty State" caption="NLQ: Ask questions in plain English" delay={0.1} />
                            <ImageTile src="/images/case-study/iq-plugin/IQ - Ask a Question _ Data Selected 1.png" alt="NLQ Data Selected" caption="NLQ: Data selected state" delay={0.15} />
                        </BentoRow>
                        <BentoRow layout="full">
                            <ImageTile src="/images/case-study/iq-plugin/IQ - Ask a Question - Vertical Stacked Bar 1.png" alt="NLQ Results" caption="NLQ: AI-generated chart" delay={0.2} />
                        </BentoRow>

                        <EyebrowLabel>ML in IQ</EyebrowLabel>
                        <BentoRow layout="50/50">
                            <ImageTile src="/images/case-study/iq-plugin/IQ - Predict Data - Train Models - landing page - model tile view.png" alt="ML Landing" caption="Predict Data landing — inside IQ" delay={0.1} />
                            <ImageTile src="/images/case-study/iq-plugin/IQ - Predict Data - Train Model Workflow - Compare models.png" alt="Compare Models" caption="Compare models in context" delay={0.15} />
                        </BentoRow>
                        <BentoRow layout="50/50">
                            <ImageTile src="/images/case-study/iq-plugin/IQ - Predict Data - Train Model Workflow - Results - Fitted Values.png" alt="Fitted Values" caption="Model results — fitted values" delay={0.2} />
                            <ImageTile src="/images/case-study/iq-plugin/IQ - Predict Data - Run Model - explanability.png" alt="Explainability" caption="Run model — explainability view" delay={0.25} />
                        </BentoRow>
                        <BentoRow layout="full">
                            <ImageTile src="/images/case-study/iq-plugin/IQ - Predict Data - Run Model - results.png" alt="Run Model Results" caption="Run model — prediction results" delay={0.3} />
                        </BentoRow>

                        <EyebrowLabel>Preview Data in IQ</EyebrowLabel>
                        <BentoRow layout="50/50">
                            <ImageTile src="/images/case-study/iq-plugin/IQ - Preview Data Sample Tab 1.png" alt="Preview Data - Sample" caption="Preview data — sample tab" delay={0.1} />
                            <ImageTile src="/images/case-study/iq-plugin/IQ - Preview Data Key Analysis Tab 1.png" alt="Preview Data - Analysis" caption="Preview data — key analysis" delay={0.15} />
                        </BentoRow>
                        <BentoRow layout="full">
                            <ImageTile src="/images/case-study/iq-plugin/IQ - Preview Data Time-series report tab 1.png" alt="Preview Data - Time Series" caption="Preview data — time series" delay={0.2} />
                        </BentoRow>

                        {data.prototypeMedia?.multiBeforeAfter?.after && (
                            <>
                                <EyebrowLabel>IQ Walkthrough</EyebrowLabel>
                                <BentoRow layout="full">
                                    <div className="rounded-xl overflow-hidden aspect-[16/9]">
                                        <video
                                            src={data.prototypeMedia.multiBeforeAfter.after.videoUrl}
                                            poster={data.prototypeMedia.multiBeforeAfter.after.videoPoster}
                                            controls playsInline preload="none"
                                            className="w-full h-full object-contain bg-black"
                                        />
                                    </div>
                                </BentoRow>
                            </>
                        )}
                    </BentoGrid>
                </CinematicScene>

                <PullQuote>
                    My Director of Design said it best &mdash; bold and fearless. Industry examples. Interaction logic. Visual prototypes. He was fully in my corner, watching me make my own case.
                </PullQuote>
            </div>


            {/* ═══════════════════════════════════════════════
                ACT V — THE ROOM FULL OF VETERANS
               ═══════════════════════════════════════════════ */}
            <div className="relative z-20" id="act-5-team">
                <CinematicScene
                    title="The Room Full of Veterans."
                    body={
                        <p>Director of Engineering. Principal Data Scientist. Head PM. Lead Architect. All decades of tenure. I was 2 years in. Karishma and I were the only new people in the room.</p>
                    }
                >
                    <BentoGrid>
                        <BentoRow layout="50/50">
                            <TextTile className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="flex gap-1.5">
                                        {['20yr', '25yr', '30yr', '35yr'].map((yr) => (
                                            <div key={yr} className="px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-400 border border-white/15 bg-white/5">{yr}</div>
                                        ))}
                                    </div>
                                    <span className="text-sm text-zinc-500 font-medium">vs</span>
                                    <div className="px-3 py-1.5 rounded-lg text-xs font-mono text-[var(--cs-accent)] border border-[var(--cs-accent)]/40 bg-[var(--cs-accent)]/10 font-bold">2yr</div>
                                </div>
                                <h4 className="text-white font-bold text-lg md:text-xl mb-3">Every Meeting, Outnumbered</h4>
                                <p className="text-zinc-300 leading-relaxed text-base">
                                    Veterans with 20 to 35 years at WebFOCUS. My PM and I onboarded together. We pushed the vision together.
                                </p>
                            </TextTile>
                            <TextTile delay={0.1} className="rounded-2xl border border-[var(--cs-accent)]/15 bg-[var(--cs-accent)]/[0.03] p-6 md:p-8">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 rounded-xl border border-[var(--cs-accent)]/30 bg-[var(--cs-accent)]/10 flex items-center justify-center">
                                        <span className="text-[var(--cs-accent)] text-xl">⚔</span>
                                    </div>
                                    <span className="text-sm font-mono text-[var(--cs-accent)]/80 uppercase tracking-widest font-medium">Earned Trust</span>
                                </div>
                                <h4 className="text-white font-bold text-lg md:text-xl mb-3">And They Were Listening</h4>
                                <p className="text-zinc-300 leading-relaxed text-base">
                                    It hit me later &mdash; I was arguing about data flows and ML architecture with people who&apos;d been here for decades. And they were listening.
                                </p>
                            </TextTile>
                        </BentoRow>

                    </BentoGrid>
                </CinematicScene>

                <PullQuote>
                    Two years in. Everyone else &mdash; decades. I set up meetings, drove cross-functional alignment, nudged PMs to collaborate. That wasn&apos;t my job title. It was just what the project needed.
                </PullQuote>
            </div>


            {/* ═══════════════════════════════════════════════
                ACT VI — VISIBILITY WAS THE SOLUTION
               ═══════════════════════════════════════════════ */}
            <div className="relative z-20" id="act-6-outcome">
                <CinematicScene
                    title="Visibility Was the Solution."
                    body={
                        <p>NLQ redesign + Phi-3 model upgrade drove +25% adoption. Customers looked forward to NLQ the most. The Hub brings all of it &mdash; NLQ, Insights, ML &mdash; front and center.</p>
                    }
                >
                    <BentoGrid>
                        <BentoRow layout="50/50">
                            <TextTile>
                                <div className="text-4xl font-bold text-[var(--cs-accent)] mb-3">+25%</div>
                                <p className="text-zinc-200 font-light leading-relaxed">
                                    NLQ adoption from discoverability alone. No feature changes. The highest-leverage design work: making existing features findable.
                                </p>
                            </TextTile>
                            <TextTile delay={0.1}>
                                <div className="text-4xl font-bold text-[var(--cs-accent)] mb-3">3 → 1</div>
                                <p className="text-zinc-200 font-light leading-relaxed">
                                    Scattered tools unified into one Hub. The patterns became the platform&apos;s AI strategy foundation. NLQ + Insights live. Hub implemented — final QA pending at departure.
                                </p>
                            </TextTile>
                        </BentoRow>
                    </BentoGrid>
                </CinematicScene>


                {/* ═══ REFLECTION ═══ */}
                <div className="relative">
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[60vw] h-[600px] bg-[var(--cs-accent)]/3 blur-[200px] rounded-full pointer-events-none" />
                    <CinematicScene
                        title="What This Project Proved"
                        body={
                            <p>We co-created this project as a team. The features didn&apos;t change. The visibility did. That&apos;s the highest-leverage design work there is.</p>
                        }
                    >
                        {data.reflection?.people && data.reflection.people.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                                {data.reflection.people.map((person: { quote: string; name: string; role: string; initials?: string }, i: number) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 24 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                                        className="relative p-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl overflow-hidden group hover:border-[var(--cs-accent)]/20 transition-colors duration-500"
                                    >
                                        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[var(--cs-accent)]/5 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                        <div className="relative z-10">
                                            <div className="w-12 h-12 rounded-full border border-[var(--cs-accent)]/30 bg-[var(--cs-accent)]/5 flex items-center justify-center mb-6">
                                                <span className="text-xs font-mono text-[var(--cs-accent)]">{person.initials || person.name.slice(0, 2).toUpperCase()}</span>
                                            </div>
                                            <p className="text-zinc-200 italic font-light leading-relaxed text-lg mb-6">&ldquo;{person.quote}&rdquo;</p>
                                            <p className="text-xs text-zinc-500 font-mono uppercase tracking-wider">— {person.name}, {person.role}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {/* Personal reflection — maternity leave */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] mb-16"
                        >
                            <span className="text-[10px] font-mono text-[var(--cs-accent)]/70 uppercase tracking-widest mb-4 block">What Came Back With Me</span>
                            <p className="text-zinc-200 font-light leading-relaxed text-lg">
                                When I returned from maternity leave, the engineering team shared that they valued the way I approached design &mdash; understanding the system, asking the right questions, making informed decisions. The experience reinforced something I already believed: <span className="text-[var(--cs-accent)] font-medium">context isn&apos;t transferable through documentation alone. It comes from genuine curiosity and investment in the problem.</span>
                            </p>
                        </motion.div>

                        {data.reflection?.retrospective && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                    className="p-6 rounded-xl border-l-2 border-amber-500/40 bg-white/[0.02]"
                                >
                                    <span className="text-[10px] text-amber-500/80 font-mono uppercase tracking-widest mb-3 block">What I&apos;d Push Harder For</span>
                                    <h4 className="text-white font-bold text-xl mb-3">{data.reflection.retrospective.pushHarder.title}</h4>
                                    <p className="text-zinc-400 font-light text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: data.reflection.retrospective.pushHarder.content }} />
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                    className="p-6 rounded-xl border-l-2 border-[var(--cs-accent)]/40 bg-white/[0.02]"
                                >
                                    <span className="text-[10px] text-[var(--cs-accent)]/80 font-mono uppercase tracking-widest mb-3 block">Future Plans</span>
                                    <h4 className="text-white font-bold text-xl mb-3">{data.reflection.retrospective.doNext.title}</h4>
                                    <p className="text-zinc-400 font-light text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: data.reflection.retrospective.doNext.content }} />
                                </motion.div>
                            </div>
                        )}
                    </CinematicScene>

                    {/* ═══ Next Case Study ═══ */}
                    <SystemIndex currentId="IQ_PLUGIN" />
                </div>
            </div>
        </>
    )
}

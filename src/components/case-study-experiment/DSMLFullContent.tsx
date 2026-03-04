'use client'

/**
 * DSMLFullContent — DSML/IQ Plugin full-view content in the cinematic bento pattern.
 * All images, data, and proof preserved. Copy tightened to 30-35 words per block.
 */

import React from 'react'
import { motion } from 'framer-motion'
import { CaseStudyData } from '@/types/caseStudy'
import CinematicScene from './CinematicScene'
import SystemIndex from '@/components/case-study/SystemIndex'
import {
    BentoGrid, BentoRow, ImageTile, TextTile,
    PullQuote, EyebrowLabel, CarouselTile,
} from './BentoGrid'


export default function DSMLFullContent({ data }: { data: CaseStudyData }) {
    return (
        <>
            {/* ═══════════════════════════════════════════════
                ACT I — THREE POWERFUL AI FEATURES. <5% ADOPTION.
               ═══════════════════════════════════════════════ */}
            <div className="relative z-20 bg-[var(--bg-cinematic)]" id="act-1-hook">
                <CinematicScene
                    title="Three Powerful AI Features. <5% Adoption."
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
                                <p className="text-zinc-300 font-light leading-relaxed">
                                    The problem wasn&apos;t quality — it was visibility. Three separate entry points, three different mental models, zero cross-pollination between features.
                                </p>
                            </TextTile>
                            <TextTile delay={0.15}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center">
                                        <span className="text-zinc-400 text-sm font-mono">!</span>
                                    </div>
                                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Not Assigned — Invented</span>
                                </div>
                                <p className="text-zinc-300 font-light leading-relaxed">
                                    My PM and I seized the opportunity during product consolidation. Dozens of concept mockups. Weekly FigJam sessions across timezones. VP approved.
                                </p>
                            </TextTile>
                        </BentoRow>

                        <EyebrowLabel>The Fragmented Landscape</EyebrowLabel>
                        <BentoRow layout="full">
                            <ImageTile src="/images/case-study/iq-plugin/IQ Structure flowchart.png" alt="IQ Structure Flowchart" caption="Three AI tools scattered across different menus" />
                        </BentoRow>
                        <BentoRow layout="50/50">
                            <ImageTile src="/images/case-study/iq-plugin/Explore Data _ NLQ _ Empty State Illustration 1.png" alt="NLQ Empty State" caption="NLQ — buried in 'Explore Data'" delay={0.1} />
                            <ImageTile src="/images/case-study/iq-plugin/Insights in HUB - Empty state.png" alt="Insights Empty State" caption="Insights — hidden in submenu" delay={0.15} />
                        </BentoRow>
                    </BentoGrid>
                </CinematicScene>

                <PullQuote>
                    This wasn&apos;t on a roadmap. My PM and I saw the opportunity, built the vision, and pitched it. VP approved. We owned it.
                </PullQuote>
            </div>


            {/* ═══════════════════════════════════════════════
                ACT II — MODERNIZING THE BUILDING BLOCKS
               ═══════════════════════════════════════════════ */}
            <div className="relative z-20 bg-[var(--bg-cinematic)]" id="act-2-investigation">
                <CinematicScene
                    title="Terminal UI → Apple UI"
                    body={
                        <p>Before building the Hub, I modernized the building blocks. NLQ and Insights went from terminal-style interfaces to clean, approachable UI.</p>
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
                        <BentoRow layout="full">
                            <ImageTile src="/images/case-study/iq-plugin/Insights Color Palette 1.png" alt="Insights Color Palette" caption="Custom color palette designed for automatic chart generation" delay={0.2} />
                        </BentoRow>

                        <EyebrowLabel>Dataset Selection</EyebrowLabel>
                        <BentoRow layout="50/50">
                            <ImageTile src="/images/case-study/iq-plugin/IQ Dataset Selection Workflow 2.png" alt="Dataset Selection" caption="Unified dataset selection workflow" delay={0.1} />
                            <ImageTile src="/images/case-study/iq-plugin/IQ - Preview Data Sample Tab 1.png" alt="Preview Data - Sample" caption="Preview data — sample tab" delay={0.15} />
                        </BentoRow>
                        <BentoRow layout="50/50">
                            <ImageTile src="/images/case-study/iq-plugin/IQ - Preview Data Key Analysis Tab 1.png" alt="Preview Data - Analysis" caption="Preview data — key analysis" delay={0.2} />
                            <ImageTile src="/images/case-study/iq-plugin/IQ - Preview Data Time-series report tab 1.png" alt="Preview Data - Time Series" caption="Preview data — time series" delay={0.25} />
                        </BentoRow>

                        <EyebrowLabel>ML Workflow Integration</EyebrowLabel>
                        <BentoRow layout="50/50">
                            <ImageTile src="/images/case-study/iq-plugin/IQ - Predict Data - Train Models - landing page - model tile view.png" alt="ML Landing" caption="Predict Data landing page" delay={0.1} />
                            <ImageTile src="/images/case-study/iq-plugin/IQ - Predict Data - Train Model Workflow - Compare models.png" alt="Compare Models" caption="Compare models in context" delay={0.15} />
                        </BentoRow>
                        <BentoRow layout="50/50">
                            <ImageTile src="/images/case-study/iq-plugin/IQ - Predict Data - Train Model Workflow - Results - Fitted Values.png" alt="Fitted Values" caption="Model results — fitted values" delay={0.2} />
                            <ImageTile src="/images/case-study/iq-plugin/IQ - Predict Data - Run Model - explanability.png" alt="Explainability" caption="Run model — explainability view" delay={0.25} />
                        </BentoRow>
                        <BentoRow layout="full">
                            <ImageTile src="/images/case-study/iq-plugin/IQ - Predict Data - Run Model - results.png" alt="Run Model Results" caption="Run model — prediction results" delay={0.3} />
                        </BentoRow>

                        <EyebrowLabel>Persona Research</EyebrowLabel>
                        <BentoRow layout="50/50">
                            <ImageTile src="/images/case-study/iq-plugin/Persona - BI Developer - With Data 1.png" alt="BI Developer Persona" caption="BI Developer — with data context" delay={0.1} />
                            <ImageTile src="/images/case-study/iq-plugin/Persona - Reporting Guru 1.png" alt="Reporting Guru" caption="Reporting Guru persona" delay={0.15} />
                        </BentoRow>
                        <BentoRow layout="50/50">
                            <ImageTile src="/images/case-study/iq-plugin/Persona - Reporting Guru-technical 1.png" alt="Technical Reporting Guru" caption="Technical persona variant" delay={0.2} />
                            <ImageTile src="/images/case-study/iq-plugin/Persona - Techy Analyst 1.png" alt="Techy Analyst" caption="Techy Analyst persona" delay={0.25} />
                        </BentoRow>
                    </BentoGrid>
                </CinematicScene>

                <PullQuote>
                    From Terminal UI to Apple UI. Suggested queries. Conversational errors. Scannable cards. Approachable on the surface, powerful underneath.
                </PullQuote>
            </div>


            {/* ═══════════════════════════════════════════════
                ACT III — ARCHITECTURE BEFORE TICKETS
               ═══════════════════════════════════════════════ */}
            <div className="relative z-20 bg-[var(--bg-cinematic)]" id="act-3-architecture">
                <CinematicScene
                    title="Architecture Before Tickets."
                    body={
                        <p>PM wrote tickets after seeing my mockups. That&apos;s how I operated throughout. I defined the architecture before any tickets existed.</p>
                    }
                >
                    <BentoGrid>
                        <BentoRow layout="30/70">
                            <TextTile accent="teal">
                                <h4 className="text-white font-bold text-lg mb-3">One Entry Point</h4>
                                <p className="text-zinc-400 font-light leading-relaxed">
                                    Smart integration inside the existing Hub. No new infrastructure needed. Three scattered menus → one destination. Learn one, know all three.
                                </p>
                            </TextTile>
                            <ImageTile src="/images/case-study/iq-plugin/Structure Layout in HUB 1.png" alt="Hub Structure Layout" caption="Hub structure — single unified entry" delay={0.1} />
                        </BentoRow>

                        <div className="mt-8 mb-4">
                            <EyebrowLabel>Sketches & Early Concepts</EyebrowLabel>
                        </div>
                        <BentoRow layout="50/50">
                            <ImageTile src="/images/case-study/iq-plugin/hand-drawn-sketches.png" alt="Hand-drawn Sketches" caption="Early concept sketching" />
                            <ImageTile src="/images/case-study/iq-plugin/IQ Wireframes.png" alt="IQ Wireframes" caption="Architecture wireframes" delay={0.1} />
                        </BentoRow>
                        <BentoRow layout="50/50">
                            <ImageTile src="/images/case-study/iq-plugin/Early concept - 1.png" alt="Early Concept" caption="Early Hub concept exploration" delay={0.15} />
                            <ImageTile src="/images/case-study/iq-plugin/Mockups for IQ Plugin Reponsive UI 1.png" alt="Responsive Mockups" caption="First fully responsive Hub app" delay={0.2} />
                        </BentoRow>
                    </BentoGrid>
                </CinematicScene>
            </div>


            {/* ═══════════════════════════════════════════════
                ACT IV — FOUR ITERATIONS TO THE FINAL HUB
               ═══════════════════════════════════════════════ */}
            <div className="relative z-20 bg-[var(--bg-cinematic)]" id="act-4-craft">
                <CinematicScene
                    title="Four Iterations to the Final Hub."
                    body={
                        <p>V1 too dense. V2 too passive. V3 competed with navigation. V4 — clean icon tiles — landed. The biggest fight: tiles vs. lists. I won.</p>
                    }
                >
                    <BentoGrid>
                        <EyebrowLabel>Design Iterations</EyebrowLabel>
                        <BentoRow layout="50/50">
                            <ImageTile src="/images/case-study/iq-plugin/Mid-Iteration.png" alt="Mid Iteration" caption="Mid-iteration — finding the right density" />
                            <ImageTile src="/images/case-study/iq-plugin/Mid-Iteration-1.png" alt="Mid Iteration Variant" caption="Variant exploration — layout options" delay={0.1} />
                        </BentoRow>

                        <BentoRow layout="30/70">
                            <TextTile accent="teal">
                                <h4 className="text-white font-bold text-xl md:text-2xl mb-4">The Navigation Fight</h4>
                                <p className="text-zinc-400 font-light leading-relaxed">
                                    Icon tiles vs. list views. Veteran architects wanted lists. My argument — lists caused the low adoption in the first place. Large tiles gave immediate context. I won.
                                </p>
                            </TextTile>
                            <ImageTile src="/images/case-study/iq-plugin/IQ plugin - visual - 3 in 1 IQ Hub.png" alt="Final DSML Hub" caption="The unified DSML Hub: Ask, Analyze, Predict" delay={0.1} />
                        </BentoRow>

                        <EyebrowLabel>The Complete Hub Experience</EyebrowLabel>
                        <BentoRow layout="50/50">
                            <ImageTile src="/images/case-study/iq-plugin/IQ - Ask a Question _ Empty State 1.png" alt="NLQ Empty State" caption="NLQ: Ask questions in plain English" delay={0.1} />
                            <ImageTile src="/images/case-study/iq-plugin/IQ - Ask a Question - Vertical Stacked Bar 1.png" alt="NLQ Results" caption="NLQ: AI-generated chart" delay={0.15} />
                        </BentoRow>
                        <BentoRow layout="50/50">
                            <ImageTile src="/images/case-study/iq-plugin/IQ - Ask a Question _ Data Selected 1.png" alt="NLQ Data Selected" caption="NLQ: Data selected state" delay={0.2} />
                            <ImageTile src="/images/case-study/iq-plugin/IQ - Insights _ Empty State 1.png" alt="Insights Empty State" caption="Insights: Auto-generated analysis" delay={0.25} />
                        </BentoRow>
                        <BentoRow layout="50/50">
                            <ImageTile src="/images/case-study/iq-plugin/IQ - Insights _ Data Selected 1.png" alt="Insights Data Selected" caption="Insights: Data selected state" delay={0.3} />
                            <ImageTile src="/images/case-study/iq-plugin/IQ - Insights - Tile View 1.png" alt="Insights Tile View" caption="Insights: Scannable card-based results" delay={0.35} />
                        </BentoRow>
                        <BentoRow layout="full">
                            <ImageTile src="/images/case-study/iq-plugin/Final Look.png" alt="Final Hub Look" caption="The final Hub — shipped" delay={0.4} />
                        </BentoRow>

                        {data.prototypeMedia?.multiBeforeAfter && (
                            <>
                                <EyebrowLabel>Before / After Walkthrough</EyebrowLabel>
                                <BentoRow layout="full">
                                    <TextTile accent="teal">
                                        <p className="text-zinc-200 font-light leading-relaxed text-lg">
                                            Three separate workflows → one unified DSML Hub. Compare the existing scattered entry points with the new consolidated experience.
                                        </p>
                                    </TextTile>
                                </BentoRow>
                                <BentoRow layout="33/33/33">
                                    {data.prototypeMedia.multiBeforeAfter.before.videos?.map((v, i) => (
                                        <div key={i}>
                                            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3">{v.title}</p>
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
                    Lists caused the low adoption. Tiles gave immediate context. I fought for tiles against veteran architects. I won.
                </PullQuote>
            </div>


            {/* ═══════════════════════════════════════════════
                ACT V — THE ROOM FULL OF VETERANS
               ═══════════════════════════════════════════════ */}
            <div className="relative z-20 bg-[var(--bg-cinematic)]" id="act-5-team">
                <CinematicScene
                    title="The Room Full of Veterans."
                    body={
                        <p>Director of Engineering, Principal Data Scientist, Head PM, Lead Architect — all decades of tenure. I was 2 years in. I was driving the conversation.</p>
                    }
                >
                    <BentoGrid>
                        <BentoRow layout="50/50">
                            <TextTile>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex gap-1">
                                        {['20yr', '25yr', '30yr', '35yr'].map((yr) => (
                                            <div key={yr} className="px-2 py-1 rounded text-[9px] font-mono text-white/30 border border-white/10">{yr}</div>
                                        ))}
                                    </div>
                                    <span className="text-[10px] text-zinc-600">vs</span>
                                    <div className="px-2 py-1 rounded text-[9px] font-mono text-[var(--cs-accent)] border border-[var(--cs-accent)]/30">2yr</div>
                                </div>
                                <p className="text-zinc-300 font-light leading-relaxed">
                                    Every team meeting was a room full of veterans. The only other new person was my PM. We onboarded together and pushed the vision together.
                                </p>
                            </TextTile>
                            <TextTile delay={0.1}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg border border-[var(--cs-accent)]/20 bg-[var(--cs-accent)]/5 flex items-center justify-center">
                                        <span className="text-[var(--cs-accent)] text-sm">⚔</span>
                                    </div>
                                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Earned Trust</span>
                                </div>
                                <p className="text-zinc-300 font-light leading-relaxed">
                                    Industry examples. Interaction logic. Visual prototypes. My Director of Design trusted me to make my own case. I drove the conversation.
                                </p>
                            </TextTile>
                        </BentoRow>

                        <BentoRow layout="full">
                            <TextTile accent="teal" delay={0.15}>
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 pl-2">
                                    <p className="text-zinc-200 font-light leading-relaxed text-lg">
                                        The conversation that mattered most: integrating ML into the DSML Hub. I fought for myself. I won. The patterns I established became the foundation.
                                    </p>
                                </div>
                            </TextTile>
                        </BentoRow>
                    </BentoGrid>
                </CinematicScene>

                <PullQuote>
                    Two years in. Everyone else — decades. I was driving the conversation.
                </PullQuote>
            </div>


            {/* ═══════════════════════════════════════════════
                ACT VI — VISIBILITY WAS THE SOLUTION
               ═══════════════════════════════════════════════ */}
            <div className="relative z-20 bg-[var(--bg-cinematic)]" id="act-6-outcome">
                <CinematicScene
                    title="Visibility Was the Solution."
                    body={
                        <p>We didn&apos;t add capabilities. Didn&apos;t rewrite the engine. We made it visible. NLQ adoption +25% from discoverability alone — no feature changes.</p>
                    }
                >
                    <BentoGrid>
                        <BentoRow layout="50/50">
                            <TextTile>
                                <div className="text-4xl font-bold text-[var(--cs-accent)] mb-3">+25%</div>
                                <p className="text-zinc-300 font-light leading-relaxed">
                                    NLQ adoption from discoverability alone. No feature changes. The highest-leverage design work: making existing features findable.
                                </p>
                            </TextTile>
                            <TextTile delay={0.1}>
                                <div className="text-4xl font-bold text-[var(--cs-accent)] mb-3">3 → 1</div>
                                <p className="text-zinc-300 font-light leading-relaxed">
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
                            <p>Sometimes the features don&apos;t need to change. The visibility does. I invented this project, pitched it, and drove it to approval.</p>
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

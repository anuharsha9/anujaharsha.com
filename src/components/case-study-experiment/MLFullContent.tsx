'use client'

/**
 * MLFullContent — ML Functions full-view content in the cinematic bento pattern.
 * All images, data, and proof preserved. Copy tightened to 30-35 words per block.
 */

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { CaseStudyData } from '@/types/caseStudy'
import CinematicScene from './CinematicScene'
import ImpactDiff from '@/components/case-study/ImpactDiff'
import SystemIndex from '@/components/case-study/SystemIndex'
import {
    BentoGrid, BentoRow, ImageTile, TextTile,
    PullQuote, EyebrowLabel, CarouselTile,
} from './BentoGrid'


export default function MLFullContent({ data }: { data: CaseStudyData }) {
    return (
        <>
            {/* ═══════════════════════════════════════════════
                ACT I — HOW I EARNED THE PROJECT
               ═══════════════════════════════════════════════ */}
            <div className="relative z-20 bg-[var(--bg-cinematic)]" id="act-1-hook">
                <CinematicScene
                    title="Zero ML Knowledge. So I Got MIT Certified."
                    body={
                        <p>Our DS handed me a side challenge: recreate an external explainability tool in WebFOCUS. I nailed it. That earned the trust to own the entire ML UX revamp.</p>
                    }
                >
                    <BentoGrid className="mt-12">
                        <BentoRow layout="50/50">
                            <TextTile delay={0.1}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg border border-cyan-500/20 bg-cyan-500/5 flex items-center justify-center">
                                        <span className="text-cyan-400 text-sm font-mono">MIT</span>
                                    </div>
                                    <span className="text-[10px] font-mono text-cyan-400/60 uppercase tracking-widest">Domain Mastery</span>
                                </div>
                                <p className="text-zinc-300 font-light leading-relaxed">
                                    Zero ML background → MIT certified in AI/ML Product Design. Months embedded weekly with our Principal Data Scientist before touching a single design.
                                </p>
                            </TextTile>
                            <TextTile delay={0.15}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg border border-red-500/20 bg-red-500/5 flex items-center justify-center">
                                        <span className="text-red-400 text-lg">∅</span>
                                    </div>
                                    <span className="text-[10px] font-mono text-red-400/60 uppercase tracking-widest">Zero Adoption</span>
                                </div>
                                <p className="text-zinc-300 font-light leading-relaxed">
                                    A powerful ML engine buried in a data flow canvas. 12+ clicks, cascading context menus, confusing error states. Nobody used it.
                                </p>
                            </TextTile>
                        </BentoRow>

                        <EyebrowLabel>Legacy Pain Points</EyebrowLabel>
                        <BentoRow layout="50/50">
                            <ImageTile src="/images/case-study/ml-functions/Legacy Train Model UI.png" alt="Legacy ML Workflow" caption="12+ click data flow canvas" />
                            <ImageTile src="/images/case-study/ml-functions/Legacy Train Model Results UI.png" alt="Legacy Results" caption="Unreadable results tables" delay={0.1} />
                        </BentoRow>
                        <BentoRow layout="50/50">
                            <ImageTile src="/images/case-study/ml-functions/Legacy Explainability UI.png" alt="Legacy Explainability" caption="External tool screenshot — my starting point" delay={0.15} />
                            <ImageTile src="/images/case-study/ml-functions/Legacy Run Model Landing Page.png" alt="Legacy Run Model" caption="Confusing run model landing page" delay={0.2} />
                        </BentoRow>
                    </BentoGrid>
                </CinematicScene>

                <PullQuote>
                    If I find this frustrating after weeks of study, a first-time user has no chance. That insight drove the redesign.
                </PullQuote>
            </div>


            {/* ═══════════════════════════════════════════════
                ACT II — UNDERSTANDING USERS AND WORKFLOWS
               ═══════════════════════════════════════════════ */}
            <div className="relative z-20 bg-[var(--bg-cinematic)]" id="act-2-investigation">
                <CinematicScene
                    title="Three Personas. Three Conflicting Needs."
                    body={
                        <p>Data scientists wanted depth. Business users wanted simplicity. Analysts wanted both. The existing experience served none of them well.</p>
                    }
                >
                    <BentoGrid>
                        <BentoRow layout="50/50">
                            <TextTile>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center">
                                        <span className="text-zinc-400 text-sm">🔬</span>
                                    </div>
                                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Research Approach</span>
                                </div>
                                <p className="text-zinc-300 font-light leading-relaxed">
                                    Weekly sessions with our Principal Data Scientist. Documented every workflow and decision point. Mapped the entire legacy interaction model.
                                </p>
                            </TextTile>
                            <TextTile delay={0.1}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center">
                                        <span className="text-zinc-400 text-sm">⚡</span>
                                    </div>
                                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Key Insight</span>
                                </div>
                                <p className="text-zinc-300 font-light leading-relaxed">
                                    Users didn&apos;t know which algorithm to pick. Error messages like &ldquo;Error 500&rdquo; were useless. They abandoned tasks upon first error.
                                </p>
                            </TextTile>
                        </BentoRow>

                        <EyebrowLabel>Persona Research</EyebrowLabel>
                        <BentoRow layout="full">
                            <TextTile accent="teal" delay={0.15}>
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 pl-2">
                                    <div className="flex flex-col gap-2">
                                        {['Data Scientist → Depth & Control', 'Business Analyst → Simplicity', 'Tech Analyst → Both'].map((p, i) => (
                                            <div key={i} className="flex items-center gap-3">
                                                <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-cyan-400' : i === 1 ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                                                <span className="text-zinc-300 text-sm font-light">{p}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-zinc-200 font-light leading-relaxed text-lg flex-1">
                                        One UI couldn&apos;t serve all three. That&apos;s how the &ldquo;Dual Experience&rdquo; architecture emerged — guided flow for novices, advanced panels for experts.
                                    </p>
                                </div>
                            </TextTile>
                        </BentoRow>

                        <EyebrowLabel>Architecture Mapping</EyebrowLabel>
                        <BentoRow layout="50/50">
                            <ImageTile src="/images/case-study/ml-functions/entire ML workflow flowchart.png" alt="ML Workflow Flowchart" caption="Full workflow mapping" delay={0.1} />
                            <ImageTile src="/images/case-study/ml-functions/all model types architecture map.png" alt="Model Types Architecture" caption="All model types architecture" delay={0.15} />
                        </BentoRow>
                        <BentoRow layout="full">
                            <ImageTile src="/images/case-study/ml-functions/Overview of ML workflow based on user.png" alt="ML Workflow by User" caption="Workflow paths mapped by persona" delay={0.2} />
                        </BentoRow>
                    </BentoGrid>
                </CinematicScene>

                <PullQuote>
                    I came in with zero ML background and got MIT certified to do this work. Over two years, I navigated engineering delays, layoffs, and resource constraints — leading design through it all.
                </PullQuote>
            </div>


            {/* ═══════════════════════════════════════════════
                ACT III — FROM BLACK BOX TO GUIDED FLOW
               ═══════════════════════════════════════════════ */}
            <div className="relative z-20 bg-[var(--bg-cinematic)]" id="act-3-architecture">
                <CinematicScene
                    title="From Black Box to 4-Step Guided Flow."
                    body={
                        <p>No Predict Data landing page existed. The original workflow was so broken you could barely begin training a model. I designed a discoverable entry point from scratch.</p>
                    }
                >
                    <BentoGrid>
                        <EyebrowLabel>Entry Point Design</EyebrowLabel>
                        <BentoRow layout="33/33/33">
                            <ImageTile src="/images/case-study/ml-functions/Launch ML from the HUB - right click +Data button.png" alt="Right-click +Data" caption="Right-click +Data button" />
                            <ImageTile src="/images/case-study/ml-functions/Launch ML from the HUB - right click dataset.png" alt="Right-click Dataset" caption="Right-click dataset" delay={0.06} />
                            <ImageTile src="/images/case-study/ml-functions/Launch ML from the HUB - right click folder.png" alt="Right-click Folder" caption="Right-click folder" delay={0.12} />
                        </BentoRow>

                        <BentoRow layout="30/70">
                            <TextTile accent="teal">
                                <h4 className="text-white font-bold text-lg mb-3">The 4-Step Spine</h4>
                                <p className="text-zinc-400 font-light leading-relaxed">
                                    &ldquo;What do you absolutely need to train a model responsibly?&rdquo; Problem type, target variable, predictors, and hyperparameters. That became the guided flow.
                                </p>
                            </TextTile>
                            <ImageTile src="/images/case-study/ml-functions/ML functions inital workflow.png" alt="ML Initial Workflow" caption="Initial workflow mapping" delay={0.1} />
                        </BentoRow>

                        <div className="mt-8 mb-4">
                            <EyebrowLabel>Sketches & Process</EyebrowLabel>
                        </div>
                        <BentoRow layout="full">
                            <CarouselTile
                                delay={0.1}
                                autoPlay={true}
                                interval={2000}
                                images={[
                                    { src: "/images/case-study/ml-functions/process/ml-iq-sketchbook_Page_01_Image_0001.jpg", alt: "Sketch 1" },
                                    { src: "/images/case-study/ml-functions/process/ml-iq-sketchbook_Page_02_Image_0001.jpg", alt: "Sketch 2" },
                                    { src: "/images/case-study/ml-functions/process/ml-iq-sketchbook_Page_03_Image_0001.jpg", alt: "Sketch 3" },
                                    { src: "/images/case-study/ml-functions/process/ml-iq-sketchbook_Page_04_Image_0001.jpg", alt: "Sketch 4" },
                                    { src: "/images/case-study/ml-functions/process/ml-iq-sketchbook_Page_05_Image_0001.jpg", alt: "Sketch 5" },
                                    { src: "/images/case-study/ml-functions/process/ml-iq-sketchbook_Page_06_Image_0001.jpg", alt: "Sketch 6" },
                                    { src: "/images/case-study/ml-functions/process/ml-iq-sketchbook_Page_07_Image_0001.jpg", alt: "Sketch 7" },
                                    { src: "/images/case-study/ml-functions/process/ml-iq-sketchbook_Page_08_Image_0001.jpg", alt: "Sketch 8" },
                                    { src: "/images/case-study/ml-functions/process/ml-iq-sketchbook_Page_09_Image_0001.jpg", alt: "Sketch 9" },
                                    { src: "/images/case-study/ml-functions/process/ml-iq-sketchbook_Page_10_Image_0001.jpg", alt: "Sketch 10" },
                                    { src: "/images/case-study/ml-functions/Machine learning functions-handdrawn-wireframes.png", alt: "Hand-drawn wireframes" },
                                ]}
                            />
                        </BentoRow>
                    </BentoGrid>
                </CinematicScene>
            </div>


            {/* ═══════════════════════════════════════════════
                ACT IV — 10+ ITERATIONS. ONE BREAKTHROUGH SCREEN.
               ═══════════════════════════════════════════════ */}
            <div className="relative z-20 bg-[var(--bg-cinematic)]" id="act-4-craft">
                <CinematicScene
                    title="10+ Iterations. One Breakthrough Screen."
                    body={
                        <p>The confusion matrix alone went through 10+ iterations. We moved from standard tables to a real-time, three-panel visualization with interactive threshold control.</p>
                    }
                >
                    <BentoGrid>
                        <EyebrowLabel>The Guided 4-Step Workflow</EyebrowLabel>
                        <BentoRow layout="50/50">
                            <ImageTile src="/images/case-study/ml-functions/1. Predict Data - Train Models - Empty State.png" alt="Empty State — Train Models" caption="Entry point: Empty state with clear CTA" />
                            <ImageTile src="/images/case-study/ml-functions/4. Train Model Workflow - Step 1 - Select Problem Type.png" alt="Step 1" caption="Step 1: Select Problem Type" delay={0.06} />
                        </BentoRow>
                        <BentoRow layout="50/50">
                            <ImageTile src="/images/case-study/ml-functions/5. Train Model Workflow - Step 2 - Specify Problem.png" alt="Step 2" caption="Step 2: Specify Problem Details" delay={0.1} />
                            <ImageTile src="/images/case-study/ml-functions/6. Train Model Workflow - Step 3 - Select Predictors.png" alt="Step 3" caption="Step 3: Select Predictors" delay={0.15} />
                        </BentoRow>
                        <BentoRow layout="50/50">
                            <ImageTile src="/images/case-study/ml-functions/7. Train Model Workflow - Step 4 - Configure Hyperparameters.png" alt="Step 4" caption="Step 4: Configure Hyperparameters" delay={0.2} />
                            <ImageTile src="/images/case-study/ml-functions/8. Train Model Workflow - Compare Models.png" alt="Compare Models" caption="Compare Models — side-by-side evaluation" delay={0.25} />
                        </BentoRow>

                        <BentoRow layout="30/70">
                            <TextTile accent="teal" delay={0.1}>
                                <h4 className="text-white font-bold text-xl md:text-2xl mb-4">The Confusion Matrix</h4>
                                <p className="text-zinc-400 font-light leading-relaxed">
                                    Our Principal Data Scientist pushed for advanced metrics; I pushed for clarity. That productive tension produced the screen he called &ldquo;the best in the entire UX revamp.&rdquo;
                                </p>
                            </TextTile>
                            <ImageTile src="/images/case-study/ml-functions/11. Train Model Workflow - Confusion Matrix.png" alt="Confusion Matrix" caption="Interactive threshold slider updating every graph in real time" delay={0.15} />
                        </BentoRow>

                        <BentoRow layout="50/50">
                            <ImageTile src="/images/case-study/ml-functions/10. Binary Classfication - ROC Precision.png" alt="ROC Precision" caption="ROC / Precision curves" delay={0.2} />
                            <ImageTile src="/images/case-study/ml-functions/6. Run Model - Explainability Popup.png" alt="Explainability Popup" caption="Native explainability — feature importances" delay={0.25} />
                        </BentoRow>

                        <BentoRow layout="50/50">
                            <ImageTile src="/images/case-study/ml-functions/17. Optimize Model Popup.png" alt="Optimize Model" caption="Optimize Model popup" delay={0.3} />
                            <ImageTile src="/images/case-study/ml-functions/1. ML UI Structure.png" alt="ML UI Structure" caption="Full ML UI structure" delay={0.35} />
                        </BentoRow>

                        <EyebrowLabel>Styling & Structure Decisions</EyebrowLabel>
                        <BentoRow layout="50/50">
                            <ImageTile src="/images/case-study/ml-functions/12 Column Grid for the Step Workflow.png" alt="12 Column Grid" caption="12 column grid system for wizard steps" delay={0.1} />
                            <ImageTile src="/images/case-study/ml-functions/Important Styling and Structure Decisions w/12 Column Grid in Train Model UI.png" alt="Grid in Train Model" caption="Grid applied to training UI" delay={0.15} />
                        </BentoRow>
                        <BentoRow layout="50/50">
                            <ImageTile src="/images/case-study/ml-functions/Important Styling and Structure Decisions w/Model Tile UI Guide.png" alt="Model Tile Guide" caption="Model tile card spec" delay={0.2} />
                            <ImageTile src="/images/case-study/ml-functions/Important Styling and Structure Decisions w/Table Styling Guide.png" alt="Table Styling" caption="Table styling specification" delay={0.25} />
                        </BentoRow>

                        {data.prototypeMedia && (
                            <>
                                <EyebrowLabel>Before / After Walkthrough</EyebrowLabel>
                                {data.prototypeMedia.beforeAfter && (
                                    <BentoRow layout="50/50">
                                        <div>
                                            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3">Legacy Workflow</p>
                                            <div className="rounded-xl overflow-hidden aspect-[16/10]">
                                                <video
                                                    src={data.prototypeMedia.beforeAfter.before.videoUrl}
                                                    poster={data.prototypeMedia.beforeAfter.before.videoPoster}
                                                    controls playsInline preload="none"
                                                    className="w-full h-full object-contain bg-black"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-mono text-[var(--cs-accent)] uppercase tracking-widest mb-3">Redesigned Workflow</p>
                                            <div className="rounded-xl overflow-hidden aspect-[16/10] relative">
                                                <video
                                                    src={data.prototypeMedia.beforeAfter.after.videoUrl}
                                                    poster={data.prototypeMedia.beforeAfter.after.videoPoster}
                                                    controls playsInline preload="none"
                                                    className="w-full h-full object-contain bg-black"
                                                />
                                                <div className="absolute top-3 right-3 bg-[var(--cs-accent)] text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Redesign</div>
                                            </div>
                                        </div>
                                    </BentoRow>
                                )}
                            </>
                        )}

                        <BentoRow layout="full">
                            <ImpactDiff
                                beforeImage="/images/case-study/ml-functions/Legacy Train Model UI.png"
                                afterImage="/images/case-study/ml-functions/4. Train Model Workflow - Step 1 - Select Problem Type.png"
                                beforeLabel="Legacy"
                                afterLabel="Redesign"
                                beforeTitle="legacy_ui.exe"
                                afterTitle="workflow_step_1.tsx"
                                className="rounded-xl shadow-2xl"
                            />
                        </BentoRow>
                    </BentoGrid>
                </CinematicScene>

                <PullQuote>
                    The confusion matrix screen alone went through 10+ iterations. &ldquo;The best screen in the entire UX revamp.&rdquo; — Principal Data Scientist
                </PullQuote>
            </div>


            {/* ═══════════════════════════════════════════════
                ACT V — I LED THIS WHILE OWNING THREE OTHER PRODUCTS.
               ═══════════════════════════════════════════════ */}
            <div className="relative z-20 bg-[var(--bg-cinematic)]" id="act-5-team">
                <CinematicScene
                    title="I Led This While Owning Three Other Products."
                    body={
                        <p>Dual-experience approach emerged from engineering constraints. We couldn&apos;t rebuild advanced mode — it had to coexist with the guided flow. Limitation became a feature.</p>
                    }
                >
                    <BentoGrid>
                        <BentoRow layout="50/50">
                            <TextTile>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex gap-1">
                                        {['RC', 'ML', 'IQ', 'WD'].map((tag) => (
                                            <div key={tag} className="px-2 py-1 rounded text-[9px] font-mono text-white/30 border border-white/10">{tag}</div>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-zinc-300 font-light leading-relaxed">
                                    After layoffs, I owned four enterprise systems simultaneously. Daily trackers, weekly trackers, ticket trackers — all shared via Slack so leadership always knew my progress.
                                </p>
                            </TextTile>
                            <TextTile delay={0.1}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg border border-cyan-500/20 bg-cyan-500/5 flex items-center justify-center">
                                        <span className="text-cyan-400 text-sm">↔</span>
                                    </div>
                                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Cross-Project</span>
                                </div>
                                <p className="text-zinc-300 font-light leading-relaxed">
                                    Patterns from ML directly informed IQ Plugin. Modal architecture from RC became platform-wide reference. Solutions in one project accelerated the others.
                                </p>
                            </TextTile>
                        </BentoRow>

                        <BentoRow layout="full">
                            <TextTile accent="teal" delay={0.15}>
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 pl-2">
                                    <p className="text-zinc-200 font-light leading-relaxed text-lg">
                                        Experts keep their power tools, newcomers get guardrails. Both personas served. What felt like a constraint became the defining feature of the product.
                                    </p>
                                </div>
                            </TextTile>
                        </BentoRow>
                    </BentoGrid>
                </CinematicScene>
            </div>


            {/* ═══════════════════════════════════════════════
                ACT VI — 5/5 VALIDATED.
               ═══════════════════════════════════════════════ */}
            <div className="relative z-20 bg-[var(--bg-cinematic)]" id="act-6-outcome">
                <CinematicScene
                    title="5/5 Validated. Patterns Became the Platform Standard."
                    body={
                        <p>5/5 SMEs found the entry point without help. Dead-ends became clear guidance. Design demos to 150-200 person business unit earned leadership support.</p>
                    }
                >
                    <BentoGrid>
                        <BentoRow layout="50/50">
                            <TextTile>
                                <div className="text-4xl font-bold text-[var(--cs-accent)] mb-3">5/5</div>
                                <p className="text-zinc-300 font-light leading-relaxed">
                                    SMEs completed the guided flow without assistance. The right-click entry pattern I designed became how other AI apps surfaced in the same menu.
                                </p>
                            </TextTile>
                            <TextTile delay={0.1}>
                                <div className="text-4xl font-bold text-[var(--cs-accent)] mb-3">12+ → ~6</div>
                                <p className="text-zinc-300 font-light leading-relaxed">
                                    Steps reduced. Zero dead-end errors. The patterns — structured flows, upstream validation, dual-experience — became foundation for IQ Plugin and platform AI strategy.
                                </p>
                            </TextTile>
                        </BentoRow>
                    </BentoGrid>
                </CinematicScene>


                {/* ═══ REFLECTION ═══ */}
                <div className="relative">
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[60vw] h-[600px] bg-[var(--cs-accent)]/3 blur-[200px] rounded-full pointer-events-none" />
                    <CinematicScene
                        title="What This Project Taught Me"
                        body={
                            <p>I earned the domain. I earned the trust. The productive tension with Data Science produced the best screen in the project.</p>
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
                    <SystemIndex currentId="ML_FUNCTIONS" />
                </div>
            </div>
        </>
    )
}

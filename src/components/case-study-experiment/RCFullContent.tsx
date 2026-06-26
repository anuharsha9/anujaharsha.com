'use client'

/**
 * RCFullContent — All ReportCaster-specific "full view" Acts content.
 * Extracted from CinematicCaseStudy so the shell can be reused for ML, DSML, etc.
 */

import React from 'react'
import { motion } from 'framer-motion'
import { CaseStudyData } from '@/types/caseStudy'
import CinematicScene from './CinematicScene'
import PerspectiveReveal from '@/components/ui/PerspectiveReveal'
import VideoPlayer from '@/components/ui/VideoPlayer'
import ImpactDiff from '@/components/case-study/ImpactDiff'
import SystemIndex from '@/components/case-study/SystemIndex'
import {
    BentoGrid, BentoRow, ImageTile, TextTile, VideoTile,
    PullQuote, EyebrowLabel, CarouselTile,
} from './BentoGrid'
import {
    PeopleDotGrid, AvatarPair, ScreenshotStack, FlowDiagram,
    ScatterConverge, RejectionMark, PlusIconTree,
    OnboardingPath, KnowledgeTransfer, VideoGrid, ImpactClimax,
} from './illustrations'


/* ─── Icons ─── */
function HeadsetIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-zinc-400">
            <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
        </svg>
    )
}

function CodeIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5 text-zinc-400">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
        </svg>
    )
}


export default function RCFullContent({ data }: { data: CaseStudyData }) {
    const getSection = (id: string) => data.sections?.find((s) => s.id === id)
    const section4 = getSection('section-04')

    return (
        <>

            {/* ═══════════════════════════════════════════════
                ACT I — HOW I LANDED THE PROJECT
               ═══════════════════════════════════════════════ */}
            <PerspectiveReveal>
            <div className="relative z-20" id="act-i">
                <CinematicScene
                    title="How I Landed the Project"
                    body={
                        <p>My director said — we have this project in the pipeline, I&apos;m yet to assign it to a designer. I said — I&apos;d like to do it. Give me a chance.</p>
                    }
                >
                    <BentoGrid className="mt-12">
                        <BentoRow layout="full">
                            <TextTile delay={0.1}>
                                <PeopleDotGrid />
                                <p className="text-zinc-200 font-light leading-relaxed mt-4">
                                    ~200 people in my business unit. They knew RC existed. They knew it was a scheduling tool. That&apos;s it. The only people who knew how to use it were the support team, and ONE engineer who did RC code in the 80s and 90s — still with the company.
                                </p>
                            </TextTile>
                        </BentoRow>

                        <BentoRow layout="50/50">
                            <TextTile delay={0.15}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg border border-red-500/20 bg-red-500/5 flex items-center justify-center">
                                        <span className="text-red-400 text-lg">∅</span>
                                    </div>
                                    <span className="text-[10px] font-mono text-red-400/60 uppercase tracking-widest">Zero Documentation</span>
                                </div>
                                <p className="text-zinc-200 font-light leading-relaxed">
                                    No specification. No roadmap. No one had planned any features for RC. 40 years of undocumented decisions buried across 5 subsystems.
                                </p>
                            </TextTile>
                            <TextTile delay={0.2}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center">
                                        <span className="text-zinc-400 text-lg font-mono">▸</span>
                                    </div>
                                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Starting Point</span>
                                </div>
                                <p className="text-zinc-200 font-light leading-relaxed">
                                    I had a sandbox environment, one slide deck from a support lead, and access to customer support calls. That was my entire research foundation.
                                </p>
                            </TextTile>
                        </BentoRow>
                    </BentoGrid>
                </CinematicScene>

                <PullQuote>
                    There was no documentation at ALL. No roadmap. No plans to add features. I had a sandbox. And that&apos;s it.
                </PullQuote>
            </div>
            </PerspectiveReveal>


            {/* ═══════════════════════════════════════════════
                ACT II — I BUILT MY OWN RESEARCH NETWORK
               ═══════════════════════════════════════════════ */}
            <PerspectiveReveal>
            <div className="relative z-20" id="act-ii">
                <CinematicScene
                    title="I Built My Own Research Network"
                    body={
                        <p>I went into the sandbox and used RC as much as I could. The lead support guy shared a presentation — that became my bible. I took hundreds of screenshots. Grouped them. Mapped them.</p>
                    }
                >
                    <BentoGrid>
                        <BentoRow layout="50/50">
                            <TextTile>
                                <AvatarPair leftLabel="Support" leftIcon={<HeadsetIcon />} />
                                <p className="text-zinc-200 font-light leading-relaxed">
                                    1:1 with customer reps of RC. Regular calls. They knew every workaround, every hack users had invented.
                                </p>
                            </TextTile>
                            <TextTile delay={0.1}>
                                <AvatarPair leftLabel="Engineer" leftIcon={<CodeIcon />} />
                                <p className="text-zinc-200 font-light leading-relaxed">
                                    1:1 with that ONE engineer who knew about it. He did RC code in the 80s and 90s — still with the company. My window into decades of undocumented decisions.
                                </p>
                            </TextTile>
                        </BentoRow>

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

                        {data.researchDecisionMap && data.researchDecisionMap.length > 0 && (
                            <BentoRow layout="50/50">
                                {data.researchDecisionMap.map((d, i) => (
                                    <TextTile key={i} delay={i * 0.1}>
                                        <FlowDiagram steps={['Insight', 'Decision', 'Shipped']} />
                                        <p className="text-zinc-200 font-light text-sm">{d.insight}</p>
                                        <p className="text-[var(--cs-accent)] text-xs font-mono mt-2">→ {d.feature}</p>
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
            </PerspectiveReveal>


            {/* ═══════════════════════════════════════════════
                ACT III — WHAT I DISCOVERED
               ═══════════════════════════════════════════════ */}
            <PerspectiveReveal>
            <div className="relative z-20" id="act-iii">
                <CinematicScene
                    title="What I Discovered"
                    body={
                        <p>ReportCaster was a product in itself. So huge and so powerful. One customer had 13 million schedules running every day. I thought — that&apos;s some powerful shit.</p>
                    }
                >
                    <ScatterConverge />

                    <BentoGrid className="mt-12">
                        <EyebrowLabel>Legacy Context</EyebrowLabel>
                        <BentoRow layout="33/33/33">
                            <ImageTile src="/images/case-study/ReportCaster/RC legacy schedule dialog properties.png" alt="Schedule Workflow" caption="Buried under 4 clicks" />
                            <ImageTile src="/images/case-study/ReportCaster/RC legacy distribution list UI.png" alt="Distribution Lists" caption="Buried under 4 clicks" delay={0.06} />
                            <ImageTile src="/images/case-study/ReportCaster/RC legacy access list UI.png" alt="Access Lists" caption="Buried under 4 clicks" delay={0.12} />
                        </BentoRow>
                        <BentoRow layout="50/50">
                            <ImageTile src="/images/case-study/ReportCaster/RC legacy explorer.png" alt="RC Explorer" caption="Hidden in hamburger menu" delay={0.18} />
                            <ImageTile src="/images/case-study/ReportCaster/RC legacy admin status.png" alt="RC Status / Admin" caption="Buried inside Management Center → Admin Console" delay={0.24} />
                        </BentoRow>

                        <div className="mt-16 mb-4 flex items-center justify-between">
                            <EyebrowLabel>Mapping the chaos</EyebrowLabel>
                            <a href="/assets/rc-sketchbook.pdf" target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono text-[var(--cs-accent)] border border-[var(--cs-accent)]/30 px-4 py-2 rounded-full hover:bg-[var(--cs-accent)]/10 transition-colors flex items-center gap-2">
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
            </PerspectiveReveal>


            {/* ═══════════════════════════════════════════════
                ACT IV — TWO REJECTIONS. ONE BREAKTHROUGH.
               ═══════════════════════════════════════════════ */}
            {section4 && (
                <PerspectiveReveal>
                <div className="relative z-20" id="act-iv">
                    <CinematicScene
                        title="Two Rejections. One Breakthrough."
                        body={
                            <p>I thought — let&apos;s create it like a unified product, with similar consistency. Beautiful. Rejected. Created a plugin version. I loved it the most. Also rejected.</p>
                        }
                    >
                        <BentoGrid>
                            <EyebrowLabel>Version 1</EyebrowLabel>
                            <BentoRow layout="30/70">
                                <TextTile>
                                    <h3 className="text-white font-bold text-lg mb-3">V1: Independent Product</h3>
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

                            <div className="mt-8">
                                <EyebrowLabel>Version 2</EyebrowLabel>
                            </div>
                            <BentoRow layout="30/70">
                                <TextTile>
                                    <h3 className="text-white font-bold text-lg mb-3">V2: Plugin in the Hub</h3>
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

                    <PullQuote>
                        How does the platform WANT workflows to behave?
                    </PullQuote>

                    <CinematicScene
                        title="Version 3: The Breakthrough"
                        body={
                            <p>Every major workflow in the platform starts from the + menu. That&apos;s not just UI — that&apos;s platform architecture. If RC is a creation workflow, why not initiate from + menu?</p>
                        }
                    >
                        <PlusIconTree branches={['Schedule Dialog', 'Distribution List', 'Access List']} />

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-center max-w-2xl mx-auto mb-16"
                        >
                            <p className="text-white font-bold text-lg">There it was — the final workflow of ReportCaster.</p>
                        </motion.div>

                        <BentoGrid className="space-y-16 md:space-y-24 mt-12">
                            <BentoRow layout="30/70">
                                <TextTile accent="teal">
                                    <h3 className="text-white font-bold text-xl md:text-2xl mb-4">Unifying the Setup</h3>
                                    <p className="text-zinc-400 font-light leading-relaxed">
                                        Instead of separating basic scheduling and advanced settings across disjointed forms, I built a single intelligent dialog. It feels lightweight out of the gate but progressively scales up in capability, adapting directly to user requirements natively from the Hub.
                                    </p>
                                </TextTile>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <ImageTile src="/images/case-study/ReportCaster/Initiating ReportCaster from the HUB.png" alt="Hub + menu" caption="Initiated right from the + Menu" delay={0.1} />
                                    <ImageTile src="/images/case-study/ReportCaster/Schedule Dialog - Properties.png" alt="Schedule Properties" caption="Unified, progressive creation flow" delay={0.2} />
                                </div>
                            </BentoRow>

                            <BentoRow layout="30/70">
                                <TextTile accent="teal" delay={0.1}>
                                    <h3 className="text-white font-bold text-xl md:text-2xl mb-4">A Natural Language System</h3>
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

                            <BentoRow layout="30/70">
                                <TextTile accent="teal" delay={0.1}>
                                    <h3 className="text-white font-bold text-xl md:text-2xl mb-4">Elevating Access & Control</h3>
                                    <p className="text-zinc-400 font-light leading-relaxed">
                                        Managing distribution channels and security was previously an afterthought requiring complex navigation. We elevated them into first-class searchable assets. Whether you&apos;re configuring a network directory or an internal access list, the interaction paradigm remains identical.
                                    </p>
                                </TextTile>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <ImageTile src="/images/case-study/ReportCaster/Distribution List starting point.png" alt="DL Start" caption="Distribution Lists as first-class objects" delay={0.2} />
                                    <ImageTile src="/images/case-study/ReportCaster/Access List - Current List+context menu options.png" alt="AL Current" caption="Consistent context menu management" delay={0.3} />
                                </div>
                            </BentoRow>

                            <BentoRow layout="30/70">
                                <TextTile accent="teal" delay={0.1}>
                                    <h3 className="text-white font-bold text-xl md:text-2xl mb-4">Contextual Job Diagnostics</h3>
                                    <p className="text-zinc-400 font-light leading-relaxed">
                                        Historically, running job logs popped out as completely detached web pages spanning thousands of rows of code. By designing a native embedded viewer with filtering and deep search directly within the UI, diagnosing scheduling failures became an instant, seamless action.
                                    </p>
                                </TextTile>
                                <div className="h-full">
                                    <ImageTile src="/images/case-study/ReportCaster/Job log dialog.png" alt="Job Log Dialog" caption="Fully embedded contextual log analysis" delay={0.2} />
                                </div>
                            </BentoRow>

                            <BentoRow layout="30/70">
                                <TextTile accent="teal" delay={0.1}>
                                    <h3 className="text-white font-bold text-xl md:text-2xl mb-4">The Unified Dashboard</h3>
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
                    </CinematicScene>
                </div>
                </PerspectiveReveal>
            )}


            {/* ═══════════════════════════════════════════════
                ACT V — I ONBOARDED 20 PEOPLE.
               ═══════════════════════════════════════════════ */}
            <PerspectiveReveal>
            <div className="relative z-20" id="act-v">
                <CinematicScene
                    title="I Onboarded 20 People."
                    body={
                        <p>Hundreds of screens done. But the people who were going to work with me — lead architect, lead engineer, core engineers, QA, new PM — they were unaware of ReportCaster.</p>
                    }
                >
                    <BentoGrid>
                        <BentoRow layout="50/50">
                            <TextTile>
                                <OnboardingPath roles={[
                                    { name: 'Me', abbr: 'ME', active: true },
                                    { name: 'Lead Arch', abbr: 'LA' },
                                    { name: 'Lead Eng', abbr: 'LE' }
                                ]} />
                                <p className="text-zinc-200 font-light leading-relaxed">
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
                                <p className="text-zinc-200 font-light leading-relaxed">
                                    Then came the entire group of engineers, new PM, the QA team, the documentation team. Dozens of demos of the old and new ReportCaster to everyone.
                                </p>
                            </TextTile>
                        </BentoRow>

                        <BentoRow layout="50/50">
                            <TextTile delay={0.15}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex gap-1">
                                        <div className="px-2 py-1 rounded text-[9px] font-mono text-zinc-600 border border-white/10">RC</div>
                                        <div className="px-2 py-1 rounded text-[9px] font-mono text-zinc-600 border border-white/10">ML</div>
                                    </div>
                                    <span className="text-[10px] text-zinc-600">×</span>
                                    <div className="w-6 h-6 rounded-full border border-[var(--cs-accent)]/30 flex items-center justify-center">
                                        <span className="text-[8px] font-mono text-[var(--cs-accent)]/60">Me</span>
                                    </div>
                                </div>
                                <p className="text-zinc-200 font-light leading-relaxed">
                                    Two projects, a 1-year-old at home, all day. I was running RC and ML simultaneously while most of the team focused on a single feature.
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
                                    <div className="w-5 h-5 rounded-full border border-[var(--cs-accent)]/30" />
                                    <span className="text-[10px] text-[var(--cs-accent)] font-mono">→ 2 features</span>
                                </div>
                                <p className="text-zinc-200 font-light leading-relaxed">
                                    3 designers on one feature. I was trusted with two. That said something about how leadership felt about my ownership and output.
                                </p>
                            </TextTile>
                        </BentoRow>

                        <BentoRow layout="full">
                            <TextTile delay={0.25}>
                                <KnowledgeTransfer />
                                <p className="text-zinc-200 font-light leading-relaxed">
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
            </PerspectiveReveal>


            {/* ═══════════════════════════════════════════════
                ACT VI — POWERING 20M+ SCHEDULES
               ═══════════════════════════════════════════════ */}
            <PerspectiveReveal>
            <div className="relative z-20" id="act-vi">
                <CinematicScene
                    title="Powering 20M+ Schedules"
                    body={
                        <p>Shipped. From 4 clicks to 2. No more individual browser tabs. Everything smoothly integrated within the hub ecosystem. Customers noticed.</p>
                    }
                >
                    <BentoGrid>
                        <BentoRow layout="full">
                            <ImpactClimax />
                        </BentoRow>

                        {data.prototypeMedia?.beforeAfter && (
                            <BentoRow layout="50/50">
                                <div>
                                    <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3">Legacy Workflow</p>
                                    <VideoPlayer
                                        src={data.prototypeMedia.beforeAfter.before.videoUrl ?? ''}
                                        poster={data.prototypeMedia.beforeAfter.before.videoPoster}
                                        autoPlay={false}
                                        ariaLabel="ReportCaster — legacy workflow"
                                        className="rounded-xl overflow-hidden aspect-[16/10] bg-black"
                                        videoClassName="object-contain"
                                    />
                                </div>
                                <div>
                                    <p className="text-[10px] font-mono text-[var(--cs-accent)] uppercase tracking-widest mb-3">New Unified Workflow</p>
                                    <div className="relative">
                                        <VideoPlayer
                                            src={data.prototypeMedia.beforeAfter.after.videoUrl}
                                            poster={data.prototypeMedia.beforeAfter.after.videoPoster}
                                            autoPlay={false}
                                            ariaLabel="ReportCaster — new unified workflow"
                                            className="rounded-xl overflow-hidden aspect-[16/10] bg-black"
                                            videoClassName="object-contain"
                                        />
                                        <div className="absolute top-3 right-3 bg-[var(--cs-accent)] text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest z-30">Shipped</div>
                                    </div>
                                </div>
                            </BentoRow>
                        )}

                        <BentoRow layout="full">
                            <ImpactDiff
                                beforeImage="/images/case-study/ReportCaster/Before.webp"
                                afterImage="/images/case-study/ReportCaster/After.png"
                                beforeLabel="Legacy UI"
                                afterLabel="Redesign"
                                beforeTitle="legacy_report.exe"
                                afterTitle="modern_hub.tsx"
                                className="rounded-xl shadow-2xl"
                            />
                        </BentoRow>

                        <BentoRow layout="50/50">
                            <TextTile delay={0.1}>
                                <VideoGrid />
                                <p className="text-zinc-200 font-light leading-relaxed">
                                    At the Virtual User Group, a customer praised the redesign directly and said he was looking forward to what&apos;s next. A 5-year contract worth millions was signed after RC shipped.
                                </p>
                            </TextTile>
                            <TextTile delay={0.2}>
                                <div className="flex gap-1 mb-4">
                                    {['9.3.0', '9.3.2', '9.3.3'].map((v, i) => (
                                        <div key={i} className={`px-2 py-0.5 rounded text-[8px] font-mono border ${i === 0 ? 'text-[var(--cs-accent)] border-[var(--cs-accent)]/30' : 'text-zinc-600 border-white/5'}`}>{v}</div>
                                    ))}
                                </div>
                                <p className="text-zinc-200 font-light leading-relaxed">
                                    WebFOCUS 9.3 became the platform&apos;s first Long-Term Support release — 5 years of guaranteed stability. The RC redesign expanded into 3 follow-up releases with features I designed for but the PM added post-launch.
                                </p>
                            </TextTile>
                        </BentoRow>
                    </BentoGrid>
                </CinematicScene>
            </div>
            </PerspectiveReveal>


            {/* ═══════════════════════════════════════════════
                ✦ REFLECTION — GRAPHICAL BENTO FINALE
               ═══════════════════════════════════════════════ */}
            <div className="relative z-20" id="act-reflection">
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[60vw] h-[600px] bg-[var(--cs-accent)]/3 blur-[200px] rounded-full pointer-events-none" />

                <CinematicScene
                    title="What This Project Made Me"
                    body={
                        <p>I won some and I lost some with RC, but I grew immensely. I did things I never did before. I matured. I learned leadership.</p>
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
                                <h3 className="text-white font-bold text-xl mb-3">{data.reflection.retrospective.pushHarder.title}</h3>
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
                                <h3 className="text-white font-bold text-xl mb-3">{data.reflection.retrospective.doNext.title}</h3>
                                <p className="text-zinc-400 font-light text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: data.reflection.retrospective.doNext.content }} />
                            </motion.div>
                        </div>
                    )}
                </CinematicScene>

                {/* ═══ Closing Manifesto ═══ */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-full min-h-[50vh] flex flex-col items-center justify-center px-6 md:px-16 py-24 md:py-40"
                >
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-[50vw] h-[300px] bg-[var(--cs-accent)]/5 blur-[120px] rounded-full" />
                    </div>

                    <div className="relative z-10 max-w-4xl mx-auto text-center">
                        <div className="text-[var(--cs-accent)]/40 text-6xl mb-8 select-none">&ldquo;</div>
                        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.2] md:leading-[1.15] tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-zinc-200 to-zinc-500 mb-8" style={{ textWrap: 'balance' }}>
                            From hearing customers hack their way around the UI — to shipping an experience that made them excited about what&apos;s next.
                        </p>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="text-xl md:text-2xl text-[var(--cs-accent)] font-bold"
                        >
                            I had never felt so proud of myself.
                        </motion.p>

                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: 0.6, ease: "easeInOut" }}
                            className="mt-16 w-24 h-[1px] mx-auto bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        />
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="mt-8 text-sm text-zinc-500 font-mono tracking-widest uppercase"
                        >
                            RC made me the design leader I am today.
                        </motion.p>
                    </div>
                </motion.div>

                {/* ═══ Figma Config Pitch — In My Own Words ═══ */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="relative w-full max-w-4xl mx-auto px-6 md:px-16 py-16 md:py-24"
                >
                    <div className="text-center mb-10">
                        <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em] block mb-3">Figma Config Pitch</span>
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">In My Own Words</h3>
                        <p className="text-sm text-zinc-500 font-light italic max-w-lg mx-auto">
                            Recorded 3 days after leaving CSG. 5 AM. 100 takes. This was the one.
                        </p>
                    </div>

                    <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm">
                        <VideoPlayer
                            src="/videos/figma-config-pitch.mp4"
                            autoPlay={false}
                            ariaLabel="Figma Config pitch"
                            className="aspect-video bg-black"
                            videoClassName="object-contain"
                        />
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-center mt-6 text-sm text-zinc-600 font-light italic"
                    >
                        &ldquo;Collaboration doesn&apos;t just transform products, it transforms people.&rdquo;
                    </motion.p>
                </motion.div>

                {/* ═══ Next Case Study ═══ */}
                <SystemIndex currentId="REPORTCASTER" />
            </div>
        </>
    )
}

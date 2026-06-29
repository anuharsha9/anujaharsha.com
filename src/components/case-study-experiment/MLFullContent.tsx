'use client'

/**
 * MLFullContent — ML Functions full-view content in the cinematic bento pattern.
 * Voice: Anu's authentic transcript (March 2026). Every line traceable to raw Q&A.
 */

import React from 'react'
import { m } from 'framer-motion'
import Image from 'next/image'
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
import ImageComparisonSlider from '@/components/ui/ImageComparisonSlider'
import { EASE_CINEMATIC } from '@/lib/motion'


export default function MLFullContent({ data }: { data: CaseStudyData }) {
    return (
        <>

            {/* ═══════════════════════════════════════════════
                ACT I — A SIDE PROJECT EARNED ME THE WHOLE THING
               ═══════════════════════════════════════════════ */}
            <PerspectiveReveal>
                <div className="relative z-20" id="act-1-hook">
                    <CinematicScene
                        title="A Side Project Earned Me the Whole Thing."
                        body={
                            <p>While deep in ReportCaster, the principal data scientist handed me a side challenge — an explainability popup. I nailed it, and that earned the trust to own the entire ML workflow redesign. Here&apos;s what I walked into, and how it all started.</p>
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
                                    <p className="text-zinc-200 font-light leading-relaxed">
                                        Zero ML background. I asked my data scientist questions. I asked AI questions. I researched binary classification, regression, random forest, neural networks — whatever I needed. Eventually that pushed me into taking an MIT course. I paid for it myself because the work had outgrown surface-level understanding.
                                    </p>
                                </TextTile>
                                <TextTile delay={0.15}>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-lg border border-red-500/20 bg-red-500/5 flex items-center justify-center">
                                            <span className="text-red-400 text-lg">∅</span>
                                        </div>
                                        <span className="text-[10px] font-mono text-red-400/60 uppercase tracking-widest">Zero Adoption</span>
                                    </div>
                                    <p className="text-zinc-200 font-light leading-relaxed">
                                        ~15 clicks minimum just to see a trained model. Plus menu → data flow → drag dataset → drag model pill → hidden play button → cascading context menus for hyperparameters. Powerful tool. Nobody used it.
                                    </p>
                                </TextTile>
                            </BentoRow>

                            <EyebrowLabel>The Side Project That Started It All</EyebrowLabel>
                            <BentoRow layout="full">
                                <ImageComparisonSlider
                                    beforeImage="/images/case-study/ml-functions/Legacy Explainability UI.png"
                                    afterImage="/images/case-study/ml-functions/6. Run Model - Explainability Popup.png"
                                    beforeAlt="External explainability tool screenshot Marcus showed me"
                                    afterAlt="Native explainability popup I built in WebFOCUS"
                                    beforeLabel="WHAT THE DATA SCIENTIST SHOWED ME"
                                    afterLabel="WHAT I BUILT"
                                    beforeTitle="external-tool.png"
                                    afterTitle="WebFOCUS — Explainability Popup"
                                    aspectRatio="aspect-video"
                                />
                            </BentoRow>
                            <BentoRow layout="30/70">
                                <TextTile accent="teal" delay={0.2}>
                                    <p className="text-zinc-200 font-light leading-relaxed">
                                        I dug into why the popup was needed, how model predictions work, what feature importances actually mean. He was glad I took the effort in understanding.
                                    </p>
                                    <a
                                        href="https://www.youtube.com/watch?v=oPFKkcgNCbo"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 mt-4 px-4 py-2 border border-white/10 bg-white/[0.03] text-zinc-300 text-xs font-mono tracking-wide hover:border-cyan-500/40 hover:text-cyan-400 transition-colors rounded-full"
                                    >
                                        <span className="w-4 h-4 flex items-center justify-center">▶</span>
                                        <span>Watch public explainability demo</span>
                                    </a>
                                </TextTile>
                                <TextTile delay={0.25}>
                                    <div className="flex items-start gap-4">
                                        <span className="text-cyan-400/50 text-3xl font-serif leading-none">&ldquo;</span>
                                        <div>
                                            <p className="text-zinc-200 italic font-light leading-relaxed text-lg">
                                                The other designers I worked with before didn&apos;t really understand what they were doing — they just gave designs. But you sat with us, talked to us, and actually understood. <span className="text-cyan-400 font-medium not-italic">That&apos;s why I trust you.</span>
                                            </p>
                                            <p className="text-xs text-zinc-500 font-mono uppercase tracking-wider mt-4">— Marcus Horbach, Principal Data Scientist</p>
                                        </div>
                                    </div>
                                </TextTile>
                            </BentoRow>

                            <EyebrowLabel>Legacy Pain Points</EyebrowLabel>
                            <BentoRow layout="30/70">
                                <TextTile accent="red">
                                    <h3 className="text-white font-bold text-lg mb-3">&ldquo;No Result Generated.&rdquo;</h3>
                                    <p className="text-zinc-400 font-light leading-relaxed">
                                        There was a big exclamation mark in a red circle, and the expression was red itself. It said &lsquo;No model generated, please click on the play button to start training the model.&rsquo; So frustrating. That was the first thing I noticed, and it was the first thing I said — let&apos;s remove that messaging, please.
                                    </p>
                                </TextTile>
                                <ImageTile src="/images/case-study/ml-functions/Legacy Train Model UI.png" alt="No result generated — confusing dead-end" caption="The dead-end: red exclamation mark, 'No result generated.'" delay={0.1} />
                            </BentoRow>

                            <BentoRow layout="30/70">
                                <TextTile>
                                    <h3 className="text-white font-bold text-lg mb-3">Three Levels of Navigation.</h3>
                                    <p className="text-zinc-400 font-light leading-relaxed">
                                        You had the step navigation, you had the algorithm navigation, and inside algorithms, another level of tabs. Just for binary classification — 8 into 5 screens. That same structure applied to every model type.
                                    </p>
                                </TextTile>
                                <ImageTile src="/images/case-study/ml-functions/Legacy Train Model Results UI.png" alt="Train model results — three levels of navigation" caption="Train model results — step nav, algorithm nav, and tabs within tabs." delay={0.1} />
                            </BentoRow>

                            <BentoRow layout="30/70">
                                <TextTile>
                                    <h3 className="text-white font-bold text-lg mb-3">The Data Flow Canvas.</h3>
                                    <p className="text-zinc-400 font-light leading-relaxed">
                                        The old ML workflow had the data flow canvas visible at all times. Split view — data flow on top, table view at the bottom. You didn&apos;t really need the data flow in the view. I had to ask the data scientist for repeated walkthroughs because I couldn&apos;t get the sandbox to work.
                                    </p>
                                </TextTile>
                                <ImageTile src="/images/case-study/ml-functions/Legacy Run Model Landing Page.png" alt="Run Models — split screen data flow" caption="Run Models: data flow canvas on top, side data panel. Everything interconnected." delay={0.1} />
                            </BentoRow>
                        </BentoGrid>
                    </CinematicScene>

                    <PullQuote>
                        It was also something I had proposed — because after I found out about the explainability popup, I realized the entire machine learning workflow was not great. Understanding earned me ownership.
                    </PullQuote>
                </div>
            </PerspectiveReveal>


            {/* ═══════════════════════════════════════════════
                ACT II — ONE PATH. NOT TWO EXPERIENCES.
               ═══════════════════════════════════════════════ */}
            <PerspectiveReveal>
                <div className="relative z-20" id="act-2-investigation">
                    <CinematicScene
                        title="One Path. Not Two Experiences."
                        body={
                            <p>Data scientists wanted a technical workflow. I wanted something business users could actually use. The principal data scientist at one point was like, &ldquo;Are you trying to make this dumb?&rdquo; No. I wasn&apos;t removing sophistication. I was making the sophistication legible. We landed on one workflow that serves a dual purpose — not dumbed down, not over-engineered.</p>
                        }
                    >
                        <BentoGrid>
                            <BentoRow layout="50/50">
                                <TextTile>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center">
                                            <span className="text-zinc-400 text-sm">🔬</span>
                                        </div>
                                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Sessions with the Data Scientist</span>
                                    </div>
                                    <p className="text-zinc-200 font-light leading-relaxed">
                                        We used to talk about physics and books. I used to show him sketches — &ldquo;Am I understanding this right?&rdquo; I validated my understanding constantly because I was terrified of making something look nice while technically meaning the wrong thing. That would have been a fake win.
                                    </p>
                                </TextTile>
                                <TextTile delay={0.1}>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center">
                                            <span className="text-zinc-400 text-sm">⚡</span>
                                        </div>
                                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Pushing Back</span>
                                    </div>
                                    <p className="text-zinc-200 font-light leading-relaxed">
                                        We had this conversation about chart colors — four different colors that didn&apos;t mean anything. I said, &ldquo;Your goal is to show F1 scores. Adding colors makes it more confusing. You just want users to compare and pick the best one.&rdquo; I won that conversation because I&apos;d finally understood what the chart was actually showing.
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
                                                    <span className="text-zinc-200 text-sm font-light">{p}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <p className="text-zinc-200 font-light leading-relaxed text-lg flex-1">
                                            We did not have two experiences. We had one path that serves a dual purpose. Not easy enough that data scientists would say &ldquo;this is spoon feeding,&rdquo; but clear enough that someone like me could use it. Every step had context — definitions, explanations, tooltips. The sophistication was there; it just waited for you to ask for it.
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
                        Every session with the data scientist was enlightening. I don&apos;t think without those sessions I would have been able to do it at all. He loved machine learning. I loved user experience. That mutual passion is why it worked.
                    </PullQuote>
                </div>
            </PerspectiveReveal>


            {/* ═══════════════════════════════════════════════
                ACT III — WHY DON'T WE HAVE A LANDING PAGE HERE?
               ═══════════════════════════════════════════════ */}
            <PerspectiveReveal>
                <div className="relative z-20" id="act-3-architecture">
                    <CinematicScene
                        title="Why Don't We Have a Landing Page Here?"
                        body={
                            <p>No Predict Data landing page existed. My first instinct was — why can&apos;t users select data themselves? I designed it from scratch, dozens of iterations, until the tab split became the answer.</p>
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
                                    <h3 className="text-white font-bold text-lg mb-3">Six Clicks to Two.</h3>
                                    <p className="text-zinc-400 font-light leading-relaxed">
                                        In WebFOCUS, right-click is like religion. Everything is right-clickable. So putting &ldquo;Predict Data&rdquo; in the right-click menu of a dataset was the most natural thing. I was capitalizing on the most common user behavior in the product. Once we saw how well it worked, we extended the pattern to Generate Insights and Ask a Question too.
                                    </p>
                                </TextTile>
                                <ImageTile src="/images/case-study/ml-functions/ML functions inital workflow.png" alt="ML Initial Workflow" caption="Initial workflow mapping" delay={0.1} />
                            </BentoRow>

                            <BentoRow layout="30/70">
                                <TextTile accent="teal">
                                    <h3 className="text-white font-bold text-lg mb-3">The Popup Won.</h3>
                                    <p className="text-zinc-400 font-light leading-relaxed">
                                        I tried full-screen views, side-step layouts, two-column layouts. The popup wizard won because WebFOCUS loved modals — all engineers lived in popups. It gave me breathing room for helper text and definitions. It let each step exist cleanly without the whole screen jumping. And it was faster to engineer. Sometimes the best design move is the one that solves the problem without asking the legacy product to become something it isn&apos;t.
                                    </p>
                                </TextTile>
                                <ImageTile src="/images/case-study/ml-functions/4. Train Model Workflow - Step 1 - Select Problem Type.png" alt="Step 1 wizard" caption="The popup wizard — Step 1" delay={0.1} />
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
            </PerspectiveReveal>


            {/* ═══════════════════════════════════════════════
                ACT IV — THE MOST COMPLEX SCREEN I'VE EVER DESIGNED
               ═══════════════════════════════════════════════ */}
            <PerspectiveReveal>
                <div className="relative z-20" id="act-4-craft">
                    <CinematicScene
                        title="The Most Complex Screen I've Ever Designed."
                        body={
                            <p>The confusion matrix screen had two charts, a threshold slider, and a four-by-three table. When I first saw it, I couldn&apos;t make sense of it. So I sat with the data scientist — a dozen sessions, paper and pen — until I understood every single interaction.</p>
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
                                    <h3 className="text-white font-bold text-xl md:text-2xl mb-4">The Confusion Matrix</h3>
                                    <p className="text-zinc-400 font-light leading-relaxed">
                                        I aligned the threshold slider directly under the chart point that moved — exactly 90 degrees parallel. As you drag it, the dot on the line chart moves with it. There&apos;s no way you can miss the relationship. It was like magic. After understanding every interaction on every chart, I could finally explain it to somebody else visually.
                                    </p>
                                </TextTile>
                                <ImageTile src="/images/case-study/ml-functions/11. Train Model Workflow - Confusion Matrix.png" alt="Confusion Matrix" caption="Threshold slider and chart point: exactly 90° parallel" delay={0.15} />
                            </BentoRow>

                            <BentoRow layout="50/50">
                                <ImageTile src="/images/case-study/ml-functions/10. Binary Classfication - ROC Precision.png" alt="ROC Precision" caption="ROC / Precision curves" delay={0.2} />
                                <ImageTile src="/images/case-study/ml-functions/6. Run Model - Explainability Popup.png" alt="Explainability Popup" caption="Native explainability — where it all started" delay={0.25} />
                            </BentoRow>

                            <BentoRow layout="50/50">
                                <ImageTile src="/images/case-study/ml-functions/17. Optimize Model Popup.png" alt="Optimize Model" caption="Optimize Model — with inline warnings" delay={0.3} />
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
                                                <VideoPlayer
                                                    src={data.prototypeMedia.beforeAfter.before.videoUrl ?? ''}
                                                    poster={data.prototypeMedia.beforeAfter.before.videoPoster}
                                                    autoPlay={false}
                                                    ariaLabel="ML Functions — legacy workflow"
                                                    className="rounded-xl overflow-hidden aspect-[16/10] bg-black"
                                                    videoClassName="object-contain"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-mono text-[var(--cs-accent)] uppercase tracking-widest mb-3">Redesigned Workflow</p>
                                                <div className="relative">
                                                    <VideoPlayer
                                                        src={data.prototypeMedia.beforeAfter.after.videoUrl}
                                                        poster={data.prototypeMedia.beforeAfter.after.videoPoster}
                                                        autoPlay={false}
                                                        ariaLabel="ML Functions — redesigned workflow"
                                                        className="rounded-xl overflow-hidden aspect-[16/10] bg-black"
                                                        videoClassName="object-contain"
                                                    />
                                                    <div className="absolute top-3 right-3 bg-[var(--cs-accent)] text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest z-30">Redesign</div>
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
                        &ldquo;The best screen in the entire UX revamp.&rdquo; He said that during a team walkthrough. Out loud. In front of everyone. — Marcus Horbach, Principal Data Scientist
                    </PullQuote>
                </div>
            </PerspectiveReveal>


            {/* ═══════════════════════════════════════════════
                ACT V — I FOUGHT FOR EVERY DAMN THING IN ML.
               ═══════════════════════════════════════════════ */}
            <PerspectiveReveal>
                <div className="relative z-20" id="act-5-team">
                    <CinematicScene
                        title="I Fought for Every Damn Thing in ML."
                        body={
                            <p>I was the only designer on ML, on IQ, on Reporting Server. After the layoffs, it became four systems. I fought for every design decision with logic, not instinct.</p>
                        }
                    >
                        <BentoGrid>
                            <BentoRow layout="50/50">
                                <TextTile>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex gap-1">
                                            {['RC', 'ML', 'IQ', 'WD'].map((tag) => (
                                                <div key={tag} className="px-2 py-1 rounded text-[9px] font-mono text-zinc-600 border border-white/10">{tag}</div>
                                            ))}
                                        </div>
                                    </div>
                                    <p className="text-zinc-200 font-light leading-relaxed">
                                        I was the only designer to work on Reporting Server, on ML, on IQ. Nobody else touched these. I built a mental model of WebFOCUS as an end-to-end ecosystem: get data, prepare data, train and run ML, visualize in Designer, distribute through ReportCaster. Nobody explained that to me. I built it by working across enough of the system.
                                    </p>
                                </TextTile>
                                <TextTile delay={0.1}>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-lg border border-cyan-500/20 bg-cyan-500/5 flex items-center justify-center">
                                            <span className="text-cyan-400 text-sm">↔</span>
                                        </div>
                                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">The Data Flow Fight</span>
                                    </div>
                                    <p className="text-zinc-200 font-light leading-relaxed">
                                        When the data scientist tried to bring Data Flow back into the view, I pushed back. I had recordings, notes, documentation from our earlier sessions. I reminded him of our prior decisions, explained why the change would hurt the workflow, and held my ground. The room was me, two directors of engineering, the head PM, the principal data scientist, and my design director. I won.
                                    </p>
                                </TextTile>
                            </BentoRow>

                            <BentoRow layout="full">
                                <TextTile accent="teal" delay={0.15}>
                                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 pl-2">
                                        <p className="text-zinc-200 font-light leading-relaxed text-lg">
                                            Defending my thinking forced me to depend on logic, not instinct. I always needed industry research, existing WebFOCUS behavior, documentation, or common sense to back up my decisions. I could never just say &ldquo;I designed this because I felt like it.&rdquo; Design instincts don&apos;t mean anything if you don&apos;t have the evidence to back them up. That made me sharper. That made me better.
                                        </p>
                                    </div>
                                </TextTile>
                            </BentoRow>
                        </BentoGrid>
                    </CinematicScene>
                </div>
            </PerspectiveReveal>


            {/* ═══════════════════════════════════════════════
                ACT VI — THEY JUST BLAZED THROUGH IT.
               ═══════════════════════════════════════════════ */}
            <PerspectiveReveal>
                <div className="relative z-20" id="act-6-outcome">
                    <CinematicScene
                        title="They Just Blazed Through It."
                        body={
                            <p>Four SMEs. Separate sessions. I told them one thing: &ldquo;It starts from the dataset.&rdquo; They right-clicked, saw &ldquo;Predict Data,&rdquo; clicked it — and just blazed through the whole workflow. Because it was that obvious. The four-step flow was untouched by feedback. They had design suggestions on the results screens, but the core spine? Nobody questioned it.</p>
                        }
                    >
                        <BentoGrid>
                            <BentoRow layout="50/50">
                                <TextTile>
                                    <div className="text-4xl font-bold text-[var(--cs-accent)] mb-3">4/4</div>
                                    <p className="text-zinc-200 font-light leading-relaxed">
                                        Every SME completed the guided flow without assistance. My design director, who knew nothing about ML, was able to do it too. I taught him machine learning with this workflow. That was the real test.
                                    </p>
                                </TextTile>
                                <TextTile delay={0.1}>
                                    <div className="text-4xl font-bold text-[var(--cs-accent)] mb-3">~6 → 2</div>
                                    <p className="text-zinc-200 font-light leading-relaxed">
                                        Clicks to start. Right-click, Predict Data, done. The entry point I designed became how other AI features surfaced in the same menu — Generate Insights, Ask a Question. That wasn&apos;t just a UX tweak. That was adoption thinking.
                                    </p>
                                </TextTile>
                            </BentoRow>
                        </BentoGrid>
                    </CinematicScene>


                    {/* ═══ REFLECTION ═══ */}
                    <div className="relative">
                        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[60vw] h-[600px] bg-[var(--cs-accent)]/3 blur-[200px] rounded-full pointer-events-none" />
                        <CinematicScene
                            title="What a Mind-Bending Project."
                            body={
                                <p>ML Functions taught me product partnership more than anything else. With RC, I had to dig through chaos. With ML, my PM and I co-owned it. My input shaped the roadmap, the concepts, the direction. I only fully realized I was shaping the entire product experience after getting laid off and building these case studies.</p>
                            }
                        >
                            {data.reflection?.people && data.reflection.people.length > 0 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                                    {data.reflection.people.map((person: { quote: string; name: string; role: string; initials?: string }, i: number) => (
                                        <m.div
                                            key={i}
                                            initial={{ opacity: 0, y: 24 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.6, delay: i * 0.15, ease: EASE_CINEMATIC }}
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
                                        </m.div>
                                    ))}
                                </div>
                            )}

                            {data.reflection?.retrospective && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                                    <m.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6 }}
                                        className="p-6 rounded-xl border-l-2 border-amber-500/40 bg-white/[0.02]"
                                    >
                                        <span className="text-[10px] text-amber-500/80 font-mono uppercase tracking-widest mb-3 block">What I&apos;d Push Harder For</span>
                                        <h3 className="text-white font-bold text-xl mb-3">{data.reflection.retrospective.pushHarder.title}</h3>
                                        <p className="text-zinc-400 font-light text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: data.reflection.retrospective.pushHarder.content }} />
                                    </m.div>
                                    <m.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.1 }}
                                        className="p-6 rounded-xl border-l-2 border-[var(--cs-accent)]/40 bg-white/[0.02]"
                                    >
                                        <span className="text-[10px] text-[var(--cs-accent)]/80 font-mono uppercase tracking-widest mb-3 block">Future Plans</span>
                                        <h3 className="text-white font-bold text-xl mb-3">{data.reflection.retrospective.doNext.title}</h3>
                                        <p className="text-zinc-400 font-light text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: data.reflection.retrospective.doNext.content }} />
                                    </m.div>
                                </div>
                            )}
                        </CinematicScene>

                        {/* ═══ Next Case Study ═══ */}
                        <SystemIndex currentId="ML_FUNCTIONS" />
                    </div>
                </div>
            </PerspectiveReveal>
        </>
    )
}

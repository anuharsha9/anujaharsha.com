import re

with open('src/components/home/HeroLanding.tsx', 'r') as f:
    content = f.read()

# 1. Update imports to ensure we have everything needed for scroll transformations
content = re.sub(
    r"import \{.*?\} from 'framer-motion'",
    """import {
    motion,
    useScroll,
    useTransform,
    useMotionValue,
    AnimatePresence,
    animate as fmAnimate,
    useMotionTemplate,
} from 'framer-motion'""",
    content,
    flags=re.DOTALL
)

# 2. Remove all the old timer-based states, phases, and unneeded hooks
content = re.sub(
    r"type IntroPhase = 'void'.*?const isButtonsReady = isAnujaIntroReady\n\n    // Gears logic removed",
    """// Gears logic removed""",
    content,
    flags=re.DOTALL
)

# 3. Increase container height to 450vh for the scroll track
content = re.sub(
    r"style={{ height: '120vh' }}",
    "style={{ height: '450vh' }}",
    content
)

# 4. Remove the typing text component, we'll use motion.span directly
content = re.sub(
    r"function TypingText\(\{ text, active, fast \= false \}: \{ text: string, active: boolean, fast\?: boolean \}\) \{.*?\n\}\n",
    "",
    content,
    flags=re.DOTALL
)

# 5. Define the new robust scroll transforms right after useScroll hook
content = re.sub(
    r"const \{ scrollYProgress \} = useScroll\(\{.*?\}\)",
    """const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'] // Track the full 450vh
    })

    // --- SCROLL CHOREOGRAPHY ---
    
    // Phase 1: Chair Philosophy (0% - 25%)
    const chair1Opacity = useTransform(scrollYProgress, [0.0, 0.04, 0.22, 0.25], [0, 1, 1, 0])
    const chair1Y = useTransform(scrollYProgress, [0.0, 0.04, 0.22, 0.25], [20, 0, 0, -20])
    
    const chair2Opacity = useTransform(scrollYProgress, [0.05, 0.09, 0.22, 0.25], [0, 1, 1, 0])
    const chair2Y = useTransform(scrollYProgress, [0.05, 0.09, 0.22, 0.25], [20, 0, 0, -20])
    
    const chair3Opacity = useTransform(scrollYProgress, [0.10, 0.14, 0.22, 0.25], [0, 1, 1, 0])
    const chair3Y = useTransform(scrollYProgress, [0.10, 0.14, 0.22, 0.25], [20, 0, 0, -20])
    
    const chair4Opacity = useTransform(scrollYProgress, [0.15, 0.19, 0.22, 0.25], [0, 1, 1, 0])
    const chair4Scale = useTransform(scrollYProgress, [0.15, 0.19], [0.95, 1])
    const chair4Blur = useTransform(scrollYProgress, [0.15, 0.19], [4, 0])
    const chair4Filter = useMotionTemplate`blur(${chair4Blur}px)`
    
    // Phase 2 & 3: Introduction & CTAs (30% - 60%)
    const introOpacity = useTransform(scrollYProgress, [0.28, 0.33, 0.57, 0.62], [0, 1, 1, 0])
    const introY = useTransform(scrollYProgress, [0.28, 0.33, 0.57, 0.62], [30, 0, 0, -30])
    
    const buttonsOpacity = useTransform(scrollYProgress, [0.38, 0.43, 0.57, 0.62], [0, 1, 1, 0])
    const buttonsY = useTransform(scrollYProgress, [0.38, 0.43, 0.57, 0.62], [20, 0, 0, -20])
    // Enable pointer events only when buttons are fully visible
    const [isButtonsInteractive, setIsButtonsInteractive] = useState(false)
    
    useLayoutEffect(() => {
        return buttonsOpacity.onChange((v) => {
            setIsButtonsInteractive(v > 0.8)
        })
    }, [buttonsOpacity])
    
    // Phase 4 & 5: Mission Statement Zoom (65% - 95%) 
    // Container fades out smoothly at the very end (95% - 100%) so it cleanly hands off to timeline
    const missionOpacity = useTransform(scrollYProgress, [0.65, 0.72, 0.90, 0.95], [0, 1, 1, 0])
    const missionScale = useTransform(scrollYProgress, [0.65, 0.72, 0.90, 0.98], [0.9, 1, 1.2, 8]) // The dramatic zoom out
    const missionBlur = useTransform(scrollYProgress, [0.90, 0.98], [0, 20])
    const missionFilter = useMotionTemplate`blur(${missionBlur}px)`

    // Hero container overall fade out at the very end to hand off to the next section
    const overallHeroOpacity = useTransform(scrollYProgress, [0.95, 1.0], [1, 0])
    
    // Disable atmospheric interactions once scrolled past 10%
    const hideScrollPrompt = useTransform(scrollYProgress, [0, 0.05], [1, 0])""",
    content,
    flags=re.DOTALL
)

# 6. Change combinedHeroTextOpacity and simplify structure
content = re.sub(
    r"const combinedHeroTextOpacity = useTransform\(\n.*?\n.*?\n    \)",
    "const combinedHeroTextOpacity = useTransform([overallHeroOpacity, heroWatchFade, heroExploreFade], ([overall, watch, explore]) => (overall as number) * (watch as number) * (explore as number))",
    content,
    flags=re.DOTALL
)

# 7. Replace the entire `<motion.div className="relative z-10 flex flex-col items-center ...">` block 
# containing Kicker, Headline, Chair Sequence, etc.
content = re.sub(
    r"<motion\.div\n\s+className=\"relative z-10 flex flex-col items-center text-center space-y-6 px-4\"\n\s+initial=\{false\}\n\s+>.*?{/\* SCROLL INDICATOR \-\- appears last \*/}",
    """<div className="relative z-10 w-full h-full flex flex-col items-center justify-center pointer-events-none">
                        
                        {/* PHASE 1: CHAIR QUOTE MOVIE SEQUENCE */}
                        <motion.div 
                            className="absolute top-1/2 left-1/2 w-full lg:w-[60vw] -translate-x-1/2 -translate-y-[60%] flex flex-col items-center justify-center font-mono text-sm md:text-base lg:text-lg leading-relaxed max-w-2xl px-6 space-y-4 mb-4 md:mb-8 text-zinc-400 text-center"
                            style={{ pointerEvents: 'none' }}
                        >
                            <motion.p className="min-h-[28px] my-1 will-change-transform" style={{ opacity: chair1Opacity, y: chair1Y }}>
                                "When you look at a chair...
                            </motion.p>
                            <motion.p className="min-h-[28px] my-1 will-change-transform" style={{ opacity: chair2Opacity, y: chair2Y }}>
                                ...the only thing that comes to mind is to sit on it.
                            </motion.p>
                            <motion.p className="min-h-[28px] mt-6 will-change-transform" style={{ opacity: chair3Opacity, y: chair3Y }}>
                                Good UX should feel exactly like that.
                            </motion.p>
                            <motion.p 
                                className="min-h-[32px] mt-4 text-white font-bold text-xl md:text-2xl lg:text-3xl tracking-wide will-change-transform" 
                                style={{ opacity: chair4Opacity, scale: chair4Scale, filter: chair4Filter }}
                            >
                                Invisible."
                            </motion.p>
                        </motion.div>

                        {/* PHASE 2 & 3: INTRODUCTION & CTAS */}
                        <div className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-[50%] flex flex-col items-center justify-center px-6">
                            <motion.div 
                                className="flex flex-col items-center text-center max-w-3xl will-change-transform"
                                style={{ opacity: introOpacity, y: introY }}
                            >
                                <span className="text-white block font-semibold mb-3 text-2xl md:text-3xl lg:text-4xl drop-shadow-md">Hi, I'm Anuja</span>
                                <p className="text-base md:text-xl lg:text-2xl text-zinc-300 leading-relaxed font-medium">
                                    a Senior Product Designer with 13 years of experience specializing in B2B enterprise UX, product strategy, and high-fidelity code prototyping.
                                </p>
                            </motion.div>

                            <motion.div 
                                className="mt-12 grid w-full max-w-[42rem] grid-cols-1 gap-4 sm:grid-cols-2"
                                style={{ 
                                    opacity: buttonsOpacity, 
                                    y: buttonsY,
                                    pointerEvents: isButtonsInteractive ? 'auto' : 'none' 
                                }}
                            >
                                <div className="relative order-2 sm:order-1 w-full flex h-14 hover:shadow-[0_0_40px_var(--overlay-white-30)] transition-shadow duration-500 rounded-full pointer-events-auto">
                                    <button
                                        onClick={enterWatchMode}
                                        className="group relative inline-flex h-full w-full items-center justify-center gap-3 overflow-hidden rounded-full px-8 py-3.5 font-sans text-xs font-bold uppercase tracking-widest transition-all duration-500 hover:text-white hover:border-white border border-white"
                                    >
                                        <span className="absolute inset-0 rounded-full bg-white transition-opacity duration-300 group-hover:opacity-0" />
                                        <span className="relative z-10 flex items-center gap-3 text-black transition-colors duration-300 group-hover:text-white pointer-events-none">
                                            <Play className="w-4 h-4 fill-current transition-transform duration-500 group-hover:scale-110" />
                                            <span>Flagship Case Study</span>
                                        </span>
                                    </button>
                                </div>

                                <div className="relative order-1 sm:order-2 w-full flex h-14 pointer-events-auto">
                                    <button
                                        onClick={enterExploreMode}
                                        className="group relative inline-flex h-full w-full items-center justify-center gap-3 overflow-hidden rounded-full px-8 py-3.5 font-sans text-xs font-bold uppercase tracking-widest text-white transition-all duration-500 border border-white/40 hover:border-white/80 hover:bg-white/5 backdrop-blur-sm"
                                    >
                                        <span ref={exploreIconAnchorRef} className="relative z-10 flex h-5 w-5 shrink-0 items-center justify-center">
                                            <div className="w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 animate-[spin_4.5s_linear_infinite]">
                                                <InterlockedGearGlyph />
                                            </div>
                                        </span>
                                        <span className="relative z-10">
                                            Explore My Mind
                                        </span>
                                    </button>
                                </div>
                            </motion.div>
                        </div>

                        {/* PHASE 4 & 5: MISSION STATEMENT ZOOM FINALE */}
                        <motion.div 
                            className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center max-w-6xl px-4 will-change-transform"
                            style={{ 
                                opacity: missionOpacity, 
                                scale: missionScale,
                                filter: missionFilter
                            }}
                        >
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-extrabold leading-[1.1] tracking-[-0.02em] font-sans">
                                <span className="bg-[linear-gradient(118deg,#ffffff_0%,#eafcff_28%,#9ceaf2_56%,#2fc6d5_80%,var(--accent-teal)_100%)] bg-clip-text text-transparent drop-shadow-[0_0_20px_var(--overlay-cyan-light-22)] py-2 inline-block">
                                    I design so I can be part of making people's lives a little easier every day.
                                </span>
                            </h1>
                        </motion.div>
                    </div>

                    {/* SCROLL INDICATOR */}""",
    content,
    flags=re.DOTALL
)

# 8. Clean up unused states declarations (introPhase, skipped) inside the component
content = re.sub(
    r"\s*const \[introPhase, setIntroPhase\] = useState<IntroPhase>\('void'\)\n\s*const \[skipped, setSkipped\] = useState\(false\)\n",
    "\n",
    content
)

# 9. Clean up scroll prompt condition to match new layout logic
content = re.sub(
    r"opacity: isFullySettled \? 1 : 0,",
    "opacity: hideScrollPrompt,",
    content
)
content = re.sub(
    r"y: isFullySettled \? 0 : 16,",
    "y: 0,",
    content
)


with open('src/components/home/HeroLanding.tsx', 'w') as f:
    f.write(content)

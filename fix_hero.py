import re

with open('src/components/home/HeroLanding.tsx', 'r') as f:
    content = f.read()

# 1. Delete old theatrical components (Ambient gears, INTRO_MILESTONES, etc) 
# and add TypingText.
pattern = r"// --- THEATRICAL INTRO PHASES ---.*?export default function HeroLanding\(\) {"
replacement = """// Staggered typing effect using opacity
function TypingText({ text, delay = 0, duration = 0.4, className = "" }: { text: string, delay?: number, duration?: number, className?: string }) {
    const letters = Array.from(text);
    const stagger = duration / letters.length;

    return (
        <motion.span
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 1 },
                visible: {
                    opacity: 1,
                    transition: { staggerChildren: stagger, delayChildren: delay }
                }
            }}
            className={className}
        >
            {letters.map((char, index) => (
                <motion.span key={index} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0 } } }}>
                    {char}
                </motion.span>
            ))}
        </motion.span>
    )
}

export default function HeroLanding() {"""
content = re.sub(pattern, replacement, content, flags=re.DOTALL)

# 2. Replace introPhase hooks with skipIntro hooks
pattern2 = r"    const \[introPhase, setIntroPhase\] = useState<IntroPhase>\('void'\).*?const prefersReducedMotion = useReducedMotion\(\)"
replacement2 = """    const [skipIntro, setSkipIntro] = useState(false)
    const [showPhase2, setShowPhase2] = useState(false)
"""
content = re.sub(pattern2, replacement2, content, flags=re.DOTALL)


# 3. Replace the sequence logic and keydown
pattern3 = r"    const syncAssemblyGeometry = useCallback\(\(\) => \{.*?exitExploreMode\]\)"
replacement3 = """    useEffect(() => {
        if (skipIntro) {
            setShowPhase2(true)
            return
        }
        const timer = setTimeout(() => {
            setShowPhase2(true)
        }, 3800)
        return () => clearTimeout(timer)
    }, [skipIntro])

    const handleSkip = useCallback(() => {
        if (!skipIntro && !isWatching && !isExploringMind) {
            setSkipIntro(true)
        }
    }, [skipIntro, isWatching, isExploringMind])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (isWatching) exitWatchMode()
                if (isExploringMind) exitExploreMode()
            } else if (['Space', 'Enter', 'ArrowDown'].includes(e.code) || e.key === ' ') {
                handleSkip()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isWatching, exitWatchMode, isExploringMind, exitExploreMode, handleSkip])"""
content = re.sub(pattern3, replacement3, content, flags=re.DOTALL)

# 4. Remove unused booleans
pattern4 = r"    const isTextVisible = prefersReducedMotion \|\| introPhase !== 'void'\n.*?const showMatchSweep = !prefersReducedMotion && \(introPhase === 'pull' \|\| introPhase === 'form'\)"
replacement4 = ""
content = re.sub(pattern4, replacement4, content, flags=re.DOTALL)

# 5. Replace `return ( <div ...> )` to have onClick handlers, and fix the height
pattern5 = r"    return \(\n        <div ref=\{containerRef\} className=\"relative w-full z-10\" style=\{\{ height: '300vh' \}\}>\n            \{\/\* STICKY STAGE \*\/\}\n            <div className=\"sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center\">"
replacement5 = """    return (
        <div ref={containerRef} className="relative w-full z-10 font-sans cursor-default" style={{ height: '120vh' }} onClick={handleSkip} onWheel={handleSkip} onTouchMove={handleSkip}>
            {/* STICKY STAGE */}
            <div
                className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center"
                role={isWatching || isExploringMind ? 'dialog' : undefined}
                aria-modal={isWatching || isExploringMind ? true : undefined}
                tabIndex={isWatching || isExploringMind ? -1 : undefined}
            >"""
content = re.sub(pattern5, replacement5, content, flags=re.DOTALL)

# 6. Replace HERO TEXT layer
pattern6 = r"                \{\/\* --- HERO TEXT \(Fades out quickly on scroll, and on watch OR explore\) --- \*\/\}.*?<\/motion\.div>\n\n\n                \{\/\* --- THE BRAIN \(Interactive\)"
replacement6 = """                {/* --- HERO TEXT --- */}
                <motion.div
                    ref={heroOverlayRef}
                    className={`absolute inset-0 z-[15] flex flex-col items-center justify-center ${isWatching ? 'pointer-events-none' : 'pointer-events-auto'}`}
                    style={{ opacity: combinedHeroTextOpacity, scale: heroTextScale, y: heroTextY, filter: heroTextFilterTemplate }}
                >
                    <AnimatePresence>
                        {!showPhase2 && (
                            <motion.div
                                key="phase1"
                                className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none"
                                initial={{ opacity: 1, filter: "blur(0px)" }}
                                animate={{ opacity: 0, filter: "blur(10px)" }}
                                transition={{ delay: 3.2, duration: 0.6, ease: "easeInOut" }}
                                exit={{ opacity: 0, filter: "blur(10px)", transition: { duration: 0 } }}
                            >
                                <TypingText
                                    text="When you look at a chair..."
                                    delay={0}
                                    duration={0.4}
                                    className="text-slate-400 font-mono text-sm md:text-base tracking-wide"
                                />
                                <TypingText
                                    text="...the only thing that comes to mind is to sit on it."
                                    delay={0.8}
                                    duration={0.4}
                                    className="text-slate-400 font-mono text-sm md:text-base tracking-wide mt-2"
                                />
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
                                    className="text-white text-xl md:text-2xl font-medium tracking-tight mt-12"
                                >
                                    Good UX should feel exactly like that.
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 2.2, duration: 0.01 }}
                                    className="text-[#00E5FF] text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter mt-12"
                                >
                                    Invisible.
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <AnimatePresence>
                        {showPhase2 && (
                            <motion.div
                                key="phase2"
                                className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center max-w-4xl mx-auto"
                                initial={skipIntro ? { opacity: 1 } : { opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: skipIntro ? 0 : 0.8 }}
                            >
                                <motion.h3
                                    initial={skipIntro ? { opacity: 1 } : { opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: skipIntro ? 0 : 0.8 }}
                                    className="text-white text-xl md:text-2xl font-medium tracking-tight mb-8"
                                >
                                    That's why I design.
                                </motion.h3>
                                <motion.h1
                                    initial={skipIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: skipIntro ? 0 : 0.6, duration: skipIntro ? 0 : 0.8, ease: "easeOut" }}
                                    className="text-3xl sm:text-5xl lg:text-[4rem] font-bold tracking-tight mb-8 bg-[linear-gradient(118deg,#ffffff_0%,#eafcff_28%,#9ceaf2_56%,#2fc6d5_80%,var(--accent-teal)_100%)] bg-clip-text text-transparent pb-2 leading-tight"
                                >
                                    So I can be part of making people's lives a little easier every day.
                                </motion.h1>
                                <motion.p
                                    initial={skipIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: skipIntro ? 0 : 1.2, duration: skipIntro ? 0 : 0.8 }}
                                    className="text-slate-400 text-sm md:text-base lg:text-lg max-w-3xl font-medium tracking-wide leading-relaxed mb-12"
                                >
                                    Hi, I'm Anuja — a Senior Product Designer with 13 years of experience specializing in B2B enterprise UX, product strategy, and high-fidelity code prototyping.
                                </motion.p>
                                <motion.div
                                    initial={skipIntro ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: skipIntro ? 0 : 1.7, duration: skipIntro ? 0 : 0.8 }}
                                    className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
                                    style={{ pointerEvents: 'auto' }}
                                >
                                    <button
                                        onClick={(e) => { e.stopPropagation(); enterWatchMode(); }}
                                        className="w-full sm:w-auto px-8 py-4 bg-white text-black text-sm font-bold rounded-full hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-[#00E5FF]"
                                    >
                                        Watch My Case Study
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); enterExploreMode(); }}
                                        className="w-full sm:w-auto px-8 py-4 bg-black border border-white/20 text-white text-sm font-bold rounded-full hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-[#00E5FF]"
                                    >
                                        Explore My Mind
                                    </button>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.div
                        className="absolute bottom-8 left-0 right-0 flex flex-col items-center justify-center gap-4 w-full"
                        initial={false}
                        animate={{
                            opacity: showPhase2 ? 1 : 0,
                            y: showPhase2 ? 0 : 16,
                        }}
                        transition={{ delay: skipIntro ? 0 : 2.0, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="text-[10px] sm:text-xs font-mono text-zinc-500 uppercase tracking-[0.4em] flex flex-wrap justify-center px-4">
                            SCROLL DOWN TO DISCOVER MORE
                        </div>
                        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
                            <ArrowDown className="w-4 h-4 text-zinc-500" />
                        </motion.div>
                    </motion.div>
                </motion.div>


                {/* --- THE BRAIN (Interactive)"""
content = re.sub(pattern6, replacement6, content, flags=re.DOTALL)


with open('src/components/home/HeroLanding.tsx', 'w') as f:
    f.write(content)

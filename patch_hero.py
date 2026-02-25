import re

with open('src/components/home/HeroLanding.tsx', 'r') as f:
    content = f.read()

# Edit 1: IntroPhase and Milestones
content = re.sub(
    r"type IntroPhase = 'void' \| 'atmosphere'.*?} as const",
    """type IntroPhase = 'void' | 'chair1' | 'chair2' | 'chair3' | 'chair4' | 'chairDissolve' | 'designWhy' | 'designReason' | 'anujaIntro' | 'settled'

type NeuralParticle = {
    id: string
    x: number
    y: number
    size: number
    baseOpacity: number
    duration: number
    driftY: number
    driftX: number
}

const INTRO_MILESTONES = {
    chair1: 100,
    chair2: 900,
    chair3: 1600,
    chair4: 2300,
    chairDissolve: 3100,
    designWhy: 3600,
    designReason: 4300,
    anujaIntro: 5100,
    settled: 5600,
} as const

function TypingText({ text, active, fast = false }: { text: string, active: boolean, fast?: boolean }) {
    if (!active) return <span className="opacity-0" aria-hidden="true">{text}</span>
    return (
        <span className="inline-block" aria-label={text}>
            {text.split('').map((char, i) => (
                <motion.span
                    key={i}
                    aria-hidden="true"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.01, delay: i * (fast ? 0.015 : 0.03) }}
                >
                    {char}
                </motion.span>
            ))}
        </span>
    )
}""",
    content,
    flags=re.DOTALL
)

# Edit 2: State variables
content = re.sub(
    r"const \[introPhase, setIntroPhase\] = useState<IntroPhase>\('void'\)\n\n    // const prefersReducedMotion = useReducedMotion\(\) // Removed to enforce theatrical intro",
    """const [introPhase, setIntroPhase] = useState<IntroPhase>('void')
    const [skipped, setSkipped] = useState(false)

    // const prefersReducedMotion = useReducedMotion() // Removed to enforce theatrical intro""",
    content
)

# Edit 3: Timers
content = re.sub(
    r"// --- THEATRICAL INTRO TIMELINE ---.*?} as const",
    """// --- THEATRICAL INTRO TIMELINE ---""",
    content, # replace the comment to clear and we'll replace the block manually
    flags=re.DOTALL
)

content = re.sub(
    r"// --- THEATRICAL INTRO TIMELINE ---.*?return \(\) => {\n            timers.forEach\(\(timer\) => window.clearTimeout\(timer\)\)\n        }\n    }, \[\]\)",
    """// --- THEATRICAL INTRO TIMELINE ---
    useEffect(() => {
        setIntroPhase('void')

        const timers = [
            window.setTimeout(() => setIntroPhase('chair1'), INTRO_MILESTONES.chair1),
            window.setTimeout(() => setIntroPhase('chair2'), INTRO_MILESTONES.chair2),
            window.setTimeout(() => setIntroPhase('chair3'), INTRO_MILESTONES.chair3),
            window.setTimeout(() => setIntroPhase('chair4'), INTRO_MILESTONES.chair4),
            window.setTimeout(() => setIntroPhase('chairDissolve'), INTRO_MILESTONES.chairDissolve),
            window.setTimeout(() => setIntroPhase('designWhy'), INTRO_MILESTONES.designWhy),
            window.setTimeout(() => setIntroPhase('designReason'), INTRO_MILESTONES.designReason),
            window.setTimeout(() => setIntroPhase('anujaIntro'), INTRO_MILESTONES.anujaIntro),
            window.setTimeout(() => setIntroPhase('settled'), INTRO_MILESTONES.settled),
        ]

        return () => {
            timers.forEach((timer) => window.clearTimeout(timer))
        }
    }, [])

    const skipIntro = useCallback(() => {
        if (!skipped) {
            setSkipped(true)
            setIntroPhase('settled')
        }
    }, [skipped])

    useEffect(() => {
        const handleWheelTouch = () => skipIntro()
        const handleKeyDownSkip = (e: KeyboardEvent) => {
            if (e.key === ' ' || e.key === 'Enter' || e.key === 'Escape' || e.key === 'ArrowDown') skipIntro()
        }
        
        window.addEventListener('wheel', handleWheelTouch, { passive: true })
        window.addEventListener('touchstart', handleWheelTouch, { passive: true })
        window.addEventListener('keydown', handleKeyDownSkip)
        
        return () => {
            window.removeEventListener('wheel', handleWheelTouch)
            window.removeEventListener('touchstart', handleWheelTouch)
            window.removeEventListener('keydown', handleKeyDownSkip)
        }
    }, [skipIntro])""",
    content,
    flags=re.DOTALL
)

# Edit 4: Booleans
content = re.sub(
    r"// --- PHASE-DERIVED BOOLEANS ---.*?const isFullySettled = phaseIndex >= 7",
    """// --- PHASE-DERIVED BOOLEANS ---
    const phaseIndex = ['void', 'chair1', 'chair2', 'chair3', 'chair4', 'chairDissolve', 'designWhy', 'designReason', 'anujaIntro', 'settled'].indexOf(introPhase)
    
    // We only show the chair text before it dissolves and only if not skipped
    const showChair = phaseIndex < 5 && !skipped
    
    const isChair1Ready = showChair && phaseIndex >= 1
    const isChair2Ready = showChair && phaseIndex >= 2
    const isChair3Ready = showChair && phaseIndex >= 3
    const isChair4Ready = showChair && phaseIndex >= 4
    
    const isAtmosphereReady = true;

    const isDesignWhyReady = phaseIndex >= 6 || skipped
    const isDesignReasonReady = phaseIndex >= 7 || skipped
    const isAnujaIntroReady = phaseIndex >= 8 || skipped
    const isFullySettled = phaseIndex >= 9 || skipped
    
    const isButtonsReady = isAnujaIntroReady""",
    content,
    flags=re.DOTALL
)

# Edit 5: UI Elements
content = re.sub(
    r"\{/\* KICKER: Typewriter-style character reveal \*/\}.*?</AnimatePresence>\.*?</h1>",
    """{/* CHAIR QUOTE MOVIE SEQUENCE */}
                        <AnimatePresence>
                            {showChair && (
                                <motion.div 
                                    className="absolute top-1/2 left-1/2 w-full lg:w-[60vw] -translate-x-1/2 -translate-y-[60%] flex flex-col items-center justify-center text-zinc-400 font-mono text-sm md:text-base lg:text-lg leading-relaxed max-w-2xl px-6 space-y-4"
                                    exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                >
                                    <div className="flex flex-col items-center justify-center text-center w-full">
                                        <p className="min-h-[28px] my-1">
                                            <TypingText text="When you look at a chair..." active={isChair1Ready} fast />
                                        </p>
                                        <p className="min-h-[28px] my-1">
                                            <TypingText text="...the only thing that comes to mind is to sit on it." active={isChair2Ready} fast />
                                        </p>
                                        <p className="min-h-[28px] mt-6">
                                            <motion.span 
                                                initial={{ opacity: 0 }} 
                                                animate={isChair3Ready ? { opacity: 1 } : { opacity: 0 }} 
                                                transition={{ duration: 0.6 }}
                                            >
                                                Good UX should feel exactly like that.
                                            </motion.span>
                                        </p>
                                        <p className="min-h-[32px] mt-4 text-white font-bold text-xl md:text-2xl lg:text-3xl tracking-wide">
                                            <motion.span 
                                                initial={{ opacity: 0, filter: 'blur(4px)', scale: 0.95 }} 
                                                animate={isChair4Ready ? { opacity: 1, filter: 'blur(0px)', scale: 1 } : { opacity: 0, filter: 'blur(4px)', scale: 0.95 }} 
                                                transition={{ duration: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                                                style={{ display: 'inline-block' }}
                                            >
                                                Invisible.
                                            </motion.span>
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* FINAL PORTFOLIO STATE */}
                        <motion.div 
                            className="relative flex flex-col items-center justify-center pointer-events-none w-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isDesignWhyReady ? 1 : 0 }}
                            style={{ pointerEvents: isDesignWhyReady ? 'auto' : 'none' }}
                        >
                            <motion.h2 
                                className="text-xl md:text-2xl lg:text-3xl font-medium text-white mb-6 drop-shadow-md"
                                initial={{ opacity: 0, y: 10 }}
                                animate={isDesignWhyReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                That's why I design.
                            </motion.h2>

                            <motion.h1 
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold leading-[1.1] tracking-[-0.02em] font-sans text-center max-w-5xl mb-12"
                                initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
                                animate={isDesignReasonReady ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 15, filter: 'blur(8px)' }}
                                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <span className="bg-[linear-gradient(118deg,#ffffff_0%,#eafcff_28%,#9ceaf2_56%,#2fc6d5_80%,var(--accent-teal)_100%)] bg-clip-text text-transparent drop-shadow-[0_0_20px_var(--overlay-cyan-light-22)] py-2 inline-block">
                                    So I can be part of making people's lives a little easier every day.
                                </span>
                            </motion.h1>

                            <motion.p 
                                className="text-sm md:text-base lg:text-lg text-zinc-300 max-w-2xl text-center leading-relaxed font-medium mb-12"
                                initial={{ opacity: 0, y: 10 }}
                                animate={isAnujaIntroReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <span className="text-white block font-semibold mb-2 text-base md:text-lg">Hi, I'm Anuja</span>
                                a Senior Product Designer with 13 years of experience specializing in B2B enterprise UX, product strategy, and high-fidelity code prototyping.
                            </motion.p>
                        </motion.div>""",
    content,
    flags=re.DOTALL
)

with open('src/components/home/HeroLanding.tsx', 'w') as f:
    f.write(content)

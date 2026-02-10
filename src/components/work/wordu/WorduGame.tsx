'use client'

import { useState, useEffect, useRef, FormEvent } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    ArrowBigRight,
    Trophy,
    Search,
    RotateCcw,
    Flame,
    Infinity as InfinityIcon,
    Crosshair,
    Swords,
    ChevronLeft
} from "lucide-react"

// --- Helper for Class Names ---
const clsx = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

// --- Types ---
type Turn = "you" | "opponent"
type GameState = "menu" | "mode_select" | "playing" | "gameover"
type GameMode = "rapid_fire" | "endless" | "target" | "rally"

type WordEntry = {
    word: string
    player: Turn
    score: number
    multiplier: number
    id: string
}

// --- Constants ---
const MODES: { id: GameMode; title: string; desc: string; icon: any; color: string; duration?: number; target?: number }[] = [
    {
        id: "rapid_fire",
        title: "Rapid-Fire",
        desc: "180s. Build as many words as possible.",
        icon: Flame,
        color: "bg-[#F7941D]", // was bg-orange
        duration: 180
    },
    {
        id: "endless",
        title: "Endless",
        desc: "No time limit. Play until you're stuck.",
        icon: InfinityIcon,
        color: "bg-teal-500", // Standard Tailwind
        duration: 0
    },
    {
        id: "target",
        title: "Target Mode",
        desc: "Reach 500 points in limited moves.",
        icon: Crosshair,
        color: "bg-emerald-500", // Standard Tailwind
        duration: 0,
        target: 500
    },
    {
        id: "rally",
        title: "Rally",
        desc: "Compete 1v1 for the leaderboard.",
        icon: Swords,
        color: "bg-rose-500", // Standard Tailwind
        duration: 180
    }
]

export default function WorduGame() {
    // Game State
    const [gameState, setGameState] = useState<GameState>("menu")
    const [selectedMode, setSelectedMode] = useState<GameMode>("rapid_fire")
    const [dictionary, setDictionary] = useState<Set<string>>(new Set())
    const [wordMap, setWordMap] = useState<Map<string, string[]>>(new Map())
    const [isLoading, setIsLoading] = useState(true)

    // Play State
    const [turn, setTurn] = useState<Turn>("you")
    const [wordChain, setWordChain] = useState<WordEntry[]>([])
    const [currentInput, setCurrentInput] = useState("")
    const [score, setScore] = useState(0)
    const [multiplier, setMultiplier] = useState(1)
    const [timeLeft, setTimeLeft] = useState(0)
    const [movesLeft, setMovesLeft] = useState(0) // For Target mode
    const [errorMsg, setErrorMsg] = useState("")
    const inputRef = useRef<HTMLInputElement>(null)
    const bottomRef = useRef<HTMLDivElement>(null)

    // --- 1. Load Dictionary ---
    useEffect(() => {
        async function loadDictionary() {
            try {
                const res = await fetch("/dictionary.txt")
                const text = await res.text()
                const words = text.split(/\r?\n/)

                const dictSet = new Set<string>()
                const wMap = new Map<string, string[]>()

                words.forEach((w) => {
                    const word = w.trim().toLowerCase()
                    if (word.length < 2) return

                    dictSet.add(word)
                    const startChar = word[0]
                    if (!wMap.has(startChar)) {
                        wMap.set(startChar, [])
                    }
                    wMap.get(startChar)?.push(word)
                })

                setDictionary(dictSet)
                setWordMap(wMap)
                setIsLoading(false)
            } catch (e) {
                console.error("Failed to load dictionary", e)
                setErrorMsg("Failed to load dictionary.")
            }
        }
        loadDictionary()
    }, [])

    // --- 2. Timer (Rapid Fire & Rally) ---
    useEffect(() => {
        if (gameState !== "playing") return
        if (selectedMode === "endless" || selectedMode === "target") return // No timer

        if (timeLeft <= 0) {
            setGameState("gameover")
            return
        }
        const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000)
        return () => clearInterval(interval)
    }, [gameState, timeLeft, selectedMode])

    // --- 3. Scroll to bottom ---
    useEffect(() => {
        if (gameState === "playing") {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" })
        }
    }, [wordChain, gameState])

    // --- 4. AI Opponent ---
    useEffect(() => {
        if (gameState !== "playing" || turn !== "opponent") return

        const timeout = setTimeout(() => {
            playOpponentTurn()
        }, 1200 + Math.random() * 800)

        return () => clearTimeout(timeout)
    }, [turn, gameState, wordChain])

    // Focus input
    useEffect(() => {
        if (turn === "you" && gameState === "playing") {
            setTimeout(() => inputRef.current?.focus(), 100)
        }
    }, [turn, gameState])


    // --- Logic ---
    const enterModeSelect = () => {
        setGameState("mode_select")
    }

    const startGame = (mode: GameMode) => {
        const config = MODES.find(m => m.id === mode)
        setSelectedMode(mode)
        setGameState("playing")
        setScore(0)
        setMultiplier(1)
        setWordChain([])
        setTurn("you")
        setErrorMsg("")

        if (mode === "target") {
            setMovesLeft(20) // 20 moves to hit target
        }

        if (config?.duration) {
            setTimeLeft(config.duration)
        }
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (turn !== "you" || !currentInput) return

        const word = currentInput.trim().toLowerCase()

        // Validation
        if (!dictionary.has(word)) {
            showError(`"${word}" is not in the dictionary.`)
            return
        }
        if (wordChain.length > 0) {
            const lastWord = wordChain[wordChain.length - 1].word
            const targetChar = lastWord[lastWord.length - 1]
            if (word[0] !== targetChar) {
                showError(`Word must start with '${targetChar.toUpperCase()}'`)
                return
            }
        }
        if (wordChain.some((w) => w.word === word)) {
            showError("Word already used!")
            return
        }

        submitMove(word, "you")
        setCurrentInput("")
    }

    const showError = (msg: string) => {
        setErrorMsg(msg)
        setTimeout(() => setErrorMsg(""), 2500)
    }

    const submitMove = (word: string, player: Turn) => {
        let newMult = 1
        if (wordChain.length > 0) {
            const lastWord = wordChain[wordChain.length - 1].word
            if (lastWord.length === word.length) {
                newMult = Math.min(8, multiplier + 1)
            } else {
                newMult = 1
            }
        }
        setMultiplier(newMult)

        const points = word.length * newMult
        let newScore = score

        if (player === "you") {
            newScore = score + points
            setScore(newScore)

            // Target Mode Logic
            if (selectedMode === "target") {
                setMovesLeft(prev => {
                    const left = prev - 1
                    if (left <= 0 && newScore < 500) { // Failed target
                        setTimeout(() => setGameState("gameover"), 500)
                    }
                    return left
                })
                if (newScore >= 500) { // Won target
                    setTimeout(() => setGameState("gameover"), 500)
                }
            }
        }

        setWordChain((prev) => [
            ...prev,
            { word, player, score: points, multiplier: newMult, id: Math.random().toString(36).substring(7) },
        ])

        setTurn(player === "you" ? "opponent" : "you")
    }

    const playOpponentTurn = () => {
        if (wordChain.length === 0) return
        const lastWord = wordChain[wordChain.length - 1].word
        const targetChar = lastWord[lastWord.length - 1]
        const potentialWords = wordMap.get(targetChar)

        if (!potentialWords || potentialWords.length === 0) {
            console.log("AI Stuck")
            // Endless mode: User wins?
            if (selectedMode === 'endless') setGameState("gameover")
            return
        }

        let pick = ""
        // Smarter AI for Rally mode?
        const attempts = selectedMode === 'rally' ? 10 : 50

        for (let i = 0; i < attempts; i++) {
            const r = potentialWords[Math.floor(Math.random() * potentialWords.length)]
            if (!wordChain.some(w => w.word === r)) {
                pick = r
                break
            }
        }

        if (!pick) {
            if (selectedMode === 'endless') {
                // AI dies, user keeps playing? Or game over.
                // Simplification: Pick random used.
                pick = potentialWords[0]
            } else {
                pick = potentialWords[0]
            }
        }
        submitMove(pick, "opponent")
    }

    const formatTime = (s: number) => {
        const min = Math.floor(s / 60)
        const sec = s % 60
        return `${min}:${sec.toString().padStart(2, '0')}`
    }

    // --- Render ---
    // Using relative h-full w-full instead of min-h-screen to fit in container
    return (
        <div className="flex w-full h-full flex-col items-center justify-center bg-zinc-50 font-sans text-zinc-900 overflow-hidden relative rounded-xl">
            <AnimatePresence mode="wait">

                {/* === MENU STATE === */}
                {gameState === "menu" && (
                    <motion.div
                        key="menu"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex flex-col items-center justify-center w-full px-6"
                    >
                        {/* Logo */}
                        {/* Logo */}
                        <div className="flex items-center mb-12">
                            {['W', 'O', 'R', 'D'].map((letter, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="w-12 h-12 bg-zinc-900 text-white rounded-full flex items-center justify-center text-xl font-bold mx-1 shadow-lg"
                                >
                                    {letter}
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ y: 20, opacity: 0, rotate: -180 }}
                                animate={{ y: 0, opacity: 1, rotate: 0 }}
                                transition={{ delay: 0.5, type: "spring" }}
                                className="w-12 h-12 bg-[#00ADEE] text-white rounded-full flex items-center justify-center text-xl font-bold mx-1 shadow-xl shadow-[#00ADEE]/30"
                            >
                                U
                            </motion.div>
                        </div>

                        <h2 className="text-zinc-500 mb-12 font-medium tracking-widest text-sm uppercase">The Ultimate Word Chain Game</h2>

                        <button
                            onClick={enterModeSelect}
                            disabled={isLoading}
                            className="w-full max-w-xs bg-[#00ADEE] hover:bg-[#008bbd] text-white text-lg font-bold py-4 rounded-2xl shadow-xl shadow-[#00ADEE]/20 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                        >
                            {isLoading ? "LOADING..." : "PLAY NOW"}
                            {!isLoading && <ArrowBigRight fill="currentColor" />}
                        </button>
                    </motion.div>
                )}

                {/* === MODE SELECT STATE === */}
                {gameState === "mode_select" && (
                    <motion.div
                        key="mode_select"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="w-full max-w-md h-full flex flex-col px-6 pt-12 pb-6"
                    >
                        <button onClick={() => setGameState("menu")} className="self-start mb-6 text-zinc-400 hover:text-zinc-800 transition-colors">
                            <ChevronLeft size={32} />
                        </button>

                        <h2 className="text-3xl font-black text-zinc-900 mb-2">Game Modes</h2>
                        <p className="text-zinc-500 mb-8">Select your challenge.</p>

                        <div className="grid gap-4 flex-1 overflow-y-auto pb-4">
                            {MODES.map((mode, i) => (
                                <motion.button
                                    key={mode.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    onClick={() => startGame(mode.id)}
                                    className="group relative overflow-hidden bg-white hover:bg-zinc-50 border-2 border-zinc-100 hover:border-[#00ADEE]/30 rounded-3xl p-6 text-left shadow-sm hover:shadow-xl transition-all active:scale-98"
                                >
                                    <div className={clsx("absolute top-0 right-0 w-24 h-24 -mr-6 -mt-6 rounded-full opacity-10 group-hover:opacity-20 transition-opacity", mode.color)} />

                                    <div className="flex items-start justify-between relative z-10">
                                        <div>
                                            <h3 className="text-xl font-bold text-zinc-900 mb-1 group-hover:text-[#00ADEE] transition-colors">{mode.title}</h3>
                                            <p className="text-sm text-zinc-500 leading-snug max-w-[80%]">{mode.desc}</p>
                                        </div>
                                        <div className={clsx("w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg", mode.color)}>
                                            <mode.icon size={24} />
                                        </div>
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* === PLAYING STATE === */}
                {gameState === "playing" && (
                    <motion.div
                        key="playing"
                        className="w-full h-full flex flex-col bg-white shadow-2xl overflow-hidden relative"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Header */}
                        <header className="flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-md border-b border-zinc-100 sticky top-0 z-10 shrink-0">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-zinc-400 tracking-wider">SCORE</span>
                                <span className="text-2xl font-bold text-[#00ADEE]">{score}</span>
                            </div>

                            <div className="flex items-center justify-center">
                                <motion.div
                                    key={multiplier}
                                    initial={{ scale: 1.5, rotate: -10 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    className="w-12 h-12 bg-[#F7941D] text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg shadow-[#F7941D]/30"
                                >
                                    {multiplier}x
                                </motion.div>
                            </div>

                            <div className="flex flex-col items-end min-w-[60px]">
                                <span className="text-[10px] font-bold text-zinc-400 tracking-wider uppercase">
                                    {selectedMode === 'target' ? 'MOVES' : (selectedMode === 'endless' ? 'WORDS' : 'TIME')}
                                </span>
                                <span className={clsx("text-2xl font-bold tabular-nums",
                                    (selectedMode !== 'endless' && timeLeft < 30) ? "text-red-500 animate-pulse" : "text-zinc-800"
                                )}>
                                    {selectedMode === 'target'
                                        ? movesLeft
                                        : (selectedMode === 'endless' ? wordChain.length : formatTime(timeLeft))
                                    }
                                </span>
                            </div>
                        </header>

                        {/* Scroll Area */}
                        <div className="flex-1 overflow-y-auto p-6 pb-32 space-y-6">
                            <AnimatePresence initial={false}>
                                {wordChain.map((entry, i) => {
                                    const isUser = entry.player === "you"

                                    return (
                                        <motion.div
                                            key={entry.id}
                                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            className={clsx("flex flex-col relative", isUser ? "items-end" : "items-start")}
                                        >
                                            {i > 0 && (
                                                <div className="absolute top-[-24px] left-1/2 -translate-x-1/2 text-zinc-200 z-0">↓</div>
                                            )}

                                            <div className={clsx(
                                                "relative px-6 py-3 rounded-2xl text-lg font-medium shadow-sm max-w-[85%] z-10 border transition-all",
                                                isUser
                                                    ? "bg-[#00ADEE] text-white border-[#00ADEE] rounded-tr-none shadow-[#00ADEE]/10"
                                                    : "bg-white text-zinc-800 border-zinc-200 rounded-tl-none"
                                            )}>
                                                <span className={clsx(
                                                    "absolute -top-5 text-[10px] font-bold tracking-widest text-zinc-400",
                                                    isUser ? "right-0" : "left-0"
                                                )}>
                                                    {isUser ? "YOU" : "OPPONENT"}
                                                </span>

                                                <div className="tracking-wide break-words">
                                                    {entry.word.split('').map((char, charIdx) => (
                                                        <span key={charIdx}>{char}</span>
                                                    ))}
                                                </div>

                                                {isUser && (
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        className="absolute -bottom-3 -right-2 bg-[#F7941D] text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm border-2 border-white"
                                                    >
                                                        +{entry.score}
                                                    </motion.div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </AnimatePresence>

                            {wordChain.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-full text-zinc-300 space-y-4 pt-20">
                                    <Search size={48} className="opacity-20" />
                                    <p>Type any word to start!</p>
                                    {selectedMode === 'target' && (
                                        <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-lg text-sm font-bold">Target: 500pts</div>
                                    )}
                                </div>
                            )}
                            <div ref={bottomRef} />
                        </div>

                        {/* Input Area */}
                        <div className="absolute bottom-0 w-full bg-white/90 backdrop-blur-xl p-4 border-t border-zinc-100 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                            {errorMsg && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute -top-14 left-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg text-center"
                                >
                                    {errorMsg}
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
                                <input
                                    ref={inputRef}
                                    value={currentInput}
                                    onChange={(e) => setCurrentInput(e.target.value)}
                                    disabled={turn === "opponent"}
                                    placeholder={turn === "you"
                                        ? (wordChain.length ? `Starts with ${wordChain[wordChain.length - 1].word.slice(-1).toUpperCase()}...` : "Start the chain...")
                                        : "Opponent is thinking..."}
                                    className="flex-1 bg-zinc-100 border-2 border-transparent focus:border-[#00ADEE] focus:bg-white outline-none rounded-xl px-4 py-3 text-lg transition-all disabled:opacity-50 text-zinc-900"
                                />
                                <button
                                    type="submit"
                                    disabled={turn === "opponent" || !currentInput}
                                    className="bg-zinc-900 text-white rounded-xl px-6 font-bold disabled:opacity-30 disabled:scale-95 transition-all shadow-lg active:scale-90"
                                >
                                    GO
                                </button>
                            </form>
                        </div>

                        {/* Quit Button */}
                        <button
                            onClick={() => setGameState('mode_select')}
                            className="absolute top-4 left-2 p-2 text-zinc-300 hover:text-zinc-600 transition-colors z-20"
                        >
                            <ChevronLeft size={24} />
                        </button>
                    </motion.div>
                )}

                {/* === GAME OVER STATE === */}
                {gameState === "gameover" && (
                    <motion.div
                        key="gameover"
                        className="absolute inset-0 z-50 bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="mb-8"
                        >
                            {selectedMode === 'target' && score >= 500 ? (
                                <>
                                    <Trophy size={80} className="text-emerald-500 mx-auto mb-4 animate-bounce" />
                                    <h2 className="text-4xl font-black text-emerald-500 mb-2">TARGET HIT!</h2>
                                    <p className="text-zinc-500">You cleared the level.</p>
                                </>
                            ) : (
                                <>
                                    <Trophy size={80} className={clsx("mx-auto mb-4", score > 0 ? "text-[#F7941D]" : "text-zinc-300")} />
                                    <h2 className="text-4xl font-black text-zinc-900 mb-2">GAME OVER</h2>
                                    <p className="text-zinc-500">
                                        {selectedMode === 'target' ? 'Failed to reach target.' : 'Great effort!'}
                                    </p>
                                </>
                            )}
                        </motion.div>

                        <div className="bg-zinc-50 border-2 border-zinc-100 rounded-3xl p-8 shadow-xl w-full max-w-xs mb-8">
                            <div className="text-sm font-bold text-zinc-400 tracking-widest mb-1">FINAL SCORE</div>
                            <div className="text-6xl font-black text-[#00ADEE]">{score}</div>

                            {selectedMode === 'target' && (
                                <div className="mt-2 text-sm text-zinc-400">Target: 500</div>
                            )}
                        </div>

                        <div className="flex flex-col gap-3 w-full max-w-xs">
                            <button
                                onClick={() => startGame(selectedMode)}
                                className="flex items-center justify-center gap-2 bg-zinc-900 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-xl hover:scale-105 transition-transform"
                            >
                                <RotateCcw size={20} />
                                PLAY AGAIN
                            </button>
                            <button
                                onClick={() => setGameState('mode_select')}
                                className="flex items-center justify-center gap-2 bg-white border-2 border-zinc-200 text-zinc-500 px-8 py-4 rounded-2xl text-lg font-bold hover:bg-zinc-50 transition-colors"
                            >
                                CHANGE MODE
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

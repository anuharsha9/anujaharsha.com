'use client'

import { useState, useEffect, useRef, FormEvent, useCallback } from "react"
import { motion, AnimatePresence, useSpring, useTransform } from "framer-motion"
import {
    ArrowRight,
    Trophy,
    RotateCcw,
    Flame,
    Infinity as InfinityIcon,
    Crosshair,
    Swords,
    Sparkles,
    BotMessageSquare,
    UserCircle,
    BookOpen,
    Lightbulb,
    Volume2,
    Loader2,
    X,
    CheckCircle2,
    AlertCircle,
    Send
} from "lucide-react"

// --- Helper for Class Names ---
const clsx = (...classes: (string | undefined | null | false)[]) => classes.filter(Boolean).join(' ');

// --- Types ---
type Turn = "you" | "opponent"
type GameState = "menu" | "playing" | "gameover"
type GameMode = "rapid_fire" | "endless" | "target" | "rally"

type WordEntry = {
    word: string
    player: Turn
    score: number
    multiplier: number
    id: string
}

type DefinitionData = {
    word: string
    phonetic?: string
    meanings: {
        partOfSpeech: string
        definitions: { definition: string, example?: string }[]
    }[]
    phonetics?: { audio?: string }[]
}

// --- Constants ---
const MODES: { id: GameMode; title: string; desc: string; icon: any; color: string; hover: string; accent: string; duration?: number; target?: number }[] = [
    {
        id: "rapid_fire",
        title: "Rapid-Fire",
        desc: "180s. Build as many words as possible.",
        icon: Flame,
        color: "bg-orange-500",
        hover: "hover:bg-orange-600",
        accent: "text-orange-500",
        duration: 180
    },
    {
        id: "endless",
        title: "Endless",
        desc: "No time limit. Play until you're stuck.",
        icon: InfinityIcon,
        color: "bg-blue-500",
        hover: "hover:bg-blue-600",
        accent: "text-blue-500",
        duration: 0
    },
    {
        id: "target",
        title: "Target Mode",
        desc: "Reach 500 points in limited moves.",
        icon: Crosshair,
        color: "bg-emerald-500",
        hover: "hover:bg-emerald-600",
        accent: "text-emerald-500",
        duration: 0,
        target: 500
    },
    {
        id: "rally",
        title: "Rally",
        desc: "Compete 1v1 for the leaderboard.",
        icon: Swords,
        color: "bg-rose-500",
        hover: "hover:bg-rose-600",
        accent: "text-rose-500",
        duration: 180
    }
]

// --- Components ---

const AnimatedCounter = ({ value }: { value: number }) => {
    const spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
    const display = useTransform(spring, (current) => Math.round(current));

    useEffect(() => {
        spring.set(value);
    }, [value, spring]);

    return <motion.span>{display}</motion.span>;
};

const DictionarySheet = ({ word, onClose }: { word: string | null, onClose: () => void }) => {
    const [data, setData] = useState<DefinitionData | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        if (!word) {
            setData(null)
            return
        }
        setLoading(true)
        setError(false)
        setData(null)

        // Clean word (remove spacing, punctuation if any slipped in)
        const cleanWord = word.trim().toLowerCase().replace(/[^a-z]/g, '')

        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${cleanWord}`)
            .then(res => {
                if (!res.ok) throw new Error('Not found')
                return res.json()
            })
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    setData(data[0])
                } else {
                    setError(true)
                }
            })
            .catch((err) => {
                console.error("Dictionary lookup failed:", err)
                setError(true)
            })
            .finally(() => setLoading(false))
    }, [word])

    const playAudio = () => {
        const audioUrl = data?.phonetics?.find(p => p.audio && p.audio.length > 0)?.audio
        if (audioUrl) {
            new Audio(audioUrl).play()
        }
    }

    // Don't render anything if no word is selected
    if (!word) return null

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-zinc-900/20 backdrop-blur-sm z-40 transition-all"
            />
            <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl z-50 h-[85%] flex flex-col overflow-hidden border-t border-zinc-100 ring-1 ring-zinc-900/5"
            >
                <div className="w-full flex justify-center pt-3 pb-1 shrink-0" onClick={onClose}>
                    <div className="w-12 h-1.5 bg-zinc-300 rounded-full" />
                </div>

                <div className="flex items-start justify-between px-8 py-6 shrink-0">
                    <div>
                        <h3 className="text-4xl font-bold capitalize text-zinc-900 tracking-tight">{word}</h3>
                        {data?.phonetic && (
                            <div className="flex items-center gap-3 mt-2">
                                <span className="text-zinc-500 font-mono text-lg">{data.phonetic}</span>
                                {data.phonetics?.some(p => p.audio) && (
                                    <button
                                        onClick={playAudio}
                                        className="p-2 bg-[#00ADEE]/10 text-[#00ADEE] rounded-full hover:bg-[#00ADEE]/20 hover:scale-105 transition-all"
                                    >
                                        <Volume2 size={18} />
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 bg-zinc-100 text-zinc-500 rounded-full hover:bg-zinc-200 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="px-8 pb-12 overflow-y-auto flex-1 overscroll-contain">
                    {loading && (
                        <div className="flex flex-col items-center justify-center py-20 space-y-4 opacity-50">
                            <Loader2 size={40} className="animate-spin text-[#00ADEE]" />
                            <p className="text-zinc-400 font-medium tracking-wide">Searching Dictionary...</p>
                        </div>
                    )}

                    {!loading && error && (
                        <div className="flex flex-col items-center justify-center py-20 space-y-4">
                            <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center">
                                <AlertCircle size={40} className="text-zinc-300" />
                            </div>
                            <p className="text-zinc-500 font-medium">Definition not found for &quot;{word}&quot;</p>
                        </div>
                    )}

                    {!loading && data && (
                        <div className="space-y-8 pb-12">
                            {data.meanings.map((m, i) => (
                                <div key={i} className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className="px-3 py-1 bg-zinc-100 text-zinc-600 rounded-md text-xs font-bold uppercase tracking-wider">
                                            {m.partOfSpeech}
                                        </span>
                                        <div className="h-px bg-zinc-100 flex-1" />
                                    </div>
                                    <ul className="space-y-6">
                                        {m.definitions.slice(0, 3).map((d, j) => (
                                            <li key={j} className="text-zinc-700 leading-relaxed text-lg">
                                                <span className="text-zinc-400 mr-2">{j + 1}.</span>
                                                {d.definition}
                                                {d.example && (
                                                    <div className="mt-2 pl-4 border-l-2 border-[#00ADEE]/30 text-zinc-500 italic text-base">
                                                        &quot;{d.example}&quot;
                                                    </div>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>
        </>
    )
}

export default function WorduGame() {
    // Game State
    const [gameState, setGameState] = useState<GameState>("menu")
    const [selectedMode, setSelectedMode] = useState<GameMode>("rapid_fire")
    const [dictionary, setDictionary] = useState<Set<string>>(new Set())
    const [wordMap, setWordMap] = useState<Map<string, string[]>>(new Map())
    const [isLoading, setIsLoading] = useState(true)

    // Play State
    const [turn, setTurn] = useState<Turn>("opponent")
    const [wordChain, setWordChain] = useState<WordEntry[]>([])
    const [currentInput, setCurrentInput] = useState("")
    const [score, setScore] = useState(0)
    const [multiplier, setMultiplier] = useState(1)
    const [timeLeft, setTimeLeft] = useState(0)
    const [movesLeft, setMovesLeft] = useState(0)
    const [errorMsg, setErrorMsg] = useState("")
    const [hint, setHint] = useState<string | null>(null)
    const [inspectWord, setInspectWord] = useState<string | null>(null)

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
        if (selectedMode === "endless" || selectedMode === "target") return

        if (timeLeft <= 0) {
            setGameState("gameover")
            return
        }
        const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000)
        return () => clearInterval(interval)
    }, [gameState, timeLeft, selectedMode])

    const submitMove = useCallback((word: string, player: Turn) => {
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

            if (selectedMode === "target") {
                setMovesLeft(prev => {
                    const left = prev - 1
                    if (left <= 0 && newScore < 500) {
                        setTimeout(() => setGameState("gameover"), 500)
                    }
                    return left
                })
                if (newScore >= 500) {
                    setTimeout(() => setGameState("gameover"), 500)
                }
            }
        }

        setWordChain((prev) => [
            ...prev,
            { word, player, score: points, multiplier: newMult, id: Math.random().toString(36).substring(7) },
        ])

        setTurn(player === "you" ? "opponent" : "you")
    }, [wordChain, multiplier, score, selectedMode])

    const playOpponentTurn = useCallback(() => {
        let pick = ""

        if (wordChain.length === 0) {
            const keys = Array.from(wordMap.keys())
            if (keys.length > 0) {
                const randomKey = keys[Math.floor(Math.random() * keys.length)]
                const possibleStarts = wordMap.get(randomKey)
                if (possibleStarts && possibleStarts.length > 0) {
                    pick = possibleStarts[Math.floor(Math.random() * possibleStarts.length)]
                }
            }
        } else {
            const lastWord = wordChain[wordChain.length - 1].word
            const targetChar = lastWord[lastWord.length - 1]
            const potentialWords = wordMap.get(targetChar)

            if (!potentialWords || potentialWords.length === 0) {
                if (selectedMode === 'endless') setGameState("gameover")
                return
            }

            const attempts = selectedMode === 'rally' ? 10 : 50
            for (let i = 0; i < attempts; i++) {
                const r = potentialWords[Math.floor(Math.random() * potentialWords.length)]
                if (!wordChain.some(w => w.word === r)) {
                    pick = r
                    break
                }
            }

            if (!pick) {
                pick = potentialWords.find(w => !wordChain.some(used => used.word === w)) || ""
            }
            if (!pick && potentialWords.length > 0) pick = potentialWords[0];
        }

        if (pick) submitMove(pick, "opponent")
        else setGameState("gameover")
    }, [wordChain, wordMap, selectedMode, submitMove])

    // --- 3. Scroll to bottom ---
    useEffect(() => {
        if (gameState === "playing") {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" })
        }
    }, [wordChain, gameState, hint])

    // --- 4. AI Opponent ---
    useEffect(() => {
        if (gameState !== "playing" || turn !== "opponent") return

        const delay = wordChain.length === 0 ? 800 : 1200 + Math.random() * 800
        const timeout = setTimeout(() => {
            playOpponentTurn()
        }, delay)
        return () => clearTimeout(timeout)
    }, [turn, gameState, wordChain, playOpponentTurn])

    // Focus input
    useEffect(() => {
        if (turn === "you" && gameState === "playing") {
            setTimeout(() => inputRef.current?.focus(), 100)
        }
    }, [turn, gameState])


    // --- Logic ---


    const startGame = (mode: GameMode) => {
        const config = MODES.find(m => m.id === mode)
        setSelectedMode(mode)
        setGameState("playing")
        setScore(0)
        setMultiplier(1)
        setWordChain([])
        setTurn("opponent")
        setErrorMsg("")
        setHint(null)

        if (mode === "target") {
            setMovesLeft(20)
        }

        if (config?.duration) {
            setTimeLeft(config.duration)
        }
    }

    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (turn !== "you" || !currentInput || isSubmitting) return

        const word = currentInput.trim().toLowerCase()
        setIsSubmitting(true)

        // Pre-Validation (Chain rules)
        if (wordChain.length > 0) {
            const lastWord = wordChain[wordChain.length - 1].word
            const targetChar = lastWord[lastWord.length - 1]
            if (word[0] !== targetChar) {
                showError(`Word must start with '${targetChar.toUpperCase()}'`)
                setIsSubmitting(false)
                return
            }
        }
        if (wordChain.some((w) => w.word === word)) {
            showError("Word already used!")
            setIsSubmitting(false)
            return
        }

        // Dictionary Validation (Hybrid: Local -> API)
        let isValid = dictionary.has(word)

        if (!isValid) {
            try {
                const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
                if (res.ok) {
                    isValid = true
                    // Optional: Add to local dictionary for this session
                    setDictionary(prev => new Set(prev).add(word))
                }
            } catch (e) {
                // API fail or network error, fallback to strictly local
                console.error("Dictionary API check failed", e)
            }
        }

        if (!isValid) {
            showError(`"${word}" is not in the dictionary.`)
            setIsSubmitting(false)
            return
        }

        submitMove(word, "you")
        setCurrentInput("")
        setHint(null)
        setIsSubmitting(false)
    }

    const getHint = () => {
        if (wordChain.length === 0) return
        if (hint) return

        const lastWord = wordChain[wordChain.length - 1].word
        const targetChar = lastWord[lastWord.length - 1]
        const potentialWords = wordMap.get(targetChar)

        if (!potentialWords) {
            showError("No words available!")
            return
        }

        const validWords = potentialWords.filter(w => !wordChain.some(used => used.word === w))

        if (validWords.length === 0) {
            showError("No words left!")
            return
        }

        const randomWord = validWords[Math.floor(Math.random() * validWords.length)]
        setHint(`Try "${randomWord}"`)
        setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100)
    }

    const showError = (msg: string) => {
        setErrorMsg(msg)
        setTimeout(() => setErrorMsg(""), 2500)
    }



    const formatTime = (s: number) => {
        const min = Math.floor(s / 60)
        const sec = s % 60
        return `${min}:${sec.toString().padStart(2, '0')}`
    }

    // --- Render ---
    return (
        <div className="flex w-full h-full flex-col items-center justify-center bg-[#F7F7F7] font-sans text-zinc-900 overflow-hidden relative selection:bg-[#00ADEE]/30">
            <AnimatePresence mode="wait">

                {/* === MENU STATE === */}
                {gameState === "menu" && (
                    <motion.div
                        key="menu"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex flex-col items-center justify-center w-full px-4 text-center h-full pt-8 pb-4"
                    >
                        <div className="flex items-center mb-6 scale-110 shrink-0">
                            {['W', 'O', 'R', 'D'].map((letter, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="w-12 h-12 bg-white text-zinc-900 rounded-lg flex items-center justify-center text-2xl font-bold mx-1 shadow-sm border border-zinc-200"
                                >
                                    {letter}
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ y: 20, opacity: 0, rotate: -180 }}
                                animate={{ y: 0, opacity: 1, rotate: 0 }}
                                transition={{ delay: 0.5, type: "spring" }}
                                className="w-12 h-12 bg-[#00ADEE] text-white rounded-lg flex items-center justify-center text-2xl font-bold mx-1 shadow-lg shadow-blue-500/25 relative z-10"
                            >
                                U
                            </motion.div>
                        </div>

                        <h2 className="text-zinc-400 mb-6 font-bold tracking-[0.2em] text-[10px] uppercase bg-white px-3 py-1.5 rounded-lg shadow-sm border border-zinc-100 shrink-0">
                            Select a mode to start
                        </h2>

                        <div className="grid gap-3 w-full max-w-sm flex-1 overflow-y-auto px-2 pb-2 scrollbar-hide content-center">
                            {isLoading ? (
                                <div className="flex flex-col items-center justify-center h-40 space-y-4">
                                    <div className="w-10 h-10 border-4 border-[#00ADEE] border-t-transparent rounded-full animate-spin" />
                                    <p className="text-zinc-400 font-bold text-sm tracking-wide uppercase">Loading Dictionary...</p>
                                </div>
                            ) : (
                                MODES.map((mode, i) => (
                                    <motion.button
                                        key={mode.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.08 }}
                                        onClick={() => startGame(mode.id)}
                                        className={clsx(
                                            "group relative overflow-hidden rounded-xl p-4 text-left transition-all border",
                                            "bg-white hover:bg-white hover:border-[#00ADEE]/50 shadow-sm hover:shadow-lg hover:shadow-blue-500/5"
                                        )}
                                    >
                                        <div className="flex items-center gap-4 relative z-10">
                                            <div className={clsx("w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-inner shrink-0", mode.color)}>
                                                <mode.icon size={22} strokeWidth={2.5} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between mb-0.5">
                                                    <h3 className="text-base font-black text-zinc-700 group-hover:text-zinc-900 truncate">{mode.title}</h3>
                                                    {mode.id === 'rapid_fire' && <span className="text-[10px] font-bold bg-orange-100 text-orange-500 px-2 py-0.5 rounded-full uppercase tracking-wide">Popular</span>}
                                                </div>
                                                <p className="text-xs text-zinc-400 font-bold leading-tight truncate">{mode.desc}</p>
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:bg-[#00ADEE] group-hover:text-white transition-colors">
                                                <ArrowRight size={18} />
                                            </div>
                                        </div>
                                    </motion.button>
                                ))
                            )}
                        </div>
                    </motion.div>
                )}

                {/* === PLAYING STATE === */}
                {gameState === "playing" && (
                    <motion.div
                        key="playing"
                        className="w-full h-full flex flex-col bg-white relative"
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Header */}
                        <header className="flex items-center justify-between px-4 py-3 bg-white border-b-2 border-zinc-100 z-20 shrink-0">
                            <button
                                onClick={() => setGameState('menu')}
                                className="w-10 h-10 flex items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 transition-colors"
                            >
                                <X size={24} strokeWidth={2.5} />
                            </button>

                            {/* Progress Bar Style Score */}
                            <div className="flex-1 px-4 flex flex-col items-center">
                                <div className="text-[10px] font-black tracking-widest text-zinc-300 uppercase mb-1">Score</div>
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-black text-[#00ADEE] tracking-tight">
                                        <AnimatedCounter value={score} />
                                    </span>
                                    {multiplier > 1 && (
                                        <div className="bg-[#00ADEE]/10 text-[#00ADEE] text-xs font-bold px-2 py-0.5 rounded-md uppercase tracking-wide">
                                            {multiplier}x Combo
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="w-10 flex justify-end">
                                {selectedMode !== 'endless' && (
                                    <div className="relative w-10 h-10 flex items-center justify-center">
                                        <div className="absolute inset-0 rounded-full border-4 border-zinc-100" />
                                        <div
                                            className={clsx("absolute inset-0 rounded-full border-4 border-t-transparent animate-spin duration-[3s]",
                                                timeLeft < 10 ? "border-red-500" : "border-[#00ADEE]")}
                                        />
                                        <span className={clsx("text-xs font-black", timeLeft < 10 ? "text-red-500" : "text-zinc-400")}>
                                            {selectedMode === 'target' ? movesLeft : timeLeft}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </header>

                        {/* Chat Area */}
                        <div className="flex-1 overflow-y-scroll p-4 pb-48 space-y-4 scroll-smooth bg-zinc-50/50">

                            {/* Start Message - AI */}
                            {wordChain.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-48 text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                    <div className="w-16 h-16 rounded-xl bg-zinc-100 flex items-center justify-center mb-2">
                                        <BotMessageSquare size={32} className="text-zinc-400" strokeWidth={2} />
                                    </div>
                                    <div className="bg-white border border-zinc-200 px-5 py-3 rounded-2xl rounded-tl-sm shadow-sm max-w-[240px] relative">
                                        <p className="text-zinc-600 font-medium text-sm">
                                            I&apos;ll start! Get ready to match my last letter.
                                        </p>
                                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t-2 border-l-2 border-zinc-200 rotate-45" />
                                    </div>
                                </div>
                            )}

                            <AnimatePresence initial={false}>
                                {wordChain.map((entry, i) => {
                                    const isUser = entry.player === "you"

                                    return (
                                        <motion.div
                                            key={entry.id}
                                            initial={{ opacity: 0, y: 20, scale: 0.8 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                            className={clsx("flex w-full mb-2", isUser ? "justify-end" : "justify-start")}
                                        >
                                            <div
                                                onClick={() => setInspectWord(entry.word)}
                                                className={clsx(
                                                    "relative px-5 py-3 text-lg max-w-[80%] break-all group cursor-pointer hover:scale-[1.01] transition-transform select-none border",
                                                    isUser
                                                        ? "bg-[#00ADEE] border-[#00ADEE] text-white rounded-2xl rounded-tr-sm shadow-md shadow-blue-500/10"
                                                        : "bg-white border-zinc-200 text-zinc-700 rounded-2xl rounded-tl-sm shadow-sm"
                                                )}>
                                                <div className="font-bold tracking-normal flex items-center gap-2">
                                                    <span>
                                                        {entry.player === "opponent" ? (
                                                            <>
                                                                {entry.word.slice(0, -1)}
                                                                <span className="text-[#00ADEE] underline decoration-2 underline-offset-4">{entry.word.slice(-1)}</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <span className="opacity-60">{entry.word.slice(0, 1)}</span>
                                                                {entry.word.slice(1)}
                                                            </>
                                                        )}
                                                    </span>
                                                    {/* Dictionary Icon on Hover */}
                                                    <BookOpen size={16} className="opacity-50 group-hover:opacity-100 transition-opacity ml-1" />
                                                </div>

                                                {/* Floating Avatar */}
                                                {!isUser && (
                                                    <div className="absolute -left-2 -top-2 w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center border border-zinc-200 shadow-sm">
                                                        <BotMessageSquare size={14} className="text-zinc-500" strokeWidth={2.5} />
                                                    </div>
                                                )}
                                                {isUser && (
                                                    <div className="absolute -right-2 -top-2 w-6 h-6 rounded-full bg-white flex items-center justify-center border border-zinc-100 shadow-sm">
                                                        <UserCircle size={14} className="text-[#00ADEE]" strokeWidth={2} />
                                                    </div>
                                                )}

                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </AnimatePresence>

                            {/* Hint Bubble */}
                            <AnimatePresence>
                                {hint && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="flex w-full justify-center my-4"
                                    >
                                        <button
                                            onClick={() => {
                                                const word = hint.split('"')[1]
                                                setCurrentInput(word)
                                                inputRef.current?.focus()
                                            }}
                                            className="bg-white border border-amber-200 text-amber-600 px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-md hover:bg-amber-50 transition-all flex items-center gap-2"
                                        >
                                            <Lightbulb size={18} strokeWidth={3} />
                                            {hint}
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Opponent Thinking Indicator */}
                            {turn === 'opponent' && wordChain.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start pl-8 mt-4"
                                >
                                    <div className="bg-zinc-100 rounded-xl rounded-tl-sm px-4 py-3 flex gap-1.5">
                                        <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </motion.div>
                            )}

                            <div ref={bottomRef} className="h-4" />
                        </div>

                        {/* Input Area */}

                        {/* Points Preview Bubble - Floating above Input */}
                        <AnimatePresence>
                            {currentInput.length > 2 && dictionary.has(currentInput.toLowerCase()) && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute bottom-[100px] left-0 right-0 mx-auto w-max z-30"
                                >
                                    <div className="bg-[#00ADEE] text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg shadow-blue-500/30 animate-bounce">
                                        Excellent! +{currentInput.length * multiplier} pts
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="absolute bottom-0 w-full bg-white px-4 py-6 border-t-2 border-zinc-100 z-30">
                            {errorMsg && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute -top-14 left-0 right-0 mx-auto w-max max-w-[90%] bg-rose-500 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-rose-500/20 text-center flex items-center gap-3"
                                >
                                    <X size={20} className="stroke-[4px]" />
                                    {errorMsg}
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="flex gap-3 max-w-lg mx-auto relative cursor-text" onClick={() => inputRef.current?.focus()}>
                                <button
                                    type="button"
                                    onClick={getHint}
                                    disabled={turn !== 'you'}
                                    className="w-12 h-12 shrink-0 flex items-center justify-center rounded-xl bg-white border border-zinc-200 text-zinc-400 hover:bg-zinc-50 hover:text-zinc-600 transition-all disabled:opacity-50"
                                >
                                    <Lightbulb size={24} strokeWidth={2.5} />
                                </button>

                                <input
                                    ref={inputRef}
                                    value={currentInput}
                                    onChange={(e) => setCurrentInput(e.target.value)}
                                    disabled={turn === "opponent"}
                                    placeholder={turn === "you"
                                        ? (wordChain.length ? `Start with ${wordChain[wordChain.length - 1].word.slice(-1).toUpperCase()}...` : "Type first word...")
                                        : "Waiting..."}
                                    className="flex-1 bg-zinc-50 border border-zinc-200 focus:bg-white focus:border-[#00ADEE] focus:ring-4 focus:ring-[#00ADEE]/10 outline-none rounded-xl px-4 py-3 text-lg font-bold text-zinc-800 placeholder:text-zinc-400 transition-all disabled:opacity-70"
                                    autoComplete="off"
                                />
                                <button
                                    type="submit"
                                    disabled={turn === "opponent" || !currentInput || isSubmitting}
                                    className="w-14 h-12 shrink-0 bg-[#00ADEE] text-white rounded-xl flex items-center justify-center shadow-md shadow-blue-500/20 hover:bg-[#0095CC] hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                                >
                                    {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} strokeWidth={2.5} className="ml-0.5" />}
                                </button>
                            </form>
                        </div>
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
                            <div className="relative mb-6">
                                <div className="absolute inset-0 bg-yellow-400 blur-2xl opacity-20 animate-pulse" />
                                <Trophy size={100} className="text-yellow-400 mx-auto relative z-10 drop-shadow-lg" strokeWidth={1.5} fill="currentColor" />
                                <Sparkles size={40} className="text-yellow-400 absolute top-0 right-10 animate-spin-slow" />
                            </div>

                            <h2 className="text-4xl font-black text-zinc-800 mb-2 uppercase tracking-wide">
                                {score >= 500 && selectedMode === 'target' ? "Level Complete!" : "Game Over"}
                            </h2>
                            <p className="text-zinc-400 font-bold text-lg">
                                You scored
                            </p>
                        </motion.div>

                        <div className="bg-white border-2 border-zinc-100 rounded-3xl p-8 w-full max-w-xs mb-8 flex flex-col items-center">
                            <div className="text-6xl font-black text-[#00ADEE] tracking-tighter mb-2">
                                <AnimatedCounter value={score} />
                            </div>
                            <div className="text-zinc-400 text-xs font-bold uppercase tracking-widest bg-zinc-100 px-3 py-1 rounded-full">
                                Total Points
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 w-full max-w-xs">
                            <button
                                onClick={() => startGame(selectedMode)}
                                className="w-full bg-[#00ADEE] hover:bg-[#0095CC] text-white text-lg font-black tracking-wide py-4 rounded-xl shadow-[0_4px_0_#008DBD] active:shadow-none active:translate-y-[4px] transition-all border-b-4 border-[#008DBD] active:border-b-0 uppercase flex items-center justify-center gap-2"
                            >
                                <RotateCcw size={20} strokeWidth={3} />
                                Play Again
                            </button>
                            <button
                                onClick={() => setGameState('menu')}
                                className="w-full bg-white hover:bg-zinc-50 text-zinc-400 hover:text-zinc-600 text-lg font-bold tracking-wide py-4 rounded-xl shadow-[0_4px_0_theme(colors.zinc.200)] border-2 border-zinc-200 active:shadow-none active:translate-y-[4px] transition-all uppercase"
                            >
                                Exit
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* === DICTIONARY SHEET === */}
                <DictionarySheet word={inspectWord} onClose={() => setInspectWord(null)} />

            </AnimatePresence>
        </div >
    )
}

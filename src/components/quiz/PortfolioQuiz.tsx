'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { getTheme } from '@/lib/design-system'
import {
    pathSelector,
    designerQuestions,
    hiringQuestions,
    caseStudyRouting,
    designerRouting,
} from './quizData'

interface PortfolioQuizProps {
    isOpen: boolean
    onClose: () => void
    onEnterPortfolio: () => void
}

type QuizPath = 'designer' | 'hiring' | null
type QuizState = 'welcome' | 'path-select' | 'questions' | 'results'

export default function PortfolioQuiz({ isOpen, onClose, onEnterPortfolio }: PortfolioQuizProps) {
    const router = useRouter()
    const t = getTheme(true)

    const [quizState, setQuizState] = useState<QuizState>('welcome')
    const [selectedPath, setSelectedPath] = useState<QuizPath>(null)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
    const [showReveal, setShowReveal] = useState(false)
    const [multiSelectAnswers, setMultiSelectAnswers] = useState<string[]>([])

    const questions = selectedPath === 'designer' ? designerQuestions : hiringQuestions
    const currentQuestion = questions[currentQuestionIndex]
    const progress = quizState === 'questions'
        ? ((currentQuestionIndex + 1) / questions.length) * 100
        : quizState === 'results' ? 100 : 0

    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setQuizState('welcome')
                setSelectedPath(null)
                setCurrentQuestionIndex(0)
                setAnswers({})
                setShowReveal(false)
                setMultiSelectAnswers([])
            }, 300)
        }
    }, [isOpen])

    const handleStart = useCallback(() => {
        setQuizState('path-select')
    }, [])

    const handlePathSelect = useCallback((path: QuizPath) => {
        setSelectedPath(path)
        setQuizState('questions')
        setCurrentQuestionIndex(0)
    }, [])

    const proceedToNext = useCallback(() => {
        setShowReveal(false)
        setMultiSelectAnswers([])

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1)
        } else {
            setQuizState('results')
        }
    }, [currentQuestionIndex, questions.length])

    const handleAnswer = useCallback((optionId: string) => {
        if (!currentQuestion) return

        if (currentQuestion.type === 'multi') {
            setMultiSelectAnswers(prev =>
                prev.includes(optionId)
                    ? prev.filter(id => id !== optionId)
                    : [...prev, optionId]
            )
        } else {
            setAnswers(prev => ({ ...prev, [currentQuestion.id]: optionId }))

            if (currentQuestion.reveal) {
                setShowReveal(true)
            } else {
                proceedToNext()
            }
        }
    }, [currentQuestion, proceedToNext])

    const handleMultiSubmit = useCallback(() => {
        if (!currentQuestion || multiSelectAnswers.length === 0) return

        setAnswers(prev => ({ ...prev, [currentQuestion.id]: multiSelectAnswers }))

        if (currentQuestion.reveal) {
            setShowReveal(true)
        } else {
            proceedToNext()
        }
    }, [currentQuestion, multiSelectAnswers, proceedToNext])

    const handleContinueAfterReveal = useCallback(() => {
        proceedToNext()
    }, [proceedToNext])

    const handleBack = useCallback(() => {
        if (quizState === 'questions' && currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1)
            setShowReveal(false)
        } else if (quizState === 'questions') {
            setQuizState('path-select')
            setSelectedPath(null)
        } else if (quizState === 'path-select') {
            setQuizState('welcome')
        }
    }, [quizState, currentQuestionIndex])

    const getHiringRecommendation = useCallback(() => {
        const challengeAnswer = answers['hiring-challenge'] as string
        return caseStudyRouting[challengeAnswer] || caseStudyRouting['legacy']
    }, [answers])

    const getDesignerRecommendation = useCallback(() => {
        const curiosityAnswer = answers['designer-curiosity'] as string
        return designerRouting[curiosityAnswer] || designerRouting['enterprise']
    }, [answers])

    const handleViewRecommendation = useCallback(() => {
        onClose()
        onEnterPortfolio()

        setTimeout(() => {
            if (selectedPath === 'hiring') {
                const rec = getHiringRecommendation()
                router.push(rec.path)
            } else {
                const rec = getDesignerRecommendation()
                if (rec.section) {
                    router.push(`${rec.path}#${rec.section}`)
                } else {
                    router.push(rec.path)
                }
            }
        }, 100)
    }, [selectedPath, getHiringRecommendation, getDesignerRecommendation, onClose, onEnterPortfolio, router])

    useEffect(() => {
        if (!isOpen) return

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
            } else if (e.key === 'Enter' && showReveal) {
                handleContinueAfterReveal()
            } else if (e.key >= '1' && e.key <= '9' && quizState === 'questions' && !showReveal) {
                const index = parseInt(e.key) - 1
                if (currentQuestion && currentQuestion.options[index]) {
                    handleAnswer(currentQuestion.options[index].id)
                }
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, quizState, showReveal, currentQuestion, onClose, handleAnswer, handleContinueAfterReveal])

    if (!isOpen) return null

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-[10002] flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    />

                    {/* Modal */}
                    <motion.div
                        className={`relative w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden rounded-2xl ${t.bgAlt} border ${t.border} shadow-2xl`}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Progress Bar */}
                        {quizState !== 'welcome' && (
                            <div className="absolute top-0 left-0 right-0 h-1 bg-white/10">
                                <motion.div
                                    className="h-full bg-[var(--accent-teal)]"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                        )}

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className={`absolute top-4 right-4 p-2 rounded-full ${t.textMuted} hover:${t.text} hover:bg-white/10 transition-colors z-10`}
                            aria-label="Close quiz"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Back Button */}
                        {quizState !== 'welcome' && quizState !== 'results' && !showReveal && (
                            <button
                                onClick={handleBack}
                                className={`absolute top-4 left-4 p-2 rounded-full ${t.textMuted} hover:${t.text} hover:bg-white/10 transition-colors z-10`}
                                aria-label="Go back"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                        )}

                        {/* Content */}
                        <div className="p-8 pt-14 min-h-[400px] flex flex-col">
                            <AnimatePresence mode="wait">
                                {/* Welcome Screen */}
                                {quizState === 'welcome' && (
                                    <motion.div
                                        key="welcome"
                                        className="flex-1 flex flex-col items-center justify-center text-center"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <motion.div
                                            className="text-5xl mb-6"
                                            animate={{ rotate: [0, 10, -10, 0] }}
                                            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                        >
                                            👋
                                        </motion.div>
                                        <h2 className={`font-serif text-3xl md:text-4xl ${t.text} mb-4`}>
                                            Before we dive in...
                                        </h2>
                                        <p className={`${t.textMuted} text-lg mb-8 max-w-md`}>
                                            Answer 4 quick questions → I&apos;ll take you to the work that matches what you care about.
                                        </p>
                                        <button
                                            onClick={handleStart}
                                            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--accent-teal-800)] text-white font-medium hover:bg-[var(--accent-teal-900)] transition-all hover:scale-105"
                                        >
                                            <span>Let&apos;s go</span>
                                            <motion.span
                                                animate={{ x: [0, 4, 0] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                            >
                                                →
                                            </motion.span>
                                        </button>
                                    </motion.div>
                                )}

                                {/* Path Selection */}
                                {quizState === 'path-select' && (
                                    <motion.div
                                        key="path-select"
                                        className="flex-1 flex flex-col items-center justify-center"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <h2 className={`font-serif text-2xl md:text-3xl ${t.text} mb-8 text-center`}>
                                            {pathSelector.question}
                                        </h2>
                                        <div className="w-full max-w-md space-y-4">
                                            {pathSelector.options.map((option, index) => (
                                                <motion.button
                                                    key={option.id}
                                                    onClick={() => handlePathSelect(option.id as QuizPath)}
                                                    className={`w-full p-5 rounded-xl border ${t.border} ${t.bg} hover:border-[var(--accent-teal)] hover:bg-white/5 transition-all text-left group relative`}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <span className="text-3xl">{option.emoji}</span>
                                                        <div>
                                                            <div className={`font-medium ${t.text} text-lg group-hover:text-[var(--accent-teal)] transition-colors`}>
                                                                {option.label}
                                                            </div>
                                                            {option.sublabel && (
                                                                <div className={`${t.textMuted} text-sm mt-0.5`}>
                                                                    {option.sublabel}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className={`absolute right-4 top-1/2 -translate-y-1/2 ${t.textMuted} opacity-50 text-sm font-mono`}>
                                                        {index + 1}
                                                    </div>
                                                </motion.button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Questions - with inline reveal */}
                                {quizState === 'questions' && currentQuestion && (
                                    <motion.div
                                        key={`question-${currentQuestion.id}`}
                                        className="flex-1 flex flex-col"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="mb-2">
                                            <span className={`${t.textMuted} text-sm font-mono`}>
                                                {currentQuestionIndex + 1} / {questions.length}
                                            </span>
                                        </div>
                                        <h2 className={`font-serif text-2xl md:text-3xl ${t.text} mb-2`}>
                                            {currentQuestion.question}
                                        </h2>
                                        {currentQuestion.subtitle && (
                                            <p className={`${t.textMuted} text-sm mb-6`}>
                                                {currentQuestion.subtitle}
                                            </p>
                                        )}
                                        <div className="flex-1 space-y-3 mt-4">
                                            {currentQuestion.options.map((option, index) => {
                                                const isSelected = currentQuestion.type === 'multi'
                                                    ? multiSelectAnswers.includes(option.id)
                                                    : answers[currentQuestion.id] === option.id

                                                return (
                                                    <motion.button
                                                        key={option.id}
                                                        onClick={() => handleAnswer(option.id)}
                                                        disabled={showReveal}
                                                        className={`w-full p-4 rounded-xl border transition-all text-left group relative ${isSelected
                                                            ? 'border-[var(--accent-teal)] bg-[var(--accent-teal)]/10'
                                                            : `${t.border} ${t.bg} hover:border-[var(--accent-teal)] hover:bg-white/5`
                                                            } ${showReveal ? 'opacity-60 cursor-default' : ''}`}
                                                        initial={{ opacity: 0, x: -20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: index * 0.05 }}
                                                        whileHover={showReveal ? {} : { scale: 1.01 }}
                                                        whileTap={showReveal ? {} : { scale: 0.99 }}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-2xl">{option.emoji}</span>
                                                            <div className="flex-1">
                                                                <div className={`font-medium ${isSelected ? 'text-[var(--accent-teal)]' : t.text}`}>
                                                                    {option.label}
                                                                </div>
                                                                {option.sublabel && (
                                                                    <div className={`${t.textMuted} text-sm mt-0.5`}>
                                                                        {option.sublabel}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <span className={`${t.textMuted} opacity-50 text-sm font-mono`}>
                                                                {index + 1}
                                                            </span>
                                                        </div>
                                                    </motion.button>
                                                )
                                            })}
                                        </div>

                                        {/* Multi-select submit button */}
                                        {currentQuestion.type === 'multi' && multiSelectAnswers.length > 0 && !showReveal && (
                                            <motion.div
                                                className="mt-6 flex justify-center"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                            >
                                                <button
                                                    onClick={handleMultiSubmit}
                                                    className="px-6 py-3 rounded-full bg-[var(--accent-teal-800)] text-white font-medium hover:bg-[var(--accent-teal-900)] transition-all"
                                                >
                                                    Continue →
                                                </button>
                                            </motion.div>
                                        )}

                                        {/* Inline Reveal Card - appears below options */}
                                        <AnimatePresence>
                                            {showReveal && currentQuestion.reveal && (
                                                <motion.div
                                                    className="mt-6"
                                                    initial={{ opacity: 0, y: 20, height: 0 }}
                                                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                                                    exit={{ opacity: 0, y: 10, height: 0 }}
                                                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                                >
                                                    <div className={`p-5 rounded-xl border ${t.border} bg-gradient-to-br from-[var(--accent-teal)]/10 to-[var(--accent-violet)]/10`}>
                                                        <div className="flex items-start gap-3">
                                                            <span className="text-lg">✨</span>
                                                            <div className="flex-1">
                                                                <div className="text-[var(--accent-teal)] font-mono text-xs mb-1 uppercase tracking-wider">
                                                                    {currentQuestion.reveal.title}
                                                                </div>
                                                                <p className={`${t.text} text-sm leading-relaxed`}>
                                                                    &ldquo;{currentQuestion.reveal.content}&rdquo;
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <motion.div
                                                        className="mt-4 flex justify-center"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: 0.3 }}
                                                    >
                                                        <button
                                                            onClick={handleContinueAfterReveal}
                                                            className="px-6 py-3 rounded-full bg-[var(--accent-teal-800)] text-white font-medium hover:bg-[var(--accent-teal-900)] transition-all"
                                                        >
                                                            Continue →
                                                        </button>
                                                    </motion.div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                )}

                                {/* Results Screen */}
                                {quizState === 'results' && (
                                    <motion.div
                                        key="results"
                                        className="flex-1 flex flex-col items-center justify-center text-center"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <motion.div
                                            className="text-5xl mb-4"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: 'spring', damping: 10 }}
                                        >
                                            ✨
                                        </motion.div>
                                        <h2 className={`font-serif text-2xl md:text-3xl ${t.text} mb-3`}>
                                            {selectedPath === 'hiring' ? "Here's what I'd show you" : "Let's explore together"}
                                        </h2>

                                        {selectedPath === 'hiring' ? (
                                            <>
                                                <p className={`${t.textMuted} mb-6 max-w-md`}>
                                                    Based on what you&apos;re looking for, this case study is the best match:
                                                </p>
                                                <motion.div
                                                    className={`w-full max-w-sm p-5 rounded-xl border ${t.border} ${t.bg} text-left mb-6`}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.2 }}
                                                >
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <div className={`font-medium ${t.text} text-lg`}>
                                                                {getHiringRecommendation().title}
                                                            </div>
                                                            <div className={`${t.textMuted} text-sm mt-1`}>
                                                                {getHiringRecommendation().subtitle}
                                                            </div>
                                                        </div>
                                                        <span className="font-mono text-[var(--accent-teal)] text-sm">
                                                            {getHiringRecommendation().time}
                                                        </span>
                                                    </div>
                                                </motion.div>
                                            </>
                                        ) : (
                                            <p className={`${t.textMuted} mb-6 max-w-md`}>
                                                I think we might be the same kind of crazy. Ready to see the work?
                                            </p>
                                        )}

                                        <div className="flex flex-col sm:flex-row gap-3">
                                            <button
                                                onClick={handleViewRecommendation}
                                                className="px-6 py-3 rounded-full bg-[var(--accent-teal-800)] text-white font-medium hover:bg-[var(--accent-teal-900)] transition-all hover:scale-105"
                                            >
                                                {selectedPath === 'hiring' ? 'View Case Study' : getDesignerRecommendation().label}
                                            </button>
                                            <button
                                                onClick={() => {
                                                    onClose()
                                                    onEnterPortfolio()
                                                }}
                                                className={`px-6 py-3 rounded-full bg-white/10 ${t.text} font-medium hover:bg-white/20 transition-all`}
                                            >
                                                Browse Everything
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

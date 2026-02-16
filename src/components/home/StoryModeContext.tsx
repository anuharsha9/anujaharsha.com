'use client'

import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react'

interface StoryChapter {
    id: string
    title: string
    narration: string
    target: string // DOM element ID to scroll to
    duration: number // ms to linger on this chapter before auto-advancing
}

export const STORY_CHAPTERS: StoryChapter[] = [
    {
        id: 'promise',
        title: 'The Promise',
        narration: 'A designer who speaks both pixels and code. This is where the story begins.',
        target: 'hero',
        duration: 4000,
    },
    {
        id: 'philosophy',
        title: 'The Philosophy',
        narration: 'Design and engineering aren\'t opposites — they\'re collaborators. Watch how they converge.',
        target: 'work-overview',
        duration: 5000,
    },
    {
        id: 'proof',
        title: 'The Proof',
        narration: '13 years of turning complexity into clarity. Enterprise systems that millions rely on.',
        target: 'era-csg-architect',
        duration: 6000,
    },
    {
        id: 'origins',
        title: 'The Origin',
        narration: 'Every architect was once a student. The roots of a craft run deep.',
        target: 'era-origin-story',
        duration: 5000,
    },
    {
        id: 'connect',
        title: 'The Invitation',
        narration: 'Now you know the story. Ready to write the next chapter together?',
        target: 'lets-talk',
        duration: 5000,
    },
]

interface StoryModeState {
    isActive: boolean
    isPaused: boolean
    currentChapter: number
    progress: number // 0-100
    startStoryMode: () => void
    stopStoryMode: () => void
    pauseStoryMode: () => void
    resumeStoryMode: () => void
}

const StoryModeContext = createContext<StoryModeState | null>(null)

export function useStoryMode() {
    const ctx = useContext(StoryModeContext)
    if (!ctx) throw new Error('useStoryMode must be used within StoryModeProvider')
    return ctx
}

export function StoryModeProvider({ children }: { children: React.ReactNode }) {
    const [isActive, setIsActive] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const [currentChapter, setCurrentChapter] = useState(0)
    const [progress, setProgress] = useState(0)
    const timerRef = useRef<NodeJS.Timeout | null>(null)
    const progressRef = useRef<NodeJS.Timeout | null>(null)
    const userScrollRef = useRef(false)
    const scrollListenerRef = useRef<(() => void) | null>(null)

    const cleanup = useCallback(() => {
        if (timerRef.current) clearTimeout(timerRef.current)
        if (progressRef.current) clearInterval(progressRef.current)
        if (scrollListenerRef.current) {
            window.removeEventListener('wheel', scrollListenerRef.current)
            window.removeEventListener('touchstart', scrollListenerRef.current)
            scrollListenerRef.current = null
        }
    }, [])

    const scrollToTarget = useCallback((targetId: string) => {
        const el = document.getElementById(targetId)
        if (el) {
            userScrollRef.current = true
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            // Re-enable user scroll detection after the programmatic scroll finishes
            setTimeout(() => { userScrollRef.current = false }, 1500)
        }
    }, [])

    const advanceToChapter = useCallback((chapterIndex: number) => {
        if (chapterIndex >= STORY_CHAPTERS.length) {
            // Story complete
            setIsActive(false)
            setCurrentChapter(0)
            setProgress(100)
            cleanup()
            return
        }

        const chapter = STORY_CHAPTERS[chapterIndex]
        setCurrentChapter(chapterIndex)
        scrollToTarget(chapter.target)

        // Update progress
        const baseProgress = (chapterIndex / STORY_CHAPTERS.length) * 100
        setProgress(baseProgress)

        // Animate progress within this chapter
        const progressStep = (1 / STORY_CHAPTERS.length) * 100
        const intervalMs = 50
        const steps = chapter.duration / intervalMs
        let stepCount = 0

        if (progressRef.current) clearInterval(progressRef.current)
        progressRef.current = setInterval(() => {
            stepCount++
            const chapterProgress = (stepCount / steps) * progressStep
            setProgress(baseProgress + chapterProgress)
        }, intervalMs)

        // Auto-advance after duration
        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => {
            if (progressRef.current) clearInterval(progressRef.current)
            advanceToChapter(chapterIndex + 1)
        }, chapter.duration)
    }, [cleanup, scrollToTarget])

    const startStoryMode = useCallback(() => {
        setIsActive(true)
        setIsPaused(false)
        setProgress(0)
        // Start from the top
        window.scrollTo({ top: 0, behavior: 'smooth' })
        // Give time to scroll to top before starting
        setTimeout(() => {
            advanceToChapter(0)
        }, 800)

        // Detect user scroll to pause
        const handleUserScroll = () => {
            if (!userScrollRef.current) {
                // User is manually scrolling → pause
                setIsPaused(true)
                if (timerRef.current) clearTimeout(timerRef.current)
                if (progressRef.current) clearInterval(progressRef.current)
            }
        }
        scrollListenerRef.current = handleUserScroll
        window.addEventListener('wheel', handleUserScroll, { passive: true })
        window.addEventListener('touchstart', handleUserScroll, { passive: true })
    }, [advanceToChapter])

    const stopStoryMode = useCallback(() => {
        setIsActive(false)
        setIsPaused(false)
        setCurrentChapter(0)
        setProgress(0)
        cleanup()
    }, [cleanup])

    const pauseStoryMode = useCallback(() => {
        setIsPaused(true)
        if (timerRef.current) clearTimeout(timerRef.current)
        if (progressRef.current) clearInterval(progressRef.current)
    }, [])

    const resumeStoryMode = useCallback(() => {
        setIsPaused(false)
        advanceToChapter(currentChapter)
    }, [advanceToChapter, currentChapter])

    // Cleanup on unmount
    useEffect(() => {
        return cleanup
    }, [cleanup])

    return (
        <StoryModeContext.Provider
            value={{
                isActive,
                isPaused,
                currentChapter,
                progress,
                startStoryMode,
                stopStoryMode,
                pauseStoryMode,
                resumeStoryMode,
            }}
        >
            {children}
        </StoryModeContext.Provider>
    )
}

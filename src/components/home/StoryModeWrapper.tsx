'use client'

import { useEffect } from 'react'
import { StoryModeProvider, useStoryMode } from './StoryModeContext'
import StoryModeBar from './StoryModeBar'

function StoryModeEventBridge() {
    const { startStoryMode } = useStoryMode()

    useEffect(() => {
        const handler = () => startStoryMode()
        window.addEventListener('start-story-mode', handler)
        return () => window.removeEventListener('start-story-mode', handler)
    }, [startStoryMode])

    return <StoryModeBar />
}

export default function StoryModeWrapper({ children }: { children: React.ReactNode }) {
    return (
        <StoryModeProvider>
            {children}
            <StoryModeEventBridge />
        </StoryModeProvider>
    )
}

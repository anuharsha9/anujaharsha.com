'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

// ═══════════════════════════════════════════════════════════════════════════
// Scene boundaries (seconds)
// ═══════════════════════════════════════════════════════════════════════════

export const SCENES = [
  { id: 'scene1', label: 'Terminal Hook', start: 0, end: 15 },
  { id: 'scene2', label: 'The Audit', start: 15, end: 20 },
  { id: 'scene3', label: 'The Blueprint', start: 20, end: 30 },
  { id: 'scene4', label: 'Microscopic Stitch', start: 30, end: 45 },
  { id: 'scene5', label: 'The Monolith', start: 45, end: 60 },
  { id: 'scene6', label: 'The Ask', start: 60, end: 65 },
] as const

export const TOTAL_DURATION = 65 // seconds

export type SceneId = (typeof SCENES)[number]['id']

// ═══════════════════════════════════════════════════════════════════════════
// Hook
// ═══════════════════════════════════════════════════════════════════════════

export interface ManifestoTimeline {
  /** Current time in seconds (0–120) */
  currentTime: number
  /** Is the timeline playing? */
  isPlaying: boolean
  /** Is the timeline auto-paused (waiting for slider in Scene 3)? */
  isAutoPaused: boolean
  /** Current scene index (0–4) */
  sceneIndex: number
  /** Current scene ID */
  sceneId: SceneId
  /** Progress within current scene (0–1) */
  sceneProgress: number
  /** Global progress (0–1) */
  globalProgress: number
  /** Has the presentation finished? */
  isFinished: boolean

  // Controls
  play: () => void
  pause: () => void
  togglePlay: () => void
  seek: (seconds: number) => void
  seekToScene: (index: number) => void
  autoPause: () => void
  autoResume: () => void
  reset: () => void
}

export function useManifestoTimeline(): ManifestoTimeline {
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isAutoPaused, setIsAutoPaused] = useState(false)
  const [isFinished, setIsFinished] = useState(false)

  const rafRef = useRef<number | null>(null)
  const lastTickRef = useRef<number>(0)
  const timeRef = useRef(0) // Mutable ref for RAF loop

  // ── RAF Loop ──────────────────────────────────────────────────────────
  const tick = useCallback((timestamp: number) => {
    if (lastTickRef.current === 0) {
      lastTickRef.current = timestamp
    }

    const delta = (timestamp - lastTickRef.current) / 1000
    lastTickRef.current = timestamp

    const next = Math.min(timeRef.current + delta, TOTAL_DURATION)
    timeRef.current = next
    setCurrentTime(next)

    if (next >= TOTAL_DURATION) {
      setIsPlaying(false)
      setIsFinished(true)
      return
    }

    rafRef.current = requestAnimationFrame(tick)
  }, [])

  const startRAF = useCallback(() => {
    lastTickRef.current = 0
    rafRef.current = requestAnimationFrame(tick)
  }, [tick])

  const stopRAF = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [])

  // ── Controls ──────────────────────────────────────────────────────────
  const play = useCallback(() => {
    if (isAutoPaused) return
    if (timeRef.current >= TOTAL_DURATION) {
      timeRef.current = 0
      setCurrentTime(0)
      setIsFinished(false)
    }
    setIsPlaying(true)
    startRAF()
  }, [isAutoPaused, startRAF])

  const pause = useCallback(() => {
    setIsPlaying(false)
    stopRAF()
  }, [stopRAF])

  const togglePlay = useCallback(() => {
    if (isPlaying) pause()
    else play()
  }, [isPlaying, pause, play])

  const seek = useCallback((seconds: number) => {
    const clamped = Math.max(0, Math.min(seconds, TOTAL_DURATION))
    timeRef.current = clamped
    setCurrentTime(clamped)
    setIsFinished(clamped >= TOTAL_DURATION)
    // Don't auto-start on seek
  }, [])

  const seekToScene = useCallback((index: number) => {
    const scene = SCENES[index]
    if (!scene) return
    seek(scene.start)
  }, [seek])

  const autoPause = useCallback(() => {
    setIsAutoPaused(true)
    setIsPlaying(false)
    stopRAF()
  }, [stopRAF])

  const autoResume = useCallback(() => {
    setIsAutoPaused(false)
    setIsPlaying(true)
    startRAF()
  }, [startRAF])

  const reset = useCallback(() => {
    stopRAF()
    timeRef.current = 0
    setCurrentTime(0)
    setIsPlaying(false)
    setIsAutoPaused(false)
    setIsFinished(false)
  }, [stopRAF])

  // Start RAF automatically on mount since isPlaying defaults to true
  useEffect(() => {
    startRAF()
    return () => stopRAF()
  }, [startRAF, stopRAF])

  // ── Derived state ─────────────────────────────────────────────────────
  const sceneIndex = SCENES.findIndex(
    (s, i) => currentTime >= s.start && (i === SCENES.length - 1 || currentTime < SCENES[i + 1].start)
  )
  const si = Math.max(0, sceneIndex)
  const scene = SCENES[si]
  const sceneProgress = scene
    ? Math.min(1, (currentTime - scene.start) / (scene.end - scene.start))
    : 0
  const globalProgress = currentTime / TOTAL_DURATION

  return {
    currentTime,
    isPlaying,
    isAutoPaused,
    sceneIndex: si,
    sceneId: scene?.id ?? 'scene1',
    sceneProgress,
    globalProgress,
    isFinished,
    play,
    pause,
    togglePlay,
    seek,
    seekToScene,
    autoPause,
    autoResume,
    reset,
  }
}

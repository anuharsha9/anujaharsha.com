'use client'

import { useRef, useEffect } from 'react'

interface UseManifestoAudioOptions {
  currentTime: number
  isPlaying: boolean
  isMuted: boolean
}

export function useManifestoAudio({ currentTime, isPlaying, isMuted }: UseManifestoAudioOptions) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const preloadedRef = useRef(false)

  // ── Preload ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (preloadedRef.current) return
    preloadedRef.current = true

    try {
      // Look for the single track 60s audio file
      const audio = new Audio('/audio/manifesto/manifesto-full.mp3')
      audio.preload = 'auto'
      audio.volume = isMuted ? 0 : 1
      audio.onerror = () => {
        // Graceful fail if file isn't uploaded yet
      }
      audioRef.current = audio
    } catch {
      // Browser blocked Audio construction
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
        audioRef.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Mute toggle ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : 1
    }
  }, [isMuted])

  // ── Play/Pause sync ─────────────────────────────────────────────────────
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      if (audio.paused && audio.readyState >= 2) {
        audio.play().catch(() => {
          // Autoplay block catching
        })
      }
    } else {
      if (!audio.paused) {
        audio.pause()
      }
    }
  }, [isPlaying])

  // ── Seek sync ───────────────────────────────────────────────────────────
  // We sync the audio time if it drifts by more than 0.3s from the timeline
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || isNaN(audio.duration)) return

    if (Math.abs(audio.currentTime - currentTime) > 0.3) {
      // Don't seek past the end of the actual audio file
      audio.currentTime = Math.min(currentTime, audio.duration - 0.1)
    }
  }, [currentTime])

  return {}
}

'use client'

import { useState, useRef, useEffect } from 'react'
import SignatureLogo from '@/components/brand/SignatureLogo'

interface CustomVideoPlayerProps {
  src: string
  poster?: string
  className?: string
  onPlay?: () => void
  autoPlay?: boolean
  muted?: boolean
  loop?: boolean
}

export default function CustomVideoPlayer({
  src,
  poster,
  className = '',
  onPlay,
  autoPlay = true,
  muted = true,
  loop = true,
}: CustomVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  // Initialize isPlaying based on autoPlay intent, but browser policies may block it.
  // The 'play' event listener will correct this if it fails or succeeds.
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isMuted, setIsMuted] = useState(muted)
  const [isHovered, setIsHovered] = useState(false)
  const [showControls, setShowControls] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [videoDimensions, setVideoDimensions] = useState<{ width: number; height: number } | null>(null)
  const [posterImage, setPosterImage] = useState<string | null>(poster || null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handlePlay = () => {
      setIsPlaying(true)
      onPlay?.()
    }
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => {
      setIsPlaying(false)
      setProgress(0)
      setCurrentTime(0)
    }
    const handleTimeUpdate = () => {
      if (video.duration) {
        setCurrentTime(video.currentTime)
        setProgress((video.currentTime / video.duration) * 100)
      }
    }

    const extractFirstFrame = (videoElement: HTMLVideoElement) => {
      // Wait a bit to ensure video is ready
      const attemptExtraction = () => {
        try {
          // Check if video has valid dimensions
          if (videoElement.videoWidth === 0 || videoElement.videoHeight === 0) {
            // Retry after a short delay
            setTimeout(attemptExtraction, 100)
            return
          }

          const originalTime = videoElement.currentTime
          const originalPaused = videoElement.paused

          // Ensure video is paused for extraction
          if (!videoElement.paused) {
            videoElement.pause()
          }

          // Seek to the very beginning
          videoElement.currentTime = 0

          // Wait for seeked event to ensure frame is loaded
          const handleSeeked = () => {
            try {
              // Double check dimensions are available
              if (videoElement.videoWidth === 0 || videoElement.videoHeight === 0) {
                videoElement.currentTime = originalTime
                videoElement.removeEventListener('seeked', handleSeeked)
                return
              }

              const canvas = document.createElement('canvas')
              canvas.width = videoElement.videoWidth
              canvas.height = videoElement.videoHeight
              const ctx = canvas.getContext('2d', { willReadFrequently: true })

              if (ctx && canvas.width > 0 && canvas.height > 0) {
                // Draw the current video frame to canvas
                ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height)

                // Convert to data URL for poster
                const dataUrl = canvas.toDataURL('image/jpeg', 0.9)

                if (dataUrl && dataUrl !== 'data:,') {
                  setPosterImage(dataUrl)
                }
              }

              // Reset to original time
              videoElement.currentTime = originalTime
              if (!originalPaused) {
                videoElement.play()
              }
            } catch (error) {
              console.warn('Error extracting frame:', error)
            } finally {
              videoElement.removeEventListener('seeked', handleSeeked)
            }
          }

          videoElement.addEventListener('seeked', handleSeeked, { once: true })

          // Fallback timeout in case seeked doesn't fire
          setTimeout(() => {
            videoElement.removeEventListener('seeked', handleSeeked)
          }, 2000)
        } catch (error) {
          console.warn('Could not extract first frame:', error)
        }
      }

      // Start extraction after a small delay to ensure video is ready
      setTimeout(attemptExtraction, 200)
    }

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
      // Get video's natural dimensions
      const width = video.videoWidth
      const height = video.videoHeight
      if (width > 0 && height > 0) {
        setVideoDimensions({ width, height })
      }
    }

    const handleLoadedData = () => {
      // Extract first frame as poster if no poster provided
      // Try after loadeddata event which ensures video frame data is available
      if (!poster && !posterImage) {
        extractFirstFrame(video)
      }
    }

    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('ended', handleEnded)
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('loadeddata', handleLoadedData)

    return () => {
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('loadeddata', handleLoadedData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src])

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Update video poster attribute when posterImage is extracted
  useEffect(() => {
    const video = videoRef.current
    if (video && posterImage && !poster) {
      // Directly set the poster attribute on the video element
      // This will automatically display when the video is paused
      video.setAttribute('poster', posterImage)
    }
  }, [posterImage, poster])

  // Show controls on hover, hide after 3 seconds of no hover
  useEffect(() => {
    if (isHovered) {
      setShowControls(true)
    } else {
      const timer = setTimeout(() => {
        setShowControls(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isHovered])

  // Calculate aspect ratio for container
  const containerStyle = videoDimensions
    ? { aspectRatio: `${videoDimensions.width} / ${videoDimensions.height}` }
    : { minHeight: '200px' } // Placeholder height until video loads

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={containerStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        poster={poster || undefined}
        preload="metadata"
        playsInline
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        onClick={togglePlay}
        style={{ display: 'block' }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Fallback poster if video poster doesn't load */}
      {!isPlaying && !poster && !posterImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center z-0">
          <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center mb-3">
            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="text-slate-400 text-xs font-mono">Loading preview...</div>
        </div>
      )}

      {/* Custom Play Button - Only show when paused */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center z-30 bg-black/10 hover:bg-black/20 transition-colors duration-300 group"
          aria-label="Play video"
        >
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110">
            <svg
              className="w-10 h-10 md:w-12 md:h-12 text-black ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
      )}

      {/* Custom Controls - Show on hover */}
      {showControls && isHovered && (
        <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-4 transition-opacity duration-300">
          <div className="flex items-center gap-3">
            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="text-white hover:text-[var(--accent-teal)] transition-colors"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Progress Bar */}
            <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer">
              <div
                className="h-full bg-[var(--accent-teal)] transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Time Display */}
            <span className="text-white text-xs font-mono min-w-[80px] text-right">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            {/* Mute Toggle */}
            <button
              onClick={toggleMute}
              className="text-white hover:text-[var(--accent-teal)] transition-colors ml-2"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Logo Watermark - Bottom Right */}
      <div className="absolute bottom-4 right-4 pointer-events-none z-10">
        <div className="bg-black/40 backdrop-blur-sm rounded-lg p-2 border border-white/10">
          <SignatureLogo className="w-6 h-6 text-white/80" />
        </div>
      </div>
    </div>
  )
}


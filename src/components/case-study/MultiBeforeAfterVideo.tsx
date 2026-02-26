'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Lock, ArrowRight } from 'lucide-react'
import CustomVideoPlayer from '@/components/video/CustomVideoPlayer'
import ComponentHeading from '@/components/ui/ComponentHeading'

interface VideoItem {
  title: string
  videoUrl?: string
  videoEmbedUrl?: string
  videoPoster?: string
  description?: string
}

interface MultiBeforeAfterVideoProps {
  before: { title: string; videos: VideoItem[] }
  after: { title: string; videoUrl?: string; videoEmbedUrl?: string; videoPoster?: string; description?: string; sensitive?: boolean }
  isLightBackground?: boolean
  comparisonNotes?: { before: string[]; after: string[] }
  password?: string
  caseStudySlug?: string
}

const isYouTubeUrl = (url: string) => url.includes('youtube.com') || url.includes('youtu.be')

const YouTubeEmbed = ({ url }: { url: string }) => (
  <iframe
    src={url}
    className="absolute inset-0 w-full h-full"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    title="YouTube video"
  />
)

export default function MultiBeforeAfterVideo({ before, after, comparisonNotes, password = 'anu-access', caseStudySlug = 'default' }: MultiBeforeAfterVideoProps) {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [passwordError, setPasswordError] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storageKey = `case-study-unlocked-${caseStudySlug}`
      const unlocked = sessionStorage.getItem(storageKey) === 'true'
      setIsUnlocked(unlocked)
    }
  }, [caseStudySlug])

  const handleUnlock = () => {
    const trimmedPassword = passwordInput.trim().toLowerCase()
    const correctPassword = password.toLowerCase()

    if (trimmedPassword === correctPassword) {
      setPasswordError('')
      if (typeof window !== 'undefined') {
        const storageKey = `case-study-unlocked-${caseStudySlug}`
        sessionStorage.setItem(storageKey, 'true')
        setIsUnlocked(true)
        setShowPasswordModal(false)
        window.dispatchEvent(new CustomEvent('case-study-unlocked', { detail: { slug: caseStudySlug } }))
      }
    } else {
      setPasswordError('Incorrect password. Please try again.')
    }
  }

  const handleVideoClick = (e: React.MouseEvent) => {
    if (!isUnlocked) {
      e.preventDefault()
      e.stopPropagation()
      setShowPasswordModal(true)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-[1440px] mx-auto space-y-12">

        {/* ── BEFORE: Public YouTube Demos ── */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/40">
              {before.title}
            </span>
          </div>

          {/* Horizontal grid — equal-sized cards */}
          <div className={`grid gap-4 ${before.videos.length === 1 ? 'grid-cols-1 max-w-3xl' :
              before.videos.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
                'grid-cols-1 md:grid-cols-3'
            }`}>
            {before.videos.map((video, index) => (
              <div key={index} className="space-y-2">
                <div className="relative aspect-video rounded-xl overflow-hidden border border-white/[0.08] bg-black/30">
                  {video.videoEmbedUrl && isYouTubeUrl(video.videoEmbedUrl) ? (
                    <YouTubeEmbed url={video.videoEmbedUrl} />
                  ) : !isUnlocked ? (
                    <div
                      className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                      onClick={handleVideoClick}
                    >
                      <div className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.12] flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Lock className="w-4 h-4 text-white/40" />
                      </div>
                    </div>
                  ) : video.videoUrl ? (
                    <CustomVideoPlayer src={video.videoUrl} className="" />
                  ) : null}
                </div>
                <p className="text-white/30 text-[13px] font-light">{video.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Divider with arrow ── */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-white/[0.06]" />
          <div className="flex items-center gap-2 text-white/20">
            <ArrowRight className="w-3.5 h-3.5" />
            <span className="font-mono text-[9px] tracking-[0.3em] uppercase">Unified</span>
          </div>
          <div className="flex-1 h-px bg-white/[0.06]" />
        </div>

        {/* ── AFTER: Unified Hub Video ── */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent-teal)]/60" />
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--accent-teal)]/60">
              {after.title}
            </span>
          </div>

          <div
            className="relative aspect-video rounded-xl overflow-hidden border border-white/[0.08] bg-black/30 max-w-4xl cursor-pointer group"
            onClick={handleVideoClick}
          >
            {!isUnlocked ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-3">
                  <div className="w-14 h-14 mx-auto rounded-full bg-white/[0.04] border border-white/[0.10] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Lock className="w-6 h-6 text-white/30" />
                  </div>
                  <div>
                    <p className="text-white/40 text-sm font-light">Password Protected</p>
                    <p className="text-white/20 text-xs mt-1">Click to unlock</p>
                  </div>
                </div>
              </div>
            ) : (
              after.videoEmbedUrl && isYouTubeUrl(after.videoEmbedUrl) ? (
                <YouTubeEmbed url={after.videoEmbedUrl} />
              ) : after.videoUrl ? (
                <CustomVideoPlayer src={after.videoUrl} className="" />
              ) : null
            )}
          </div>
        </div>

        {/* ── Comparison Notes ── */}
        {comparisonNotes && (
          <div className="pt-6 border-t border-white/[0.06]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/30">Before</span>
                <ul className="space-y-2">
                  {comparisonNotes.before.map((note, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-white/40 text-[14px] font-light leading-relaxed">
                      <span className="text-white/20 mt-1.5 text-[6px]">●</span>
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[var(--accent-teal)]/50">After</span>
                <ul className="space-y-2">
                  {comparisonNotes.after.map((note, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-white/50 text-[14px] font-light leading-relaxed">
                      <span className="text-[var(--accent-teal)]/40 mt-1.5 text-[6px]">●</span>
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[var(--bg-secondary)] p-8 max-w-md w-full border border-white/[0.08] shadow-2xl shadow-black/50 rounded-xl"
          >
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 mx-auto bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-4 rounded-full">
                  <Lock className="w-6 h-6 text-white/40" />
                </div>
                <h3 className="text-[var(--text-heading)] text-xl font-sans font-medium">Unlock Video</h3>
                <p className="text-white/40 text-sm font-light">
                  Enter the password to view the walkthrough.
                </p>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); handleUnlock() }} className="space-y-4">
                <label htmlFor="multi-video-password-input" className="sr-only">Password</label>
                <input
                  id="multi-video-password-input"
                  type="password"
                  value={passwordInput}
                  onChange={(e) => { setPasswordInput(e.target.value); setPasswordError('') }}
                  placeholder="Enter password"
                  aria-label="Enter password to unlock videos"
                  className="w-full px-4 py-3 border border-white/[0.1] bg-white/[0.04] text-[var(--text-heading)] placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-all rounded-lg text-sm"
                  autoFocus
                />
                {passwordError && <p role="alert" className="text-red-400 text-sm">{passwordError}</p>}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => { setShowPasswordModal(false); setPasswordInput(''); setPasswordError('') }}
                    className="flex-1 px-4 py-2.5 border border-white/[0.1] text-white/40 hover:bg-white/[0.04] transition-colors rounded-lg text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 bg-white/[0.08] border border-white/[0.12] text-white/70 hover:bg-white/[0.12] transition-colors font-medium rounded-lg text-sm"
                  >
                    Unlock
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}

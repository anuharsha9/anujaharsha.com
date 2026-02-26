'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import CustomVideoPlayer from '@/components/video/CustomVideoPlayer'

interface BeforeAfterVideoProps {
  before: { title: string; videoUrl?: string; videoEmbedUrl?: string; videoPoster?: string; description?: string }
  after: { title: string; videoUrl: string; videoPoster?: string; description?: string; isPublic?: boolean }
  isLightBackground?: boolean
  comparisonNotes?: { before: string[]; after: string[] }
  password?: string
  caseStudySlug?: string
}

export default function BeforeAfterVideo({ before, after, isLightBackground = false, comparisonNotes, password = 'anu-access', caseStudySlug = 'default' }: BeforeAfterVideoProps) {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [passwordError, setPasswordError] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storageKey = `case-study-unlocked-${caseStudySlug}`
      const caseUnlocked = sessionStorage.getItem(storageKey) === 'true'

      if (caseStudySlug === 'iq-plugin') {
        setIsUnlocked(caseUnlocked)
      } else {
        const globalUnlocked = sessionStorage.getItem('portfolio-globally-unlocked') === 'true'
        setIsUnlocked(globalUnlocked || caseUnlocked)
      }
    }
  }, [caseStudySlug])

  const handleUnlock = () => {
    const trimmedPassword = passwordInput.trim().toLowerCase()
    const correctPassword = password.toLowerCase()

    if (trimmedPassword === correctPassword) {
      setPasswordError('')
      if (typeof window !== 'undefined') {
        const storageKey = `case-study-unlocked-${caseStudySlug}`

        if (caseStudySlug === 'iq-plugin') {
          sessionStorage.setItem(storageKey, 'true')
        } else {
          sessionStorage.setItem('portfolio-globally-unlocked', 'true')
          sessionStorage.setItem(storageKey, 'true')
        }

        setIsUnlocked(true)
        setShowPasswordModal(false)
        window.dispatchEvent(new CustomEvent('case-study-unlocked', { detail: { slug: caseStudySlug } }))
      }
    } else {
      setPasswordError('Incorrect password. Please try again.')
    }
  }

  const isBeforeVideoPublic = !!before.videoEmbedUrl
  const isAfterVideoPublic = !!after.isPublic

  const handleVideoClick = (e: React.MouseEvent, isBefore: boolean) => {
    if (isBefore && isBeforeVideoPublic) return
    if (!isBefore && isAfterVideoPublic) return
    if (!isUnlocked) {
      e.preventDefault()
      e.stopPropagation()
      setShowPasswordModal(true)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-[1440px] mx-auto space-y-10">
        {/* Side-by-Side Videos */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* BEFORE Video */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-red-500 flex-shrink-0"></div>
                <h3 className="text-[var(--text-heading)] text-lg font-sans font-semibold">{before.title}</h3>
              </div>
              <div
                className="relative w-full aspect-video border border-white/[0.08] overflow-hidden cursor-pointer group rounded-2xl bg-black/20"
                onClick={(e) => handleVideoClick(e, true)}
              >
                {!isBeforeVideoPublic && !isUnlocked ? (
                  <div className="absolute inset-0 bg-white/[0.02] flex items-center justify-center">
                    <div className="text-center space-y-3">
                      <div className="w-14 h-14 mx-auto bg-white/[0.04] border border-white/[0.08] flex items-center justify-center group-hover:scale-110 transition-transform rounded-xl">
                        <svg aria-hidden="true" className="w-7 h-7 text-[var(--text-dim)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <p className="text-[var(--text-body)] text-sm font-medium">Password Required</p>
                      <p className="text-[var(--text-dim)] text-xs">Click to unlock</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {before.videoEmbedUrl ? (
                      <iframe
                        src={before.videoEmbedUrl}
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={before.title}
                      />
                    ) : (
                      before.videoUrl && (
                        <CustomVideoPlayer src={before.videoUrl} className="" />
                      )
                    )}
                  </>
                )}
              </div>
            </div>

            {/* AFTER Video */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-[var(--accent-teal)] flex-shrink-0"></div>
                <h3 className="text-[var(--text-heading)] text-lg font-sans font-semibold">{after.title}</h3>
              </div>
              <div
                className="relative w-full aspect-video border border-white/[0.08] overflow-hidden cursor-pointer group rounded-2xl bg-black/20"
                onClick={(e) => handleVideoClick(e, false)}
              >
                {!isUnlocked && !isAfterVideoPublic ? (
                  <div className="absolute inset-0 bg-white/[0.02] flex items-center justify-center">
                    <div className="text-center space-y-3">
                      <div className="w-14 h-14 mx-auto bg-[var(--accent-teal)]/10 border border-[var(--accent-teal)]/30 flex items-center justify-center group-hover:scale-110 transition-transform rounded-xl">
                        <svg aria-hidden="true" className="w-7 h-7 text-[var(--accent-teal)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <p className="text-[var(--text-body)] text-sm font-medium">Password Required</p>
                      <p className="text-[var(--text-dim)] text-xs">Click to unlock</p>
                    </div>
                  </div>
                ) : (
                  <CustomVideoPlayer src={after.videoUrl} className="" />
                )}
              </div>
            </div>
          </div>

          {/* Key Differences */}
          {comparisonNotes && (
            <div className="mt-8 pt-8 border-t border-white/[0.06]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Before Column */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500"></div>
                    <span className="text-[var(--text-dim)] text-xs uppercase tracking-widest font-medium">
                      Before
                    </span>
                  </div>
                  <ul className="text-[var(--text-muted)] text-sm space-y-2">
                    {comparisonNotes.before.map((note, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-red-400 mt-0.5">•</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* After Column */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500"></div>
                    <span className="text-[var(--text-dim)] text-xs uppercase tracking-widest font-medium">
                      After
                    </span>
                  </div>
                  <ul className="text-[var(--text-muted)] text-sm space-y-2">
                    {comparisonNotes.after.map((note, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-emerald-400 mt-0.5">•</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Password Modal — dark glassmorphism */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[var(--bg-secondary)] p-8 max-w-md w-full border border-white/[0.08] shadow-2xl shadow-black/50 rounded-xl"
          >
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 mx-auto bg-[var(--accent-teal)]/10 flex items-center justify-center mb-4 rounded-xl">
                  <svg aria-hidden="true" className="w-8 h-8 text-[var(--accent-teal)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-[var(--text-heading)] text-2xl font-sans font-semibold">Unlock Videos</h3>
                <p className="text-[var(--text-muted)] text-sm">
                  Enter the password to view the video walkthroughs.
                </p>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); handleUnlock() }} className="space-y-4">
                <label htmlFor="video-password-input" className="sr-only">Password</label>
                <input
                  id="video-password-input"
                  type="password"
                  value={passwordInput}
                  onChange={(e) => { setPasswordInput(e.target.value); setPasswordError('') }}
                  placeholder="Enter password"
                  aria-label="Enter password to unlock video"
                  className="w-full px-4 py-3 border border-white/[0.1] bg-white/[0.04] text-[var(--text-heading)] placeholder:text-[var(--text-dim)] focus:outline-none focus:border-[var(--accent-teal)]/50 focus:ring-2 focus:ring-[var(--accent-teal)]/20 transition-all rounded-lg"
                  autoFocus
                />
                {passwordError && <p role="alert" className="text-red-400 text-sm">{passwordError}</p>}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => { setShowPasswordModal(false); setPasswordInput(''); setPasswordError('') }}
                    className="flex-1 px-4 py-3 border border-white/[0.1] text-[var(--text-muted)] hover:bg-white/[0.04] transition-colors rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-[var(--accent-teal)] text-white hover:opacity-90 transition-colors font-medium rounded-lg"
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

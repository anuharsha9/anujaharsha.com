'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { getTheme } from '@/lib/design-system'

interface LockedContentProps {
  children: React.ReactNode
  isUnlocked?: boolean
  onUnlock?: () => void
  password?: string
  caseStudySlug?: string
  unlockMessage?: string
  isLightBackground?: boolean
  fullWidth?: boolean
  className?: string
}

export default function LockedContent({ children, isUnlocked: propIsUnlocked, onUnlock, password = 'anu-access', caseStudySlug = 'default', unlockMessage = 'Password required to view internal discovery details', isLightBackground = false, fullWidth = false, className = '' }: LockedContentProps) {
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [inputPassword, setInputPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const t = getTheme(isLightBackground)

  useEffect(() => {
    if (propIsUnlocked === false) {
      setIsUnlocked(false)
      return
    }

    if (propIsUnlocked === true) {
      setIsUnlocked(true)
      return
    }

    const checkUnlockStatus = () => {
      if (typeof window === 'undefined') return

      const storageKey = `case-study-unlocked-${caseStudySlug}`
      const caseUnlocked = sessionStorage.getItem(storageKey) === 'true'

      const globalUnlocked = sessionStorage.getItem('portfolio-globally-unlocked') === 'true'
      setIsUnlocked(globalUnlocked || caseUnlocked)
    }

    checkUnlockStatus()

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'portfolio-globally-unlocked' || e.key?.startsWith('case-study-unlocked-')) {
        checkUnlockStatus()
      }
    }

    const handleUnlockEvent = () => {
      checkUnlockStatus()
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('portfolio-unlocked', handleUnlockEvent)
    const interval = setInterval(checkUnlockStatus, 2000)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('portfolio-unlocked', handleUnlockEvent)
      clearInterval(interval)
    }
  }, [propIsUnlocked, caseStudySlug])

  const handleUnlock = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setError('')
    setSuccess(false)

    if (!inputPassword.trim()) {
      setError('Please enter a password.')
      return
    }

    const trimmedPassword = inputPassword.trim().toLowerCase()
    const correctPassword = password.toLowerCase()

    if (trimmedPassword === correctPassword) {
      setError('')
      setSuccess(true)

      if (typeof window !== 'undefined') {
        const storageKey = `case-study-unlocked-${caseStudySlug}`

        sessionStorage.setItem('portfolio-globally-unlocked', 'true')
        sessionStorage.setItem(storageKey, 'true')
        window.dispatchEvent(new CustomEvent('case-study-unlocked', { detail: { slug: caseStudySlug } }))
        window.dispatchEvent(new CustomEvent('portfolio-unlocked'))
      }

      setTimeout(() => {
        setIsUnlocked(true)
        setShowPasswordModal(false)
        setSuccess(false)
        setInputPassword('')
        setError('')
        if (onUnlock) onUnlock()
      }, 1500)
    } else {
      setError('Incorrect password. Please try again.')
      setSuccess(false)
      setInputPassword('')
    }
  }

  if (isUnlocked) return <>{children}</>

  // Extract a short title from the unlock message
  const getBannerTitle = () => {
    const msg = unlockMessage.toLowerCase()
    if (msg.includes('persona')) return 'User Personas'
    if (msg.includes('discovery')) return 'System Discovery Strategy'
    if (msg.includes('iteration') && msg.includes('log')) return 'Design Iteration Log'
    if (msg.includes('iteration')) return 'Design Iterations'
    if (msg.includes('mapping')) return 'System Mapping'
    if (msg.includes('research')) return 'Research Methods'
    if (msg.includes('pivot')) return 'Design Pivots'
    if (msg.includes('disclosure')) return 'Layered Disclosure Strategy'
    if (msg.includes('artifact')) return 'Design Artifacts'
    if (msg.includes('evolution')) return 'Design Evolution'
    if (msg.includes('workflow comparison')) return 'Workflow Comparison'
    if (msg.includes('architecture') || msg.includes('architectural')) return 'Architecture Blueprint'
    if (msg.includes('empty state')) return 'Empty States'
    if (msg.includes('v1') || msg.includes('v2') || msg.includes('v3')) return 'Version Iterations (V1, V2, V3)'
    return 'Protected Content'
  }
  const bannerTitle = getBannerTitle()

  return (
    <>
      {/* Locked Insight Banner */}
      <div
        className={
          fullWidth
            ? `w-full bg-[var(--accent-teal-50)] border-y border-[var(--accent-teal-100)] py-12 my-12 ${className}`
            : `bg-[var(--accent-teal-50)] border-l-4 border-[var(--accent-teal)] p-4 my-8 ${className}`
        }
      >
        <div className={fullWidth ? 'max-w-6xl mx-auto px-4 sm:px-6' : ''}>
          <div className="flex items-start gap-4">
            {/* Lock Icon */}
            <span className="text-2xl flex-shrink-0">🔒</span>

            <div className="flex-1 space-y-2">
              {/* Headline */}
              <h4 className="font-serif text-[var(--text-heading)] text-lg font-semibold">
                {bannerTitle}
              </h4>

              {/* Description */}
              <p className="text-[var(--text-body)] text-sm leading-relaxed">
                Detailed artifacts and sensitive diagrams are available for authorized reviewers.
              </p>

              {/* Ghost Button */}
              <button
                onClick={() => setShowPasswordModal(true)}
                className="inline-flex items-center gap-2 px-4 py-2 mt-2 text-sm font-medium text-[var(--accent-teal)] border border-[var(--accent-teal)]/30 hover:bg-[var(--accent-teal-soft)] transition-colors"
              >
                <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
                Enter Password
              </button>
            </div>
          </div>
        </div>
      </div>

      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {showPasswordModal && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowPasswordModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-white border-2 border-slate-200 p-8 max-w-md w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => setShowPasswordModal(false)} className="absolute top-4 right-4 text-slate-500 hover:text-slate-900 transition-colors">
                  <svg aria-hidden="true" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <h3 className="text-slate-900 text-2xl font-serif">Unlock Content</h3>
                    <p className="text-slate-600 text-sm">Enter password to view sensitive content</p>
                    <p className="text-[var(--accent-teal)] text-xs font-medium mt-2">✓ Unlocking this section will unlock all protected content across the entire website</p>
                  </div>

                  <form onSubmit={handleUnlock} className="space-y-4">
                    <div>
                      <label htmlFor="locked-content-password" className="sr-only">Password</label>
                      <input
                        id="locked-content-password"
                        type="password"
                        value={inputPassword}
                        onChange={(e) => {
                          setInputPassword(e.target.value)
                          setError('')
                          setSuccess(false)
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            handleUnlock(e)
                          }
                        }}
                        placeholder="Enter password"
                        aria-label="Enter password to unlock content"
                        aria-describedby={error ? 'password-error' : undefined}
                        className={`w-full px-4 py-3 border-2 transition-colors bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none ${error ? 'border-red-400' : success ? 'border-green-400' : 'border-slate-200 focus:border-[var(--accent-teal)]'}`}
                        autoFocus
                        disabled={success}
                      />
                      {error && (
                        <motion.p id="password-error" role="alert" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-sm text-red-500 flex items-center gap-2">
                          <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {error}
                        </motion.p>
                      )}
                      {success && (
                        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-sm text-green-500 flex items-center gap-2">
                          <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Password correct! Unlocking content...
                        </motion.p>
                      )}
                    </div>

                    <button type="submit" disabled={success} className={`w-full text-white px-6 py-3 font-medium transition-colors disabled:opacity-75 disabled:cursor-not-allowed ${success ? 'bg-green-500 hover:bg-green-600' : 'bg-[var(--accent-teal)] hover:bg-[var(--accent-teal)]/90'}`}>
                      {success ? 'Unlocking...' : 'Unlock Content'}
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}

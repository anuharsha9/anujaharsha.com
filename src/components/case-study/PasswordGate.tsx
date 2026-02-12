'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface PasswordGateProps {
  onPasswordCorrect: () => void
  password?: string
  description?: string
  learnItems?: string[]
  caseStudySlug?: string
  redirectToPrototype?: boolean
}

export default function PasswordGate({
  onPasswordCorrect,
  password: casePassword = 'anu-access',
  description,
  learnItems,
  caseStudySlug = 'default',
  redirectToPrototype = false,
}: PasswordGateProps) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Check if already unlocked in sessionStorage on mount
  // IQ Plugin requires its own specific unlock (doesn't respect global unlock)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storageKey = `case-study-unlocked-${caseStudySlug}`
      const caseUnlocked = sessionStorage.getItem(storageKey) === 'true'

      // IQ Plugin requires its own specific unlock (doesn't respect global unlock)
      if (caseStudySlug === 'iq-plugin') {
        if (caseUnlocked) {
          onPasswordCorrect()
        }
      } else {
        // Other case studies respect both global and case-specific unlock
        const globalUnlocked = sessionStorage.getItem('portfolio-globally-unlocked') === 'true'
        if (globalUnlocked || caseUnlocked) {
          onPasswordCorrect()
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [caseStudySlug]) // Remove onPasswordCorrect from dependencies to prevent unnecessary re-runs

  // Default "What you'll learn" items
  const defaultLearnItems = [
    'How I learned ML fast enough to design it responsibly',
    'Complete system maps and mental model diagrams',
    'Step-by-step workflow details for training and running models',
    'Concept evolution from expert-only to guided experience',
    'Edge cases, constraints, and design trade-offs',
    'Behind-the-scenes notes and team alignment process',
  ]

  const defaultDescription = redirectToPrototype
    ? 'Enter the password below to unlock the case study and view the prototype walkthrough.'
    : 'To view the full case study (workflows, alternatives, detailed rationale, and reflections), enter the password below.'

  const itemsToShow = learnItems || defaultLearnItems
  const descriptionText = description || defaultDescription

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedPassword = password.trim().toLowerCase()
    const correctPassword = (casePassword || 'anu-access').toLowerCase()

    if (trimmedPassword === correctPassword) {
      setError('')
      // Save to sessionStorage so it persists until tab is closed
      if (typeof window !== 'undefined') {
        const storageKey = `case-study-unlocked-${caseStudySlug}`

        // IQ Plugin only sets its own unlock (doesn't set global unlock)
        if (caseStudySlug === 'iq-plugin') {
          sessionStorage.setItem(storageKey, 'true')
        } else {
          // Other case studies set both global unlock and case-specific unlock
          sessionStorage.setItem('portfolio-globally-unlocked', 'true')
          sessionStorage.setItem(storageKey, 'true')
        }
      }
      // Call the callback to unlock the content
      onPasswordCorrect()
    } else {
      setError('Incorrect password. Please try again or contact me for access.')
    }
  }

  return (
    <section id="password-gate" className="surface-dark py-12 md:py-16 border-t border-white/5">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 xl:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h2 className="text-white text-2xl md:text-3xl font-serif">
                Deeper dive (password required)
              </h2>
              <p className="text-white/80 text-base md:text-lg leading-relaxed">
                {descriptionText}
              </p>
            </div>

            {/* What you'll learn preview */}
            <div className="bg-white/5 p-6 border border-white/10 text-left">
              <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">
                What you&apos;ll learn
              </h3>
              <ul className="space-y-2 text-white/70 text-sm">
                {itemsToShow.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-[var(--accent-teal)] mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <label htmlFor="password-gate-input" className="sr-only">Password</label>
              <input
                id="password-gate-input"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError('')
                }}
                placeholder="Enter password"
                aria-label="Enter password to unlock case study"
                className="px-6 py-3 border border-white/20 bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:border-white/40 transition-colors flex-1 max-w-md"
                autoFocus
              />
              <button
                type="submit"
                className="px-8 py-3 border border-white/20 text-white hover:border-white/40 hover:bg-white/10 transition-all duration-300 whitespace-nowrap group inline-flex items-center gap-2"
              >
                {redirectToPrototype ? 'Unlock and view prototype' : 'Unlock full case study'}
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
            </div>
            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}
          </motion.form>

          <div className="pt-4">
            <a
              href="mailto:anujanimmagadda@gmail.com"
              className="text-white/60 hover:text-white/80 text-sm transition-colors underline"
            >
              Contact me for access
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

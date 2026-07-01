'use client'

import { type ReactNode, useState, useEffect, useRef, isValidElement, cloneElement, Fragment } from 'react'
import { createPortal } from 'react-dom'
import { m, AnimatePresence } from 'framer-motion'
import { EASE_CINEMATIC as ease, EASE_SPRING, DURATION } from '@/lib/motion'
import { useInsideLightbox, usePresenterSlot } from './PresenterSlotContext'

interface PresenterBarProps {
 /** Plain narration string — used when no children are passed */
 narration?: string
 /** Rich JSX content inside the speech bubble — overrides narration */
 children?: ReactNode
 /** Optional delay before appearing */
 delay?: number
 /** Whether to show the presenter avatar and speech bubble pointer (default: true) */
 showAvatar?: boolean
 /** Typewriter speed in characters per second (default: 40) */
 typewriterSpeed?: number
 /** Called when typewriter finishes — use to trigger visual animations */
 onTypingComplete?: () => void
 /** On mobile, fade out the bar after typing completes to save vertical space (default: true) */
 hideOnMobileAfterTyping?: boolean
}

/* ── Count all text characters in a ReactNode tree ── */
function countTextChars(node: ReactNode): number {
 if (node == null || typeof node === 'boolean') return 0
 if (typeof node === 'string') return Array.from(node).length
 if (typeof node === 'number') return String(node).length
 if (Array.isArray(node)) return node.reduce((sum, child) => sum + countTextChars(child), 0)
 if (isValidElement(node)) return countTextChars((node.props as Record<string, unknown>).children as ReactNode)
 return 0
}

/* ── Render children with character-by-character visibility ── */
function applyTypewriter(
 node: ReactNode,
 visibleCount: number,
 counter: { value: number },
): ReactNode {
 if (node == null || typeof node === 'boolean') return node

 if (typeof node === 'string') {
 const chars = Array.from(node)
 return (
 <>
 {chars.map((char, i) => {
 const idx = counter.value++
 return (
 <span
 key={i}
 style={{ visibility: idx < visibleCount ? 'visible' : 'hidden' }}
 >
 {char}
 </span>
 )
 })}
 </>
 )
 }

 if (typeof node === 'number') {
 return applyTypewriter(String(node), visibleCount, counter)
 }

 if (Array.isArray(node)) {
 return node.map((child, i) => (
 <Fragment key={i}>{applyTypewriter(child, visibleCount, counter)}</Fragment>
 ))
 }

 if (isValidElement(node)) {
 const props = node.props as Record<string, unknown>
 return cloneElement(node, {}, applyTypewriter(props.children as ReactNode, visibleCount, counter))
 }

 return node
}

/* ── Typing indicator (three pulsing dots) ──────── */
function TypingDots() {
 return (
 <div className="flex items-center gap-1 px-1 py-1">
 {[0, 1, 2].map((i) => (
 <m.div
 key={i}
 className="w-1.5 h-1.5 rounded-full bg-zinc-500"
 animate={{ y: [0, -4, 0], opacity: [0.4, 0.9, 0.4] }}
 transition={{ duration: DURATION.slow, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
 />
 ))}
 </div>
 )
}

export default function PresenterBar({
 narration,
 children,
 delay = 0,
 showAvatar = true,
 typewriterSpeed = 40,
 onTypingComplete,
 hideOnMobileAfterTyping = false,
}: PresenterBarProps) {
 const [phase, setPhase] = useState<'typing' | 'revealing' | 'done'>('typing')
 const [visibleChars, setVisibleChars] = useState(0)
 const [hiddenOnMobile, setHiddenOnMobile] = useState(false)
 const contentRef = useRef<ReactNode>(null)
 const hasFiredComplete = useRef(false)

 /* Lightbox portal — see PresenterSlotContext. When the bar is rendered
  * inside the presentation lightbox, we hold the bubble until the left-
  * column slot div has been ref-attached, then portal into it. Standalone
  * usage on the case-study pages stays inline (insideLightbox is false).
  *
  * Inside the DECK on mobile, vertical space is the scarcest resource:
  * the quote plays its typewriter, hands off to the visuals, then fades
  * out to give the slide back its height (hideOnMobileAfterTyping).
  * Desktop decks and standalone pages keep the quote pinned. */
 const insideLightbox = useInsideLightbox()
 const slot = usePresenterSlot()
 const effectiveHideOnMobile = insideLightbox ? true : hideOnMobileAfterTyping

 const content = children || (
 <p className="text-sm md:text-[15px] text-zinc-200 leading-relaxed">{narration}</p>
 )
 contentRef.current = content

 // Phase 1: typing dots → revealing
 useEffect(() => {
 setPhase('typing')
 setVisibleChars(0)
 const timer = setTimeout(() => setPhase('revealing'), (delay * 1000) + 600)
 return () => clearTimeout(timer)
 }, [delay])

 // Phase 2: character-by-character reveal via rAF
 useEffect(() => {
 if (phase !== 'revealing') return
 const total = countTextChars(contentRef.current)
 if (total === 0) { setPhase('done'); return }

 setVisibleChars(0)
 let startTime: number | null = null
 let rafId: number

 const tick = (timestamp: number) => {
 if (!startTime) startTime = timestamp
 const elapsed = timestamp - startTime
 const count = Math.min(Math.floor((elapsed / 1000) * typewriterSpeed), total)
 setVisibleChars(count)
 if (count < total) { rafId = requestAnimationFrame(tick) }
 else {
 setPhase('done')
 if (!hasFiredComplete.current) {
 hasFiredComplete.current = true
 const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
 if (isMobile && effectiveHideOnMobile) {
 // On mobile: wait a beat, fade out, then fire callback
 setTimeout(() => {
 setHiddenOnMobile(true)
 setTimeout(() => onTypingComplete?.(), 500)
 }, 800)
 } else {
 onTypingComplete?.()
 }
 }
 }
 }

 rafId = requestAnimationFrame(tick)
 return () => cancelAnimationFrame(rafId)
 }, [phase, typewriterSpeed, onTypingComplete, effectiveHideOnMobile])

 /* Inside the lightbox, suppress the inline DOM until the slot ref is
  * attached. Returning null first frame avoids a flash where the bar
  * renders inside the visual column before jumping to the left slot. */
 if (insideLightbox && !slot) return null

 /* Editorial pull-quote treatment.
  *
  * The earlier avatar-and-speech-bubble layout was the only piece of
  * figurative illustration on the site — a stylized portrait sitting
  * alongside dark glass, mono caps, and aurora curtains. It read as
  * "support chat" rather than "designer narrating a case study."
  *
  * This treatment keeps the "me talking to you" intent but expresses it
  * through typography: a slim teal hairline anchor on the left, the
  * narration in the same serif voice used for poetry, and a quiet mono
  * byline below. Same typewriter timing, same onTypingComplete callback,
  * same shimmer at completion — the choreography is unchanged. */
 const bar = (
 <m.div
 initial={{ opacity: 0 }}
 animate={hiddenOnMobile ? { opacity: 0, height: 0, marginBottom: 0 } : { opacity: 1 }}
 transition={hiddenOnMobile ? { duration: DURATION.medium, ease } : { duration: DURATION.slower, delay, ease }}
 className="mb-8 md:mb-10 overflow-hidden"
 >
 <div className="relative pl-5 md:pl-6">
 {/* Vertical teal hairline — the editorial accent that says
     "this is a pull quote." Draws in from the top. */}
 <m.div
 initial={{ scaleY: 0 }}
 animate={{ scaleY: 1 }}
 transition={{ duration: DURATION.slow, delay: delay + 0.1, ease }}
 style={{
 transformOrigin: 'top',
 background: 'rgba(var(--accent-teal-rgb), 0.8)',
 boxShadow: '0 0 8px rgba(var(--accent-teal-rgb), 0.4)',
 }}
 className="absolute left-0 top-1 bottom-3 w-[2px] rounded-full"
 />

 {/* Shimmer sweep after typewriter completes — kept from the
     earlier treatment as the "finish" beat that hands off to the
     visual reveal. */}
 <div className="relative overflow-hidden">
 <AnimatePresence>
 {phase === 'done' && (
 <m.div
 className="absolute inset-0 pointer-events-none"
 initial={{ x: '-100%' }}
 animate={{ x: '200%' }}
 transition={{ duration: DURATION.cinematic, delay: 0.2, ease: 'easeInOut' }}
 >
 <div
 className="w-1/3 h-full"
 style={{ background: 'linear-gradient(90deg, transparent, var(--overlay-white-04), transparent)' }}
 />
 </m.div>
 )}
 </AnimatePresence>

 {/* Content — serif italic, white text. The arbitrary [&_p]
     descendant selectors override the inline paragraph classes
     that each beat passes in (mostly `text-base text-zinc-400`),
     so the whole bar reads as one continuous voice instead of a
     stack of slightly-different paragraph styles. */}
 <m.div
 initial={{ opacity: 0, x: -6 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ duration: DURATION.slow, delay: delay + 0.15, ease: EASE_SPRING }}
 className="font-serif italic text-zinc-100 [&_p]:!text-zinc-100 [&_p]:!leading-relaxed [&_p]:!text-base md:[&_p]:!text-lg [&_p]:!font-light"
 >
 <AnimatePresence mode="wait">
 {phase === 'typing' ? (
 <m.div
 key="typing"
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0, scale: 0.95 }}
 transition={{ duration: DURATION.fast }}
 >
 <TypingDots />
 </m.div>
 ) : (
 <m.div
 key="content"
 initial={{ opacity: 0, y: 6 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: DURATION.medium, ease }}
 >
 {phase === 'done'
 ? content
 : applyTypewriter(content, visibleChars, { value: 0 })
 }
 </m.div>
 )}
 </AnimatePresence>
 </m.div>
 </div>

 {/* Quiet byline. Anuja's voice, expressed in the same mono caps
     vocabulary used for every other label on the site. */}
 {showAvatar && (
 <m.p
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ duration: DURATION.slow, delay: delay + 0.3, ease }}
 className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500"
 >
 — Anuja Harsha
 </m.p>
 )}
 </div>
 </m.div>
 )

 if (insideLightbox && slot) return createPortal(bar, slot)
 return bar
}

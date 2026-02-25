import { useEffect, useRef } from 'react'

interface FocusTrapOptions {
  onEscape?: () => void
  initialFocusSelector?: string
  restoreFocus?: boolean
}

/**
 * Hook to trap focus within a container element.
 * Useful for modals, dialogs, and lightboxes.
 */
export function useFocusTrap<T extends HTMLElement = HTMLElement>(isActive: boolean, options: FocusTrapOptions = {}) {
  const containerRef = useRef<T | null>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  const { onEscape, initialFocusSelector, restoreFocus = true } = options

  useEffect(() => {
    if (!isActive || !containerRef.current) return

    const container = containerRef.current
    previousFocusRef.current = document.activeElement as HTMLElement | null

    const getFocusableElements = () =>
      Array.from(
        container.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute('aria-hidden'))

    const focusInitialElement = () => {
      const preferred = initialFocusSelector
        ? container.querySelector<HTMLElement>(initialFocusSelector)
        : null
      const focusableElements = getFocusableElements()
      const target = preferred ?? focusableElements[0] ?? container
      target.focus()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onEscape) {
        e.preventDefault()
        onEscape()
        return
      }

      if (e.key !== 'Tab') return

      const focusableElements = getFocusableElements()
      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (!firstElement || !lastElement) {
        e.preventDefault()
        container.focus()
        return
      }

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    // Focus first element when trap activates
    requestAnimationFrame(focusInitialElement)

    container.addEventListener('keydown', handleKeyDown)

    return () => {
      container.removeEventListener('keydown', handleKeyDown)

      if (!restoreFocus) return
      const previous = previousFocusRef.current
      if (previous && typeof previous.focus === 'function') {
        requestAnimationFrame(() => previous.focus())
      }
    }
  }, [isActive, onEscape, initialFocusSelector, restoreFocus])

  return containerRef
}

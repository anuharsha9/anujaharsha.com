'use client'

import { createContext, useContext } from 'react'

/**
 * Coordinates where a PresenterBar bubble renders.
 *
 * Without this, every PresenterBar renders inline inside its parent beat —
 * which is exactly what we want on the standalone case-study pages.
 *
 * Inside the presentation lightbox, the bubble should sit in the LEFT column
 * (under the slide title), not inside the visual column where it competes for
 * space with the wireframe / cards / charts. So the lightbox provides a slot
 * element + an "inside lightbox" flag via these contexts, and PresenterBar
 * detects them and portals its bubble into the slot instead of rendering
 * inline. The beat's other DOM (visual animations) stays put.
 *
 * The timing state machine inside PresenterBar (typewriter + onTypingComplete
 * → startVisuals) is unchanged; only the bubble's final DOM location moves.
 */
export const PresenterSlotContext = createContext<HTMLElement | null>(null)
export const InsideLightboxContext = createContext(false)

export function usePresenterSlot() { return useContext(PresenterSlotContext) }
export function useInsideLightbox() { return useContext(InsideLightboxContext) }

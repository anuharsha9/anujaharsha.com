import type { ReactNode } from 'react'

/**
 * iPhone mockup frame — for presenting native mobile apps (which can't run in
 * a browser) the way WordU's playable web game is framed, but with a screen
 * recording or a placeholder inside instead of a live app.
 *
 * Portrait 9:19.5, Dynamic Island, rounded bezel. Children fill the screen
 * (use object-cover for video). Sized to sit comfortably inside a lightbox.
 */
export default function PhoneFrame({ children, className = '' }: { children: ReactNode; className?: string }) {
    return (
        <div
            className={`relative aspect-[9/19.5] w-[230px] sm:w-[260px] overflow-hidden rounded-[42px] border-[7px] bg-black shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/10 ${className}`}
            style={{ borderColor: 'var(--surface-charcoal-900, #1a1a2e)' }}
        >
            {/* Dynamic Island */}
            <div className="absolute left-1/2 top-2.5 z-50 h-[24px] w-[84px] -translate-x-1/2 rounded-full bg-black ring-1 ring-white/5" />
            {/* Screen */}
            <div className="absolute inset-0 overflow-hidden rounded-[35px]">
                {children}
            </div>
        </div>
    )
}

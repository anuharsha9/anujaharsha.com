'use client'

/**
 * FloatingOrbs — ambient depth particles (CSS-only)
 *
 * Pure CSS @keyframes animation — zero JS scroll listeners.
 * GPU-composited: uses only transform + opacity for 60fps.
 * Fixed position so they persist across the full page.
 * Reduced to 4 orbs for deep-scroll performance.
 */

const ORBS = [
    { id: 0, x: '72%', y: '18%', size: 5, hue: 178, duration: 18, delay: 0 },
    { id: 1, x: '15%', y: '55%', size: 3, hue: 185, duration: 22, delay: 3 },
    { id: 2, x: '85%', y: '70%', size: 4, hue: 175, duration: 20, delay: 6 },
    { id: 3, x: '40%', y: '30%', size: 3, hue: 190, duration: 24, delay: 9 },
]

export default function FloatingOrbs() {
    return (
        <>
            <div
                className="fixed inset-0 pointer-events-none overflow-hidden z-[1]"
                aria-hidden="true"
            >
                {ORBS.map((orb) => (
                    <div
                        key={orb.id}
                        className="absolute rounded-full floating-orb"
                        style={{
                            left: orb.x,
                            top: orb.y,
                            width: orb.size,
                            height: orb.size,
                            background: `radial-gradient(circle, hsla(${orb.hue}, 50%, 55%, 0.35), transparent)`,
                            boxShadow: `0 0 ${orb.size * 3}px hsla(${orb.hue}, 50%, 45%, 0.12)`,
                            animationDuration: `${orb.duration}s`,
                            animationDelay: `${orb.delay}s`,
                            willChange: 'transform, opacity',
                        }}
                    />
                ))}
            </div>
            <style jsx global>{`
                @keyframes floating-orb-drift {
                    0%   { transform: translate(0, 0)    scale(1);    opacity: 0.25; }
                    25%  { transform: translate(12px, -8px) scale(1.08); opacity: 0.35; }
                    50%  { transform: translate(-4px, 6px) scale(0.96); opacity: 0.2;  }
                    75%  { transform: translate(-8px, -4px) scale(1.04); opacity: 0.3;  }
                    100% { transform: translate(0, 0)    scale(1);    opacity: 0.25; }
                }
                .floating-orb {
                    animation: floating-orb-drift ease-in-out infinite;
                }
            `}</style>
        </>
    )
}

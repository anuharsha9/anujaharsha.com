import { Cog } from 'lucide-react'

/**
 * Small interlocked-gear glyph. Used as the Easter-egg "door"
 * (hidden hint next to Anuja's name + footer copyright → /quiz).
 */
export default function InterlockedGearGlyph({
    size = 20,
    className = '',
}: {
    size?: number
    className?: string
}) {
    return (
        <span
            className={`relative inline-block align-middle ${className}`}
            style={{ width: size, height: size }}
        >
            <Cog
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[var(--accent-teal-bright)]"
                size={Math.round(size * 0.8)}
                strokeWidth={2}
            />
            <Cog
                className="absolute text-[var(--accent-teal)]/85"
                style={{ left: '26%', top: '28%', transform: 'translate(-50%, -50%)' }}
                size={Math.round(size * 0.5)}
                strokeWidth={2.2}
            />
            <Cog
                className="absolute text-[var(--accent-teal)]/85"
                style={{ left: '74%', top: '74%', transform: 'translate(-50%, -50%)' }}
                size={Math.round(size * 0.5)}
                strokeWidth={2.2}
            />
        </span>
    )
}

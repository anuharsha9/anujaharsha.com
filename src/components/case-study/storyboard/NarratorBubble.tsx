'use client'

import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

interface NarratorBubbleProps {
    text: string
    /** Position of bubble relative to container */
    align?: 'left' | 'right' | 'center'
    /** Delay before the bubble appears (seconds) */
    delay?: number
    /** Optional mood variant */
    mood?: 'default' | 'excited' | 'determined' | 'reflective'
}

const MOOD_STYLES = {
    default: {
        border: 'border-rose-500/20',
        bg: 'bg-rose-500/[0.04]',
        text: 'text-zinc-300',
        avatarBg: 'bg-gradient-to-br from-rose-500/30 to-pink-500/20',
        avatarBorder: 'border-rose-500/30',
        avatarText: 'text-rose-300',
        tail: 'border-rose-500/20',
    },
    excited: {
        border: 'border-amber-500/25',
        bg: 'bg-amber-500/[0.04]',
        text: 'text-zinc-300',
        avatarBg: 'bg-gradient-to-br from-amber-500/30 to-orange-500/20',
        avatarBorder: 'border-amber-500/30',
        avatarText: 'text-amber-300',
        tail: 'border-amber-500/25',
    },
    determined: {
        border: 'border-sky-500/20',
        bg: 'bg-sky-500/[0.04]',
        text: 'text-zinc-300',
        avatarBg: 'bg-gradient-to-br from-sky-500/30 to-blue-500/20',
        avatarBorder: 'border-sky-500/30',
        avatarText: 'text-sky-300',
        tail: 'border-sky-500/20',
    },
    reflective: {
        border: 'border-violet-500/20',
        bg: 'bg-violet-500/[0.04]',
        text: 'text-zinc-400',
        avatarBg: 'bg-gradient-to-br from-violet-500/30 to-purple-500/20',
        avatarBorder: 'border-violet-500/30',
        avatarText: 'text-violet-300',
        tail: 'border-violet-500/20',
    },
}

export default function NarratorBubble({
    text,
    align = 'left',
    delay = 0,
    mood = 'default',
}: NarratorBubbleProps) {
    const s = MOOD_STYLES[mood]

    const alignment = {
        left: 'justify-start',
        right: 'justify-end flex-row-reverse',
        center: 'justify-center',
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
                duration: 0.6,
                delay,
                ease,
            }}
            className={`flex items-end gap-3 ${alignment[align]}`}
        >
            {/* Avatar */}
            <motion.div
                initial={{ scale: 0, rotate: -15 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                    duration: 0.5,
                    delay: delay + 0.1,
                    ease,
                }}
                className="flex-shrink-0"
            >
                <div
                    className={`w-9 h-9 rounded-full ${s.avatarBg} border ${s.avatarBorder} flex items-center justify-center`}
                >
                    <span className={`text-[10px] font-bold ${s.avatarText} tracking-wide`}>
                        AH
                    </span>
                </div>
            </motion.div>

            {/* Speech bubble */}
            <motion.div
                initial={{ opacity: 0, x: align === 'right' ? 10 : -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                    duration: 0.4,
                    delay: delay + 0.2,
                    ease,
                }}
                className="relative max-w-sm"
            >
                {/* Tail */}
                <div
                    className={`absolute ${align === 'right' ? 'right-[-6px]' : 'left-[-6px]'
                        } bottom-3 w-3 h-3 rotate-45 border ${s.tail} ${s.bg} backdrop-blur-sm`}
                    style={{
                        borderTop: align === 'right' ? 'none' : undefined,
                        borderLeft: align === 'right' ? 'none' : undefined,
                        borderBottom: align !== 'right' ? 'none' : undefined,
                        borderRight: align !== 'right' ? 'none' : undefined,
                    }}
                />

                {/* Bubble content */}
                <div
                    className={`relative rounded-xl border ${s.border} ${s.bg} backdrop-blur-sm px-4 py-3`}
                >
                    <p className={`text-sm leading-relaxed ${s.text} italic`}>
                        {text}
                    </p>
                </div>
            </motion.div>
        </motion.div>
    )
}

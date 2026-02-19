'use client'

import { type ReactNode } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

interface PresenterBarProps {
    /** Plain narration string — used when no children are passed */
    narration?: string
    /** Rich JSX content inside the speech bubble — overrides narration */
    children?: ReactNode
    /** Optional delay before appearing */
    delay?: number
}

export default function PresenterBar({ narration, children, delay = 0 }: PresenterBarProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay, ease }}
            className="flex items-start gap-4 md:gap-5 mb-8 md:mb-10"
        >
            {/* Avatar — large, prominent */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: delay + 0.1, ease }}
                className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-2xl border border-white/[0.08] overflow-hidden shadow-lg shadow-black/20"
            >
                <Image
                    src="/images/presenter-avatar.png"
                    alt="Anuja"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                />
            </motion.div>

            {/* Speech bubble */}
            <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: delay + 0.15, ease }}
                className="relative flex-1 bg-white/[0.04] border border-white/[0.08] rounded-2xl rounded-tl-md px-5 py-4 md:px-6 md:py-5"
            >
                {/* Speech bubble pointer */}
                <div
                    className="absolute left-0 top-8 -translate-x-full w-0 h-0"
                    style={{
                        borderTop: '6px solid transparent',
                        borderBottom: '6px solid transparent',
                        borderRight: '6px solid rgba(255,255,255,0.08)',
                    }}
                />
                {children || (
                    <p className="text-sm md:text-[15px] text-zinc-300 leading-relaxed">
                        {narration}
                    </p>
                )}
            </motion.div>
        </motion.div>
    )
}

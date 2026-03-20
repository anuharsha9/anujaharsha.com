'use client'

import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

export default function FoundationBlock() {
    return (
        <section className="relative w-full py-24 md:py-32 overflow-hidden border-y border-white/[0.04] bg-transparent">
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent-teal)]/5 blur-[120px] rounded-full point-events-none" />
            
            <div className="relative max-w-4xl mx-auto px-4 md:px-8 lg:px-12 flex flex-col items-center text-center">
                    
                {/* ─── Philosophy & Foundations ─── */}
                <motion.div
                    initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 1.2, delay: 0.2, ease }}
                >
                    <blockquote className="relative flex flex-col items-center">
                        {/* Large decorative quote mark */}
                        <span className="absolute -top-12 text-7xl text-white/[0.04] font-serif leading-none select-none">
                            &ldquo;
                        </span>
                        <p className="relative z-10 font-serif italic text-2xl md:text-3xl lg:text-4xl text-zinc-400 leading-[1.6]">
                            When you look at a chair… the only thing that comes to mind is to sit on it.
                            It&apos;s the whole point of creating anything — to achieve that obviousness. No?
                        </p>
                        <p className="mt-8 font-serif italic text-2xl md:text-3xl lg:text-4xl text-zinc-300 leading-[1.6]">
                            How does one achieve that? <br className="hidden md:block" />
                            <span className="text-white font-medium drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                                By obsessing over how humans experience things.
                            </span>
                        </p>
                    </blockquote>
                </motion.div>

            </div>
        </section>
    )
}

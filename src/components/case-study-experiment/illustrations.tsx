'use client'

import React from 'react'
import { motion } from 'framer-motion'

/* ─────────────────────────────────────────────────────────────
   PEOPLE DOT GRID
   ~200 dots, 2 highlighted in teal = "nobody knew it"
   ───────────────────────────────────────────────────────────── */
export function PeopleDotGrid({ total = 200, highlighted = 2 }: { total?: number; highlighted?: number }) {
    const dots = Array.from({ length: total })
    // Place highlighted dots at random-ish but consistent positions
    const highlightedIndices = [Math.floor(total * 0.62), Math.floor(total * 0.89)]

    return (
        <div className="flex flex-wrap gap-[6px] max-w-[400px] mb-8">
            {dots.map((_, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.002 }}
                    className={`w-[8px] h-[8px] rounded-full ${highlightedIndices.includes(i)
                        ? 'bg-[var(--accent-teal)] shadow-[0_0_12px_var(--accent-teal)]'
                        : 'bg-white/10'
                        }`}
                />
            ))}
        </div>
    )
}

/* ─────────────────────────────────────────────────────────────
   AVATAR PAIR
   Two circles connected by a line = 1:1 meeting
   ───────────────────────────────────────────────────────────── */
export function AvatarPair({
    leftLabel,
    rightLabel = 'Me',
    leftIcon,
    className = '',
}: {
    leftLabel: string
    rightLabel?: string
    leftIcon?: React.ReactNode
    className?: string
}) {
    return (
        <div className={`flex items-center gap-6 mb-8 ${className}`}>
            {/* Left avatar */}
            <div className="flex flex-col items-center gap-3">
                <div className="w-20 h-20 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/50 relative overflow-hidden">
                    {leftIcon ? (
                        <div className="scale-150 relative z-10">{leftIcon}</div>
                    ) : (
                        <span className="text-lg font-mono tracking-widest relative z-10">{leftLabel.slice(0, 2).toUpperCase()}</span>
                    )}
                    {/* Ambient glow */}
                    <div className="absolute inset-0 bg-white/5 blur-xl rounded-full" />
                </div>
                <span className="text-xs text-zinc-500 font-mono uppercase tracking-widest">{leftLabel}</span>
            </div>

            {/* Connection line */}
            <div className="flex-1 max-w-[120px] h-[2px] bg-gradient-to-r from-white/10 via-white/20 to-white/10 relative mt-[-20px]">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--accent-teal)]/50 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                />
            </div>

            {/* Right avatar */}
            <div className="flex flex-col items-center gap-3">
                <div className="w-20 h-20 rounded-full border border-[var(--accent-teal)]/40 bg-[var(--accent-teal)]/5 flex items-center justify-center text-[var(--accent-teal)] shadow-[inset_0_0_20px_rgba(45,212,191,0.1)] relative overflow-hidden">
                    <span className="text-lg font-mono tracking-widest relative z-10">{rightLabel.slice(0, 2).toUpperCase()}</span>
                    <div className="absolute inset-0 bg-[var(--accent-teal)]/10 blur-xl rounded-full" />
                </div>
                <span className="text-xs text-zinc-500 font-mono uppercase tracking-widest shadow-sm">{rightLabel}</span>
            </div>
        </div>
    )
}

/* ─────────────────────────────────────────────────────────────
   SCREENSHOT STACK
   Overlapping rectangles = "hundreds of screenshots"
   ───────────────────────────────────────────────────────────── */
export function ScreenshotStack() {
    return (
        <div className="relative w-48 h-32 mb-8 mx-auto origin-top-left xl:-ml-4">
            {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20, rotate: 0 }}
                    whileInView={{ opacity: 1, x: 0, rotate: (i - 2) * 4 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
                    className="absolute border border-white/20 rounded-md bg-[#111111] shadow-2xl flex items-center justify-center backdrop-blur-sm"
                    style={{
                        width: `${160 - i * 8}px`,
                        height: `${110 - i * 6}px`,
                        left: `${i * 12}px`,
                        top: `${i * 8}px`,
                        zIndex: 5 - i,
                    }}
                >
                    <div className="w-[80%] h-[2px] bg-white/10 absolute top-3 left-3 rounded-full" />
                    <div className="w-[60%] h-[2px] bg-white/5 absolute top-5 left-3 rounded-full" />
                </motion.div>
            ))}
        </div>
    )
}

/* ─────────────────────────────────────────────────────────────
   FLOW DIAGRAM
   ◎ → ◎ → ◎ → ✓  = research → decision → shipped
   ───────────────────────────────────────────────────────────── */
export function FlowDiagram({
    steps,
    className = '',
}: {
    steps: string[]
    className?: string
}) {
    return (
        <div className={`flex flex-wrap items-center gap-3 mb-8 ${className}`}>
            {steps.map((step, i) => (
                <React.Fragment key={i}>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.2 }}
                        className={`flex flex-col items-center gap-2 ${i === steps.length - 1 ? 'text-[var(--accent-teal)]' : 'text-zinc-500'}`}
                    >
                        <div className={`w-12 h-12 rounded-full border flex items-center justify-center text-lg font-mono relative ${i === steps.length - 1
                            ? 'border-[var(--accent-teal)] bg-[var(--accent-teal)]/10 text-[var(--accent-teal)] shadow-[0_0_20px_rgba(45,212,191,0.2)]'
                            : 'border-white/20 bg-white/5 text-white/50'
                            }`}>
                            {i === steps.length - 1 ? '✓' : '○'}
                        </div>
                        <span className="text-[10px] uppercase font-mono tracking-widest whitespace-nowrap">{step}</span>
                    </motion.div>
                    {i < steps.length - 1 && (
                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.2 + 0.1 }}
                            className="w-8 md:w-12 h-[2px] bg-gradient-to-r from-white/10 to-white/30 origin-left mb-6"
                        />
                    )}
                </React.Fragment>
            ))}
        </div>
    )
}

/* ─────────────────────────────────────────────────────────────
   SCATTER TO CONVERGE
   5 dots scattered → animate to 1 center = 5→1 consolidation
   ───────────────────────────────────────────────────────────── */
export function ScatterConverge() {
    // 5 nodes structured in a semi-circle/orbit pattern
    const nodes = [
        { label: "SYS_1", x: "15%", y: "25%", delay: 0 },
        { label: "SYS_2", x: "85%", y: "25%", delay: 0.1 },
        { label: "SYS_3", x: "10%", y: "75%", delay: 0.2 },
        { label: "SYS_4", x: "90%", y: "75%", delay: 0.3 },
        { label: "SYS_5", x: "50%", y: "15%", delay: 0.4 },
    ]

    return (
        <div className="relative w-full max-w-4xl mx-auto h-[400px] border border-[var(--accent-teal)]/10 rounded-3xl bg-[#0a0f0f] overflow-hidden flex items-center justify-center shadow-[inset_0_0_100px_rgba(45,212,191,0.03)]">

            {/* Background grid texture just for this box */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h40v40H0z\' fill=\'none\'/%3E%3Cpath d=\'M40 0h-1v40h1V0zm0 40v-1h-40v1h40z\' fill=\'rgba(255,255,255,0.5)\'/%3E%3C/svg%3E")', WebkitMaskImage: 'radial-gradient(ellipse at center, white 20%, transparent 80%)' }} />

            {/* Connecting Data Lines - Marching Ants */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {nodes.map((node, i) => (
                    <motion.line
                        key={`line-bg-${i}`}
                        x1={node.x} y1={node.y} x2="50%" y2="50%"
                        stroke="currentColor"
                        className="text-[var(--accent-teal)]/[0.15]"
                        strokeWidth="1.5"
                    />
                ))}

                {nodes.map((node, i) => (
                    <motion.line
                        key={`data-${i}`}
                        x1={node.x} y1={node.y} x2="50%" y2="50%"
                        stroke="currentColor"
                        className="text-[var(--accent-teal)]"
                        strokeWidth="2"
                        strokeDasharray="4 12"
                        initial={{ opacity: 0, strokeDashoffset: 100 }}
                        whileInView={{ opacity: 1 }}
                        animate={{ strokeDashoffset: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{
                            opacity: { duration: 1, delay: node.delay },
                            strokeDashoffset: { repeat: Infinity, duration: 1.5, ease: "linear" }
                        }}
                    />
                ))}
            </svg>

            {/* The 5 scattered nodes */}
            {nodes.map((node, i) => (
                <motion.div
                    key={`node-${i}`}
                    className="absolute w-12 h-12 rounded-full border border-[var(--accent-teal)]/30 bg-[#0a0a0a] flex items-center justify-center shadow-[0_0_15px_rgba(45,212,191,0.2)] z-10"
                    initial={{ left: node.x, top: node.y, scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{
                        duration: 1,
                        delay: node.delay,
                        ease: "easeOut"
                    }}
                    style={{ translateX: "-50%", translateY: "-50%" }}
                >
                    <motion.div
                        className="w-4 h-4 rounded-full bg-[var(--accent-teal)]/60 blur-[2px]"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 2, delay: node.delay, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <span className="absolute -top-6 text-[10px] font-mono text-white/80 tracking-widest bg-black/80 px-2 py-0.5 rounded border border-white/10">{node.label}</span>
                </motion.div>
            ))}

            {/* The Center Hub */}
            <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-20"
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                    duration: 1,
                    delay: 0.8,
                    ease: "easeOut"
                }}
            >
                {/* Breathing Aura */}
                <motion.div
                    className="absolute inset-0 bg-[var(--accent-teal)] rounded-full blur-[40px] mix-blend-screen"
                    animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.9, 1.2, 0.9] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Core Hub */}
                <div className="w-32 h-32 rounded-full border-2 border-[var(--accent-teal)]/80 bg-black/90 backdrop-blur-xl flex items-center justify-center relative shadow-[0_0_50px_rgba(45,212,191,0.5)] z-10">
                    {/* Inner Rotating Ring */}
                    <motion.div
                        className="absolute inset-1 rounded-full border-t-2 border-r-2 border-[var(--accent-teal)] opacity-60"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Outer Dashed Orbit */}
                    <motion.div
                        className="absolute inset-[-12px] rounded-full border border-[var(--accent-teal)]/40 border-dashed"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />

                    {/* Text Label */}
                    <div className="flex flex-col items-center justify-center pt-1">
                        <span className="text-[var(--accent-teal)] text-4xl font-light leading-none drop-shadow-[0_0_15px_rgba(45,212,191,1)]">1</span>
                        <span className="text-[10px] font-mono tracking-[0.3em] text-white/90 mt-1 pl-1">HUB</span>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

/* ─────────────────────────────────────────────────────────────
   REJECTION MARK
   Large subtle X = rejected version
   ───────────────────────────────────────────────────────────── */
export function RejectionMark() {
    return (
        <motion.div
            initial={{ opacity: 0, rotate: -20, scale: 0.5 }}
            whileInView={{ opacity: 1, rotate: -6, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, type: 'spring', bounce: 0.4 }}
            className="text-red-500/30 text-[120px] leading-none font-light my-6 select-none pl-4"
            style={{ textShadow: '0 0 40px rgba(239, 68, 68, 0.2)' }}
        >
            ✕
        </motion.div>
    )
}

/* ─────────────────────────────────────────────────────────────
   PLUS ICON TREE
   + icon branching to 3 workflow labels = V3 breakthrough
   ───────────────────────────────────────────────────────────── */
export function PlusIconTree({
    branches,
}: {
    branches: string[]
}) {
    return (
        <div className="flex flex-col items-center py-16">
            {/* Plus icon */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, type: 'spring' }}
                className="w-24 h-24 rounded-2xl border border-[var(--accent-teal)]/40 bg-[var(--accent-teal)]/10 flex items-center justify-center mb-6 relative shadow-[0_0_30px_rgba(45,212,191,0.15)]"
            >
                <span className="text-[var(--accent-teal)] text-5xl font-light mb-1 relative z-10">+</span>
                {/* Pulse ring */}
                <motion.div
                    className="absolute inset-[-1px] rounded-2xl border border-[var(--accent-teal)]/30"
                    animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
            </motion.div>

            {/* Vertical line */}
            <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="w-[2px] h-12 bg-gradient-to-b from-[var(--accent-teal)]/50 to-white/20 origin-top"
            />

            {/* Horizontal line for branches */}
            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1 }}
                className="h-[2px] w-full max-w-sm bg-white/20"
            />

            {/* Branches */}
            <div className="flex items-start justify-between w-full max-w-sm px-4">
                {branches.map((label, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 1.2 + i * 0.15 }}
                        className="flex flex-col items-center gap-3"
                    >
                        <div className="w-[2px] h-6 bg-white/20" />
                        <span className="text-[11px] font-mono text-white/70 text-center uppercase tracking-widest leading-relaxed max-w-[100px]">{label}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

/* ─────────────────────────────────────────────────────────────
   NETWORK PROPAGATION
   Visually pleasing node network to show onboarding spread
   ───────────────────────────────────────────────────────────── */
export function NetworkPropagation({ center, members, highlighted = false }: { center: string, members: string[], highlighted?: boolean }) {
    return (
        <div className="flex flex-col items-center justify-center my-8 h-40 relative">
            {/* The Center Node */}
            <motion.div
                className={`w-14 h-14 rounded-full flex items-center justify-center border z-10 
                    ${highlighted ? 'border-[var(--accent-teal)] bg-[var(--accent-teal)]/20 shadow-[0_0_30px_rgba(45,212,191,0.2)]' : 'border-white/20 bg-white/5'}`}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, type: 'spring' }}
            >
                <span className={`font-mono text-xs ${highlighted ? 'text-[var(--accent-teal)]' : 'text-zinc-300'}`}>{center}</span>
            </motion.div>

            {/* Orbiting / Satellite Nodes */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                {members.map((member, i) => {
                    // Distribute evenly in a semi-circle or full circle
                    // We'll use a simple fan-out pattern below center
                    const angle = Math.PI * (0.8 + (i / max(1, members.length - 1)) * 1.4); // Angle from bottom left to bottom right
                    const radius = 60 + (members.length > 2 ? Math.random() * 20 : 0);
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius + 20;

                    return (
                        <motion.div
                            key={i}
                            className="absolute"
                            initial={{ x: 0, y: 0, opacity: 0 }}
                            whileInView={{ x, y, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 + (i * 0.1), ease: "easeOut" }}
                        >
                            {/* Target Node */}
                            <div className="w-10 h-10 rounded-full border border-white/10 bg-[#111] flex items-center justify-center shadow-lg relative">
                                <span className="font-mono text-[9px] text-zinc-500 uppercase">{member}</span>
                                {/* Connection Line (animated SVG line would be complex here, so we use a simple gradient tail) */}
                                <motion.div
                                    className="absolute top-1/2 left-1/2 w-[2px] bg-gradient-to-t from-[var(--accent-teal)]/40 to-transparent origin-top"
                                    style={{ height: `${radius}px`, rotate: `${(angle * 180 / Math.PI) - 90}deg`, y: "-50%", x: "-50%" }}
                                    initial={{ scaleY: 0 }}
                                    whileInView={{ scaleY: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.2 + (i * 0.1) }}
                                />
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

// Helper to avoid math errors in division
function max(a: number, b: number) { return a > b ? a : b; }

/* ─────────────────────────────────────────────────────────────
   KNOWLEDGE TRANSFER
   Sleek horizontal knowledge handoff
   ───────────────────────────────────────────────────────────── */
export function KnowledgeTransfer() {
    return (
        <div className="flex items-center justify-center gap-4 my-8 h-20 w-full relative">
            <motion.div
                className="w-14 h-14 rounded-full border border-[var(--accent-teal)] bg-[var(--accent-teal)]/20 flex items-center justify-center shadow-[0_0_20px_rgba(45,212,191,0.2)] z-10"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
            >
                <span className="font-mono text-xs text-[var(--accent-teal)]">Me</span>
            </motion.div>

            {/* Moving Pulses */}
            <div className="flex-1 max-w-[100px] h-[2px] bg-white/10 relative overflow-hidden">
                <motion.div
                    className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-[var(--accent-teal)] to-transparent"
                    animate={{ x: ["-100%", "300%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
            </div>

            <motion.div
                className="w-14 h-14 rounded-full border border-white/20 bg-white/5 flex items-center justify-center z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
            >
                <span className="font-mono text-xs text-zinc-300">Jr</span>
            </motion.div>

            <div className="flex-1 max-w-[100px] h-[2px] bg-white/10 relative overflow-hidden">
                <motion.div
                    className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{ x: ["-100%", "300%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.75 }}
                />
            </div>

            <div className="flex flex-col gap-2 relative z-10">
                <motion.div
                    className="w-10 h-10 rounded-full border border-white/10 bg-[#111] flex items-center justify-center"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                >
                    <span className="font-mono text-[9px] text-zinc-500">D1</span>
                </motion.div>
                <motion.div
                    className="w-10 h-10 rounded-full border border-white/10 bg-[#111] flex items-center justify-center"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                >
                    <span className="font-mono text-[9px] text-zinc-500">D2</span>
                </motion.div>
            </div>
        </div>
    )
}

/* ─────────────────────────────────────────────────────────────
   IMPACT CLIMAX
   Visually impressive, large metrics component.
   ───────────────────────────────────────────────────────────── */
export function ImpactClimax() {
    const metrics = [
        { label: "Schedule Creation", before: "4 Clicks", after: "1 Click" },
        { label: "Explorer Access", before: "3 Clicks", after: "1 Click" },
        { label: "Admin Workflow", before: "3 Clicks", after: "2 Clicks" },
        { label: "Browser Tabs", before: "Multiple", after: "0 Tabs" },
    ];

    return (
        <div className="w-full flex justify-center py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full max-w-5xl">
                {metrics.map((m, i) => (
                    <motion.div
                        key={i}
                        className="flex flex-col items-center justify-center p-6 rounded-2xl bg-black/40 border border-[var(--accent-teal)]/10 relative overflow-hidden group"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                    >
                        {/* Dramatic Hover Background */}
                        <div className="absolute inset-0 bg-[var(--accent-teal)]/0 group-hover:bg-[var(--accent-teal)]/5 transition-colors duration-500" />

                        {/* Shimmer line */}
                        <motion.div
                            className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-teal)]/50 to-transparent opacity-0 group-hover:opacity-100"
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />

                        <span className="text-white/40 font-mono text-[10px] uppercase tracking-widest mb-4 block text-center h-8 flex items-center justify-center">{m.label}</span>

                        <div className="flex flex-col items-center">
                            <span className="text-zinc-500 text-sm font-medium line-through decoration-zinc-600/50 mb-1">{m.before}</span>
                            <span className="text-[var(--accent-teal)] text-3xl md:text-5xl font-extrabold tracking-tight drop-shadow-[0_0_15px_rgba(45,212,191,0.3)]">{m.after}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

/* ─────────────────────────────────────────────────────────────
   VIDEO GRID
   2×3 grid of avatar squares = virtual user group / Zoom
   ───────────────────────────────────────────────────────────── */
export function VideoGrid({ highlightIndex = 5 }: { highlightIndex?: number }) {
    return (
        <div className="grid grid-cols-3 gap-3 w-64 md:w-80 mb-8 max-w-full">
            {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className={`aspect-square rounded-xl border flex items-center justify-center overflow-hidden relative ${i === highlightIndex
                        ? 'border-[var(--accent-teal)]/40 bg-[var(--accent-teal)]/10 shadow-[0_0_20px_rgba(45,212,191,0.15)]'
                        : 'border-white/10 bg-white/5'
                        }`}
                >
                    {/* Fake webcam UI */}
                    <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-red-500/50 shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
                    <div className="absolute bottom-3 left-3 text-[9px] font-mono uppercase tracking-widest text-white/40">User_{i + 1}</div>

                    {/* Avatar inner */}
                    <div className={`w-8 h-8 rounded-full ${i === highlightIndex ? 'bg-[var(--accent-teal)]/60' : 'bg-white/20'}`} />
                </motion.div>
            ))}
        </div>
    )
}

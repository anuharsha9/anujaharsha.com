'use client'

import { motion } from 'framer-motion'
import ComponentHeading from '@/components/ui/ComponentHeading'

interface StakeholderOrbitProps {
    isLightBackground?: boolean
}

const stakeholders = [
    {
        id: 'pm',
        role: 'PM',
        name: 'Product Manager',
        ringIndex: 0,
        angle: 0,
        color: '#6366f1',
        bgColor: 'bg-indigo-50',
        borderColor: 'border-indigo-200',
        textColor: 'text-indigo-600',
    },
    {
        id: 'eng-dir',
        role: 'Eng Dir',
        name: 'Dir. of Engineering',
        ringIndex: 1,
        angle: 60,
        color: '#f59e0b',
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-200',
        textColor: 'text-amber-600',
    },
    {
        id: 'data-sci',
        role: 'Data Sci',
        name: 'Principal Data Scientist',
        ringIndex: 1,
        angle: 180,
        color: '#10b981',
        bgColor: 'bg-emerald-50',
        borderColor: 'border-emerald-200',
        textColor: 'text-emerald-600',
    },
    {
        id: 'architect',
        role: 'Architect',
        name: 'Lead Architect (20+ yrs)',
        ringIndex: 0,
        angle: 120,
        color: '#ef4444',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        textColor: 'text-red-600',
    },
    {
        id: 'qa-dir',
        role: 'QA Dir',
        name: 'Director of QA',
        ringIndex: 1,
        angle: 300,
        color: '#8b5cf6',
        bgColor: 'bg-violet-50',
        borderColor: 'border-violet-200',
        textColor: 'text-violet-600',
    },
    {
        id: 'design-dir',
        role: 'Design Dir',
        name: 'Director of Design',
        ringIndex: 0,
        angle: 240,
        color: '#ec4899',
        bgColor: 'bg-pink-50',
        borderColor: 'border-pink-200',
        textColor: 'text-pink-600',
    },
]

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.3,
        },
    },
}

const ringVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
}

const nodeVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { type: 'spring', stiffness: 200, damping: 20 },
    },
}

const pulseVariants = {
    animate: {
        scale: [1, 1.15, 1],
        opacity: [0.6, 0.3, 0.6],
        transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
    },
}

const lineDrawVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
        pathLength: 1,
        opacity: 0.4,
        transition: { duration: 1.2, ease: 'easeInOut' },
    },
}

export default function StakeholderOrbit({ isLightBackground = true }: StakeholderOrbitProps) {
    const centerX = 200
    const centerY = 200
    const innerRing = 100
    const outerRing = 155

    const getPosition = (angle: number, ringIndex: number) => {
        const radius = ringIndex === 0 ? innerRing : outerRing
        const rad = (angle * Math.PI) / 180
        return {
            x: centerX + radius * Math.cos(rad),
            y: centerY + radius * Math.sin(rad),
        }
    }

    return (
        <div className="w-full py-12 md:py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                <ComponentHeading
                    variant="block"
                    tag="// CROSS_FUNCTIONAL"
                    title="Driving Alignment Across the Organization"
                    description="I wasn't just the designer in the room — I was driving the conversation."
                    color="teal"
                    align="center"
                    className="mb-12"
                />

                <motion.div
                    className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {/* Orbital Diagram */}
                    <motion.div
                        className="relative w-[400px] h-[400px] flex-shrink-0"
                        variants={ringVariants}
                    >
                        <svg
                            viewBox="0 0 400 400"
                            className="w-full h-full"
                            fill="none"
                        >
                            {/* Orbit Rings */}
                            <motion.circle
                                cx={centerX} cy={centerY} r={innerRing}
                                stroke="#e2e8f0"
                                strokeWidth="1"
                                strokeDasharray="4 4"
                                variants={ringVariants}
                            />
                            <motion.circle
                                cx={centerX} cy={centerY} r={outerRing}
                                stroke="#e2e8f0"
                                strokeWidth="1"
                                strokeDasharray="4 4"
                                variants={ringVariants}
                            />

                            {/* Connection Lines from each stakeholder to center */}
                            {stakeholders.map((s) => {
                                const pos = getPosition(s.angle, s.ringIndex)
                                return (
                                    <motion.line
                                        key={`line-${s.id}`}
                                        x1={centerX}
                                        y1={centerY}
                                        x2={pos.x}
                                        y2={pos.y}
                                        stroke={s.color}
                                        strokeWidth="1"
                                        strokeDasharray="3 3"
                                        variants={lineDrawVariants}
                                    />
                                )
                            })}
                        </svg>

                        {/* Center Node - "You" */}
                        <motion.div
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                            variants={nodeVariants}
                        >
                            {/* Pulse Ring */}
                            <motion.div
                                className="absolute inset-0 rounded-full bg-[var(--accent-teal)]/20"
                                style={{ margin: '-8px' }}
                                variants={pulseVariants}
                                animate="animate"
                            />
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--accent-teal)] to-cyan-500 flex items-center justify-center shadow-lg shadow-[var(--accent-teal)]/30 border-2 border-white">
                                <div className="text-white text-center">
                                    <div className="text-[8px] font-medium opacity-80 leading-none">Lead</div>
                                    <div className="text-xs font-bold leading-tight">UX</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Stakeholder Nodes */}
                        {stakeholders.map((s) => {
                            const pos = getPosition(s.angle, s.ringIndex)
                            // Convert SVG coords to % for positioning
                            const leftPct = (pos.x / 400) * 100
                            const topPct = (pos.y / 400) * 100

                            return (
                                <motion.div
                                    key={s.id}
                                    className="absolute z-10 group"
                                    style={{
                                        left: `${leftPct}%`,
                                        top: `${topPct}%`,
                                        transform: 'translate(-50%, -50%)',
                                    }}
                                    variants={nodeVariants}
                                >
                                    {/* Node Circle */}
                                    <div className={`w-12 h-12 rounded-full ${s.bgColor} border-2 ${s.borderColor} flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110`}>
                                        <span className={`text-[10px] font-bold ${s.textColor}`}>{s.role}</span>
                                    </div>
                                    {/* Name Tooltip on Hover */}
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                        <span className="text-[9px] bg-slate-900 text-white px-2 py-1 rounded font-medium">
                                            {s.name}
                                        </span>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </motion.div>

                    {/* Context Panel */}
                    <motion.div
                        className="flex-1 space-y-6 max-w-md"
                        variants={containerVariants}
                    >
                        {/* Key Insight */}
                        <motion.div
                            className="bg-slate-50 rounded-xl p-5 border border-slate-100"
                            variants={nodeVariants}
                        >
                            <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-slate-400 mb-2">// The defining meeting</div>
                            <p className="text-sm text-slate-700 leading-relaxed">
                                Director of Engineering, Principal Data Scientist, Head PM, Lead Architect, Director of QA — all across the table.
                                <span className="text-[var(--accent-teal)] font-medium"> I was 2 years in. Everyone else had decades.</span>
                            </p>
                        </motion.div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { label: 'Teams aligned', value: '4+', icon: '🔗' },
                                { label: 'Veteran architects', value: '20-35yr', icon: '🏛️' },
                                { label: 'Timezone span', value: 'US→India', icon: '🌍' },
                                { label: 'Design leadership', value: 'Trusted', icon: '✅' },
                            ].map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    className="bg-white rounded-lg p-3 border border-slate-100 text-center"
                                    variants={nodeVariants}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <div className="text-lg mb-0.5">{stat.icon}</div>
                                    <div className="text-lg font-bold text-slate-900">{stat.value}</div>
                                    <div className="text-[10px] text-slate-500 uppercase tracking-wider">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Quote */}
                        <motion.div
                            className="border-l-2 border-[var(--accent-teal)] pl-4 py-1"
                            variants={nodeVariants}
                        >
                            <p className="text-sm text-slate-600 italic leading-relaxed">
                                &ldquo;The engineers later told me they missed the rapport and the design partnership we&apos;d built together.&rdquo;
                            </p>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

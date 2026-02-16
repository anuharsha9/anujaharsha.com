'use client'

import { motion } from 'framer-motion'
import ComponentHeading from '@/components/ui/ComponentHeading'

interface RecurrenceDesignDetailProps {
    isLightBackground?: boolean
}

const recurrenceExamples = [
    {
        pattern: 'Every weekday',
        natural: 'Runs Monday through Friday',
        raw: 'FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR',
    },
    {
        pattern: 'First Monday of every month',
        natural: 'Runs on the first Monday, monthly',
        raw: 'FREQ=MONTHLY;BYDAY=MO;BYSETPOS=1',
    },
    {
        pattern: 'Every 30 minutes during business hours',
        natural: 'Runs every 30 min, 8 AM–6 PM',
        raw: 'FREQ=MINUTELY;INTERVAL=30;BYHOUR=8-18',
    },
    {
        pattern: 'Last business day of each quarter',
        natural: 'Runs on the last weekday of Mar, Jun, Sep, Dec',
        raw: 'FREQ=MONTHLY;BYMONTH=3,6,9,12;BYDAY=MO,TU,WE,TH,FR;BYSETPOS=-1',
    },
]

export default function RecurrenceDesignDetail({ isLightBackground = true }: RecurrenceDesignDetailProps) {
    return (
        <div className="space-y-8">
            <ComponentHeading
                variant="block"
                tag="DESIGN CRAFT"
                title="Natural Language Recurrence"
                description="Enterprise reporting is governed by time-based recurrence rules — syntax inherited from cron jobs. Users don't speak cron. I translated scheduling intent into readable summaries that humans actually understand."
                color="amber"
            />

            {/* The Before/After Comparison */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                    hidden: {},
                    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
                }}
            >
                {/* BEFORE: Raw Data */}
                <motion.div
                    className="rounded-xl border border-red-100/80 bg-red-50/30 p-5 space-y-4"
                    variants={{
                        hidden: { opacity: 0, x: -16, filter: 'blur(4px)' },
                        visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                    }}
                >
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-red-400" />
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-red-400">Before: Raw Recurrence Rules</span>
                    </div>
                    {recurrenceExamples.map((ex, i) => (
                        <div key={i} className="font-mono text-xs text-red-600/80 bg-red-100/50 rounded-md px-3 py-2 break-all leading-relaxed">
                            {ex.raw}
                        </div>
                    ))}
                    <p className="text-xs text-red-400/80 italic pt-1">
                        Users had to decipher these rules, or worse — set them using dropdown grids.
                    </p>
                </motion.div>

                {/* AFTER: Natural Language */}
                <motion.div
                    className="rounded-xl border border-emerald-100/80 bg-emerald-50/30 p-5 space-y-4"
                    variants={{
                        hidden: { opacity: 0, x: 16, filter: 'blur(4px)' },
                        visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
                    }}
                >
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-emerald-500">After: Natural Language Summaries</span>
                    </div>
                    {recurrenceExamples.map((ex, i) => (
                        <div key={i} className="bg-white rounded-md px-3 py-2.5 border border-emerald-100 shadow-sm">
                            <div className="text-sm font-medium text-slate-800">{ex.pattern}</div>
                            <div className="text-xs text-emerald-600 mt-0.5">{ex.natural}</div>
                        </div>
                    ))}
                    <p className="text-xs text-emerald-600/80 italic pt-1">
                        Dynamic summary updates in real-time as users modify schedule parameters.
                    </p>
                </motion.div>
            </motion.div>

            {/* Design Insight Callout */}
            <motion.div
                className="relative rounded-xl overflow-hidden"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-50 to-amber-100/50 rounded-xl" />
                <div className="relative px-6 py-5 flex flex-col md:flex-row md:items-center gap-4">
                    <div className="text-3xl" aria-hidden="true">💡</div>
                    <div className="flex-1 space-y-1.5">
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-amber-600">Why this matters</span>
                        <p className="text-sm text-amber-900/80 leading-relaxed">
                            This wasn&apos;t just UI polish — it was a <strong>trust mechanism</strong>. When a user schedules a report that will
                            run 20,000 times per week, they need to <em>read</em> the recurrence rule, not <em>decode</em> it.
                            Misconfigurations at this scale create data avalanches that cost real money.
                        </p>
                    </div>
                    <div className="shrink-0 flex flex-col items-center gap-1 px-4 py-2 rounded-lg bg-amber-100/60 border border-amber-200/50">
                        <span className="text-2xl font-bold text-amber-700">20M+</span>
                        <span className="text-[9px] font-bold tracking-[0.15em] uppercase text-amber-500">Weekly Jobs</span>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

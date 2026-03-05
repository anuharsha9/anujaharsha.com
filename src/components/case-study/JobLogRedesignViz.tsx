'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import PresenterBar from './storyboard/PresenterBar'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

/* ── Pill badge ── */
const Pill = ({ children, color = 'rose' }: { children: React.ReactNode; color?: string }) => (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium
        ${color === 'rose' ? 'text-rose-400 bg-rose-500/10 ring-1 ring-rose-500/20' : 'text-emerald-400 bg-emerald-500/10 ring-1 ring-emerald-500/20'}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${color === 'rose' ? 'bg-rose-400' : 'bg-emerald-400'}`} />
        {children}
    </span>
)

/* ═══════════════════════════════════════════════════ */
export default function JobLogRedesignViz() {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, amount: 0.3 })
    const [phase, setPhase] = useState(-1)
    const timers = useRef<NodeJS.Timeout[]>([])

    const clear = useCallback(() => { timers.current.forEach(clearTimeout); timers.current = [] }, [])

    const startVisuals = useCallback(() => {
        // Phase 1: Show Path 1
        timers.current.push(setTimeout(() => setPhase(1), 400))
        // Phase 2: Path 1 problems
        timers.current.push(setTimeout(() => setPhase(2), 4000))
        // Phase 3: Transition → show Path 2
        timers.current.push(setTimeout(() => setPhase(3), 6500))
        // Phase 4: Path 2 problems
        timers.current.push(setTimeout(() => setPhase(4), 9500))
        // Phase 5: Both paths struck through
        timers.current.push(setTimeout(() => setPhase(5), 12000))
        // Phase 6: Transition → show After
        timers.current.push(setTimeout(() => setPhase(6), 14500))
        // Phase 7: Show table
        timers.current.push(setTimeout(() => setPhase(7), 16000))
        // Phase 8: Show modal overlay
        timers.current.push(setTimeout(() => setPhase(8), 19500))
        // Phase 9: Solution badges
        timers.current.push(setTimeout(() => setPhase(9), 22500))
    }, [])

    useEffect(() => {
        if (isInView) {
            timers.current.push(setTimeout(() => setPhase(0), 400))
        } else {
            clear()
            setPhase(-1)
        }
        return clear
    }, [isInView, clear])

    const showPath1 = phase >= 1 && phase < 3   // Path 1 visible only during phases 1-2
    const showPath1Problems = phase >= 2
    const showPath2 = phase >= 3 && phase < 6   // Path 2 visible only during phases 3-5
    const showPath2Problems = phase >= 4
    const showBothBroken = phase >= 5
    const showAfter = phase >= 6
    const showTable = phase >= 7
    const showModal = phase >= 8
    const showBadges = phase >= 9

    return (
        <div ref={ref} className="relative w-full max-w-4xl mx-auto">
            <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/80 backdrop-blur-sm overflow-hidden">
                <div className="px-6 md:px-10 py-8 md:py-12">

                    {/* ── Presenter narration ── */}
                    <AnimatePresence>
                        {phase >= 0 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
                                <PresenterBar onTypingComplete={startVisuals}>
                                    <p className="text-base md:text-lg text-zinc-400 leading-relaxed">
                                        Users had <span className="text-zinc-200 font-medium">two completely separate paths</span> to view job logs — both broken in different ways.
                                    </p>
                                    <p className="text-base md:text-lg text-white font-bold mt-3 tracking-tight">
                                        I unified them into one contextual experience. 🪵
                                    </p>
                                </PresenterBar>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* ════════════ BEFORE SECTION — paths swap in same space ════════════ */}
                    <AnimatePresence mode="wait">
                        {/* ── PATH 1 ── */}
                        {showPath1 && (
                            <motion.div
                                key="path1"
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: -30, filter: 'blur(4px)' }}
                                transition={{ duration: 0.5, ease }}
                                className="relative mb-4"
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <Pill color="rose">Path 1 — Right-click from Asset Explorer</Pill>
                                </div>

                                {/* Zoomed-in flow: Grid → Context Menu → Filter → New Tab */}
                                <div className="rounded-xl border border-white/[0.06] bg-zinc-900/50 overflow-hidden">
                                    <div className="px-4 py-2.5 border-b border-white/[0.04] text-[11px] font-mono text-zinc-400">
                                        Workspaces — Asset Grid
                                    </div>
                                    <div className="p-4">
                                        {/* Step 1: Grid + context menu */}
                                        <div className="flex gap-4 items-start">
                                            <motion.div
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.2, duration: 0.4, ease }}
                                                className="flex gap-2 flex-wrap"
                                            >
                                                {['Q1 Report', 'Sales Dash', 'Weekly KPI'].map((n) => (
                                                    <div key={n} className="w-20 h-14 rounded-lg border border-white/[0.06] bg-zinc-800/50 flex flex-col items-center justify-center gap-1">
                                                        <span className="text-sm">📊</span>
                                                        <span className="text-[11px] text-zinc-400 font-mono">{n}</span>
                                                    </div>
                                                ))}
                                                <div className="w-20 h-14 rounded-lg border border-blue-500/30 bg-blue-500/5 flex flex-col items-center justify-center gap-1 ring-1 ring-blue-500/20">
                                                    <span className="text-sm">📅</span>
                                                    <span className="text-[11px] text-blue-400 font-medium font-mono">Test Sched</span>
                                                </div>
                                            </motion.div>

                                            {/* Context menu */}
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.5, duration: 0.3, ease }}
                                                className="rounded-lg border border-white/[0.08] bg-zinc-800 shadow-xl min-w-[140px]"
                                            >
                                                {['✏️ Edit', '▶ Run', '📋 View log', '— Disable'].map((item, i) => (
                                                    <div key={item} className={`px-3 py-1.5 text-[11px] font-mono ${i === 2 ? 'bg-blue-600/20 text-yellow-400 font-medium' : 'text-zinc-400'}`}>
                                                        {item}
                                                    </div>
                                                ))}
                                            </motion.div>
                                        </div>

                                        {/* Step 2: Filter popup → new tab */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 1.2, duration: 0.4, ease }}
                                            className="mt-4 flex items-center gap-3"
                                        >
                                            <span className="text-zinc-400 text-xs">→</span>
                                            <div className="rounded-lg border border-white/[0.06] bg-zinc-800/60 p-3 flex-1">
                                                <div className="text-[11px] font-mono text-zinc-400 mb-2">Schedule Log Options</div>
                                                <div className="flex gap-3 text-[11px] font-mono text-zinc-400 mb-2">
                                                    <span className="text-blue-400">◉ Last Executed</span>
                                                    <span>○ Dates</span>
                                                </div>
                                                <div className="flex gap-2">
                                                    <div className="flex-1 h-6 rounded bg-zinc-700/50 border border-white/[0.06] px-2 text-[11px] text-zinc-400 leading-6 font-mono">Sep 6, 2022</div>
                                                    <div className="flex-1 h-6 rounded bg-zinc-700/50 border border-white/[0.06] px-2 text-[11px] text-zinc-400 leading-6 font-mono">12:00 PM</div>
                                                </div>
                                                <div className="flex gap-2 justify-end mt-2">
                                                    <span className="px-3 py-1 rounded text-[11px] text-zinc-400 border border-white/[0.08] font-mono">Cancel</span>
                                                    <span className="px-3 py-1 rounded text-[11px] text-white bg-blue-600 font-mono">OK</span>
                                                </div>
                                            </div>

                                            <span className="text-zinc-400 text-xs">→</span>

                                            <div className="rounded-lg border border-rose-500/20 bg-zinc-800/60 p-3 flex-1">
                                                <div className="text-[11px] font-mono text-rose-400 mb-1 flex items-center gap-1">↗ Opens in new browser tab</div>
                                                <div className="text-[11px] font-mono text-zinc-400 mt-2 space-y-0.5 leading-relaxed">
                                                    <div>Connecting to server EDASERVE...</div>
                                                    <div>Executing focexec...</div>
                                                    <div className="text-rose-400">Error: Could not connect...</div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Path 1 problems */}
                                <AnimatePresence>
                                    {showPath1Problems && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, ease }}
                                            className="flex flex-wrap gap-2 mt-3"
                                        >
                                            {['4 clicks to view a log', 'Opens in new browser tab', 'Loses all context'].map((t, i) => (
                                                <motion.span key={t} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: i * 0.12, type: 'spring', stiffness: 400, damping: 15 }}
                                                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-500/8 border border-rose-500/15 text-[11px] font-mono text-rose-400">
                                                    ⚠ {t}
                                                </motion.span>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )}

                        {/* ── PATH 2 ── */}
                        {showPath2 && !showBothBroken && (
                            <motion.div
                                key="path2"
                                initial={{ opacity: 0, x: 30, filter: 'blur(4px)' }}
                                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, x: -30, filter: 'blur(4px)' }}
                                transition={{ duration: 0.5, ease }}
                                className="relative mb-4"
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    <Pill color="rose">Path 2 — Inside Scheduler (Log Reports tab)</Pill>
                                </div>

                                <div className="rounded-xl border border-white/[0.06] bg-zinc-900/50 overflow-hidden">
                                    {/* Ribbon tabs */}
                                    <div className="px-3 py-2 border-b border-white/[0.04] flex items-center gap-1.5 flex-wrap">
                                        <span className="px-2 py-0.5 rounded text-[11px] bg-yellow-500/15 text-yellow-400 font-mono">Schedule</span>
                                        <div className="h-4 w-px bg-white/[0.06] mx-1" />
                                        {['Props', 'Recur', 'Tasks', 'Dist', 'Notif'].map(b => (
                                            <span key={b} className="px-1.5 py-0.5 text-[11px] text-zinc-400 font-mono">{b}</span>
                                        ))}
                                        <span className="px-2 py-0.5 text-[11px] text-blue-400 font-mono font-medium border border-dashed border-blue-500/30 rounded">Log Reports</span>
                                    </div>

                                    {/* Dual-pane content */}
                                    <div className="grid grid-rows-2 divide-y divide-white/[0.04]">
                                        <div className="p-3">
                                            <div className="text-[11px] text-zinc-400 font-mono mb-2">Number of Jobs: 0</div>
                                            <div className="grid grid-cols-4 text-[11px] font-mono text-zinc-400 border-b border-white/[0.04] pb-1 mb-2">
                                                <span>Job Number</span><span>Start Time</span><span>End Time</span><span>Status</span>
                                            </div>
                                            <div className="h-8 flex items-center justify-center text-[11px] text-zinc-500 font-mono italic">( empty )</div>
                                        </div>
                                        <div className="p-3">
                                            <div className="text-[11px] text-zinc-400 font-mono mb-2">Log Report for Job:</div>
                                            <div className="grid grid-cols-4 text-[11px] font-mono text-zinc-400 border-b border-white/[0.04] pb-1 mb-2">
                                                <span>Code</span><span>Time</span><span>Message</span><span>Status</span>
                                            </div>
                                            <div className="h-8 flex items-center justify-center text-[11px] text-zinc-500 font-mono italic">( truncated content )</div>
                                        </div>
                                    </div>

                                    <div className="px-3 py-2 border-t border-white/[0.04] flex gap-2">
                                        <span className="px-2 py-0.5 text-[11px] text-zinc-400 font-mono border border-white/[0.06] rounded">Refresh</span>
                                        <span className="px-2 py-0.5 text-[11px] text-zinc-400 font-mono border border-white/[0.06] rounded">Delete</span>
                                    </div>
                                </div>

                                {/* Path 2 problems */}
                                <AnimatePresence>
                                    {showPath2Problems && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 6 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, ease }}
                                            className="flex flex-wrap gap-2 mt-3"
                                        >
                                            {['Raw text dump', 'Truncated messages', 'No copy, no search'].map((t, i) => (
                                                <motion.span key={t} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: i * 0.12, type: 'spring', stiffness: 400, damping: 15 }}
                                                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-500/8 border border-rose-500/15 text-[11px] font-mono text-rose-400">
                                                    ⚠ {t}
                                                </motion.span>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )}

                        {/* ── "Both broken" verdict ── */}
                        {showBothBroken && !showAfter && (
                            <motion.div
                                key="verdict"
                                initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, scale: 0.95, filter: 'blur(6px)' }}
                                transition={{ duration: 0.6, ease }}
                                className="text-center py-8"
                            >
                                <p className="text-lg md:text-xl text-rose-400 font-bold tracking-tight">
                                    Both paths? Broken. 🚫
                                </p>
                                <p className="text-sm text-zinc-400 mt-1 font-mono">
                                    Time to consolidate into one unified, in-context experience.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* ════════════ AFTER SECTION ════════════ */}
                    <AnimatePresence>
                        {showAfter && (
                            <motion.div
                                key="after-section"
                                initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ duration: 0.7, ease }}
                            >
                                <div className="text-center mb-5">
                                    <Pill color="emerald">After — One Unified Experience</Pill>
                                </div>

                                <AnimatePresence>
                                    {showTable && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 12, scale: 0.98 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            transition={{ duration: 0.5, ease }}
                                            className="relative rounded-xl border border-emerald-500/10 bg-zinc-900/60 overflow-hidden"
                                        >
                                            {/* Dialog header */}
                                            <div className="px-4 py-2 border-b border-white/[0.04] flex items-center justify-between">
                                                <span className="text-[11px] font-mono text-zinc-200">ReportCaster — Create Schedule</span>
                                                <span className="text-[11px] text-zinc-400">✕</span>
                                            </div>

                                            <div className="flex">
                                                {/* Left sidebar nav */}
                                                <motion.div
                                                    initial={{ opacity: 0, x: -8 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.1, duration: 0.4, ease }}
                                                    className="w-20 md:w-24 border-r border-white/[0.04] py-3 flex flex-col items-center gap-3"
                                                >
                                                    {[
                                                        { icon: '📋', label: 'Task', active: false },
                                                        { icon: '📤', label: 'Distrib.', active: false },
                                                        { icon: '🔁', label: 'Recur.', active: false },
                                                        { icon: '⚙️', label: 'Props', active: false },
                                                        { icon: '📊', label: 'Log Reports', active: true },
                                                    ].map((item, i) => (
                                                        <motion.div key={item.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                                            transition={{ delay: 0.15 + i * 0.05 }}
                                                            className={`flex flex-col items-center gap-0.5 text-center ${item.active ? 'text-blue-400' : 'text-zinc-400'}`}>
                                                            <span className="text-sm">{item.icon}</span>
                                                            <span className={`text-[11px] font-mono ${item.active ? 'font-medium' : ''}`}>{item.label}</span>
                                                            {item.active && <div className="w-full h-0.5 bg-blue-500 rounded-full mt-0.5" />}
                                                        </motion.div>
                                                    ))}
                                                </motion.div>

                                                {/* Main content */}
                                                <div className="flex-1 p-4">
                                                    {/* Filter row */}
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 6 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.2, duration: 0.4, ease }}
                                                        className="flex items-center justify-between mb-3 flex-wrap gap-2"
                                                    >
                                                        <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-400">
                                                            <span className="text-zinc-200 font-medium">Log reports</span>
                                                            <span className="text-blue-400">◉ All</span>
                                                            <span>○ Last executed</span>
                                                            <span>○ Custom 📅</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            <div className="px-2 py-1 rounded bg-zinc-800/60 border border-white/[0.04] text-[11px] text-zinc-400 font-mono">🔍 Search...</div>
                                                            {['🗑', '⬇', '↗', '⟳'].map((ic, i) => (
                                                                <motion.span key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                                                                    transition={{ delay: 0.3 + i * 0.06, type: 'spring', stiffness: 300, damping: 20 }}
                                                                    className="w-6 h-6 rounded border border-blue-500/20 bg-blue-500/5 flex items-center justify-center text-[11px]">{ic}</motion.span>
                                                            ))}
                                                        </div>
                                                    </motion.div>

                                                    <div className="text-[11px] text-zinc-400 font-mono mb-2">Job logs for: 9/12/2023 9:30 AM – 10/12/2023 11:30 PM</div>

                                                    {/* Column headers */}
                                                    <div className="grid grid-cols-[28px_1fr_90px_90px_56px] text-[11px] font-mono text-blue-400 font-medium border-b border-blue-500/15 pb-1 mb-1">
                                                        <span>Sr</span><span>Job Number ↓</span><span className="hidden md:block">Start ↓</span><span className="hidden md:block">End ↓</span><span>Status ↓</span>
                                                    </div>

                                                    {/* Rows */}
                                                    {[
                                                        { n: 1, job: '12nfgjerp98658mbu...', s: '9/15 12:30', e: '9/15 15:30', st: 'Success' },
                                                        { n: 2, job: 'jfgre89655u5kbtiejk...', s: '9/15 12:56', e: '9/15 17:56', st: 'Success' },
                                                        { n: 3, job: 'jfgre89655u5kbtiejk...', s: '9/18 23:30', e: '9/18 23:45', st: 'Error' },
                                                        { n: 4, job: 'jfgre89655uuywdu...', s: '9/19 8:15', e: '9/19 10:45', st: 'Success' },
                                                        { n: 5, job: 'jfgre89655u5kbtiejk...', s: '9/20 20:30', e: '9/20 22:45', st: 'Success' },
                                                    ].map((r, i) => (
                                                        <motion.div key={i} initial={{ opacity: 0, x: -6 }} animate={{
                                                            opacity: 1, x: 0,
                                                            backgroundColor: showModal && i === 2 ? 'var(--overlay-indigo-10)' : 'transparent'
                                                        }} transition={{ delay: 0.2 + i * 0.06, duration: 0.25, ease }}
                                                            className="grid grid-cols-[28px_1fr_90px_90px_56px] text-[11px] font-mono px-0 py-1.5 border-b border-white/[0.03] items-center">
                                                            <span className="text-zinc-400">{r.n}</span>
                                                            <span className={`truncate ${i === 2 ? 'text-blue-300' : 'text-zinc-400'}`}>{r.job}</span>
                                                            <span className="text-zinc-400 hidden md:block">{r.s}</span>
                                                            <span className="text-zinc-400 hidden md:block">{r.e}</span>
                                                            <span className={r.st === 'Error' ? 'text-rose-400 font-medium' : 'text-zinc-400'}>{r.st}</span>
                                                        </motion.div>
                                                    ))}

                                                    {/* Pagination */}
                                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                                                        className="flex justify-end mt-2 text-[11px] font-mono text-zinc-400">
                                                        ⟨ Page 1 / 20 ⟩
                                                    </motion.div>
                                                </div>
                                            </div>

                                            {/* Footer */}
                                            <div className="px-4 py-2 border-t border-white/[0.04] flex justify-end gap-2">
                                                <span className="px-2.5 py-1 text-[11px] font-mono text-zinc-400">Cancel</span>
                                                <span className="px-2.5 py-1 text-[11px] font-mono text-white bg-blue-600 rounded">Run ▾</span>
                                                <span className="px-2.5 py-1 text-[11px] font-mono text-white bg-blue-700 rounded">Save ▾</span>
                                            </div>

                                            {/* ── Modal overlay — appears ON TOP of the scheduler ── */}
                                            <AnimatePresence>
                                                {showModal && (
                                                    <motion.div
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="absolute inset-0 z-20 flex items-center justify-center"
                                                    >
                                                        {/* Backdrop */}
                                                        <motion.div
                                                            initial={{ opacity: 0 }}
                                                            animate={{ opacity: 1 }}
                                                            className="absolute inset-0 bg-black/60 backdrop-blur-[2px] rounded-xl"
                                                        />

                                                        {/* Modal */}
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 14, scale: 0.96, filter: 'blur(4px)' }}
                                                            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                                                            transition={{ delay: 0.15, type: 'spring', stiffness: 300, damping: 25 }}
                                                            className="relative z-10 w-[90%] max-w-lg rounded-lg border border-emerald-500/15 bg-zinc-900/95 overflow-hidden shadow-2xl shadow-emerald-500/5"
                                                        >
                                                            <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.04]">
                                                                <span className="text-[11px] font-mono text-white font-medium">Job Process Log Report</span>
                                                                <div className="flex items-center gap-1.5">
                                                                    {['⬇', '📋', '↗'].map((ic, i) => (
                                                                        <motion.span key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                                                                            transition={{ delay: 0.3 + i * 0.06 }}
                                                                            className="w-6 h-6 rounded border border-blue-500/20 bg-blue-500/5 flex items-center justify-center text-[11px]">{ic}</motion.span>
                                                                    ))}
                                                                    <span className="ml-1 text-[11px] text-zinc-400">✕</span>
                                                                </div>
                                                            </div>

                                                            <div className="px-4 py-2 border-b border-white/[0.03] space-y-0.5">
                                                                {[
                                                                    ['Job:', 'Sch_email (/WFC/Repository/MS/Sch_email.sch)'],
                                                                    ['User:', 'admin'],
                                                                    ['Start:', '9/15/2023 12:56 EST'],
                                                                    ['End:', '9/15/2023 12:58 EST'],
                                                                ].map(([k, v], i) => (
                                                                    <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 + i * 0.04 }}
                                                                        className="text-[11px] font-mono"><span className="text-zinc-400 font-medium">{k}</span> <span className="text-zinc-200">{v}</span></motion.div>
                                                                ))}
                                                            </div>

                                                            <div className="px-4 py-2.5 max-h-28 overflow-y-auto">
                                                                {[
                                                                    'Schedule Executed Due To NEXTRUNTIME...',
                                                                    'Job started running at 2023-01-04 06:37:01...',
                                                                    'Connecting to server EDASERVE...',
                                                                    'Executing focexec.',
                                                                    '0 HOLDING HTML FILE ON PC DISK...',
                                                                    { text: 'myfirstfex.htm not distributed to user@tibco.com', error: true },
                                                                    { text: 'Distribution on hold.', error: true },
                                                                ].map((line, i) => {
                                                                    const isErr = typeof line === 'object'
                                                                    const text = isErr ? line.text : line
                                                                    return (
                                                                        <motion.div key={i} initial={{ opacity: 0, x: -3 }} animate={{ opacity: 1, x: 0 }}
                                                                            transition={{ delay: 0.4 + i * 0.04, duration: 0.2 }}
                                                                            className={`text-[11px] font-mono leading-relaxed ${isErr ? 'text-rose-400 font-medium' : 'text-zinc-400'}`}>
                                                                            {text}
                                                                        </motion.div>
                                                                    )
                                                                })}
                                                            </div>

                                                            <div className="px-4 py-2 border-t border-white/[0.04] flex justify-center">
                                                                <span className="px-4 py-1 rounded bg-blue-600 text-[11px] text-white font-mono font-medium">Close</span>
                                                            </div>
                                                        </motion.div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Solution badges */}
                                <AnimatePresence>
                                    {showBadges && (
                                        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }}
                                            className="flex flex-wrap gap-2 mt-5 justify-center">
                                            {['Sidebar navigation', 'Inline filters', 'Sortable columns', 'Full log in modal', 'Action toolbar', 'Zero context-switching'].map((l, i) => (
                                                <motion.span key={l} initial={{ opacity: 0, scale: 0.7, y: 4 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                                                    transition={{ delay: i * 0.08, type: 'spring', stiffness: 400, damping: 15 }}>
                                                    <Pill color="emerald">{l}</Pill>
                                                </motion.span>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

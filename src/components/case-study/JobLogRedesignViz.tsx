'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import PresenterBar from './storyboard/PresenterBar'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

/* ── Timeline acts (slowed for comprehension) ── */
const ACTS = [
    { act: 0, delay: 0 },        // "Before" label
    { act: 1, delay: 1500 },     // Path 1: tile grid + context menu
    { act: 2, delay: 6000 },     // Path 1: filter popup + new tab result
    { act: 3, delay: 11000 },    // Path 2: legacy dual-pane
    { act: 4, delay: 16000 },    // Problem badges on both
    { act: 5, delay: 20000 },    // Strikethrough both
    { act: 6, delay: 23000 },    // Transition → "After" label
    { act: 7, delay: 26000 },    // Redesigned table builds
    { act: 8, delay: 31000 },    // Row click → modal
    { act: 9, delay: 36000 },    // Solution badges
    { act: 10, delay: 40000 },   // Hold → loop
]
const LOOP_MS = 44000

/* ── Narration text per act ── */
const NARRATION: Record<number, { label: string; text: string }> = {
    0: { label: 'The Problem', text: 'Users had two completely separate paths to view job logs — both broken in different ways.' },
    1: { label: 'Path 1 · Step 1', text: 'Right-click a schedule asset in the Workspace grid, then select "View log" from the context menu.' },
    2: { label: 'Path 1 · Steps 2-3', text: 'Fill out a date filter popup, click OK — the log opens in a completely new browser tab. User loses all context.' },
    3: { label: 'Path 2', text: 'Inside the Scheduler, the Log Reports tab shows a rigid dual-pane layout. Log messages are truncated with no way to expand.' },
    4: { label: 'Core Issues', text: '4 clicks to view a log. Context lost. Raw text dumps. Truncated messages. No copy, no search.' },
    5: { label: 'Decision', text: 'Both paths need to go. Time to consolidate into one unified, in-context experience.' },
    6: { label: 'The Solution', text: 'A single Log Reports tab inside the new Schedule dialog — with inline filters, search, and sortable columns.' },
    7: { label: 'Unified Table', text: 'All job logs in one sortable table with status indicators. Filter by Last Executed, All, or a Custom date range.' },
    8: { label: 'Contextual Modal', text: 'Click any row to open the full log in a modal — no new tabs, no truncation. Copy, download, or open in a new window.' },
    9: { label: 'Improvements', text: 'Zero context-switching. Full log visibility. Inline filters. Actionable toolbar. All within the existing workflow.' },
}

/* ── Tiny helpers ── */
const Pill = ({ children, color = 'rose' }: { children: React.ReactNode; color?: string }) => (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-mono font-medium
        ${color === 'rose' ? 'text-rose-400 bg-rose-500/10 ring-1 ring-rose-500/20' : 'text-emerald-400 bg-emerald-500/10 ring-1 ring-emerald-500/20'}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${color === 'rose' ? 'bg-rose-400' : 'bg-emerald-400'}`} />
        {children}
    </span>
)

function Narration({ act }: { act: number }) {
    const data = NARRATION[act]
    if (!data) return null
    return (
        <motion.div
            key={`narr-${act}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.5, ease }}
            className="mb-5 text-center"
        >
            <span className="text-[9px] font-mono text-zinc-600 tracking-wider uppercase">{data.label}</span>
            <p className="text-[11px] md:text-[13px] text-zinc-400 mt-1 max-w-lg mx-auto leading-relaxed">{data.text}</p>
        </motion.div>
    )
}

/* ═══════════════════════════════════════════════════ */
export default function JobLogRedesignViz() {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: false, amount: 0.35 })
    const [act, setAct] = useState(-1)
    const timers = useRef<NodeJS.Timeout[]>([])

    const clear = useCallback(() => { timers.current.forEach(clearTimeout); timers.current = [] }, [])

    const play = useCallback(() => {
        clear(); setAct(-1)
        ACTS.forEach(({ act: a, delay }) => { timers.current.push(setTimeout(() => setAct(a), delay)) })
        timers.current.push(setTimeout(() => play(), LOOP_MS))
    }, [clear])

    useEffect(() => { if (isInView) play(); else { clear(); setAct(-1) }; return clear }, [isInView, play, clear])

    /* derived */
    const showBefore = act >= 0
    const showPath1 = act >= 1
    const showPath1B = act >= 2
    const showPath2 = act >= 3
    const showProblems = act >= 4
    const showStrike = act >= 5
    const showAfter = act >= 6
    const showTable = act >= 7
    const showModal = act >= 8
    const showBadges = act >= 9

    return (
        <div ref={ref} className="relative w-full max-w-5xl mx-auto">
            <div className="rounded-2xl border border-white/[0.06] bg-zinc-950/80 backdrop-blur-sm overflow-hidden" style={{ minHeight: 480 }}>
                <div className="relative px-4 md:px-8 py-6 md:py-8">

                    {/* ── Presenter narration ── */}
                    <AnimatePresence>
                        {act >= 0 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4">
                                <PresenterBar>
                                    <p className="text-sm md:text-[15px] text-zinc-400 leading-relaxed">
                                        Users had <span className="text-zinc-200 font-medium">two completely separate paths</span> to view job logs — both broken in different ways.
                                    </p>
                                    <p className="text-sm md:text-base text-white font-bold mt-3 tracking-tight">
                                        I unified them into one contextual experience. 🪵
                                    </p>
                                </PresenterBar>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* ── Narration ── */}
                    <AnimatePresence mode="wait">
                        <Narration act={act} />
                    </AnimatePresence>

                    {/* ════════════ BEFORE ════════════ */}
                    <AnimatePresence>
                        {showBefore && !showAfter && (
                            <motion.div key="before" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                exit={{ opacity: 0, scale: 0.93, filter: 'blur(8px)', y: -16 }} transition={{ duration: 0.6, ease }}>

                                {/* Label */}
                                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }} className="text-center mb-6">
                                    <Pill color="rose">Before — Two Broken Paths</Pill>
                                </motion.div>

                                <div className="space-y-5">
                                    {/* ── PATH 1: Right-click flow ── */}
                                    <AnimatePresence>
                                        {showPath1 && (
                                            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: showStrike ? 0.35 : 1, y: 0 }}
                                                transition={{ duration: 0.5, ease }} className="relative">
                                                <div className="text-[9px] font-mono text-zinc-600 mb-2 flex items-center gap-1.5">
                                                    <span className="w-1 h-1 rounded-full bg-zinc-600" />
                                                    PATH 1 — Right-click from Asset Explorer
                                                </div>

                                                <div className="flex flex-col md:flex-row items-stretch gap-2.5">
                                                    {/* Step A: Tile grid + context menu */}
                                                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.1, duration: 0.4, ease }} className="flex-1 rounded-lg border border-white/[0.06] bg-zinc-900/50 overflow-hidden">
                                                        <div className="px-2.5 py-1.5 border-b border-white/[0.04] text-[8px] font-mono text-zinc-600">Workspaces — Asset Grid</div>
                                                        <div className="p-2 flex gap-1.5 flex-wrap">
                                                            {['apostrophe', 'apostrophe2', 'Dave Run...'].map((n, i) => (
                                                                <div key={n} className="w-16 h-10 rounded border border-white/[0.04] bg-zinc-800/40 flex flex-col items-center justify-center">
                                                                    <div className="text-[7px] text-zinc-700">📊</div>
                                                                    <div className="text-[6px] text-zinc-700 truncate w-14 text-center">{n}</div>
                                                                </div>
                                                            ))}
                                                            <div className="w-16 h-10 rounded border border-blue-500/30 bg-blue-500/5 flex flex-col items-center justify-center ring-1 ring-blue-500/20">
                                                                <div className="text-[7px]">📅</div>
                                                                <div className="text-[6px] text-blue-400 font-medium">Test Sched</div>
                                                            </div>
                                                        </div>
                                                        {/* Context menu */}
                                                        <motion.div initial={{ opacity: 0, scale: 0.95, y: -4 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                                                            transition={{ delay: 0.4, duration: 0.3, ease }} className="mx-2 mb-2 rounded border border-white/[0.08] bg-zinc-800 shadow-lg w-32">
                                                            {['✏️ Edit', '▶ Run', '📋 View log', '— Disable'].map((item, i) => (
                                                                <div key={item} className={`px-2 py-0.5 text-[7px] font-mono ${i === 0 ? 'bg-blue-600 text-white' : i === 2 ? 'text-yellow-400' : 'text-zinc-500'}`}>
                                                                    {item}
                                                                </div>
                                                            ))}
                                                            <div className="border-t border-white/[0.04] px-2 py-0.5 text-[7px] text-zinc-700 font-mono">...</div>
                                                        </motion.div>
                                                    </motion.div>

                                                    {/* Arrow */}
                                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                                                        className="flex items-center justify-center text-zinc-700 text-xs md:rotate-0 rotate-90">→</motion.div>

                                                    {/* Step B: Filter popup */}
                                                    <AnimatePresence>
                                                        {showPath1B && (
                                                            <>
                                                                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                                                    transition={{ duration: 0.4, ease }} className="flex-1 rounded-lg border border-white/[0.06] bg-zinc-900/50 overflow-hidden">
                                                                    <div className="px-2.5 py-1.5 border-b border-white/[0.04] text-[8px] font-mono text-zinc-600">Schedule Log Options</div>
                                                                    <div className="p-2 space-y-1.5">
                                                                        <div className="flex gap-2 text-[7px] font-mono text-zinc-600">
                                                                            <span className="text-blue-400">◉ Last Executed</span>
                                                                            <span>○ Dates</span>
                                                                        </div>
                                                                        <div className="flex gap-1">
                                                                            <div className="flex-1 h-4 rounded bg-zinc-800/60 border border-white/[0.04] px-1 text-[6px] text-zinc-700 leading-[16px]">Sep 6, 2022</div>
                                                                            <div className="flex-1 h-4 rounded bg-zinc-800/60 border border-white/[0.04] px-1 text-[6px] text-zinc-700 leading-[16px]">12:00 PM</div>
                                                                        </div>
                                                                        <div className="flex gap-1.5 justify-end mt-1">
                                                                            <div className="px-2 py-0.5 rounded text-[7px] text-zinc-600 border border-white/[0.06]">Cancel</div>
                                                                            <div className="px-2 py-0.5 rounded text-[7px] text-white bg-blue-600">OK</div>
                                                                        </div>
                                                                    </div>
                                                                </motion.div>

                                                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                                                                    className="flex items-center justify-center text-zinc-700 text-xs md:rotate-0 rotate-90">→</motion.div>

                                                                {/* Step C: New browser tab */}
                                                                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
                                                                    transition={{ delay: 0.4, duration: 0.4, ease }} className="flex-1 rounded-lg border border-white/[0.06] bg-zinc-900/50 overflow-hidden">
                                                                    <div className="px-2.5 py-1.5 border-b border-white/[0.04] flex items-center gap-1 text-[8px] font-mono text-rose-400">
                                                                        ↗ New Browser Tab
                                                                    </div>
                                                                    <div className="px-2 py-1 bg-blue-700 text-[7px] text-white font-bold text-center">Job Process Log Report</div>
                                                                    <div className="p-1.5 space-y-0.5">
                                                                        {['Job Description: car12...', 'User: admin', 'Connecting to server EDASERVE...', 'Executing focexec...', '0 HOLDING HTML FILE ON PC DISK...'].map((l, i) => (
                                                                            <div key={i} className="text-[6px] font-mono text-zinc-600 truncate">{l}</div>
                                                                        ))}
                                                                        <div className="text-[6px] font-mono text-rose-400 truncate">Error: Could not connect to host...</div>
                                                                    </div>
                                                                </motion.div>
                                                            </>
                                                        )}
                                                    </AnimatePresence>
                                                </div>

                                                {/* Strikethrough line */}
                                                {showStrike && (
                                                    <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.5, ease }}
                                                        className="absolute top-1/2 left-0 right-0 h-[2px] bg-rose-500/60 z-10" style={{ transformOrigin: 'left' }} />
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* ── PATH 2: Legacy dual-pane ── */}
                                    <AnimatePresence>
                                        {showPath2 && (
                                            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: showStrike ? 0.35 : 1, y: 0 }}
                                                transition={{ duration: 0.5, ease }} className="relative">
                                                <div className="text-[9px] font-mono text-zinc-600 mb-2 flex items-center gap-1.5">
                                                    <span className="w-1 h-1 rounded-full bg-zinc-600" />
                                                    PATH 2 — Inside Scheduler (Log Reports tab)
                                                </div>

                                                <div className="rounded-lg border border-white/[0.06] bg-zinc-900/50 overflow-hidden">
                                                    {/* Ribbon */}
                                                    <div className="px-2 py-1 border-b border-white/[0.04] flex items-center gap-0.5">
                                                        <span className="px-1.5 py-0.5 rounded text-[6px] bg-yellow-500/15 text-yellow-500 font-mono">Schedule</span>
                                                        <div className="flex gap-0.5 ml-2">
                                                            {['Save', '✕ Del'].map(b => (
                                                                <span key={b} className="px-1 py-0.5 text-[6px] text-zinc-600 font-mono">{b}</span>
                                                            ))}
                                                        </div>
                                                        <div className="h-3 w-px bg-white/[0.06] mx-1" />
                                                        {['Props', 'Recur', 'Tasks', 'Dist', 'Notif'].map(b => (
                                                            <span key={b} className="px-1 py-0.5 text-[6px] text-zinc-700 font-mono">{b}</span>
                                                        ))}
                                                        <span className="px-1.5 py-0.5 text-[6px] text-blue-400 font-mono font-medium border border-dashed border-blue-500/30 rounded">Log Reports</span>
                                                    </div>

                                                    <div className="grid grid-rows-2 divide-y divide-white/[0.04]">
                                                        {/* Top pane */}
                                                        <div className="p-2">
                                                            <div className="text-[7px] text-zinc-600 font-mono mb-1">Number of Jobs: 0</div>
                                                            <div className="grid grid-cols-4 text-[6px] font-mono text-zinc-600 border-b border-white/[0.04] pb-0.5 mb-1">
                                                                <span>Job Number</span><span>Start Time</span><span>End Time</span><span>Status</span>
                                                            </div>
                                                            <div className="h-8 flex items-center justify-center text-[7px] text-zinc-800 font-mono italic">( empty )</div>
                                                        </div>
                                                        {/* Bottom pane */}
                                                        <div className="p-2">
                                                            <div className="text-[7px] text-zinc-600 font-mono mb-1">Log Report for Job:</div>
                                                            <div className="grid grid-cols-4 text-[6px] font-mono text-zinc-600 border-b border-white/[0.04] pb-0.5 mb-1">
                                                                <span>Code</span><span>Time</span><span>Message</span><span>Status</span>
                                                            </div>
                                                            <div className="h-8 flex items-center justify-center text-[7px] text-zinc-800 font-mono italic">( truncated content )</div>
                                                        </div>
                                                    </div>

                                                    {/* Footer */}
                                                    <div className="px-2 py-1 border-t border-white/[0.04] flex gap-1.5">
                                                        <span className="px-1.5 py-0.5 text-[6px] text-zinc-700 font-mono border border-white/[0.06] rounded">Refresh</span>
                                                        <span className="px-1.5 py-0.5 text-[6px] text-zinc-700 font-mono border border-white/[0.06] rounded">Delete</span>
                                                    </div>
                                                </div>

                                                {showStrike && (
                                                    <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.1, duration: 0.5, ease }}
                                                        className="absolute top-1/2 left-0 right-0 h-[2px] bg-rose-500/60 z-10" style={{ transformOrigin: 'right' }} />
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Problem badges */}
                                    <AnimatePresence>
                                        {showProblems && !showStrike && (
                                            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                                transition={{ type: 'spring', stiffness: 400, damping: 20 }} className="flex flex-wrap gap-2 justify-center">
                                                {['4 clicks to view a log', 'Opens in new browser tab', 'Raw text dump — no formatting', 'Truncated in dual-pane'].map((t, i) => (
                                                    <motion.div key={t} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                                                        transition={{ delay: i * 0.1, type: 'spring', stiffness: 400, damping: 15 }}
                                                        className="flex items-center gap-1 px-2 py-1 rounded-md bg-rose-500/8 border border-rose-500/15 text-[8px] font-mono text-rose-400">
                                                        <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}>⚠</motion.span>
                                                        {t}
                                                    </motion.div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* ════════════ AFTER ════════════ */}
                    <AnimatePresence>
                        {showAfter && (
                            <motion.div key="after" initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.7, ease }}>

                                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.4, ease }} className="text-center mb-5">
                                    <Pill color="emerald">After — One Unified Experience</Pill>
                                </motion.div>

                                <AnimatePresence>
                                    {showTable && (
                                        <motion.div initial={{ opacity: 0, y: 14, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                                            transition={{ duration: 0.5, ease }} className="rounded-lg border border-emerald-500/10 bg-zinc-900/60 overflow-hidden">

                                            {/* Dialog header */}
                                            <div className="px-3 py-1.5 border-b border-white/[0.04] flex items-center justify-between">
                                                <span className="text-[9px] font-mono text-zinc-400">ReportCaster — Create Schedule</span>
                                                <span className="text-[9px] text-zinc-700">✕</span>
                                            </div>

                                            <div className="flex">
                                                {/* Left sidebar nav */}
                                                <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.1, duration: 0.4, ease }}
                                                    className="w-16 md:w-20 border-r border-white/[0.04] py-2 flex flex-col items-center gap-2.5">
                                                    {[
                                                        { icon: '📋', label: 'Task', active: false },
                                                        { icon: '📤', label: 'Distrib.', active: false },
                                                        { icon: '🔁', label: 'Recur.', active: false },
                                                        { icon: '⚙️', label: 'Props', active: false },
                                                        { icon: '📊', label: 'Log Reports', active: true },
                                                    ].map((item, i) => (
                                                        <motion.div key={item.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                                            transition={{ delay: 0.15 + i * 0.05 }}
                                                            className={`flex flex-col items-center gap-0.5 text-center ${item.active ? 'text-blue-400' : 'text-zinc-700'}`}>
                                                            <span className="text-[10px]">{item.icon}</span>
                                                            <span className={`text-[6px] font-mono ${item.active ? 'font-medium' : ''}`}>{item.label}</span>
                                                            {item.active && <div className="w-full h-0.5 bg-blue-500 rounded-full mt-0.5" />}
                                                        </motion.div>
                                                    ))}
                                                </motion.div>

                                                {/* Main content */}
                                                <div className="flex-1 p-3">
                                                    {/* Filter row */}
                                                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.2, duration: 0.4, ease }} className="flex items-center justify-between mb-2">
                                                        <div className="flex items-center gap-2 text-[8px] font-mono text-zinc-500">
                                                            <span className="text-zinc-400 font-medium">Log reports</span>
                                                            <span className="text-blue-400">◉ All</span>
                                                            <span>○ Last executed</span>
                                                            <span>○ Custom 📅</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <div className="px-1.5 py-0.5 rounded bg-zinc-800/60 border border-white/[0.04] text-[7px] text-zinc-700 font-mono w-20">🔍 Search...</div>
                                                            {['🗑', '⬇', '↗', '⟳'].map((ic, i) => (
                                                                <motion.span key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                                                                    transition={{ delay: 0.3 + i * 0.06, type: 'spring', stiffness: 300, damping: 20 }}
                                                                    className="w-5 h-5 rounded border border-blue-500/20 bg-blue-500/5 flex items-center justify-center text-[8px]">{ic}</motion.span>
                                                            ))}
                                                        </div>
                                                    </motion.div>

                                                    <div className="text-[7px] text-zinc-600 font-mono mb-1.5">Job logs for: 9/12/2023 9:30 AM – 10/12/2023 11:30 PM</div>

                                                    {/* Column headers */}
                                                    <div className="grid grid-cols-[28px_1fr_90px_90px_52px] text-[7px] font-mono text-blue-400 font-medium border-b border-blue-500/15 pb-1 mb-0.5">
                                                        <span>Sr</span><span>Job Number ↓</span><span className="hidden md:block">Start Time ↓</span><span className="hidden md:block">End Time ↓</span><span>Status ↓</span>
                                                    </div>

                                                    {/* Rows */}
                                                    {[
                                                        { n: 1, job: '12nfgjerp98658mbu...', s: '9/15 12:30', e: '9/15 15:30', st: 'Success' },
                                                        { n: 2, job: 'jfgre89655u5kbtiejk...', s: '9/15 12:56', e: '9/15 17:56', st: 'Success' },
                                                        { n: 3, job: 'jfgre89655u5kbtiejk...', s: '9/18 23:30', e: '9/18 23:45', st: 'Error' },
                                                        { n: 4, job: 'jfgre89655uuywdu...', s: '9/19 8:15', e: '9/19 10:45', st: 'Success' },
                                                        { n: 5, job: 'jfgre89655u5kbtiejk...', s: '9/20 20:30', e: '9/20 22:45', st: 'Success' },
                                                        { n: 6, job: 'jfgre89655uuywdu...', s: '9/19 8:15', e: '9/19 10:45', st: 'Success' },
                                                        { n: 7, job: 'jfgre89655u5kbtiejk...', s: '9/20 20:30', e: '9/20 22:45', st: 'Success' },
                                                    ].map((r, i) => (
                                                        <motion.div key={i} initial={{ opacity: 0, x: -6 }} animate={{
                                                            opacity: 1, x: 0,
                                                            backgroundColor: showModal && i === 2 ? 'rgba(99,102,241,0.1)' : 'transparent'
                                                        }} transition={{ delay: 0.2 + i * 0.06, duration: 0.25, ease }}
                                                            className="grid grid-cols-[28px_1fr_90px_90px_52px] text-[8px] font-mono px-0 py-1 border-b border-white/[0.02] items-center">
                                                            <span className="text-zinc-600">{r.n}</span>
                                                            <span className={`truncate ${i === 2 ? 'text-blue-300' : 'text-zinc-500'}`}>{r.job}</span>
                                                            <span className="text-zinc-700 hidden md:block">{r.s}</span>
                                                            <span className="text-zinc-700 hidden md:block">{r.e}</span>
                                                            <span className={r.st === 'Error' ? 'text-rose-400 font-medium' : 'text-zinc-600'}>{r.st}</span>
                                                        </motion.div>
                                                    ))}

                                                    {/* Pagination */}
                                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
                                                        className="flex justify-end mt-2 text-[7px] font-mono text-zinc-700">
                                                        ⟨ Page 1 / 20 ⟩
                                                    </motion.div>
                                                </div>
                                            </div>

                                            {/* Footer */}
                                            <div className="px-3 py-1.5 border-t border-white/[0.04] flex justify-end gap-1.5">
                                                <span className="px-2 py-0.5 text-[7px] font-mono text-zinc-600">Cancel</span>
                                                <span className="px-2 py-0.5 text-[7px] font-mono text-white bg-blue-600 rounded">Run ▾</span>
                                                <span className="px-2 py-0.5 text-[7px] font-mono text-white bg-blue-700 rounded">Save ▾</span>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* ── Modal ── */}
                                <AnimatePresence>
                                    {showModal && (
                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center my-2">
                                                <motion.span animate={{ y: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                                                    className="text-[8px] font-mono text-emerald-500/50">↓ click row 3</motion.span>
                                            </motion.div>

                                            <motion.div initial={{ opacity: 0, y: 14, scale: 0.96, filter: 'blur(4px)' }}
                                                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                                                transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 25 }}
                                                className="rounded-lg border border-emerald-500/12 bg-zinc-900/90 overflow-hidden shadow-xl shadow-emerald-500/5">

                                                {/* Modal header */}
                                                <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.04]">
                                                    <span className="text-[10px] font-mono text-white font-medium">Job Process Log Report</span>
                                                    <div className="flex items-center gap-1">
                                                        {['⬇', '📋', '↗', '⟳'].map((ic, i) => (
                                                            <motion.span key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                                                                transition={{ delay: 0.4 + i * 0.06 }}
                                                                className="w-5 h-5 rounded border border-blue-500/20 bg-blue-500/5 flex items-center justify-center text-[8px]">{ic}</motion.span>
                                                        ))}
                                                        <span className="ml-1 text-[9px] text-zinc-600">✕</span>
                                                    </div>
                                                </div>

                                                {/* Job meta */}
                                                <div className="px-4 py-2 border-b border-white/[0.03] space-y-0.5">
                                                    {[
                                                        ['Job Description:', 'Sch_email (/WFC/Repository/MS/Sch_email.sch)'],
                                                        ['User:', 'admin'],
                                                        ['Job Number:', 'jfgre89655u5kbtiejk...'],
                                                        ['Start Time:', '9/15/2023 12:56 EST'],
                                                        ['End Time:', '9/15/2023 12:58 EST'],
                                                    ].map(([k, v], i) => (
                                                        <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 + i * 0.04 }}
                                                            className="text-[8px] font-mono"><span className="text-zinc-500 font-medium">{k}</span> <span className="text-zinc-400">{v}</span></motion.div>
                                                    ))}
                                                </div>

                                                {/* Full log */}
                                                <div className="px-4 py-2.5 max-h-36 overflow-y-auto">
                                                    {[
                                                        'Schedule Executed Due To NEXTRUNTIME at NA1DEV...',
                                                        'Job placed in the waiting queue at 2023-01-04...',
                                                        'Job started running at 2023-01-04 06:37:01...',
                                                        'Starting task: Task 1',
                                                        'Task type: EDA RPC',
                                                        'Connecting to server EDASERVE with execution id...',
                                                        'Executing focexec.',
                                                        '0 HOLDING HTML FILE ON PC DISK...',
                                                        'Job ran on the Reporting Server EDASERVE for 0.172s',
                                                        'Task finished.',
                                                        'Distribution method: Email',
                                                        { text: 'myfirstfex.htm not distributed to user@tibco.com', error: true },
                                                        { text: 'Distribution on hold.', error: true },
                                                    ].map((line, i) => {
                                                        const isErr = typeof line === 'object'
                                                        const text = isErr ? line.text : line
                                                        return (
                                                            <motion.div key={i} initial={{ opacity: 0, x: -3 }} animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: 0.5 + i * 0.04, duration: 0.2 }}
                                                                className={`text-[8px] font-mono leading-relaxed ${isErr ? 'text-rose-400 font-medium' : 'text-zinc-500'}`}>
                                                                {text}
                                                            </motion.div>
                                                        )
                                                    })}
                                                </div>

                                                {/* Close */}
                                                <div className="px-4 py-2 border-t border-white/[0.04] flex justify-center">
                                                    <span className="px-4 py-1 rounded bg-blue-600 text-[8px] text-white font-mono font-medium">Close</span>
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Solution badges */}
                                <AnimatePresence>
                                    {showBadges && (
                                        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }}
                                            className="flex flex-wrap gap-2 mt-4 justify-center">
                                            {['Sidebar navigation', 'Inline radio filters', 'Sortable columns', 'Full log in modal', 'Action toolbar', 'Zero context-switching'].map((l, i) => (
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

                {/* Progress bar */}
                <div className="h-[2px] bg-zinc-900 relative overflow-hidden">
                    <motion.div key={`prog-${act}`} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                        transition={{ duration: LOOP_MS / 1000, ease: 'linear' }} className="absolute inset-0 origin-left"
                        style={{ background: act < 6 ? '#f43f5e' : '#10b981' }} />
                </div>
            </div>
        </div>
    )
}

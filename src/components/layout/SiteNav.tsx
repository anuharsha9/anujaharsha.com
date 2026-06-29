'use client'

import { usePathname } from 'next/navigation'
import { Briefcase, Sparkles, FileText, BrainCircuit, Search } from 'lucide-react'
import NavIsland, { type NavSegment } from '@/components/ui/NavIsland'
import { useTransition } from '@/components/transitions/TransitionContext'
import { useActiveTab, setActiveTab, type Tab } from '@/hooks/useActiveTab'
import { useCircleBack } from '@/hooks/useCircleBack'

/**
 * THE site nav — one route-aware Dynamic Island, mounted once in PageShell.
 * Replaces the old TabSwitcher + CaseStudyTabs + per-page back buttons.
 *
 *   /              → Work · Life          (segmented)
 *   /work/*        → ‹ Back · RC · ML · IQ (segmented + circle-back)
 *   detour pages   → ‹ Back               (circle-back)
 *   everything else→ nothing
 *
 * "‹ Back" always means the same thing everywhere (useCircleBack).
 */

const WORK_LIFE: NavSegment[] = [
    { id: 'work', label: 'Work', icon: Briefcase },
    { id: 'life', label: 'Life', icon: Sparkles },
]

const CASES: (NavSegment & { href: string })[] = [
    { id: 'reportcaster', label: 'ReportCaster', short: 'RC', href: '/work/reportcaster', icon: FileText },
    { id: 'ml-functions', label: 'ML Functions', short: 'ML', href: '/work/ml-functions', icon: BrainCircuit },
    { id: 'iq-plugin', label: 'IQ Plugin', short: 'IQ', href: '/work/iq-plugin', icon: Search },
]

/* Standalone "detour" pages that get a single Back pill. */
const DETOURS = ['/philosophy', '/manifesto', '/quiz', '/design-system']

const normalize = (p: string) => (p || '/').replace(/\/+$/, '') || '/'

export default function SiteNav() {
    const pathname = normalize(usePathname() || '/')
    const { navigateTo } = useTransition()
    const activeTab = useActiveTab()
    const circleBack = useCircleBack()

    // Landing — Work/Life
    if (pathname === '/') {
        return (
            <NavIsland
                segments={WORK_LIFE}
                activeId={activeTab}
                onSelect={(id) => setActiveTab(id as Tab)}
                ariaLabel="Work or Life view"
            />
        )
    }

    // Case studies — RC/ML/IQ switcher + circle-back
    const caseIdx = CASES.findIndex(c => normalize(c.href) === pathname)
    if (caseIdx !== -1) {
        return (
            <NavIsland
                segments={CASES}
                activeId={CASES[caseIdx].id}
                onSelect={(id) => {
                    if (id !== CASES[caseIdx].id) {
                        const c = CASES.find(x => x.id === id)
                        if (c) navigateTo(c.href)
                    }
                }}
                leading={{ label: 'Back', onClick: circleBack }}
                ariaLabel="Case study navigation"
            />
        )
    }

    // Detour pages — single circle-back pill
    if (DETOURS.includes(pathname)) {
        return <NavIsland leading={{ label: 'Back', onClick: circleBack }} />
    }

    return null
}

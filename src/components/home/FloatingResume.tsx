'use client'

import { useCallback, useEffect, useState } from 'react'
import { FileText } from 'lucide-react'
import { usePdf } from '@/contexts/PdfContext'
import { trackResumeDownload } from '@/components/analytics/GoogleAnalytics'

/**
 * Sibling to TabSwitcher in PageShell. Lives in the top-right corner of the
 * viewport (mirror of the centered Dynamic Island tab pill). Only appears
 * once the visitor has scrolled past the hero — gives persistent Resume
 * access without expanding the tab island itself.
 *
 * Hidden by default; fades in past ~scrollY > 80.
 */
export default function FloatingResume() {
    const { openPdf } = usePdf()
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const check = () => setVisible(window.scrollY > 80)
        check()
        const id = window.setInterval(check, 120)
        window.addEventListener('scroll', check, { passive: true })
        return () => {
            clearInterval(id)
            window.removeEventListener('scroll', check)
        }
    }, [])

    const open = useCallback(() => {
        trackResumeDownload()
        openPdf(
            '/assets/Anuja%20Harsha%20Nimmagadda%20-%20Staff%20Product%20Designer.pdf',
            'Anuja Harsha Nimmagadda - Staff Product Designer',
        )
    }, [openPdf])

    return (
        <div className="pointer-events-none fixed right-4 top-4 z-[10001] md:right-6 md:top-5">
            <button
                onClick={open}
                aria-label="View Resume PDF"
                className={`pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-black/55 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white shadow-[0_8px_32px_-10px_rgba(0,0,0,0.6)] backdrop-blur-xl transition-all duration-500 hover:border-white/30 hover:bg-black/75 md:text-[11px] ${
                    visible ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-2 opacity-0'
                }`}
            >
                <FileText className="h-3.5 w-3.5" />
                Resume
            </button>
        </div>
    )
}

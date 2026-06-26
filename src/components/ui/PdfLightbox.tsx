'use client'

import { useEffect, useState } from 'react'
import { Download, ExternalLink, FileText, Loader2 } from 'lucide-react'
import SystemLightbox from '@/components/ui/SystemLightbox'
import Button from '@/components/ui/Button'

interface PdfLightboxProps {
    isOpen: boolean
    onClose: () => void
    pdfUrl: string
    title?: string
}

/**
 * On-brand résumé viewer. Reuses the SystemLightbox shell (portal, scroll-lock,
 * focus-trap, ESC) but renders a clean, framed document — not a bare terminal
 * iframe:
 *  - header actions use the shared <Button> primitive (teal-glass), not slate boxes
 *  - the PDF sits in a rounded, bordered "paper" frame on the cinematic bg
 *  - a loading spinner shows until the document paints
 *  - <object> with a graceful fallback card, so a browser that can't render a
 *    PDF inline never shows an empty grey void — it offers Open / Download
 *  - mobile skips the fragile inline PDF for the print-ready HTML résumé
 */
export default function PdfLightbox({
    isOpen,
    onClose,
    pdfUrl,
    title = 'Résumé',
}: PdfLightboxProps) {
    const [isMobile, setIsMobile] = useState(false)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    // reset the loading state each time a new doc opens; force-clear after a
    // few seconds so the spinner never sticks if <object>'s onLoad doesn't fire.
    useEffect(() => {
        if (!isOpen) return
        setLoaded(false)
        const t = setTimeout(() => setLoaded(true), 2500)
        return () => clearTimeout(t)
    }, [isOpen, pdfUrl])

    if (!isOpen) return null

    /* Header actions — on-brand buttons (Open in new tab + Download). */
    const headerActions = (
        <div className="flex items-center gap-2.5">
            <Button variant="secondary" size="sm" href={pdfUrl} external icon={<ExternalLink className="h-3.5 w-3.5" />}>
                <span className="hidden sm:inline">Open</span>
            </Button>
            <Button variant="primary" size="sm" href={pdfUrl} external icon={<Download className="h-3.5 w-3.5" />} className="!px-4">
                <span className="hidden sm:inline">Download</span>
            </Button>
        </div>
    )

    /* Graceful fallback if a browser can't render the PDF inline. */
    const fallbackCard = (
        <div className="flex h-full w-full flex-col items-center justify-center gap-5 p-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[rgba(var(--accent-teal-rgb),0.35)] bg-[rgba(var(--accent-teal-rgb),0.08)]">
                <FileText className="h-7 w-7 text-[var(--accent-teal-bright)]" strokeWidth={1.5} />
            </div>
            <div>
                <p className="text-base font-semibold text-zinc-100">{title}</p>
                <p className="mt-1 text-sm text-zinc-500">Your browser can&rsquo;t preview PDFs inline.</p>
            </div>
            <div className="flex gap-3">
                <Button variant="primary" href={pdfUrl} external icon={<ExternalLink className="h-4 w-4" />}>Open PDF</Button>
                <Button variant="secondary" href={pdfUrl} external icon={<Download className="h-4 w-4" />}>Download</Button>
            </div>
        </div>
    )

    return (
        <SystemLightbox
            isOpen={isOpen}
            onClose={onClose}
            title="Résumé"
            indexString="[ PDF ]"
            shortcuts={[{ key: 'ESC', label: 'CLOSE' }]}
            headerActions={headerActions}
            className="!p-0 !max-w-full"
            showArrows={false}
        >
            {isMobile ? (
                /* Mobile: print-ready HTML résumé (renders reliably on phones) +
                   a sticky Download/Open bar. */
                <div className="flex h-full w-full flex-col">
                    <iframe
                        src="/tailored-resumes/resume-universal-2026.html"
                        title="Résumé preview"
                        className="flex-1 w-full bg-white"
                    />
                    <div
                        className="flex w-full items-center justify-center gap-3 border-t border-white/10 bg-black/85 px-4 pt-3 backdrop-blur-md"
                        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
                    >
                        <Button variant="primary" href={pdfUrl} external icon={<Download className="h-4 w-4" />} className="flex-1">
                            Download PDF
                        </Button>
                        <Button variant="secondary" href={pdfUrl} external aria-label="Open PDF in new tab" icon={<ExternalLink className="h-4 w-4" />} className="!px-4" />
                    </div>
                </div>
            ) : (
                /* Desktop: clean framed document on the cinematic bg, centered,
                   with a loading spinner until the PDF paints. */
                <div className="flex h-[84vh] w-full items-center justify-center px-4 py-6 md:px-10">
                    <div className="relative h-full w-full max-w-3xl overflow-hidden rounded-xl border border-white/10 bg-[var(--bg-cinematic)] shadow-[0_24px_80px_-24px_rgba(0,0,0,0.8)]">
                        {/* Loading shimmer until the doc paints */}
                        {!loaded && (
                            <div className="absolute inset-0 z-[1] flex items-center justify-center bg-[var(--bg-cinematic)]">
                                <Loader2 className="h-7 w-7 animate-spin text-[var(--accent-teal)]" />
                            </div>
                        )}
                        <object
                            data={`${pdfUrl}#view=FitH&toolbar=0&navpanes=0`}
                            type="application/pdf"
                            className="h-full w-full"
                            onLoad={() => setLoaded(true)}
                            aria-label={`${title} — PDF preview`}
                        >
                            {fallbackCard}
                        </object>
                    </div>
                </div>
            )}
        </SystemLightbox>
    )
}

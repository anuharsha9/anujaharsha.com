'use client'

import { useEffect, useState } from 'react'
import { Download, ExternalLink, FileText } from 'lucide-react'
import SystemLightbox from '@/components/ui/SystemLightbox'

interface PdfLightboxProps {
    isOpen: boolean
    onClose: () => void
    pdfUrl: string
    title?: string
}

export default function PdfLightbox({
    isOpen,
    onClose,
    pdfUrl,
    title = 'Document Preview'
}: PdfLightboxProps) {
    /* Mobile browsers (iOS Safari, Android Chrome) frequently render a PDF in an
     * <iframe> as a blank page — the classic "PDF not loading" bug. So on mobile
     * we skip the inline viewer and offer a reliable Open/Download card instead;
     * the device's native full-screen PDF viewer handles it perfectly. Desktop
     * keeps the inline iframe preview. */
    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    if (!isOpen) return null

    const shortcuts = [{ key: 'ESC', label: 'CLOSE' }]

    // Header actions — open in new tab + download, available on every device
    const headerActions = (
        <div className="flex items-center gap-2">
            <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-white/10 text-zinc-200 rounded-lg text-sm font-medium transition-colors duration-200 border border-slate-700 hover:border-white/30"
            >
                <ExternalLink className="w-4 h-4" />
                <span className="hidden sm:inline">OPEN</span>
            </a>
            <a
                href={pdfUrl}
                download
                className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-[var(--accent-teal)] text-zinc-200 hover:text-black rounded-lg text-sm font-medium transition-colors duration-200 border border-slate-700 hover:border-[var(--accent-teal)]"
            >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">DOWNLOAD</span>
            </a>
        </div>
    )

    return (
        <SystemLightbox
            isOpen={isOpen}
            onClose={onClose}
            title={`SYSTEM_PREVIEW: ${title}`}
            indexString="[ PDF_DOCUMENT ]"
            shortcuts={shortcuts}
            headerActions={headerActions}
            className="!p-0 !max-w-full overflow-hidden"
            showArrows={false}
        >
            {isMobile ? (
                /* Mobile: reliable open/download card — no fragile iframe */
                <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-6 px-6 py-12 text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04]">
                        <FileText className="h-9 w-9 text-[var(--accent-teal)]" />
                    </div>
                    <div>
                        <p className="text-base font-semibold text-zinc-100">{title}</p>
                        <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-zinc-500">
                            PDF · opens full screen
                        </p>
                    </div>
                    <div className="flex w-full max-w-xs flex-col gap-3">
                        <a
                            href={pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-[var(--accent-teal)]"
                        >
                            <ExternalLink className="h-4 w-4" /> Open Resume
                        </a>
                        <a
                            href={pdfUrl}
                            download
                            className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/35 bg-white/[0.06] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:border-white/70 hover:bg-white/[0.14]"
                        >
                            <Download className="h-4 w-4" /> Download PDF
                        </a>
                    </div>
                </div>
            ) : (
                /* Desktop: inline iframe preview with explicit height so it never collapses */
                <div className="flex h-[82vh] w-full items-center justify-center">
                    <iframe
                        src={`${pdfUrl}#toolbar=0&navpanes=0`}
                        className="h-full w-full bg-slate-800"
                        title="PDF Viewer"
                    />
                </div>
            )}
        </SystemLightbox>
    )
}

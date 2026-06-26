'use client'

import { Download, ExternalLink } from 'lucide-react'
import SystemLightbox from '@/components/ui/SystemLightbox'
import Button from '@/components/ui/Button'
import ResumeDocument from '@/components/ui/ResumeDocument'

interface PdfLightboxProps {
    isOpen: boolean
    onClose: () => void
    pdfUrl: string
    title?: string
}

/**
 * Résumé viewer. Renders the résumé NATIVELY (on-brand, styled to match the
 * portfolio) via <ResumeDocument> instead of embedding a fragile PDF that some
 * browsers refuse to render inline. The header (desktop) + sticky bar (mobile)
 * still hand off the real print-ready PDF via Download / Open — so the inline
 * version is "for show," the PDF is the file you keep.
 */
export default function PdfLightbox({ isOpen, onClose, pdfUrl }: PdfLightboxProps) {
    if (!isOpen) return null

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

    return (
        <SystemLightbox
            isOpen={isOpen}
            onClose={onClose}
            title="Résumé"
            indexString="[ PDF ]"
            shortcuts={[{ key: 'ESC', label: 'CLOSE' }]}
            headerActions={headerActions}
            className="!p-0 !max-w-5xl"
            showArrows={false}
        >
            <div className="relative flex h-full w-full flex-col">
                {/* Native résumé — scrolls within the lightbox */}
                <div className="h-full w-full overflow-y-auto">
                    <ResumeDocument />
                    {/* spacer so the mobile action bar never overlaps the last line */}
                    <div className="h-20 md:hidden" />
                </div>

                {/* Mobile action bar — the SystemLightbox mobile chrome drops the
                    header actions, so surface Download / Open here. */}
                <div
                    className="absolute inset-x-0 bottom-0 flex items-center gap-3 border-t border-white/10 bg-black/85 px-4 pt-3 backdrop-blur-md md:hidden"
                    style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
                >
                    <Button variant="primary" href={pdfUrl} external icon={<Download className="h-4 w-4" />} className="flex-1">
                        Download PDF
                    </Button>
                    <Button variant="secondary" href={pdfUrl} external aria-label="Open PDF in new tab" icon={<ExternalLink className="h-4 w-4" />} className="!px-4" />
                </div>
            </div>
        </SystemLightbox>
    )
}

'use client'

import { Download } from 'lucide-react'
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
    if (!isOpen) return null

    // Shortcuts
    const shortcuts = [
        { key: "ESC", label: "CLOSE" }
    ]

    // Download Button as Header Action
    const downloadButton = (
        <a
            href={pdfUrl}
            download
            className="flex items-center gap-3 px-5 py-2.5 bg-slate-800 hover:bg-[var(--accent-teal)] text-slate-300 hover:text-white rounded-lg text-sm font-medium transition-colors duration-200 group border border-slate-700 hover:border-[var(--accent-teal)]"
        >
            <Download className="w-5 h-5" />
            <span className="hidden sm:inline">DOWNLOAD</span>
        </a>
    )

    return (
        <SystemLightbox
            isOpen={isOpen}
            onClose={onClose}
            title={`SYSTEM_PREVIEW: ${title}`}
            indexString="[ PDF_DOCUMENT ]"
            shortcuts={shortcuts}
            headerActions={downloadButton}
            className="p-0 overflow-hidden bg-slate-900/50" // Override padding for iframe full size
            showArrows={false}
        >
            <div className="w-full h-full max-w-6xl mx-auto flex items-center justify-center p-4 md:p-8">
                <iframe
                    src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                    className="w-full h-full rounded-none md:rounded-lg shadow-2xl bg-slate-800 border border-slate-700/50"
                    title="PDF Viewer"
                />
            </div>
        </SystemLightbox>
    )
}


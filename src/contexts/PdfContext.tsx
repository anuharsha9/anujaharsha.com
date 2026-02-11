'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import PdfLightbox from '@/components/ui/PdfLightbox'

interface PdfContextType {
    openPdf: (url: string, title?: string) => void
    closePdf: () => void
    isOpen: boolean
}

const PdfContext = createContext<PdfContextType | undefined>(undefined)

export function PdfProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false)
    const [pdfUrl, setPdfUrl] = useState<string | null>(null)
    const [title, setTitle] = useState<string | undefined>(undefined)

    const openPdf = (url: string, title?: string) => {
        setPdfUrl(url)
        setTitle(title)
        setIsOpen(true)
    }

    const closePdf = () => {
        setIsOpen(false)
        setTimeout(() => {
            setPdfUrl(null)
            setTitle(undefined)
        }, 300)
    }

    return (
        <PdfContext.Provider value={{ openPdf, closePdf, isOpen }}>
            {children}
            {pdfUrl && (
                <PdfLightbox
                    isOpen={isOpen}
                    onClose={closePdf}
                    pdfUrl={pdfUrl}
                    title={title}
                />
            )}
        </PdfContext.Provider>
    )
}

export function usePdf() {
    const context = useContext(PdfContext)
    if (context === undefined) {
        throw new Error('usePdf must be used within a PdfProvider')
    }
    return context
}

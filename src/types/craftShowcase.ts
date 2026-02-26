import { ReactNode } from 'react'

// ─── Shared Types ────────────────────────────────────────

export interface ShowcaseImage {
    src: string
    alt: string
    caption: string
    figNumber: string
}

export interface ShowcaseQuote {
    text: string
    attribution: string
}

export interface ShowcaseTab {
    id: string
    index: string
    label: string
    iconName: string          // lucide icon name string — resolved in component
    title: string
    description: string
    images: ShowcaseImage[]
    quote?: ShowcaseQuote
    isKey?: boolean
    highlight?: {
        label: string
        text: string
    }
}

export interface ShowcaseFooter {
    label: string
    text: string
}

export interface ShowcaseComparison {
    before: {
        tag: string
        title: string
        description: string
    }
    after: {
        tag: string
        title: string
        description: string
        highlight?: string
    }
}

export interface CraftShowcaseData {
    sectionTag: string
    sectionTitle: string
    sectionDescription: string
    tabs: ShowcaseTab[]
    footer?: ShowcaseFooter
    comparison?: ShowcaseComparison
}

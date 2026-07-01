import type { Metadata } from 'next'
import DesignSystemShowcase from '@/components/design-system/DesignSystemShowcase'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://anujaharsha.com'
const description =
    'The design system behind the portfolio — tokens, typography, and the canonical components (Button, IconButton, NavIsland, SystemLightbox) that keep the whole site speaking one language.'

export const metadata: Metadata = {
    title: 'Design System · Anuja Harsha',
    description,
    alternates: { canonical: `${siteUrl}/design-system/` },
    openGraph: {
        title: 'Design System · Anuja Harsha Nimmagadda',
        description,
        url: `${siteUrl}/design-system/`,
        type: 'article',
        images: [`${siteUrl}/design-system/opengraph-image`],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Design System · Anuja Harsha Nimmagadda',
        description,
        images: [`${siteUrl}/design-system/opengraph-image`],
    },
}

export default function DesignSystemPage() {
    return <DesignSystemShowcase />
}

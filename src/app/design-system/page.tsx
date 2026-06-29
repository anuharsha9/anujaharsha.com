import type { Metadata } from 'next'
import DesignSystemShowcase from '@/components/design-system/DesignSystemShowcase'

export const metadata: Metadata = {
    title: 'Design System · Anuja Harsha',
    description:
        'The design system behind the portfolio — tokens, typography, and the canonical components (Button, IconButton, NavIsland, SystemLightbox) that keep the whole site speaking one language.',
}

export default function DesignSystemPage() {
    return <DesignSystemShowcase />
}

import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-template'

export const dynamic = 'force-static'
export const alt = 'Anuja Harsha — Design Manifesto'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function Image() {
    return ogImage({
        eyebrow: 'A 60-second intro',
        title: ['Untangling', '50 years of', 'tech debt.'],
        subtitle: 'How I compartmentalize and redesign enterprise systems for zero friction. A short film.',
        tags: ['Manifesto', 'Watch', '60 Seconds'],
    })
}

import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-template'

export const dynamic = 'force-static'
export const alt = 'ML Functions — AI workflows non-technical users could actually run'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function Image() {
    return ogImage({
        eyebrow: 'Case Study · AI Workflow Design',
        title: ['15 clicks', 'became', '4 steps.'],
        subtitle: 'I turned an engineer-only ML tool into a guided workflow any business user could operate. Zero ML background to full UX ownership.',
        tags: ['ML UX', 'Guided Wizard', 'Non-technical SMEs'],
        // Cooler cyan to evoke ML/data signal.
        accentRgb: [34, 211, 238],
    })
}

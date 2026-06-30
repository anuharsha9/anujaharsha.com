import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-template'

export const dynamic = 'force-static'
export const alt = 'Inside My Head — A Design-Thinking Quiz | Anuja Harsha'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function Image() {
    return ogImage({
        eyebrow: 'The Brain Experience',
        title: ['Inside my head.'],
        subtitle: 'A short walk through how I actually think. Face a few real design scenarios and watch the reasoning light up.',
        tags: ['Brain', 'Quiz', 'How I Think'],
        // Cyan-teal — slightly cooler to evoke the brain/gear circuitry.
        accentRgb: [103, 232, 249],
    })
}

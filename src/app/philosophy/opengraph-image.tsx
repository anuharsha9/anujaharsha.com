import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-template'

export const dynamic = 'force-static'
export const alt = 'Design Philosophy — As obvious as a chair | Anuja Harsha'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function Image() {
    return ogImage({
        eyebrow: 'Design Philosophy',
        title: ['As obvious', 'as a chair.'],
        subtitle: 'How I think, design, and work. The chair test, the 5 affordance laws, and the rules that govern everything I ship.',
        tags: ['Chair Test', '5 Laws', 'How I Work'],
    })
}

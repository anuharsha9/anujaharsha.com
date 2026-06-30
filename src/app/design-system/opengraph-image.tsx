import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-template'

export const dynamic = 'force-static'
export const alt = 'Design System — One language, enforced | Anuja Harsha'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function Image() {
    return ogImage({
        eyebrow: 'Build Lab · Design System',
        title: ['One language,', 'enforced.'],
        subtitle: 'Tokens, primitives, canonical components — the system that keeps the whole site speaking one language.',
        tags: ['Tokens', 'Primitives', 'Living Spec'],
    })
}

import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-template'

export const dynamic = 'force-static'
export const alt = 'Poems — Anuja Harsha Nimmagadda'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function Image() {
    return ogImage({
        eyebrow: 'Voice · 14 Poems',
        title: ['Things', 'I', 'write.'],
        subtitle: 'Fourteen poems — English and Hinglish — about mothers, daughters, sons, longing, distance, love.',
        tags: ['Poetry', 'English', 'Hinglish'],
    })
}

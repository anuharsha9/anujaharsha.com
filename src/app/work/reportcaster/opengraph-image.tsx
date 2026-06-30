import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-template'

export const dynamic = 'force-static'
export const alt = 'ReportCaster — Modernizing a 40-year-old scheduler powering 17M+ users'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function Image() {
    return ogImage({
        eyebrow: 'Case Study · Legacy Modernization',
        title: ['17M+ users.', '40 years of', 'legacy. One', 'unified hub.'],
        subtitle: 'Modernizing a 40-year-old enterprise scheduler without breaking a single customer script. Five subsystems collapsed into one.',
        tags: ['Enterprise', 'Scheduler', 'Dresner CX'],
    })
}

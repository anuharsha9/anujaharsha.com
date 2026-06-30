import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-template'

export const dynamic = 'force-static'
export const alt = 'IQ Plugin — Three AI capabilities unified into one discoverable hub'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function Image() {
    return ogImage({
        eyebrow: 'Case Study · Platform Unification',
        title: ['Three AI', 'capabilities.', 'One discoverable', 'hub.'],
        subtitle: 'NLQ, Insights, and ML unified into one IQ Plugin — +25% NLQ adoption from a single information-architecture redesign.',
        tags: ['NLQ', 'Insights', 'DSML Hub'],
        // Slightly deeper teal-cyan for the DSML theme.
        accentRgb: [34, 211, 238],
    })
}

import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://anujaharsha.com'

export const metadata: Metadata = {
    title: {
        absolute: 'Poems — Anuja Harsha Nimmagadda',
    },
    description:
        '14 poems — about mothers, daughters, sons, longing, distance, love. Written in English and Hinglish over years, kept private until now.',
    keywords: [
        'Anuja Harsha Poems',
        'Hinglish Poetry',
        'English Poetry',
        'Personal Writing',
        'Gifts from Life',
    ],
    openGraph: {
        title: 'Poems — Anuja Harsha Nimmagadda',
        description:
            '14 poems about mothers, daughters, sons, longing, distance, love — in English and Hinglish.',
        url: `${siteUrl}/poems/`,
        type: 'article',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Poems — Anuja Harsha Nimmagadda',
        description: '14 poems about mothers, daughters, sons, longing, distance, love.',
    },
    alternates: {
        canonical: `${siteUrl}/poems/`,
    },
}

export default function PoemsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>
}

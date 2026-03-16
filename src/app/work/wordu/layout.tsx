import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://anujaharsha.com'

export const metadata: Metadata = {
    title: {
        absolute: 'WordU — A Word Game by Anuja Harsha | Product Designer Portfolio',
    },
    description:
        'WordU is a fast-paced word game built as a vibe-coded side project by Anuja Harsha. Tap tiles, build words, beat the clock. A demonstration of code prototyping and playful design.',
    keywords: [
        'WordU',
        'Word Game',
        'Vibe Coding',
        'Code Prototyping',
        'Side Project',
        'Product Designer',
        'Anuja Harsha',
        'Interactive Portfolio',
    ],
    openGraph: {
        title: 'WordU — A Word Game by Anuja Harsha',
        description:
            'A fast-paced word game. Tap tiles, build words, beat the clock. Vibe-coded by Anuja Harsha.',
        url: `${siteUrl}/work/wordu/`,
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'WordU — A Word Game by Anuja Harsha',
        description:
            'Tap tiles, build words, beat the clock. A vibe-coded side project by Anuja Harsha.',
    },
    alternates: {
        canonical: `${siteUrl}/work/wordu/`,
    },
}

export default function WorduLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}

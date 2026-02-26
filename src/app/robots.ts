import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: '/private/',
            },
            {
                // Allow AI crawlers explicitly
                userAgent: 'GPTBot',
                allow: '/',
            },
            {
                userAgent: 'ChatGPT-User',
                allow: '/',
            },
            {
                userAgent: 'Google-Extended',
                allow: '/',
            },
            {
                userAgent: 'Anthropic-AI',
                allow: '/',
            },
            {
                userAgent: 'ClaudeBot',
                allow: '/',
            },
        ],
        sitemap: 'https://anujaharsha.com/sitemap.xml',
    }
}

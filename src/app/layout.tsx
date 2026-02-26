import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import PageShell from '@/components/layout/PageShell'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'
import StructuredData from '@/components/structured-data/StructuredData'
import LoadingScreen from '@/components/loading/LoadingScreen'
import { LightboxProvider } from '@/contexts/LightboxContext'
import { PdfProvider } from '@/contexts/PdfContext'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://anujaharsha.com'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Anuja Harsha Nimmagadda | Senior Product Designer',
    template: '%s | Anuja Harsha Nimmagadda',
  },
  description:
    'Senior Product Designer & Complexity Architect with 13+ years transforming high-ambiguity enterprise systems into high-impact products. Specializing in AI-Native design, vibe coding, code prototyping, and engineering empathy. Open to work.',
  keywords: [
    'Senior Product Designer',
    'Staff Product Designer',
    'Product Designer Portfolio',
    'Enterprise UX',
    'B2B Enterprise UX',
    'Design Systems',
    'Legacy Modernization',
    'Complex Systems Design',
    'Product Design',
    'User Experience Design',
    'Enterprise Software Design',
    'Data Science UX',
    'Machine Learning UX',
    'AI-Native Design',
    'AI Native UX',
    'Vibe Coding',
    'Vibe Coding Portfolio',
    'Code Prototyping',
    'High Fidelity Code Prototyping',
    'Brain Gears',
    'Brain Gear Animation',
    'Interactive Portfolio',
    'Open to Work',
    'OpenToWork',
    'Hiring Product Designer',
    'FAANG Product Designer',
    'Complexity Architect',
    'Engineering Empathy',
    'WebFOCUS',
    'ReportCaster',
    'Antigravity AI',
    'Cursor IDE',
    'Multi-Agent Workflow',
    'Anuja Harsha',
    'Anuja Harsha Nimmagadda',
    'Anuja Nimmagadda',
  ],
  authors: [{ name: 'Anuja Harsha Nimmagadda' }],
  creator: 'Anuja Harsha Nimmagadda',
  publisher: 'Anuja Harsha Nimmagadda',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Anuja Harsha Nimmagadda',
    title: 'Anuja Harsha Nimmagadda | Senior Product Designer — AI-Native, Code Prototyping, Vibe Coding',
    description:
      'Senior Product Designer & Complexity Architect with 13+ years transforming high-ambiguity enterprise systems into high-impact products. Specializing in AI-Native design, vibe coding, code prototyping. Open to work.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anuja Harsha Nimmagadda | Senior Product Designer — Open to Work',
    description:
      'Senior Product Designer & Complexity Architect. 13+ years transforming enterprise complexity into clarity. AI-Native design, vibe coding, code prototyping. Open to work.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Theme color for mobile browser chrome */}
        <meta name="theme-color" content="#0a0a0f" />
        {/* Preconnect hints for external domains (WPO) */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Favicon - Multiple formats for best compatibility */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" type="image/svg+xml" href="/anuja-sign.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={`${inter.variable} ${jetbrains.variable} font-sans antialiased`} suppressHydrationWarning>
        <LoadingScreen />
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <StructuredData type="website" />
        <StructuredData type="person" />
        <LightboxProvider>
          <PdfProvider>
            <PageShell>{children}</PageShell>
          </PdfProvider>
        </LightboxProvider>
      </body>
    </html>
  )
}

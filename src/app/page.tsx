import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

import HeroLanding from '@/components/home/HeroLanding'
import FloatingOrbs from '@/components/ui/FloatingOrbs'

/* ── Lazy-load everything below the fold ── */
const CSGBlock = dynamic(() => import('@/components/home/CSGBlock'), { ssr: true })
const TestimonialsBlock = dynamic(() => import('@/components/home/TestimonialsBlock'), { ssr: true })
const VibeCodingBlock = dynamic(() => import('@/components/home/VibeCodingBlock'), { ssr: true })
const ExtendedPortfolio = dynamic(() => import('@/components/home/ExtendedPortfolio'), { ssr: true })
const FoundationBlock = dynamic(() => import('@/components/home/FoundationBlock'), { ssr: true })
const TalkSection = dynamic(() => import('@/components/home/TalkSection'), { ssr: true })
const ScrollGear = dynamic(() => import('@/components/ui/ScrollGear'), { ssr: true })
const LifeContextStrip = dynamic(
  () => import('@/components/home/LifeContextStrip').then((m) => ({ default: m.default })),
  { ssr: true }
)

/* Re-export the milestones for LifeContextStrip props */
import {
  CSG_MILESTONES,
  CONSULTANT_MILESTONES,
  AGENCY_MILESTONES,
} from '@/components/home/LifeContextStrip'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://anujaharsha.com'

export const metadata: Metadata = {
  title: 'Anuja Harsha Nimmagadda | Senior Product Designer — AI-Native, Code Prototyping, Open to Work',
  description:
    'Senior Product Designer & Complexity Architect with 13+ years transforming high-ambiguity enterprise systems into high-impact products. Specializing in AI-Native design, vibe coding, code prototyping, and engineering empathy. Interactive Brain Gears portfolio experience. Open to work.',
  keywords: [
    'Senior Product Designer',
    'Staff Product Designer',
    'Product Designer Portfolio',
    'Enterprise UX',
    'B2B Enterprise UX',
    'AI-Native Design',
    'Vibe Coding',
    'Code Prototyping',
    'Brain Gears',
    'Brain Gear Animation',
    'Interactive Portfolio',
    'Open to Work',
    'OpenToWork',
    'Engineering Empathy',
    'Complexity Architect',
    'FAANG Product Designer',
    'Anuja Harsha',
    'Anuja Harsha Nimmagadda',
  ],
  openGraph: {
    title: 'Anuja Harsha Nimmagadda | Senior Product Designer — AI-Native, Code Prototyping, Open to Work',
    description:
      'Senior Product Designer & Complexity Architect. 13+ years transforming enterprise complexity into clarity through AI-Native design, vibe coding, and code prototyping. Open to work.',
    url: siteUrl,
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Anuja Harsha Nimmagadda - Senior Product Designer | AI-Native, Vibe Coding, Code Prototyping',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anuja Harsha Nimmagadda | Senior Product Designer — Open to Work',
    description:
      'Complexity Architect. 13+ years turning enterprise chaos into clarity. AI-Native design, vibe coding, code prototyping. Interactive Brain Gears portfolio. Open to work.',
    images: ['/images/og-image.png'],
  },
  alternates: {
    canonical: siteUrl,
  },
}

export default function Home() {
  return (
    <div className="bg-[var(--bg-cinematic)] relative">
      {/* Neural Mainframe — faint scanline overlay */}
      <div className="scanline-overlay" aria-hidden="true" />

      {/* Global Cinematic Background — Fixed to viewport for continuity */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,var(--overlay-accent-08),transparent)]" />
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '128px 128px',
          }}
        />
      </div>

      {/* Ambient depth particles — drift with scroll parallax */}
      <FloatingOrbs />

      {/* HERO — Chair philosophy → Bio → CTAs */}
      <HeroLanding />

      {/* SECTION 1 — Cloud Software Group */}
      {/* Negative margin pulls the CSG block up so it overlaps the hero bio fadeout — eliminates dead scroll zone */}
      <div id="work-overview" className="-mt-[60vh] relative z-20">
        <CSGBlock />
      </div>

      {/* SOCIAL PROOF — Testimonials */}
      <TestimonialsBlock />

      {/* LIFE CONTEXT — CSG Era */}
      <LifeContextStrip milestones={CSG_MILESTONES} />

      {/* SECTION 2 — Vibe Coding & Code Prototyping */}
      <VibeCodingBlock />

      {/* LIFE CONTEXT — Consultant Era */}
      <LifeContextStrip milestones={CONSULTANT_MILESTONES} />

      {/* SECTION 3 — Extended Portfolio 2012–2022 */}
      <ExtendedPortfolio />

      {/* LIFE CONTEXT — Agency Era */}
      <LifeContextStrip milestones={AGENCY_MILESTONES} />

      {/* FOUNDATION — Birth to 2012 */}
      <FoundationBlock />

      {/* FOOTER — Mission statement + contact */}
      <TalkSection />
      <ScrollGear />
    </div>
  )
}

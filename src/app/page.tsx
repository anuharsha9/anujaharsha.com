import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import SectionSkeleton from '@/components/ui/SectionSkeleton'

import HeroLanding from '@/components/home/HeroLanding'
import CSGBlock from '@/components/home/CSGBlock'
import HomeTabsWrapper from '@/components/home/HomeTabsWrapper'

/* ── Hero + first proof render eagerly (above the fold); everything below is lazy ── */

const TrailerTeaser = dynamic(() => import('@/components/home/TrailerTeaser'), { ssr: true })

const TestimonialsLoading = () => <SectionSkeleton height="200vh" text="LOADING PROOF MODULE" />
const TestimonialsBlock = dynamic(() => import('@/components/home/TestimonialsBlock'), { ssr: true, loading: TestimonialsLoading })

const VibeCodingLoading = () => <SectionSkeleton height="200vh" text="LOADING SKILLS MODULE" />
const VibeCodingBlock = dynamic(() => import('@/components/home/VibeCodingBlock'), { ssr: true, loading: VibeCodingLoading })

const ExtendedPortfolioLoading = () => <SectionSkeleton height="200vh" text="LOADING GALLERY MODULE" />
const ExtendedPortfolio = dynamic(() => import('@/components/home/ExtendedPortfolio'), { ssr: true, loading: ExtendedPortfolioLoading })

const FoundationLoading = () => <SectionSkeleton height="120vh" text="LOADING FOUNDATION MODULE" />
const FoundationBlock = dynamic(() => import('@/components/home/FoundationBlock'), { ssr: true, loading: FoundationLoading })

const TalkSectionLoading = () => <SectionSkeleton height="100dvh" text="LOADING CONTACT MODULE" />
const TalkSection = dynamic(() => import('@/components/home/TalkSection'), { ssr: true, loading: TalkSectionLoading })
const ScrollGear = dynamic(() => import('@/components/ui/ScrollGear'), { ssr: true })
const BlurZone = dynamic(() => import('@/components/ui/BlurZone'), { ssr: true })
/* LifeContextStrip removed from Work tab — milestones now live in Life tab's Same Time room. */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://anujaharsha.com'

export const metadata: Metadata = {
  title: 'Anuja Harsha Nimmagadda | Staff Product Designer — Enterprise Products, Legacy Modernization, AI-Native',
  description:
    'I make complex enterprise products easier to understand, use, and adopt. 13 years modernizing legacy workflows, designing AI-native experiences, and shipping data-driven platforms at scale.',
  keywords: [
    'Senior Product Designer',
    'Staff Product Designer',
    'Product Designer Portfolio',
    'Enterprise UX',
    'B2B Enterprise UX',
    'Legacy Modernization',
    'AI-Native Design',
    'Enterprise Data Platforms',
    'Data Workflow Modernization',
    'Enterprise Complexity',
    'Complex Systems Design',
    'Machine Learning UX',
    'Data Science UX',
    'Code Prototyping',
    'Systems Thinking',
    'Engineering Empathy',
    'Open to Work',    'Anuja Harsha',
    'Anuja Harsha Nimmagadda',
  ],
  openGraph: {
    title: 'Anuja Harsha Nimmagadda | Staff Product Designer — Enterprise Products, Legacy Modernization, AI-Native',
    description:
      'I make complex enterprise products easier to understand, use, and adopt. 13 years modernizing legacy workflows, designing AI-native experiences, and shipping data-driven platforms at scale.',
    url: siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anuja Harsha Nimmagadda | Staff Product Designer — Enterprise · Legacy Modernization · AI-Native',
    description:
      'I make complex enterprise products easier to understand, use, and adopt. 13 years across data-driven platforms, legacy modernization, and AI-native product experiences.',
  },
  alternates: {
    canonical: siteUrl,
  },
}

export default function Home() {
  return (
    <div className="relative">
      {/* Neural Mainframe — faint scanline overlay */}
      <div className="scanline-overlay" aria-hidden="true" />

      {/* ═══ TABBED SHELL — Work (default) vs Life. URL: /?tab=life ═══ */}
      <HomeTabsWrapper>

      {/* ═══ ZONE 1: HERO ═══
          Manages its own 135vh + sticky + scroll choreography.
          No BlurZone — hero has its own blur/scale/opacity transforms. */}
      <HeroLanding />

      {/* ═══ ZONE 2: CSG BLOCK ═══
           Negative margin pulls this zone UP into the hero zone,
           so the blur-to-sharp resolve starts while the hero is still visible.
           This creates a cinematic crossfade — hero fading out as CSG fades in. */}
      <div className="relative z-[1] mt-0 md:-mt-[50vh]">
        <BlurZone id="work-overview" containerHeight="180vh">
          <CSGBlock />
        </BlurZone>
      </div>

      {/* ═══ TRAILER TEASER — closer for warm visitors, sits right after the 3 case studies ═══ */}
      <TrailerTeaser />

      {/* ═══ ZONE 3: SOCIAL PROOF ═══
           No BlurZone here — testimonials are read-heavy and must stay sharp/fully readable
           (the blur-morph + sticky pin obscured and clipped them).
           Life milestone pills moved to the Life tab's "Same Time" room. */}
      <div id="social-proof-zone" className="relative w-full">
        <TestimonialsBlock />
      </div>

      {/* ═══ ZONE 4: VIBE CODING ═══ */}
      <BlurZone id="vibe-coding-zone" containerHeight="200vh">
        <VibeCodingBlock />
      </BlurZone>

      {/* ═══ ZONE 5: EXTENDED PORTFOLIO ═══ */}
      <BlurZone id="extended-portfolio-zone" containerHeight="130vh">
        <ExtendedPortfolio />
      </BlurZone>

      {/* ═══ ZONE 6: FOUNDATION ═══ */}
      <BlurZone id="foundation-zone" containerHeight="120vh">
        <FoundationBlock />
      </BlurZone>

      {/* ═══ ZONE 7: FOOTER ═══ */}
      <BlurZone id="footer-zone" containerHeight="100dvh">
        <TalkSection />
      </BlurZone>

      </HomeTabsWrapper>

      <ScrollGear />
    </div>
  )
}

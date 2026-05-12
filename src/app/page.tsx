import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import SectionSkeleton from '@/components/ui/SectionSkeleton'

import HeroLanding from '@/components/home/HeroLanding'

/* ── Lazy-load everything below the fold ── */
const CSGLoading = () => <SectionSkeleton height="180vh" text="LOADING WORK MODULE" />
const CSGBlock = dynamic(() => import('@/components/home/CSGBlock'), { ssr: true, loading: CSGLoading })

const TestimonialsLoading = () => <SectionSkeleton height="200vh" text="LOADING PROOF MODULE" />
const TestimonialsBlock = dynamic(() => import('@/components/home/TestimonialsBlock'), { ssr: true, loading: TestimonialsLoading })

const VibeCodingLoading = () => <SectionSkeleton height="200vh" text="LOADING SKILLS MODULE" />
const VibeCodingBlock = dynamic(() => import('@/components/home/VibeCodingBlock'), { ssr: true, loading: VibeCodingLoading })

const ExtendedPortfolioLoading = () => <SectionSkeleton height="200vh" text="LOADING GALLERY MODULE" />
const ExtendedPortfolio = dynamic(() => import('@/components/home/ExtendedPortfolio'), { ssr: true, loading: ExtendedPortfolioLoading })

const FoundationLoading = () => <SectionSkeleton height="120vh" text="LOADING FOUNDATION MODULE" />
const FoundationBlock = dynamic(() => import('@/components/home/FoundationBlock'), { ssr: true, loading: FoundationLoading })

const TalkSectionLoading = () => <SectionSkeleton height="100vh" text="LOADING CONTACT MODULE" />
const TalkSection = dynamic(() => import('@/components/home/TalkSection'), { ssr: true, loading: TalkSectionLoading })
const ScrollGear = dynamic(() => import('@/components/ui/ScrollGear'), { ssr: true })
const BlurZone = dynamic(() => import('@/components/ui/BlurZone'), { ssr: true })
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
  title: 'Anuja Harsha Nimmagadda | Senior Product Designer — Enterprise Products, Legacy Modernization, AI-Native',
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
    'UX Architect',
    'Design Strategist',
    'Design Technologist',
    'Design Engineer',
    'UX Engineer',
    'Experience Designer',
    'Data Workflow Modernization',
    'Enterprise Complexity',
    'Complex Systems Design',
    'Machine Learning UX',
    'Data Science UX',
    'Code Prototyping',
    'Systems Thinking',
    'Engineering Empathy',
    'Open to Work',
    'Complexity Architect',
    'Anuja Harsha',
    'Anuja Harsha Nimmagadda',
  ],
  openGraph: {
    title: 'Anuja Harsha Nimmagadda | Senior Product Designer — Enterprise Products, Legacy Modernization, AI-Native',
    description:
      'I make complex enterprise products easier to understand, use, and adopt. 13 years modernizing legacy workflows, designing AI-native experiences, and shipping data-driven platforms at scale.',
    url: siteUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anuja Harsha Nimmagadda | Senior Product Designer — Enterprise · Legacy Modernization · AI-Native',
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

      {/* ═══ ZONE 3: SOCIAL PROOF + LIFE CONTEXT ═══ */}
      <BlurZone id="social-proof-zone" containerHeight="200vh">
        <TestimonialsBlock />
        <LifeContextStrip milestones={CSG_MILESTONES} />
      </BlurZone>

      {/* ═══ ZONE 4: VIBE CODING ═══ */}
      <BlurZone id="vibe-coding-zone" containerHeight="200vh">
        <VibeCodingBlock />
        <LifeContextStrip milestones={CONSULTANT_MILESTONES} />
      </BlurZone>

      {/* ═══ ZONE 5: EXTENDED PORTFOLIO ═══ */}
      <BlurZone id="extended-portfolio-zone" containerHeight="200vh">
        <ExtendedPortfolio />
        <LifeContextStrip milestones={AGENCY_MILESTONES} />
      </BlurZone>

      {/* ═══ ZONE 6: FOUNDATION ═══ */}
      <BlurZone id="foundation-zone" containerHeight="120vh">
        <FoundationBlock />
      </BlurZone>

      {/* ═══ ZONE 7: FOOTER ═══ */}
      <BlurZone id="footer-zone" containerHeight="100vh">
        <TalkSection />
      </BlurZone>

      <ScrollGear />
    </div>
  )
}

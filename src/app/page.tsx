import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import SectionSkeleton from '@/components/ui/SectionSkeleton'

import HeroLanding from '@/components/home/HeroLanding'
import HomeTabsWrapper from '@/components/home/HomeTabsWrapper'

/* ── Only the hero renders eagerly. CSG + everything below is lazy.
 *    CSGBlock was previously eager — its 3 case-study tiles + wireframes +
 *    presentation lightboxes added meaningful TBT on cold load. Moving it
 *    behind dynamic() (with ssr:true so HTML still prerenders for SEO and
 *    no LCP regression) pushes the hydration cost out of the critical
 *    render path. The skeleton matches the section's ~120vh footprint so
 *    layout stays at CLS=0 while the JS chunk loads. */
const CSGLoading = () => <SectionSkeleton height="120vh" text="LOADING CASE STUDIES" />
const CSGBlock = dynamic(() => import('@/components/home/CSGBlock'), { ssr: true, loading: CSGLoading })

const TestimonialsLoading = () => <SectionSkeleton height="200vh" text="LOADING PROOF MODULE" />
const TestimonialsBlock = dynamic(() => import('@/components/home/TestimonialsBlock'), { ssr: true, loading: TestimonialsLoading })

const VibeCodingLoading = () => <SectionSkeleton height="200vh" text="LOADING SKILLS MODULE" />
const VibeCodingBlock = dynamic(() => import('@/components/home/VibeCodingBlock'), { ssr: true, loading: VibeCodingLoading })

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
           Flows directly below the hero — NO negative margin.

           History: this used to be wrapped in a BlurZone with a -50vh pull-up.
           The BlurZone blurred CSG to 40px at rest, so the pull-up read as an
           ambient ghost crossfade behind the hero. When BlurZone was removed
           (it clipped the 3rd stacked tile), the -50vh stayed — but with sharp,
           mount-visible content it rendered the CSG heading + first tile right
           on top of the fully-visible hero (z-1 behind a mostly-transparent
           z-2 hero = bleed-through). Any negative margin overlaps here, because
           at scroll 0 the hero fills the ENTIRE first viewport. So: zero margin.
           CSG starts exactly at the fold and scrolls up cleanly as the hero
           fades out above it. Predictable across browsers and viewport heights —
           no dvh/sticky/transform math to break in Safari. */}
      <div id="work-overview" className="relative z-[1]">
        <CSGBlock />
      </div>

      {/* ═══ ZONE 3: BUILD LAB (Vibe Coding) ═══
           Sits right under the CSG case studies: day-job work → what I build with AI. */}
      <BlurZone id="vibe-coding-zone" containerHeight="200vh">
        <VibeCodingBlock />
      </BlurZone>

      {/* Earlier Work (2012–2022) no longer has its own zone — it's a quiet
          "Earlier work →" link in the footer that opens a lightbox drawer.
          See ExtendedPortfolio rendered inside TalkSection. */}

      {/* ═══ ZONE 4: FOUNDATION ═══ */}
      <BlurZone id="foundation-zone" containerHeight="120vh">
        <FoundationBlock />
      </BlurZone>

      {/* ═══ ZONE 5: SOCIAL PROOF ═══
           No BlurZone — testimonials are read-heavy and must stay sharp/fully readable.
           Includes the "Why hire me — in 60 seconds" echo CTA under the marquee. */}
      <div id="social-proof-zone" className="relative w-full">
        <TestimonialsBlock />
      </div>

      {/* ═══ ZONE 6: FOOTER / LET'S TALK — includes the quiet "Earlier work →" link ═══ */}
      <BlurZone id="footer-zone" containerHeight="100dvh">
        <TalkSection />
      </BlurZone>

      </HomeTabsWrapper>

      <ScrollGear />
    </div>
  )
}

import type { Metadata } from 'next'
import HeroSplit from '@/components/home/HeroSplit'
import EnergyStack from '@/components/home/EnergyStack'
import TalkSection from '@/components/home/TalkSection'
import DesignEngineerBlock from '@/components/work/DesignEngineerBlock'
import ScrollGear from '@/components/ui/ScrollGear'
import UnifiedTimelineLayout from '@/components/home/UnifiedTimelineLayout'
import WhisperNarration from '@/components/home/WhisperNarration'
import ChapterProgress from '@/components/home/ChapterProgress'
import StoryModeWrapper from '@/components/home/StoryModeWrapper'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://anujaharsha.com'

export const metadata: Metadata = {
  title: 'Senior Product Designer | AI Orchestrator | Enterprise Systems Architect',
  description:
    'Senior Product Designer specializing in design systems architecture, legacy modernization, and AI-driven workflows. Architecting Enterprise UX through complexity and ambiguity.',
  openGraph: {
    title: 'Anuja Harsha Nimmagadda | Senior Product Designer',
    description:
      'Senior Product Designer specializing in design systems architecture, legacy modernization, and AI-driven workflows. Transforming complex systems into intuitive experiences at scale.',
    url: siteUrl,
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Anuja Harsha Nimmagadda - Senior Product Designer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Anuja Harsha Nimmagadda | Senior Product Designer',
    description:
      'Senior Product Designer specializing in code-first design systems architecture, legacy modernization, and AI-driven workflows.',
    images: ['/images/og-image.png'],
  },
}

export default function Home() {
  return (
    <StoryModeWrapper>
      <div className="bg-[#020617] relative overflow-clip">
        <ChapterProgress />
        <HeroSplit />

        {/* Whisper 1: Hero → Work */}
        <WhisperNarration text="Let me show you how I think." />

        {/* 
          THE ENERGY STACK (The 4 Era Blocks)
          Replaces WorkGrid, SocialProof, GrowthStory, Archive.
        */}
        <div id="work-overview">
          <UnifiedTimelineLayout>
            <DesignEngineerBlock />

            {/* Whisper 2: Philosophy → Proof */}
            <WhisperNarration text="13 years. One mission." />

            <EnergyStack />
          </UnifiedTimelineLayout>
        </div>


        <TalkSection />
        <ScrollGear />
      </div>
    </StoryModeWrapper>
  )
}


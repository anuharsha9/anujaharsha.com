import type { Metadata } from 'next'
import HeroSplit from '@/components/home/HeroSplit'
import EnergyStack from '@/components/home/EnergyStack'
import TalkSection from '@/components/home/TalkSection'
import ScrollGear from '@/components/ui/ScrollGear'
import UnifiedTimelineLayout from '@/components/home/UnifiedTimelineLayout'
import ChapterProgress from '@/components/home/ChapterProgress'
import StoryModeWrapper from '@/components/home/StoryModeWrapper'
import NeuralAwakening from '@/components/loading/NeuralAwakening'

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
        <NeuralAwakening />
        <ChapterProgress />
        <HeroSplit />

        {/* 
          THE ENERGY STACK (The 5 Timeline Zones)
          Zone 1: Design Engineering (2026)
          Zone 2: Cloud Software Group (2022-2025)
          Zone 3: Start-up Consultant (2017-2022)
          Zone 4: Mobile & Enterprise UX Designer (2012-2017)
          Zone 5: Foundation (1994-2012)
        */}
        <div id="work-overview">
          <UnifiedTimelineLayout>
            <EnergyStack />
          </UnifiedTimelineLayout>
        </div>

        <TalkSection />
        <ScrollGear />
      </div>
    </StoryModeWrapper>
  )
}


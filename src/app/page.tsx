import type { Metadata } from 'next'
import HeroSplit from '@/components/home/HeroSplit'
import EnergyStack from '@/components/home/EnergyStack'
import TalkSection from '@/components/home/TalkSection'
import DesignEngineerBlock from '@/components/work/DesignEngineerBlock'
import ScrollGear from '@/components/ui/ScrollGear'

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
    <div className="bg-[#020617] relative overflow-clip">
      <HeroSplit />

      {/* 
        THE ENERGY STACK (The 4 Era Blocks)
        Replaces WorkGrid, SocialProof, GrowthStory, Archive.
      */}
      <div id="work-overview">
        <DesignEngineerBlock />
        <EnergyStack />
      </div>

      <TalkSection />
      <ScrollGear />
    </div>
  )
}

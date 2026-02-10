import HeroSplit from '@/components/home/HeroSplit'
import TransformationShowcase from '@/components/home/TransformationShowcase'
import EnergyStack from '@/components/home/EnergyStack'
import TalkSection from '@/components/home/TalkSection'
import ScrollGear from '@/components/ui/ScrollGear'

export const metadata = {
    title: 'Quiz Experience | Anuja Harsha Nimmagadda',
    description: 'Experience the interactive neural network quiz.',
}

export default function QuizPage() {
    return (
        <div className="bg-[#020617] relative overflow-clip min-h-screen">
            <HeroSplit forceQuiz={true} />

            {/* Mirroring Homepage Structure for Full Testing */}
            <TransformationShowcase />
            <div id="work-overview">
                <EnergyStack />
            </div>
            <TalkSection />
            <ScrollGear />
        </div>
    )
}

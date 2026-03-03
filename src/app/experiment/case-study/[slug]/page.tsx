import { reportcasterCaseStudy } from '@/data/reportcaster'
import { mlFunctionsCaseStudy } from '@/data/ml-functions'
import { iqPluginCaseStudy } from '@/data/iq-plugin'
import CinematicCaseStudy from '@/components/case-study-experiment/CinematicCaseStudy'

export function generateStaticParams() {
    return [
        { slug: 'reportcaster' },
        { slug: 'ml-functions' },
        { slug: 'iq-plugin' }
    ]
}

export default async function ExperimentCaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;

    const getCaseStudy = (slug: string) => {
        switch (slug) {
            case 'reportcaster':
                return reportcasterCaseStudy
            case 'ml-functions':
                return mlFunctionsCaseStudy
            case 'iq-plugin':
                return iqPluginCaseStudy
            default:
                return reportcasterCaseStudy
        }
    }

    const data = getCaseStudy(resolvedParams.slug)

    return <CinematicCaseStudy data={data} />
}

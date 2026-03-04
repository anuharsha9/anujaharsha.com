import { redirect } from 'next/navigation'
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

    // ReportCaster now lives on the main route — redirect
    if (resolvedParams.slug === 'reportcaster') {
        redirect('/work/reportcaster')
    }

    const getCaseStudy = (slug: string) => {
        switch (slug) {
            case 'ml-functions':
                return mlFunctionsCaseStudy
            case 'iq-plugin':
                return iqPluginCaseStudy
            default:
                redirect('/work/reportcaster')
        }
    }

    const data = getCaseStudy(resolvedParams.slug)

    return <CinematicCaseStudy data={data} />
}

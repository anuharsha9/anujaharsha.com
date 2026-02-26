'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { featuredCaseStudies } from '@/data/home'

export default function CaseStudyNav() {
  const pathname = usePathname()
  // Handle trailing slash - filter out empty strings
  const pathParts = pathname.split('/').filter(Boolean)
  const currentSlug = pathParts[pathParts.length - 1]

  // Get all case studies for navigation
  const allCaseStudies = featuredCaseStudies

  if (allCaseStudies.length === 0) {
    return null
  }

  // Get system ID for each case study
  const getSystemId = (slug: string) => {
    if (slug === 'reportcaster') return '001'
    if (slug === 'ml-functions') return '002'
    if (slug === 'iq-plugin') return '003'
    return '000'
  }

  // Short names for nav
  const getShortTitle = (slug: string) => {
    if (slug === 'reportcaster') return 'Scheduler'
    if (slug === 'ml-functions') return 'ML'
    if (slug === 'iq-plugin') return 'DSML'
    return slug
  }

  return (
    <div className="flex items-center justify-center gap-2">
      {allCaseStudies.map((cs) => {
        const isActive = cs.slug === currentSlug

        return (
          <Link
            key={cs.slug}
            href={`/work/${cs.slug}`}
            className={`
              group flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 border transition-all duration-300 rounded-lg
              ${isActive
                ? 'bg-[var(--accent-teal)] border-[var(--accent-teal)] text-white'
                : 'bg-white/[0.04] border-white/[0.06] text-white/50 hover:border-white/[0.12] hover:bg-white/[0.06] hover:text-white/70'
              }
            `}
          >
            {/* System ID Badge */}
            <span className={`
              font-mono text-[10px] tracking-wider
              ${isActive ? 'text-white/70' : 'text-white/30 group-hover:text-white/40'}
            `}>
              {getSystemId(cs.slug)}
            </span>

            {/* Divider */}
            <span className={`
              w-px h-3
              ${isActive ? 'bg-white/30' : 'bg-white/[0.08]'}
            `} />

            {/* Title */}
            <span className={`
              text-sm font-medium
              ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white/80'}
            `}>
              {getShortTitle(cs.slug)}
            </span>
          </Link>
        )
      })}
    </div>
  )
}

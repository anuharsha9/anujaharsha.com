'use client'
import ComponentHeading from '@/components/ui/ComponentHeading'

interface FrameworkPrinciple {
  letter: string
  title: string
  description: string
}

interface FrameworkMatrixProps {
  principles: FrameworkPrinciple[]
  sectionMappings?: Record<string, string>
  caseStudyContext?: string
}

export default function FrameworkMatrix({
  principles,
  sectionMappings,
}: FrameworkMatrixProps) {

  const handleNavigation = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="py-12">
      {/* Header - Clean */}
      <ComponentHeading
        variant="block"
        align="center"
        tag="// METHODOLOGY"
        title="The D.E.S.I.G.N. Framework"
        color="teal"
        className="mb-10"
      />

      {/* The Matrix Grid - Clean & Open */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {principles.map((principle, index) => {
          const sectionId = sectionMappings?.[principle.letter]

          // Determine borders based on grid position (assuming 3 columns on large screens)
          const isLastRow = index >= principles.length - (principles.length % 3 || 3)
          // For simplicity in responsive, we'll just use simple borders and remove them on last items via CSS :last-child if needed, 
          // or just generic borders that look good. 
          // Let's use a standard bordered grid approach where every item has border-b and border-r, and we hide where needed.

          const CellWrapper = sectionId ? 'div' : 'div'

          return (
            <CellWrapper
              key={principle.letter}
              onClick={sectionId ? () => handleNavigation(sectionId) : undefined}
              className={`
                relative p-8 group transition-all duration-300
                border-b border-slate-100
                ${(index + 1) % 3 !== 0 ? 'lg:border-r' : ''} /* Right border on 1st/2nd col in LG */
                ${(index + 1) % 2 !== 0 ? 'md:max-lg:border-r' : ''} /* Right border on 1st col in MD */
                ${sectionId ? 'cursor-pointer hover:bg-slate-50/50' : ''}
              `}
            >
              {/* Letter Watermark */}
              <div className="absolute top-4 right-6 text-6xl font-extralight text-slate-100 select-none pointer-events-none group-hover:text-slate-200 transition-colors">
                {principle.letter}
              </div>

              {/* Content */}
              <div className="relative z-10 space-y-3">
                <h3 className="text-lg font-medium text-slate-900 tracking-tight group-hover:text-[var(--accent-teal)] transition-colors">
                  {principle.title}
                </h3>

                <p className="text-slate-600 text-sm leading-relaxed font-light pr-4">
                  {principle.description}
                </p>

                {/* Interaction Hint */}
                {sectionId && (
                  <div className="pt-2 flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-[var(--accent-teal)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <span>Read Section</span>
                    <span>→</span>
                  </div>
                )}
              </div>
            </CellWrapper>
          )
        })}
      </div>
    </div>
  )
}

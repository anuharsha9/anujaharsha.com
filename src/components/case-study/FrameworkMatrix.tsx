'use client'
import { motion } from 'framer-motion'

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
    <div className="py-8">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-[var(--accent-teal)] mb-4">
          Methodology
        </p>
        <h3 className="text-2xl md:text-3xl font-sans font-bold text-[var(--text-heading)] tracking-tight">
          The D.E.S.I.G.N. Framework
        </h3>
      </motion.div>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.1
            }
          }
        }}
      >
        {principles.map((principle, index) => {
          const sectionId = sectionMappings?.[principle.letter]

          return (
            <motion.div
              key={principle.letter}
              onClick={sectionId ? () => handleNavigation(sectionId) : undefined}
              variants={{
                hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
                visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
              }}
              className={`
                relative p-8 group transition-all duration-300
                border-b border-white/[0.06]
                ${(index + 1) % 3 !== 0 ? 'lg:border-r lg:border-white/[0.06]' : ''}
                ${(index + 1) % 2 !== 0 ? 'md:max-lg:border-r md:max-lg:border-white/[0.06]' : ''}
                ${sectionId ? 'cursor-pointer hover:bg-white/[0.02]' : ''}
              `}
            >
              {/* Letter watermark */}
              <div className="absolute top-4 right-6 text-6xl font-extralight text-white/[0.04] select-none pointer-events-none group-hover:text-white/[0.08] transition-colors duration-300">
                {principle.letter}
              </div>

              {/* Content */}
              <div className="relative z-10 space-y-3">
                <h3 className="text-lg font-medium text-[var(--text-heading)] tracking-tight group-hover:text-[var(--accent-teal)] transition-colors duration-300">
                  {principle.title}
                </h3>

                <p className="text-[var(--text-body)] text-sm leading-relaxed font-light pr-4">
                  {principle.description}
                </p>

                {/* Interaction hint */}
                {sectionId && (
                  <div className="pt-2 flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-[var(--accent-teal)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <span>Read Section</span>
                    <span>→</span>
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}

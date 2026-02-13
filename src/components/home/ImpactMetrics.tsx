'use client'
import { motion } from 'framer-motion'
import AnimatedCounter from '@/components/ui/AnimatedCounter'
import { getTheme, spacing } from '@/lib/design-system'

const metrics = [
  {
    value: '50+',
    label: 'Projects Shipped',
    source: 'Work archive & experience'
  },
  {
    value: '25M+',
    label: 'Users on WebFOCUS',
    source: 'MartechCube, 2022',
    sourceUrl: 'https://www.martechcube.com/ibi-webfocus-wins-2022-best-product-for-business-intelligence/'
  },
  {
    value: 'Fortune 500',
    label: 'Enterprise Clients',
    isText: true,
    source: 'IBM, Nestlé, Cigna, Humana & more',
    sourceUrl: 'https://6sense.com/tech/data-analysis/webfocus-market-share'
  },
  {
    value: 'Best-in-Class',
    label: '2025 Dresner Award',
    isText: true,
    source: 'Dresner Advisory Services',
    sourceUrl: 'https://www.ibi.com/press-releases/2025/ibi-webfocus-named-best-in-class-in-dresner-advisory-services-2025-industry-excellence-awards'
  },
]

// Small gear SVG component
function GearIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66Z" />
    </svg>
  )
}

export default function ImpactMetrics() {
  const t = getTheme(true)
  return (
    <section className="py-section-mobile md:py-section-tablet">
      <div className={`${spacing.containerFull}`}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-space-4 md:gap-space-6"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative"
            >
              {/* Card */}
              <div className={`relative ${t.bgAlt} border ${t.border} rounded-2xl p-space-5 md:p-space-6 text-center hover:border-slate-300 hover:shadow-lg transition-all duration-300`}>
                {/* Rotating Gear Accent */}
                <motion.div
                  className="mx-auto mb-space-4 w-10 h-10 md:w-12 md:h-12 text-[var(--accent-teal)]/60"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20 + index * 5,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                >
                  <GearIcon className="w-full h-full" />
                </motion.div>

                {/* Value */}
                <div className={`font-mono font-bold ${t.text} mb-space-1 ${metric.isText
                  ? 'text-base md:text-lg'
                  : 'text-2xl md:text-3xl'
                  }`}>
                  {metric.isText ? (
                    metric.value
                  ) : (
                    <AnimatedCounter value={metric.value} duration={1.5 + index * 0.2} />
                  )}
                </div>

                {/* Label */}
                <p className={`font-mono text-[10px] md:text-xs ${t.textMuted} uppercase tracking-widest`}>
                  {metric.label}
                </p>

                {/* Source tooltip on hover */}
                {metric.source && (
                  <div className="absolute -bottom-space-2 left-1/2 -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto z-10">
                    <div className={`${t.bg} border ${t.border} rounded-lg shadow-lg px-space-3 py-space-2 whitespace-nowrap`}>
                      {metric.sourceUrl ? (
                        <a
                          href={metric.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`font-mono text-[10px] ${t.textMuted} hover:text-[var(--accent-teal)] transition-colors`}
                        >
                          Source: {metric.source} ↗
                        </a>
                      ) : (
                        <span className={`font-mono text-[10px] ${t.textMuted}`}>
                          Source: {metric.source}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

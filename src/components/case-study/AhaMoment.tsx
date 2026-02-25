'use client'

import { motion } from 'framer-motion'
import { getTheme } from '@/lib/design-system'
import { withHexAlpha } from '@/lib/color-utils'

interface AhaMomentProps {
  children: React.ReactNode
  isLightBackground?: boolean
}

export default function AhaMoment({ children, isLightBackground = false }: AhaMomentProps) {
  const t = getTheme(isLightBackground)

  return (
    <motion.div
      className={`${t.bgAccent} border-l-4 p-6 my-6 shadow-sm`}
      style={{ borderLeftColor: t.accentVar, borderLeftWidth: '4px' }}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          <div className="w-6 h-6 flex items-center justify-center" style={{ backgroundColor: withHexAlpha(t.accentVar, '20') }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={t.textAccent}>
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        <p className={`${t.text} text-base md:text-lg leading-relaxed italic`}>{children}</p>
      </div>
    </motion.div>
  )
}

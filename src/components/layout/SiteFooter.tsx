'use client'

import Link from 'next/link'
import SignatureLogo from '@/components/brand/SignatureLogo'
import { getTheme, spacing } from '@/lib/design-system'

export default function SiteFooter() {
  const currentYear = new Date().getFullYear()
  const t = getTheme(true)

  return (
    <footer className={`${t.monitor.bg} border-t ${t.monitor.border}`}>
      <div className={`${spacing.containerFull} py-space-4 sm:py-space-5`}>
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-3">

          {/* Logo + Name */}
          <Link
            href="/"
            className="flex items-center gap-2.5 hover:opacity-80 transition-opacity duration-300 group"
          >
            <div className="w-6 h-6 flex-shrink-0">
              <SignatureLogo className={`w-full h-full ${t.monitor.text} group-hover:text-[var(--accent-teal)] transition-colors duration-300`} />
            </div>
            <span className={`${t.monitor.textMuted} text-xs font-medium`}>
              Anuja Harsha
            </span>
          </Link>

          {/* Credit */}
          <p className={`${t.monitor.textDim} text-[11px] tracking-wide opacity-40`} suppressHydrationWarning>
            © {currentYear} · Designed + AI-Orchestrated
          </p>

        </div>
      </div>
    </footer>
  )
}


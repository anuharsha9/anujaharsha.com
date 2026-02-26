'use client'

interface LockedContentProps {
  children: React.ReactNode
  isUnlocked?: boolean
  onUnlock?: () => void
  password?: string
  caseStudySlug?: string
  unlockMessage?: string
  isLightBackground?: boolean
  fullWidth?: boolean
  className?: string
}

// All content is now fully unlocked — no password gate
export default function LockedContent({ children }: LockedContentProps) {
  return <>{children}</>
}

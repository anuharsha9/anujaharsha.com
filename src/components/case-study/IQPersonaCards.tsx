'use client'

import { Telescope, TrendingUp, Beaker, Terminal } from 'lucide-react'
import PersonaCards from './PersonaCards'

interface IQPersonaCardsProps {
  isLightBackground?: boolean
  title?: string
  description?: string
}

export default function IQPersonaCards({
  isLightBackground = false,
  title = 'User Personas',
  description = '2 personas created from scratch. 2 inherited from existing research. All 4 mapped into the unified system.'
}: IQPersonaCardsProps) {
  return (
    <PersonaCards
      isLightBackground={isLightBackground}
      title={title}
      description={description}
      accentColor="violet"
      personas={[
        {
          name: 'Tech Visionary',
          type: 'TECHNICAL',
          icon: Telescope,
          description: 'Needs direct model parameter access and keyboard-first navigation.',
        },
        {
          name: 'Financial Strategist',
          type: 'BUSINESS',
          icon: TrendingUp,
          description: 'Needs one-click insight generation and plain-language explanations.',
        },
        {
          name: 'Analytics Innovator',
          type: 'DEVELOPER',
          icon: Beaker,
          description: 'Needs consistent component behavior and debuggable error states.',
        },
        {
          name: 'Techy Analyst',
          type: 'POWER USER',
          icon: Terminal,
          description: 'Needs self-service workflows and shareable, repeatable queries.',
        },
      ]}
      insightText={
        <>
          Four personas, one interface. Solution: <strong className="font-medium text-[var(--text-heading)]">layered progressive disclosure</strong> that surfaces simplicity by default while keeping power accessible on demand.
        </>
      }
    />
  )
}

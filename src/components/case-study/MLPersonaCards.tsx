'use client'

import { Code, Briefcase } from 'lucide-react'
import PersonaCards from './PersonaCards'

interface MLPersonaCardsProps {
  isLightBackground?: boolean
}

export default function MLPersonaCards({ isLightBackground = false }: MLPersonaCardsProps) {
  return (
    <PersonaCards
      isLightBackground={isLightBackground}
      title="User Personas"
      description="Two distinct user types drove the dual-experience approach."
      accentColor="teal"
      personas={[
        {
          name: 'Techy Analyst',
          type: 'TECHNICAL',
          icon: Code,
          description: 'Self-sufficient power users who need right-click entry and advanced controls.',
        },
        {
          name: 'Financial Strategist',
          type: 'BUSINESS',
          icon: Briefcase,
          description: 'Goal-oriented users who need guided workflows and plain-language explanations.',
        },
      ]}
      insightText={
        <>
          <span className="font-medium text-[var(--text-heading)]">Dual-experience approach</span>: Technical users get right-click entry + advanced controls. Business users get guided workflows + inline teaching.
        </>
      }
    />
  )
}

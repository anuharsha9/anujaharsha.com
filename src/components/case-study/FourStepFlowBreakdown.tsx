'use client'

import { getTheme } from '@/lib/design-system'

interface FourStepFlowBreakdownProps {
  isLightBackground?: boolean
}

export default function FourStepFlowBreakdown({ isLightBackground = false }: FourStepFlowBreakdownProps) {
  const t = getTheme(isLightBackground)
  const subtleBorder = isLightBackground ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.15)'

  const steps = [
    { number: 1, title: 'Problem Type', description: 'What kind of problem is this?', details: ['Classification vs regression', 'Choose prediction type'], userBenefit: 'Clear starting point' },
    { number: 2, title: 'Target', description: 'What are we trying to predict?', details: ['Select target variable', 'Example: customer attrition'], userBenefit: 'Defines the goal' },
    { number: 3, title: 'Predictors', description: 'Which fields help us predict that target?', details: ['Choose features and data', 'Select relevant predictors'], userBenefit: 'Builds the model foundation' },
    { number: 4, title: 'Hyperparameters', description: 'Optional tuning for experts', details: ['Advanced configuration', 'Previously hidden post-training', 'Now honest and transparent'], userBenefit: 'Expert control when needed', optional: true },
  ]

  const oldFlow = ['Drag "model pill" onto data flow', 'Configure in popup', 'Notice tiny toolbar play icon', 'Face confusing "results not generated" errors']

  return (
    <div className={`${t.bg} border ${t.border} p-8 md:p-12 rounded-2xl`}>
      <div className="space-y-8">
        <div className="text-center space-y-3">
          <h3 className={`${t.text} text-2xl md:text-3xl font-serif`}>The 4-Step Guided Flow</h3>
          <p className={`${t.textMuted} text-base md:text-lg max-w-2xl mx-auto`}>
            A key moment with the Principal Data Scientist: &quot;What do you absolutely need to train a model responsibly?&quot; Answer → problem type, target, predictors, hyperparameters. That became the spine of the UX.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((s, i) => (
            <div key={i} className={`${t.cardBg} border-2 p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg rounded-xl`} style={{ borderColor: s.optional ? `${t.accentVar}60` : `${t.accentVar}40` }}>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 rounded-lg" style={{ backgroundColor: t.accentVar }}>
                    {s.number}
                  </div>
                  <div className="flex-1">
                    <h4 className={`${t.text} text-lg font-semibold`}>
                      Step {s.number}: {s.title}
                      {s.optional && <span className={`${t.textMuted} text-xs font-normal ml-2`}>(Optional)</span>}
                    </h4>
                    <p className={`${t.textMuted} text-sm mt-1`}>{s.description}</p>
                  </div>
                </div>
                <ul className="space-y-2 pl-16">
                  {s.details.map((d, j) => (
                    <li key={j} className={`${t.textMuted} text-sm leading-relaxed flex items-start gap-2`}>
                      <span className={`${t.textAccent} font-bold flex-shrink-0 mt-0.5`}>•</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
                <div className={`${t.bg} p-3 border-l-4 pl-3 ml-16 rounded-r-lg`} style={{ borderLeftColor: t.accentVar }}>
                  <p className={`${t.textMuted} text-xs italic`}>
                    <span className={`font-semibold ${t.textAccent}`}>Benefit:</span> {s.userBenefit}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className={`${t.cardBg} border-2 p-6 rounded-xl`} style={{ borderColor: subtleBorder }}>
            <h4 className={`${t.text} text-lg font-semibold mb-4`}>Old Fragmented Flow</h4>
            <ul className="space-y-2">
              {oldFlow.map((item, i) => (
                <li key={i} className={`${t.textMuted} text-sm flex items-start gap-2`}>
                  <span className={`${t.textAccent} mt-1`}>×</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={`${t.cardBg} border-2 p-6 rounded-xl`} style={{ borderColor: `${t.accentVar}60` }}>
            <h4 className={`text-lg font-semibold mb-4 ${t.textAccent}`}>New Guided Flow</h4>
            <p className={`${t.textMuted} text-sm leading-relaxed mb-3`}>
              The workflow is honest and linear: you see what you&apos;re about to train, and you decide how deep you want to go.
            </p>
            <p className={`${t.textMuted} text-xs italic`}>
              &quot;This flow works for both a data scientist and a non-technical user. It teaches without dumbing things down.&quot; — Principal Data Scientist
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import ImageLightbox from './ImageLightbox'
import { getTheme } from '@/lib/design-system'

interface WorkflowStep {
  number: number
  src: string
  alt: string
  caption: string
  description?: string
}

interface WorkflowPrototypeProps {
  title: string
  description?: string
  steps: WorkflowStep[]
  workflowType: 'train' | 'run'
  isLightBackground?: boolean
}

export default function WorkflowPrototype({ title, description, steps, workflowType, isLightBackground = true }: WorkflowPrototypeProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string; caption?: string } | null>(null)
  const t = getTheme(true) // Always use light theme

  // Use design tokens for styling
  const imageShadow = 'shadow-[var(--shadow-md)]'
  const imageOutline = 'outline outline-1 outline-[var(--border-subtle)] outline-offset-[-1px]'
  const buttonBg = 'bg-[var(--bg-tertiary)] hover:bg-[var(--border-primary)]'

  const openLightbox = (src: string, alt: string, caption?: string) => setLightboxImage({ src, alt, caption })
  const closeLightbox = () => setLightboxImage(null)

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  useEffect(() => {
    if (steps && Array.isArray(steps) && steps.length > 0) {
      if (currentStep >= steps.length || currentStep < 0) setCurrentStep(0)
    }
  }, [currentStep, steps])

  const goToStep = (stepIndex: number) => {
    setCurrentStep(Math.max(0, Math.min(stepIndex, steps.length - 1)))
    if (isPlaying) {
      setIsPlaying(false)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  const startAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsPlaying(true)
    let stepIndex = currentStep

    intervalRef.current = setInterval(() => {
      stepIndex++
      if (stepIndex >= steps.length) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
        setIsPlaying(false)
        setCurrentStep(0)
      } else {
        setCurrentStep(stepIndex)
      }
    }, 3000)
  }

  const stopAutoPlay = () => {
    setIsPlaying(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const workflowElement = document.querySelector('[data-workflow-prototype]')
      if (!workflowElement) return

      const rect = workflowElement.getBoundingClientRect()
      const isInView = rect.top < window.innerHeight && rect.bottom > 0
      if (!isInView) return

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          if (currentStep > 0) prevStep()
          break
        case 'ArrowRight':
          e.preventDefault()
          if (currentStep < steps.length - 1) nextStep()
          break
        case 'Home':
          e.preventDefault()
          goToStep(0)
          break
        case 'End':
          e.preventDefault()
          goToStep(steps.length - 1)
          break
        case ' ':
          e.preventDefault()
          if (isPlaying) stopAutoPlay()
          else startAutoPlay()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, steps.length, isPlaying])

  if (!steps || !Array.isArray(steps) || steps.length === 0) {
    return (
      <div className="p-4 border border-red-500">
        <p className="text-red-500 text-sm">Workflow prototype has no valid steps</p>
      </div>
    )
  }

  const safeCurrentStep = Math.max(0, Math.min(currentStep, steps.length - 1))
  const currentStepData = steps[safeCurrentStep]
  if (!currentStepData) return null

  return (
    <div className="space-y-6" data-workflow-prototype>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className={`${t.textMuted} text-xs font-mono uppercase tracking-wider`}>{workflowType === 'train' ? 'Train Model' : 'Run Model'} Workflow</span>
          <div className={`h-px flex-1 ${t.divider}`}></div>
        </div>
        <h3 className={`${t.text} text-2xl md:text-3xl font-sans`}>{title}</h3>
        {description && <p className={`${t.textMuted} text-base leading-relaxed max-w-3xl`}>{description}</p>}
        <p className={`${t.textMuted} text-xs mt-2`}>Keyboard shortcuts: ← → to navigate, Space to play/pause, Home/End to jump to first/last step</p>
      </div>

      <div className={`${t.bg} border ${t.border} p-6 md:p-8`} role="region" aria-label={`${workflowType === 'train' ? 'Train Model' : 'Run Model'} workflow prototype`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className={`${t.textMuted} text-sm font-mono`}>Step {currentStep + 1} of {steps.length}</span>
            <div className="h-2 flex-1 max-w-xs bg-[var(--border-primary)] overflow-hidden">
              <div className="h-full bg-[var(--accent-teal)] transition-all duration-300 ease-in-out" style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            {!isPlaying ? (
              <button onClick={startAutoPlay} aria-label="Start auto-play workflow" className={`${buttonBg} ${t.text} px-4 py-2 text-sm font-medium transition-all`}>
                ▶ Auto-play
              </button>
            ) : (
              <button onClick={stopAutoPlay} aria-label="Pause auto-play workflow" className={`${buttonBg} ${t.text} px-4 py-2 text-sm font-medium transition-all`}>
                ⏸ Pause
              </button>
            )}
          </div>
        </div>

        <div className="relative mb-6">
          <div
            className={`relative w-full  overflow-hidden border ${t.border} ${imageShadow} ${imageOutline} cursor-pointer hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-[var(--accent-teal)] focus:ring-offset-2`}
            onClick={() => openLightbox(currentStepData.src, currentStepData.alt, currentStepData.caption)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(currentStepData.src, currentStepData.alt, currentStepData.caption) } }}
            tabIndex={0}
            role="button"
            aria-label={`View ${currentStepData.alt} in fullscreen`}
          >
            <Image src={currentStepData.src} alt={currentStepData.alt} width={1200} height={800} className="w-full h-auto object-contain bg-white/5" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px" priority={currentStep === 0} />
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2">
              <span className={`${t.text} font-semibold`}>
                {currentStepData.number}. {currentStepData.caption}
              </span>
            </div>
            {currentStepData.description && <p className={`${t.textMuted} text-sm leading-relaxed`}>{currentStepData.description}</p>}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <button onClick={prevStep} disabled={currentStep === 0} aria-label="Go to previous step" className={`${buttonBg} ${t.text} px-6 py-3 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}>
            ← Previous
          </button>

          <div className="flex items-center gap-2 flex-1 justify-center max-w-md overflow-x-auto px-4">
            {steps.map((_, index) => (
              <button key={index} onClick={() => goToStep(index)} className={`w-2 h-2 transition-all ${index === currentStep ? 'bg-[var(--accent-teal)] w-8' : 'bg-[var(--border-secondary)] hover:bg-[var(--text-muted)]'}`} aria-label={`Go to step ${index + 1}`} />
            ))}
          </div>

          <button onClick={nextStep} disabled={currentStep === steps.length - 1} aria-label="Go to next step" className={`${buttonBg} ${t.text} px-6 py-3 font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}>
            Next →
          </button>
        </div>

        <details className="mt-6">
          <summary className={`${t.text} text-sm font-medium cursor-pointer list-none`}>View all steps ({steps.length})</summary>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {steps.map((step, index) => (
              <button key={index} onClick={() => goToStep(index)} className={`text-left p-3 border transition-all ${index === currentStep ? 'border-[var(--accent-teal)] bg-[var(--accent-teal)]/10' : `${t.border} ${t.bg} hover:opacity-90`}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-mono ${index === currentStep ? 'text-[var(--accent-teal)]' : t.textMuted}`}>{step.number}</span>
                  <span className={`text-xs ${index === currentStep ? t.text : t.textMuted} font-medium`}>{step.caption}</span>
                </div>
              </button>
            ))}
          </div>
        </details>
      </div>

      {lightboxImage && <ImageLightbox isOpen={!!lightboxImage} onClose={closeLightbox} imageSrc={lightboxImage.src} imageAlt={lightboxImage.alt} imageCaption={lightboxImage.caption} />}
    </div>
  )
}

import { motion } from 'framer-motion'
import { LayoutDashboard, Users, FileText, Settings, Layers } from 'lucide-react'

// Easing for cinematic feel
const easeCinematic = [0.16, 1, 0.3, 1]

const TOOLS = [
  { id: 't1', icon: LayoutDashboard, color: 'var(--semantic-cyan)', label: 'Analytics' },
  { id: 't2', icon: Users, color: 'var(--semantic-orange)', label: 'CRM' },
  { id: 't3', icon: FileText, color: 'var(--semantic-emerald)', label: 'Content' },
  { id: 't4', icon: Settings, color: 'var(--semantic-purple)', label: 'Admin' },
]

export function Scene3Unified({ progress }: { progress: number }) {
  // Phase 1 (0-0.4): Four disparate tools scattered
  // Phase 2 (0.4-0.7): Pulling together
  // Phase 3 (0.7-1.0): Unified platform
  const t = Math.max(0, Math.min(1, (progress - 0.2) / 0.6))
  const easeT = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2 // cubic ease in out

  const isUnified = progress > 0.7

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Header Text */}
      <motion.div
        className="text-center mb-24 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: easeCinematic }}
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-zinc-300 tracking-tight leading-tight max-w-3xl">
          <span className="text-[var(--accent-teal-bright)] font-medium">Data-driven systems design.</span><br />
          Cruising through four complex tools, but it seamlessly feels like one.
        </h2>
      </motion.div>

      {/* The Visual Metaphor */}
      <div className="relative w-full max-w-[600px] h-[300px] flex items-center justify-center">
        {/* The 4 scattered tools */}
        {TOOLS.map((tool, i) => {
          // Calculate scatter positions
          const angle = (i / TOOLS.length) * Math.PI * 2 + Math.PI / 4
          const radius = 140
          const startX = Math.cos(angle) * radius
          const startY = Math.sin(angle) * radius

          // Merge to center
          const x = startX * (1 - easeT)
          const y = startY * (1 - easeT)
          
          // Fade out as they merge
          const opacity = 1 - Math.pow(easeT, 4)

          return (
            <motion.div
              key={tool.id}
              className="absolute flex flex-col items-center justify-center gap-3 p-4 rounded-xl border"
              style={{
                width: 120,
                height: 120,
                x,
                y,
                opacity,
                background: `color-mix(in srgb, ${tool.color} 8%, rgba(0,0,0,0.4))`,
                borderColor: `color-mix(in srgb, ${tool.color} 30%, transparent)`,
                boxShadow: `0 8px 32px color-mix(in srgb, ${tool.color} 10%, transparent)`,
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              <tool.icon className="w-8 h-8" style={{ color: tool.color }} />
              <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
                {tool.label}
              </span>
            </motion.div>
          )
        })}

        {/* The Unified Platform */}
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border"
          style={{
            background: 'rgba(20, 184, 166, 0.05)',
            borderColor: 'rgba(20, 184, 166, 0.3)',
            boxShadow: '0 0 60px rgba(20, 184, 166, 0.15)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: isUnified ? 1 : 0, 
            scale: isUnified ? 1 : 0.8,
          }}
          transition={{ duration: 0.8, ease: easeCinematic }}
        >
          <div className="w-full h-full flex flex-col p-6 gap-6 relative overflow-hidden">
            {/* Unified UI Mockup */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <Layers className="w-6 h-6 text-[var(--accent-teal-bright)]" />
                <div className="h-4 w-24 bg-white/20 rounded-full" />
              </div>
              <div className="flex gap-2">
                {[1, 2, 3].map(j => (
                  <div key={j} className="h-2 w-8 bg-white/10 rounded-full" />
                ))}
              </div>
            </div>
            
            <div className="flex flex-1 gap-6">
              {/* Sidebar */}
              <div className="w-1/4 h-full flex flex-col gap-3">
                {[1, 2, 3, 4].map(j => (
                  <div key={j} className="h-3 w-full bg-white/10 rounded-full" />
                ))}
              </div>
              
              {/* Main Content Area */}
              <div className="flex-1 h-full grid grid-cols-2 gap-4">
                <div className="col-span-2 h-1/2 rounded-xl bg-gradient-to-br from-[var(--accent-teal)] to-[var(--semantic-cyan)] opacity-20" />
                <div className="h-full rounded-xl bg-white/5 border border-white/5" />
                <div className="h-full rounded-xl bg-white/5 border border-white/5" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

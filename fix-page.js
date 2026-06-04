const fs = require('fs');
const path = './src/app/manifesto/page.tsx';
const content = fs.readFileSync(path, 'utf8');

const scene3Index = content.indexOf('// ═══════════════════════════════════════════════════════════════════════════\n// Scene 3: The Blueprint');
const scene2Index = content.indexOf('// ═══════════════════════════════════════════════════════════════════════════\n// Scene 2: Core Philosophy');

if (scene2Index !== -1 && scene3Index !== -1) {
  const before = content.substring(0, scene2Index);
  const after = content.substring(scene3Index);
  
  const newScene2 = `// ═══════════════════════════════════════════════════════════════════════════
// Scene 2: Core Philosophy - The Monolith (15s – 25s)
// ═══════════════════════════════════════════════════════════════════════════

const BLOCKS = [
  { id: 0, type: 'noise', start: { l: 0, t: 0, w: 33.33, h: 33.33 }, label: 'ID_394' },
  { id: 1, type: 'essential', start: { l: 33.33, t: 0, w: 33.33, h: 33.33 }, end: { l: 0, t: 50, w: 50, h: 25 }, label: 'Users' },
  { id: 2, type: 'noise', start: { l: 66.66, t: 0, w: 33.33, h: 33.33 }, label: 'Legacy' },
  { id: 3, type: 'essential', start: { l: 0, t: 33.33, w: 33.33, h: 33.33 }, end: { l: 50, t: 50, w: 50, h: 25 }, label: 'Analytics' },
  { id: 4, type: 'essential', start: { l: 33.33, t: 33.33, w: 33.33, h: 33.33 }, end: { l: 0, t: 0, w: 100, h: 50 }, label: 'Dashboard Overview' },
  { id: 5, type: 'essential', start: { l: 66.66, t: 33.33, w: 33.33, h: 33.33 }, end: { l: 0, t: 75, w: 50, h: 25 }, label: 'Settings' },
  { id: 6, type: 'noise', start: { l: 0, t: 66.66, w: 33.33, h: 33.33 }, label: 'SYS_01' },
  { id: 7, type: 'essential', start: { l: 33.33, t: 66.66, w: 33.33, h: 33.33 }, end: { l: 50, t: 75, w: 50, h: 25 }, label: 'Security' },
  { id: 8, type: 'noise', start: { l: 66.66, t: 66.66, w: 33.33, h: 33.33 }, label: 'NULL' },
]

const mapRange = (value: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
  const t = Math.max(0, Math.min(1, (value - inMin) / (inMax - inMin)))
  // Ease in-out quad
  const easeT = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
  return outMin + (outMax - outMin) * easeT
}

function Scene2Philosophy({ progress }: { progress: number }) {
  const t = Math.max(0, Math.min(1, (progress - 0.3) / 0.3))
  const easeT = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
      <motion.div
        className="text-center mb-12 md:mb-16 z-10"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease }}
      >
        <KineticLine
          className="text-xl sm:text-2xl md:text-4xl font-light text-zinc-300 tracking-tight"
          emphasisWords={['walls', 'move', 'monoliths', 'streamlined']}
          emphasisClass="text-[var(--accent-teal-bright)] font-medium"
        >
          I don't just paint walls—I move them.
        </KineticLine>
        <motion.p
          className="mt-6 text-sm sm:text-base md:text-lg text-zinc-500 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: progress > 0.15 ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        >
          From 40-year-old monoliths into streamlined workflows.
        </motion.p>
      </motion.div>

      <div className="relative w-full max-w-[400px] sm:max-w-[500px] aspect-square mx-auto">
        {BLOCKS.map((block) => {
          const left = block.type === 'essential' ? mapRange(progress, 0.3, 0.6, block.start.l, block.end.l) : block.start.l
          const top = block.type === 'essential' ? mapRange(progress, 0.3, 0.6, block.start.t, block.end.t) : block.start.t
          const width = block.type === 'essential' ? mapRange(progress, 0.3, 0.6, block.start.w, block.end.w) : block.start.w
          const height = block.type === 'essential' ? mapRange(progress, 0.3, 0.6, block.start.h, block.end.h) : block.start.h

          const isNoise = block.type === 'noise'
          const xFly = isNoise ? (block.id % 3 === 0 ? -1 : 1) * (easeT * 100) : 0
          const yFly = isNoise ? (block.id < 3 ? -1 : 1) * (easeT * 100) : 0
          const opacity = isNoise ? 1 - easeT : 1
          const scale = isNoise ? 1 - easeT * 0.5 : 1

          const padding = mapRange(progress, 0.3, 0.6, 1, 8)
          const radius = mapRange(progress, 0.3, 0.6, 0, 16)
          
          const bgR = 30 + (255 - 30) * easeT
          const bgG = 30 + (255 - 30) * easeT
          const bgB = 30 + (255 - 30) * easeT
          const bgA = 1 - 0.97 * easeT
          
          const borderR = 50 + (255 - 50) * easeT
          const borderG = 50 + (255 - 50) * easeT
          const borderB = 50 + (255 - 50) * easeT
          const borderA = 1 - 0.9 * easeT

          return (
            <div
              key={block.id}
              className="absolute transition-none"
              style={{
                left: \`\${left}%\`,
                top: \`\${top}%\`,
                width: \`\${width}%\`,
                height: \`\${height}%\`,
                padding: \`\${padding}px\`,
                opacity: opacity,
                transform: \`translate(\${xFly}px, \${yFly}px) scale(\${scale})\`,
                zIndex: isNoise ? 0 : 10,
              }}
            >
              <div
                className="w-full h-full flex items-center justify-center overflow-hidden relative"
                style={{
                  borderRadius: \`\${radius}px\`,
                  background: \`rgba(\${bgR}, \${bgG}, \${bgB}, \${bgA})\`,
                  border: \`1px solid rgba(\${borderR}, \${borderG}, \${borderB}, \${borderA})\`,
                  backdropFilter: easeT > 0.5 ? 'blur(12px)' : 'none',
                }}
              >
                <span 
                  className="absolute font-mono text-[8px] sm:text-[10px] text-zinc-500 uppercase tracking-widest whitespace-nowrap"
                  style={{ opacity: 1 - easeT }}
                >
                  {block.label}
                </span>

                {block.type === 'essential' && (
                  <div 
                    className="absolute inset-0 flex flex-col p-4 gap-2"
                    style={{ opacity: easeT }}
                  >
                    <div className="w-1/3 h-2 rounded-full bg-white/20" />
                    {block.id === 4 && (
                      <div className="w-full flex-1 rounded-md bg-gradient-to-tr from-[var(--accent-teal)] to-transparent opacity-20" />
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

`;

  fs.writeFileSync(path, before + newScene2 + after);
  console.log('Fixed Scene 2 successfully!');
} else {
  console.log('Could not find Scene boundaries!');
}

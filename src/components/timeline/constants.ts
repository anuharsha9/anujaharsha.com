import { Code2, Zap } from 'lucide-react'

// ─── Icon map for skill badges ──────────────────────────────────────────────────
export const SKILL_ICONS: Record<string, React.ElementType> = {
    code: Code2,
    zap: Zap,
}

// Tags per era for the cinematic tag pills
export const ERA_TAGS: Record<string, string[]> = {
    'design-engineering': [],
    'csg-architect': [],
    'csg-testimonials': [],
    'consultant-tech': [],
    'agency-startup': [],
    'origin-story': [],
}

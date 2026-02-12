import { cn } from "@/lib/design-system"

type HeadingVariant = 'section' | 'block' | 'detail'
type HeadingColor = 'teal' | 'blue' | 'indigo' | 'slate' | 'red' | 'amber' | 'marketing'

interface ComponentHeadingProps {
    tag?: string
    title: string
    description?: string | React.ReactNode
    variant?: HeadingVariant
    color?: HeadingColor | string // semantic color or raw tailwind class (for backward compat)
    className?: string
    align?: 'left' | 'center' // Strict alignment options
}

export default function ComponentHeading({
    tag,
    title,
    description,
    variant = 'block',
    color = 'teal',
    className,
    align = 'left'
}: ComponentHeadingProps) {

    // 1. Resolve Semantic Colors
    const getColorClass = (c: string) => {
        const colors: Record<string, string> = {
            teal: "text-[var(--accent-teal)]",
            blue: "text-blue-600",
            indigo: "text-indigo-600",
            slate: "text-slate-500",
            red: "text-red-600",
            amber: "text-amber-600",
            marketing: "text-slate-900"
        }
        return colors[c] || c // Fallback to raw class if not found
    }
    const colorClass = getColorClass(color)

    // 2. Define Typography & Spacing based on Variant
    const styles = {
        section: {
            container: "mb-8 md:mb-12",
            tag: "text-sm font-medium tracking-wider mb-6 text-slate-500 uppercase",
            title: "text-5xl md:text-6xl lg:text-7xl font-serif font-light leading-[1.05] tracking-tight mb-8 text-slate-900",
            desc: "text-xl md:text-2xl font-light text-slate-500 leading-relaxed max-w-7xl",
        },
        block: {
            container: "mb-12 md:mb-16",
            tag: "text-xs font-medium tracking-wider mb-3 text-slate-500 uppercase",
            title: "text-3xl md:text-4xl font-serif font-light leading-tight mb-4 text-slate-900",
            desc: "text-lg font-light text-slate-500 leading-relaxed max-w-3xl",
        },
        detail: {
            container: "mb-6 md:mb-8",
            tag: "text-[10px] font-bold tracking-wider mb-2 text-slate-400 uppercase",
            title: "text-xl md:text-2xl font-serif font-medium leading-snug mb-2 text-slate-900",
            desc: "text-base font-normal text-slate-500 leading-relaxed max-w-2xl",
        }
    }

    const currentStyle = styles[variant]

    return (
        <div className={cn(
            "flex flex-col group relative",
            currentStyle.container,
            align === 'center' ? "items-center text-center mx-auto" : "items-start text-left",
            className
        )}>
            {/* Tag / Eyebrow */}
            {tag && (
                <span className={cn(
                    "uppercase transition-colors duration-300 text-slate-500",
                    currentStyle.tag
                )}>
                    {tag.replace(/^\/\/\s*/, '')}
                </span>
            )}

            {/* Main Title */}
            <h2 className={cn(
                "text-slate-900 text-balance",
                currentStyle.title
            )}>
                {title}
            </h2>

            {/* Description */}
            {description && (
                <div className={cn(
                    currentStyle.desc,
                    "text-balance" // Nice wrapping
                )}>
                    {typeof description === 'string' ? <p>{description}</p> : description}
                </div>
            )}
        </div>
    )
}

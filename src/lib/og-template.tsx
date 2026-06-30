import { ImageResponse } from 'next/og'
import { staticPalette } from '@/lib/design-system'

/**
 * Shared Open Graph image template — the on-brand canvas every route's
 * social card sits on. Each route's `opengraph-image.tsx` calls
 * `ogImage(preset)` so the system stays consistent (dark cinematic field
 * + aurora wave + teal glow + the hairline frame) while the route-specific
 * eyebrow / headline / subtitle / accent vary.
 *
 * Why this exists: Awwwards jurors and recruiters share URLs on
 * Twitter/LinkedIn — the OG card is often the first impression. Without
 * per-route overrides every share looked identical. This makes /quiz read
 * as the brain experience, /design-system as the spec, each case study
 * as itself.
 */
export const OG_SIZE = { width: 1200, height: 630 } as const
export const OG_CONTENT_TYPE = 'image/png'

export interface OgPreset {
    eyebrow: string            // mono caps line, e.g. "CASE STUDY · LEGACY MODERNIZATION"
    title: string[]            // 1–2 lines, big gradient text
    subtitle: string           // sentence, the page's promise in plain English
    tags?: string[]            // optional 2–3 mono caps tags
    /** Accent RGB triplet — drives the glow + name gradient. Defaults to teal. */
    accentRgb?: [number, number, number]
}


export function ogImage(preset: OgPreset) {
    const accentRgb = preset.accentRgb ?? [45, 212, 191] // default teal
    const [r, g, b] = accentRgb
    const titleGradient = `linear-gradient(120deg, rgb(${Math.min(r + 130, 255)},${Math.min(g + 30, 255)},${Math.min(b + 30, 255)}) 0%, rgb(${r},${g},${b}) 100%)`

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    backgroundColor: staticPalette.surfaceCharcoal950,
                    padding: '74px 80px',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Aurora glow — top-right circular tint. */}
                <div
                    style={{
                        display: 'flex',
                        position: 'absolute',
                        top: -140,
                        right: -90,
                        width: 580,
                        height: 580,
                        borderRadius: '50%',
                        background: `radial-gradient(circle, rgba(${r},${g},${b},0.14) 0%, rgba(${r},${g},${b},0) 70%)`,
                    }}
                />
                {/* Aurora waves — bottom of the canvas. Use `top` math (not
                    `bottom`) because Satori doesn't position SVG with bottom
                    reliably; 630 canvas - 380 svg = 250 puts the SVG flush bottom. */}
                <svg
                    width="1200"
                    height="380"
                    viewBox="0 0 1200 380"
                    style={{ position: 'absolute', left: 0, top: 250 }}
                >
                    <path d={`M0,230 C 240,160 420,300 660,230 C 880,166 1000,160 1200,220 L1200,380 L0,380 Z`} fill={`rgba(${r},${g},${b},0.06)`} />
                    <path d={`M0,200 C 220,140 400,260 640,200 C 860,144 980,140 1200,190`} fill="none" stroke={`rgba(${r},${g},${b},0.16)`} strokeWidth="1.5" />
                    <path d={`M0,258 C 260,188 440,328 700,258 C 940,194 1040,198 1200,248`} fill="none" stroke={`rgba(${r},${g},${b},0.32)`} strokeWidth="2.5" />
                    <path d={`M0,308 C 280,238 460,366 720,308 C 980,244 1080,248 1200,298`} fill="none" stroke={`rgba(${r},${g},${b},0.16)`} strokeWidth="2" />
                </svg>

                <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
                    <div
                        style={{
                            display: 'flex',
                            fontSize: 21,
                            fontWeight: 600,
                            letterSpacing: '0.28em',
                            textTransform: 'uppercase',
                            color: `rgb(${Math.min(r + 60, 255)},${Math.min(g + 60, 255)},${Math.min(b + 60, 255)})`,
                        }}
                    >
                        {preset.eyebrow}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: 20 }}>
                        {preset.title.map((line, i) => (
                            <div
                                key={i}
                                style={{
                                    display: 'flex',
                                    fontSize: 76,
                                    fontWeight: 800,
                                    letterSpacing: '-0.025em',
                                    lineHeight: 1.05,
                                    backgroundImage: titleGradient,
                                    backgroundClip: 'text',
                                    color: 'transparent',
                                }}
                            >
                                {line}
                            </div>
                        ))}
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            fontSize: 25,
                            fontWeight: 400,
                            color: staticPalette.neutralZinc300,
                            marginTop: 28,
                            lineHeight: 1.4,
                            maxWidth: 880,
                        }}
                    >
                        {preset.subtitle}
                    </div>

                    {preset.tags && preset.tags.length > 0 && (
                        <div
                            style={{
                                display: 'flex',
                                gap: 16,
                                marginTop: 30,
                                fontSize: 15,
                                fontWeight: 500,
                                letterSpacing: '0.12em',
                                textTransform: 'uppercase',
                                color: staticPalette.neutralZinc400,
                            }}
                        >
                            {preset.tags.map((t, i) => (
                                <span key={i} style={{ display: 'flex' }}>
                                    {i > 0 && <span style={{ color: staticPalette.neutralZinc600, marginRight: 16 }}>·</span>}
                                    {t}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                <div
                    style={{
                        display: 'flex',
                        position: 'absolute',
                        bottom: 50,
                        right: 80,
                        fontSize: 20,
                        fontWeight: 500,
                        letterSpacing: '0.06em',
                        color: `rgb(${Math.min(r + 60, 255)},${Math.min(g + 60, 255)},${Math.min(b + 60, 255)})`,
                        zIndex: 1,
                    }}
                >
                    anujaharsha.com
                </div>

                <div
                    style={{
                        display: 'flex',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        border: '1px solid rgba(255,255,255,0.06)',
                    }}
                />
            </div>
        ),
        { ...OG_SIZE }
    )
}

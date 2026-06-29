import { ImageResponse } from 'next/og'
import { staticPalette } from '@/lib/design-system'

export const dynamic = 'force-static'

export const alt = 'Anuja Harsha Nimmagadda | Staff Product Designer — Enterprise · Legacy Modernization · AI-Native'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Social card — the site's "wave" theme + the gradient name. Typographic
 * (no avatar): dark cinematic field, teal aurora waves along the bottom, and
 * the name in the signature teal gradient. Shared by opengraph + twitter
 * (twitter-image re-exports this).
 */
export default async function Image() {
    const nameGradient = 'linear-gradient(120deg, #ccfbf1 0%, #5eead4 34%, #2dd4bf 68%, #14b8a6 100%)'

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
                {/* teal glow */}
                <div
                    style={{
                        display: 'flex',
                        position: 'absolute',
                        top: -140,
                        right: -90,
                        width: 580,
                        height: 580,
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(45,212,191,0.12) 0%, rgba(45,212,191,0) 70%)',
                    }}
                />

                {/* aurora waves along the bottom */}
                <svg width="1200" height="380" viewBox="0 0 1200 380" style={{ position: 'absolute', left: 0, bottom: 0 }}>
                    <path d="M0,230 C 240,160 420,300 660,230 C 880,166 1000,160 1200,220 L1200,380 L0,380 Z" fill="rgba(45,212,191,0.06)" />
                    <path d="M0,200 C 220,140 400,260 640,200 C 860,144 980,140 1200,190" fill="none" stroke="rgba(20,184,166,0.16)" strokeWidth="1.5" />
                    <path d="M0,258 C 260,188 440,328 700,258 C 940,194 1040,198 1200,248" fill="none" stroke="rgba(45,212,191,0.32)" strokeWidth="2.5" />
                    <path d="M0,308 C 280,238 460,366 720,308 C 980,244 1080,248 1200,298" fill="none" stroke="rgba(94,234,212,0.16)" strokeWidth="2" />
                </svg>

                {/* content */}
                <div style={{ display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
                    <div
                        style={{
                            display: 'flex',
                            fontSize: 21,
                            fontWeight: 600,
                            letterSpacing: '0.28em',
                            textTransform: 'uppercase',
                            color: '#5eead4',
                        }}
                    >
                        Staff / Senior Product Designer
                    </div>

                    {/* gradient name */}
                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: 20 }}>
                        <div
                            style={{
                                display: 'flex',
                                fontSize: 94,
                                fontWeight: 800,
                                letterSpacing: '-0.03em',
                                lineHeight: 1.02,
                                backgroundImage: nameGradient,
                                backgroundClip: 'text',
                                color: 'transparent',
                            }}
                        >
                            Anuja Harsha
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                fontSize: 94,
                                fontWeight: 800,
                                letterSpacing: '-0.03em',
                                lineHeight: 1.06,
                                backgroundImage: nameGradient,
                                backgroundClip: 'text',
                                color: 'transparent',
                            }}
                        >
                            Nimmagadda
                        </div>
                    </div>

                    {/* tagline */}
                    <div
                        style={{
                            display: 'flex',
                            fontSize: 27,
                            fontWeight: 400,
                            color: staticPalette.neutralZinc300,
                            marginTop: 28,
                            lineHeight: 1.4,
                            maxWidth: 860,
                        }}
                    >
                        I make complex enterprise products easier to understand, use, and adopt.
                    </div>

                    {/* skills */}
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
                        <span>Enterprise Products</span>
                        <span style={{ color: staticPalette.neutralZinc600 }}>·</span>
                        <span>Legacy Modernization</span>
                        <span style={{ color: staticPalette.neutralZinc600 }}>·</span>
                        <span>AI-Native</span>
                    </div>
                </div>

                {/* url */}
                <div
                    style={{
                        display: 'flex',
                        position: 'absolute',
                        bottom: 50,
                        right: 80,
                        fontSize: 20,
                        fontWeight: 500,
                        letterSpacing: '0.06em',
                        color: '#5eead4',
                        zIndex: 1,
                    }}
                >
                    anujaharsha.com
                </div>

                {/* hairline border */}
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
        { ...size }
    )
}

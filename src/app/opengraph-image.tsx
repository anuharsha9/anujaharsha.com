import { ImageResponse } from 'next/og'
export const dynamic = 'force-static'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { staticPalette } from '@/lib/design-system'

export const alt = 'Anuja Harsha Nimmagadda | Senior Product Designer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
    // Read avatar as base64 for embedding
    // Note: file is actually JPEG despite .png extension
    const avatarBuffer = await readFile(join(process.cwd(), 'public/images/og-avatar.png'))
    // Detect actual format from magic bytes
    const isJpeg = avatarBuffer[0] === 0xFF && avatarBuffer[1] === 0xD8
    const mimeType = isJpeg ? 'image/jpeg' : 'image/png'
    const avatarBase64 = `data:${mimeType};base64,${avatarBuffer.toString('base64')}`

    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: staticPalette.surfaceCharcoal950,
                    padding: '60px 80px',
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                {/* Subtle grid background */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage:
                            `linear-gradient(${staticPalette.overlayWhite02} 1px, transparent 1px), linear-gradient(90deg, ${staticPalette.overlayWhite02} 1px, transparent 1px)`,
                        backgroundSize: '40px 40px',
                    }}
                />

                {/* Subtle emerald glow behind avatar */}
                <div
                    style={{
                        position: 'absolute',
                        top: 80,
                        right: 60,
                        width: 500,
                        height: 500,
                        borderRadius: '50%',
                        background: `radial-gradient(circle, ${staticPalette.overlayEmerald05} 0%, transparent 70%)`,
                    }}
                />

                {/* ── Left: Text content ──────────────── */}
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, position: 'relative', zIndex: 1 }}>
                    {/* Name */}
                    <div
                        style={{
                            fontSize: 48,
                            fontWeight: 700,
                            color: staticPalette.white,
                            letterSpacing: '-0.02em',
                            lineHeight: 1.15,
                        }}
                    >
                        Anuja Harsha
                    </div>
                    <div
                        style={{
                            fontSize: 48,
                            fontWeight: 700,
                            color: staticPalette.white,
                            letterSpacing: '-0.02em',
                            lineHeight: 1.15,
                        }}
                    >
                        Nimmagadda
                    </div>

                    {/* Title */}
                    <div
                        style={{
                            fontSize: 20,
                            fontWeight: 400,
                            color: staticPalette.neutralZinc300,
                            marginTop: 14,
                        }}
                    >
                        Senior Product Designer
                    </div>

                    {/* Separator */}
                    <div
                        style={{
                            width: 400,
                            height: 1,
                            backgroundColor: staticPalette.overlayWhite12,
                            marginTop: 24,
                        }}
                    />

                    {/* Skills tags */}
                    <div
                        style={{
                            display: 'flex',
                            gap: 20,
                            marginTop: 18,
                            fontSize: 12,
                            fontWeight: 500,
                            color: staticPalette.neutralZinc400,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase' as const,
                        }}
                    >
                        <span>Enterprise Products</span>
                        <span style={{ color: staticPalette.neutralZinc600 }}>·</span>
                        <span>Legacy Modernization</span>
                        <span style={{ color: staticPalette.neutralZinc600 }}>·</span>
                        <span>AI-Native Design</span>
                    </div>

                    {/* Tagline */}
                    <div
                        style={{
                            fontSize: 15,
                            fontWeight: 400,
                            color: staticPalette.neutralZinc400,
                            marginTop: 22,
                            lineHeight: 1.7,
                            maxWidth: 480,
                        }}
                    >
                        I make complex enterprise products easier
                        to understand, use, and adopt.
                    </div>

                    {/* URL */}
                    <div
                        style={{
                            fontSize: 13,
                            fontWeight: 400,
                            color: staticPalette.neutralZinc500,
                            marginTop: 40,
                            letterSpacing: '0.05em',
                        }}
                    >
                        anujaharsha.com
                    </div>
                </div>

                {/* ── Right: Avatar ──────────────────── */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        zIndex: 1,
                        marginLeft: 40,
                    }}
                >
                    {/* Glow ring behind avatar */}
                    <div
                        style={{
                            position: 'absolute',
                            width: 340,
                            height: 340,
                            borderRadius: '50%',
                            border: `1px solid ${staticPalette.overlayWhite06}`,
                        }}
                    />
                    {/* Avatar image */}
                    <img
                        src={avatarBase64}
                        alt=""
                        width={300}
                        height={300}
                        style={{
                            borderRadius: '50%',
                            border: `2px solid ${staticPalette.overlayWhite10}`,
                            objectFit: 'cover',
                        }}
                    />
                </div>

                {/* Outer border */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        border: `1px solid ${staticPalette.overlayWhite06}`,
                    }}
                />
            </div>
        ),
        { ...size }
    )
}

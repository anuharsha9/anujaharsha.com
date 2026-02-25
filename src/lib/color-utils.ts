/**
 * Color helpers for design-token based styles.
 * Uses CSS color-mix so alpha overlays work with both hex colors and CSS variables.
 */
export function withAlpha(color: string, alpha: number): string {
  const safeAlpha = Math.max(0, Math.min(1, alpha))
  const percentage = Number((safeAlpha * 100).toFixed(1))
  return `color-mix(in srgb, ${color} ${percentage}%, transparent)`
}

export function withHexAlpha(color: string, hexAlpha: string): string {
  const normalized = hexAlpha.replace('#', '').slice(0, 2)
  const parsed = Number.parseInt(normalized, 16)
  if (Number.isNaN(parsed)) {
    return withAlpha(color, 1)
  }
  return withAlpha(color, parsed / 255)
}

/** @type {import('next').NextConfig} */
const isProduction = process.env.NODE_ENV === 'production'

/* Static export (`output: 'export'`) means Next.js's `headers()` /
 * `redirects()` runtime hooks are unavailable — the artifact is plain
 * HTML/JS in `out/` and gets served by S3 + CloudFront. Security and
 * cache headers belong at the CloudFront response-headers-policy +
 * S3 metadata layer, NOT here.
 *
 * Headers to configure at CloudFront (recommended baseline):
 *   - Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
 *   - X-Content-Type-Options: nosniff
 *   - Referrer-Policy: strict-origin-when-cross-origin
 *   - X-Frame-Options: SAMEORIGIN
 *   - Permissions-Policy: camera=(), microphone=(), geolocation=()
 *   - Cache-Control: public, max-age=31536000, immutable    (for /_next/static/**)
 *   - Cache-Control: public, max-age=3600                   (for HTML)
 *   - Cache-Control: public, max-age=31536000, immutable    (for /videos/**, /images/**)
 *
 * A CloudFront response-headers-policy + cache-policy pair handles all
 * of this declaratively. See AWS docs: cloudfront/latest/DeveloperGuide
 * /understanding-response-headers-policies.html
 */

const nextConfig = {
  reactStrictMode: true,
  // TypeScript errors fail the build (was previously `true` — flipped after
  // auditing all 26 surfaced errors and fixing them: broken StoryDeck import,
  // missing `heroTitle` references, `string | undefined` narrowings, and the
  // `article.url` typo. Keep this strict from here on.)
  typescript: {
    ignoreBuildErrors: false,
  },
  // Only enable static export for production builds (dev needs server routes
  // for HMR, the /screenshot dev-only target, etc.)
  ...(isProduction ? { output: 'export' } : {}),
  images: {
    unoptimized: true, // Required for static export — S3 serves raw images.
  },
  trailingSlash: true, // Helps with S3 routing
  compress: true,
  poweredByHeader: false,
  turbopack: {
    // Silence multiple lockfile root inference by pinning the root
    root: __dirname,
  },
}

module.exports = nextConfig

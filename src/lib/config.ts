/**
 * Site-wide configuration constants.
 *
 * SITE_URL is the single source of truth for the canonical origin — used by
 * metadata (canonical/openGraph/twitter), the sitemap, and JSON-LD structured
 * data. Previously this line was duplicated verbatim in 10 files; one drifted
 * copy would have silently produced mismatched canonicals.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://anujaharsha.com'

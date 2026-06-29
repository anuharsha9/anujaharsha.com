'use client'

import { useEffect } from 'react'

/**
 * /me is retired. The personal surface is now the Life tab on the home page
 * (everything that lived here — the poem, graphic design, paintings, photos —
 * is on the Life tab). This route redirects to /?tab=life so any old links or
 * bookmarks land on the single personal surface instead of a duplicate page.
 */
export default function MeRedirect() {
    useEffect(() => {
        window.location.replace('/?tab=life')
    }, [])

    return (
        <main className="flex min-h-screen items-center justify-center bg-[var(--bg-cinematic)] px-6 text-center">
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-zinc-400">
                Taking you to the Life tab&hellip;{' '}
                <a href="/?tab=life" className="text-[var(--accent-teal)] underline">continue</a>
            </p>
        </main>
    )
}

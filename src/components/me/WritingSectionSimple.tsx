'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { getTheme, spacing } from '@/lib/design-system'
import { articleLinks } from '@/data/home'

export default function WritingSectionSimple() {
    const t = getTheme(false) // Light theme for Me page typically

    return (
        <section className="py-16 md:py-24 border-t border-slate-100 bg-white">
            <div className={`${spacing.containerFull}`}>
                <div className="grid md:grid-cols-[1fr,2fr] gap-12">
                    <div className="space-y-6">
                        <div>
                            <h2 className="font-serif text-3xl md:text-4xl text-slate-900 mb-4">Writing</h2>
                            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                                A collection of thoughts on Medium, highlighting my personal journey and design philosophy.
                            </p>
                        </div>
                        <a
                            href="https://medium.com/@anu.anuja"
                            target="_blank"
                            className="inline-flex items-center gap-2 text-[var(--accent-teal)] font-medium text-sm hover:underline"
                        >
                            <span>Read all 12+ articles on Medium</span>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </div>

                    <div className="space-y-10">
                        {articleLinks.map((article) => (
                            <a
                                key={article.title}
                                href={article.href}
                                target="_blank"
                                className="block group"
                            >
                                <div className="flex items-baseline justify-between gap-4 mb-2">
                                    <h3 className="text-xl font-serif text-slate-900 group-hover:text-[var(--accent-teal)] transition-colors">
                                        {article.title}
                                    </h3>
                                    <span className="shrink-0 text-[10px] font-mono uppercase tracking-widest text-slate-400">
                                        {article.readTime || '5 min'}
                                    </span>
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed mb-3">
                                    Topic: {article.topic}
                                </p>
                            </a>
                        ))}

                        <div className="pt-4 border-t border-slate-100 md:hidden">
                            <a
                                href="https://medium.com/@anu.anuja"
                                target="_blank"
                                className="inline-flex items-center gap-2 text-[var(--accent-teal)] font-medium text-sm"
                            >
                                <span>View all articles</span>
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

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
                {/* Header Area */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
                    <div className="max-w-2xl">
                        <span className="font-mono text-xs text-[var(--accent-teal)] uppercase tracking-widest mb-2 block">
                            {'//'} THOUGHT_LEADERSHIP
                        </span>
                        <h2 className="font-serif text-3xl md:text-4xl text-slate-900 mb-4">Writing</h2>
                        <p className="text-slate-600 text-base leading-relaxed">
                            A collection of thoughts on Medium, highlighting my personal journey, design philosophy, and machine learning UX.
                        </p>
                    </div>

                    <a
                        href="https://medium.com/@anu.anuja"
                        target="_blank"
                        className="hidden md:inline-flex items-center gap-2 text-[var(--accent-teal)] font-medium text-sm hover:underline"
                    >
                        <span>View all articles on Medium</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>

                {/* Article Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articleLinks.map((article, i) => (
                        <motion.a
                            key={article.title}
                            href={article.href}
                            target="_blank"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                            className="group flex flex-col justify-between bg-white border border-slate-200 rounded-2xl p-6 md:p-8 hover:shadow-xl hover:border-[var(--accent-teal)]/30 transition-all duration-300 h-full relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
                                <svg className="w-5 h-5 text-[var(--accent-teal)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent-teal)] bg-[var(--accent-teal)]/5 px-2 py-1 rounded border border-[var(--accent-teal)]/10">
                                        {article.topic}
                                    </span>
                                    <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                                        {article.readTime || '5 MIN READ'}
                                    </span>
                                </div>

                                <h3 className="font-serif text-xl text-slate-900 group-hover:text-[var(--accent-teal)] transition-colors line-clamp-3 leading-tight">
                                    {article.title}
                                </h3>
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-slate-400 group-hover:text-[var(--accent-teal)] transition-colors">
                                <span className="text-xs font-mono uppercase tracking-widest">Read Article</span>
                                <div className="w-8 h-[1px] bg-current transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                            </div>
                        </motion.a>
                    ))}
                </div>

                {/* Mobile View All Link */}
                <div className="mt-8 md:hidden text-center">
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
        </section>
    )
}

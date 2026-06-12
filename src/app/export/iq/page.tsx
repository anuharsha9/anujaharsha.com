import React from 'react'
import Image from 'next/image'
import { iqPluginCaseStudy } from '@/data/iq-plugin'

import DSMLFullContent from '@/components/case-study-experiment/DSMLFullContent'

export default function IQExportPage() {
    const data = iqPluginCaseStudy;

    return (
        <div className="max-w-[1440px] mx-auto px-8 py-20" data-cs-theme="dsml">
            {/* HERO */}
            <div className="mb-20 text-center">
                <h1 className="text-4xl font-bold mb-6 text-white">{data.title}</h1>
                <div className="flex justify-center items-center gap-4 text-sm font-mono uppercase tracking-widest text-zinc-400">
                    <span className="text-[var(--cs-accent)] font-bold">{data.role}</span>
                    <span>•</span>
                    <span>{data.company}</span>
                    <span>•</span>
                    <span>{data.timeframe}</span>
                </div>
                {data.coverImage && (
                    <div className="mt-12 rounded-2xl overflow-hidden border border-white/10 w-full max-w-5xl mx-auto no-break">
                        <Image src={data.coverImage.src} alt={data.coverImage.alt} width={1920} height={1080} className="w-full object-cover" />
                    </div>
                )}
            </div>

            {/* PRESENTATION STORY */}
            <div className="mb-24 page-break">
                <div className="max-w-4xl mx-auto space-y-16">
                    <div className="mb-12 border-b border-white/10 pb-4">
                        <h2 className="text-2xl font-bold text-white uppercase tracking-widest">Executive Summary</h2>
                    </div>
                    {data.presentation?.slides?.map((slide, i) => (
                        <div key={i} className="no-break border border-white/5 bg-white/[0.02] p-8 rounded-2xl">
                            <h3 className="text-xl font-bold text-[var(--cs-accent)] mb-4 uppercase tracking-wider">{slide.title}</h3>
                            <ul className="space-y-3">
                                {slide.content.map((point, j) => (
                                    <li key={j} className="text-zinc-300 leading-relaxed list-disc list-inside">{point}</li>
                                ))}
                            </ul>
                            {slide.notes && (
                                <p className="mt-6 pt-4 border-t border-white/10 text-sm text-zinc-500 italic">
                                    &quot;{slide.notes}&quot;
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* FULL CONTENT */}
            <div className="page-break">
                <div className="mb-12 border-b border-white/10 pb-4 max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold text-white uppercase tracking-widest">Deep Dive</h2>
                </div>
                {/* Note: DSMLFullContent requires the theme to be dsml. Using DSMLFullContent for IQ plugin. */}
                <DSMLFullContent data={data} />
            </div>
        </div>
    )
}

'use client'

import { motion } from 'framer-motion'
import { ReflectionData } from '@/types/caseStudy'
import TerminalInsight from './TerminalInsight'

interface CaseStudyReflectionProps {
    data: ReflectionData
    isLightBackground?: boolean
}

export default function CaseStudyReflection({ data, isLightBackground = true }: CaseStudyReflectionProps) {
    if (!data) return null;

    return (
        <div className="space-y-16">
            {/* Voice of the Team */}
            <div className="space-y-8">
                <div className="flex items-center gap-4">
                    <h3 className="text-2xl font-serif text-slate-900">Voice of the Team</h3>
                    <div className="h-px bg-slate-200 flex-1" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {data.people.map((person) => (
                        <div key={person.id} className="space-y-4">
                            <p className="text-slate-600 text-base italic leading-relaxed">
                                &ldquo;{person.quote}&rdquo;
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                                    {person.initials}
                                </div>
                                <div>
                                    <div className="text-slate-900 text-sm font-bold">{person.name}</div>
                                    <div className="text-slate-500 text-xs uppercase tracking-wide">{person.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Retrospective - Terminal Block */}
            <div className="mt-16 w-full">
                <TerminalInsight
                    title="project_retrospective.md"
                >
                    <div className="space-y-10">
                        {/* What I'd Push Harder For - Highlighted */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-amber-500">
                                <span className="text-lg">➔</span>
                                <h4 className="text-amber-100 text-sm font-extrabold uppercase tracking-widest truncate">
                                    {data.retrospective.pushHarder.subtitle}
                                </h4>
                            </div>
                            <div className="pl-8 border-l border-white/10">
                                <p className="text-slate-300 text-sm md:text-base leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: data.retrospective.pushHarder.content }}
                                />
                            </div>
                        </div>

                        {/* What I'd Do Next */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-[var(--accent-teal)]">
                                <span className="text-lg">➔</span>
                                <h4 className="text-teal-100 text-sm font-bold uppercase tracking-widest truncate">
                                    {data.retrospective.doNext.subtitle}
                                </h4>
                            </div>
                            <div className="pl-8 border-l border-white/10">
                                <p className="text-slate-300 text-sm md:text-base leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: data.retrospective.doNext.content }}
                                />
                            </div>
                        </div>
                    </div>
                </TerminalInsight>
            </div>
        </div>
    )
}

import React from 'react';
import { Microscope, Zap, ArrowRight, Lightbulb } from 'lucide-react';
import ComponentHeading from '@/components/ui/ComponentHeading';

interface ResearchDecision {
    insight: string;
    evidence: string;
    decision: string;
    feature: string;
}

interface ResearchDecisionMapProps {
    data: ResearchDecision[];
    theme?: 'light' | 'dark';
}

export const ResearchDecisionMap: React.FC<ResearchDecisionMapProps> = ({ data, theme = 'light' }) => {
    if (!data) return null;

    const isDark = theme === 'dark';

    return (

        <div className={`w-full max-w-5xl mx-auto ${isDark ? '' : 'my-24'} relative space-y-12`}>
            {isDark ? (
                <div className="mb-0">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="w-2 h-2 rounded-full bg-violet-500" />
                        <span className="text-violet-500 text-xs uppercase tracking-widest font-bold">
                            Research Phase
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                        Research & Validation
                    </h2>

                    <div className="h-1 w-20 bg-zinc-800 rounded-full" />
                </div>
            ) : (
                <>
                    <ComponentHeading
                        variant="block"
                        tag="// RESEARCH_LOG"
                        title="Research & Validation"
                        description="Key insights that drove product decisions and the features that validated them."
                        color="violet"
                        align="center"
                        className=""
                    />
                    <div className="absolute top-24 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-teal)]/40 to-transparent" />
                </>
            )}

            <div className={`grid grid-cols-1 md:grid-cols-12 gap-8 ${isDark ? 'pt-0' : 'pt-4'}`}>
                {data.map((item, idx) => (
                    <div key={idx} className={`md:col-span-6 group relative p-8 border hover:border-[var(--accent-teal)] transition-all duration-300 rounded-2xl shadow-sm hover:shadow-md ${isDark
                        ? 'bg-white/5 border-white/10'
                        : 'bg-white border-slate-200'
                        }`}>
                        <div className={`absolute top-4 right-4 group-hover:text-[var(--accent-amber)] transition-colors ${isDark ? 'text-slate-600' : 'text-slate-200'
                            }`}>
                            <Lightbulb className="w-8 h-8 md:w-12 md:h-12" />
                        </div>

                        <div className="mb-6 relative z-10">
                            <div className="flex items-center gap-2 mb-3">
                                <Microscope className="w-4 h-4 text-violet-500" />
                                <span className="text-violet-500 text-xs uppercase tracking-widest font-semibold">Insight</span>
                            </div>
                            <p className={`text-xl font-light leading-snug pr-8 ${isDark ? 'text-zinc-100' : 'text-slate-900'
                                }`}>
                                "{item.insight}"
                            </p>
                            <p className="text-xs text-slate-400 mt-2 font-mono">
                                Source: {item.evidence}
                            </p>
                        </div>

                        <div className={`w-full h-[1px] my-6 group-hover:bg-[var(--accent-teal)]/30 transition-colors ${isDark ? 'bg-white/10' : 'bg-slate-100'
                            }`} />

                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-3">
                                <Zap className="w-4 h-4 text-emerald-500" />
                                <span className="text-emerald-500 text-xs uppercase tracking-widest font-semibold">Product Decision</span>
                            </div>
                            <p className={`leading-relaxed mb-4 ${isDark ? 'text-zinc-300' : 'text-slate-600'
                                }`}>
                                {item.decision}
                            </p>

                            <div className={`inline-flex items-center gap-2 px-3 py-1.5 border text-xs font-medium rounded-full ${isDark
                                ? 'bg-blue-500/20 border-blue-500/30 text-blue-200'
                                : 'bg-blue-50 border-blue-100 text-blue-700'
                                }`}>
                                <ArrowRight className="w-3 h-3" />
                                Shipped Feature: {item.feature}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

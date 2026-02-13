import React from 'react';
import { AlertTriangle, XCircle, CheckCircle2, GitCommit } from 'lucide-react';
import ComponentHeading from '@/components/ui/ComponentHeading';

interface KeyDecision {
    decision: string;
    rationale: string;
    tradeoff: string;
    rejectedOption: string;
}

interface KeyDecisionsProps {
    data: KeyDecision[];
    theme?: 'light' | 'dark';
}

export default function KeyDecisions({ data, theme = 'light' }: KeyDecisionsProps) {
    if (!data) return null;

    const isDark = theme === 'dark';

    return (

        <div className={`w-full ${isDark ? '' : 'py-16 md:py-24'}`}>
            <div className={`max-w-[1440px] mx-auto ${isDark ? '' : 'px-4 md:px-8'}`}>

                {isDark ? (
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-2 h-2 rounded-full bg-blue-500" />
                            <span className="text-blue-500 text-xs uppercase tracking-widest font-bold">
                                Decision Phase
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                            Key Strategic Decisions
                        </h2>

                        <div className="h-1 w-20 bg-zinc-800 rounded-full" />
                    </div>
                ) : (
                    <ComponentHeading
                        tag="// ARCHITECTURE_LOG"
                        title="Architectural Decision Records"
                        description="Key structural choices where user needs and technical constraints collided."
                        color="teal"
                        align="center"
                        className="mb-20"
                    />
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 relative">
                    {/* Vertical Line for Desktop - Adjust opacity for dark mode */}
                    <div className={`hidden md:block absolute top-0 bottom-0 left-1/3 w-px bg-gradient-to-b from-transparent via-current to-transparent ${isDark ? 'opacity-5 text-blue-500' : 'opacity-10 text-slate-300'}`} />
                    <div className={`hidden md:block absolute top-0 bottom-0 right-1/3 w-px bg-gradient-to-b from-transparent via-current to-transparent ${isDark ? 'opacity-5 text-blue-500' : 'opacity-10 text-slate-300'}`} />

                    {data.map((item, idx) => (
                        <div key={idx} className="group relative flex flex-col gap-6">
                            {/* Header */}
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                    <span className={`font-mono text-xs px-2 py-1 rounded border uppercase tracking-wider ${isDark
                                        ? 'text-blue-300 bg-blue-900/30 border-blue-800'
                                        : 'text-teal-600 bg-teal-50 border-teal-100'
                                        }`}>
                                        Decision {String(idx + 1).padStart(2, '0')}
                                    </span>
                                    <div className={`h-px w-full flex-1 transition-colors ${isDark
                                        ? 'bg-slate-800 group-hover:bg-blue-900/50'
                                        : 'bg-slate-100 group-hover:bg-teal-100'
                                        }`} />
                                </div>
                                <h3 className={`font-serif text-2xl transition-colors duration-300 ${isDark
                                    ? 'text-zinc-100 group-hover:text-blue-300'
                                    : 'text-slate-900 group-hover:text-teal-700'
                                    }`}>
                                    {item.decision}
                                </h3>
                            </div>

                            {/* Rationale - The "Why" */}
                            <div className="space-y-2">
                                <p className={`leading-relaxed text-sm md:text-base ${isDark ? 'text-zinc-400' : 'text-slate-600'
                                    }`}>
                                    {item.rationale}
                                </p>
                            </div>

                            {/* Tradeoff & Rejected - Lower Emphasis */}
                            <div className={`mt-auto pt-6 space-y-4 border-t transition-colors ${isDark
                                ? 'border-slate-800 group-hover:border-slate-700'
                                : 'border-slate-50 group-hover:border-slate-100'
                                }`}>
                                {/* Tradeoff */}
                                <div className="flex gap-3 items-start opacity-80 group-hover:opacity-100 transition-opacity">
                                    <AlertTriangle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isDark ? 'text-amber-500' : 'text-amber-500'}`} />
                                    <div className="space-y-1">
                                        <span className={`text-[10px] uppercase tracking-widest font-semibold block ${isDark ? 'text-slate-500' : 'text-slate-400'
                                            }`}>The Tension</span>
                                        <p className={`text-xs italic leading-normal ${isDark ? 'text-zinc-500' : 'text-slate-500'
                                            }`}>
                                            "{item.tradeoff}"
                                        </p>
                                    </div>
                                </div>

                                {/* Rejected */}
                                <div className="flex gap-3 items-start opacity-60 group-hover:opacity-100 transition-opacity">
                                    <XCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isDark ? 'text-slate-600' : 'text-slate-300'
                                        }`} />
                                    <div className="space-y-1">
                                        <span className={`text-[10px] uppercase tracking-widest font-semibold block ${isDark ? 'text-slate-600' : 'text-slate-400'
                                            }`}>Dismissed</span>
                                        <p className={`text-xs line-through ${isDark
                                            ? 'text-slate-600 decoration-slate-700'
                                            : 'text-slate-400 decoration-slate-300'
                                            }`}>
                                            {item.rejectedOption}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

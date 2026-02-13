import React from 'react';
import { AlertTriangle, HelpCircle, Lock, Target } from 'lucide-react';
import ComponentHeading from '@/components/ui/ComponentHeading';

interface ChallengeDeconstructionProps {
    data: {
        assumptions: string[];
        unknowns: string[];
        constraints: string[];
        businessGoal: string;
    };
    theme?: 'light' | 'dark';
}

export const ChallengeDeconstruction: React.FC<ChallengeDeconstructionProps> = ({ data, theme = 'light' }) => {
    const isDark = theme === 'dark';

    // Presentation Mode Layout (Dark)
    if (isDark) {
        return (
            <div className="w-full h-full flex flex-col">
                {/* Header matching PresentationSlide */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                        <span className="text-rose-500 text-xs uppercase tracking-widest font-bold">
                            Problem Phase
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                        Deconstructing the Problem
                    </h2>

                    <div className="h-1 w-20 bg-zinc-800 rounded-full" />
                </div>

                {/* Grid Content - Adapted for Presentation */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 grow">
                    {/* Assumptions */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 pb-4 border-b border-rose-500/20">
                            <AlertTriangle className="w-5 h-5 text-rose-500" strokeWidth={2} />
                            <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-100">Risky Assumptions</h4>
                        </div>
                        <ul className="space-y-4">
                            {data.assumptions.map((item, idx) => (
                                <li key={idx} className="flex gap-3 text-zinc-400 text-lg font-light leading-relaxed">
                                    <span className="w-1.5 h-1.5 rounded-full mt-2.5 shrink-0 bg-rose-500/50" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Unknowns */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 pb-4 border-b border-rose-500/20">
                            <HelpCircle className="w-5 h-5 text-rose-500" strokeWidth={2} />
                            <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-100">Known Unknowns</h4>
                        </div>
                        <ul className="space-y-4">
                            {data.unknowns.map((item, idx) => (
                                <li key={idx} className="flex gap-3 text-zinc-400 text-lg font-light leading-relaxed">
                                    <span className="w-1.5 h-1.5 rounded-full mt-2.5 shrink-0 bg-rose-500/50" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Constraints */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 pb-4 border-b border-rose-500/20">
                            <Lock className="w-5 h-5 text-rose-500" strokeWidth={2} />
                            <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-100">Hard Constraints</h4>
                        </div>
                        <ul className="space-y-4">
                            {data.constraints.map((item, idx) => (
                                <li key={idx} className="flex gap-3 text-zinc-400 text-lg font-light leading-relaxed">
                                    <span className="w-1.5 h-1.5 rounded-full mt-2.5 shrink-0 bg-rose-500/50" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Business Goal - Footer */}
                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-baseline gap-6 justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 whitespace-nowrap">Core Business Goal</span>
                    <p className="text-2xl md:text-3xl font-light text-white leading-tight">
                        {data.businessGoal}
                    </p>
                </div>
            </div>
        );
    }

    // Standard Layout (Light Mode / Scroll)
    return (
        <div className="w-full max-w-6xl mx-auto my-16 md:my-24 px-4 md:px-6">
            <ComponentHeading
                variant="block"
                tag="// THE_CHALLENGE"
                title="Deconstructing the Problem"
                description={
                    <span>
                        The core issue wasn&apos;t just about visuals—it was a <span className="text-indigo-600 font-medium">structural disconnect</span> between user intent and system capability.
                    </span>
                }
                color="indigo"
                align="center"
                className="mb-12"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 border-t border-slate-100 pt-12">

                {/* Assumptions */}
                <div className="md:pr-12 md:border-r border-slate-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-rose-50 text-rose-500">
                            <AlertTriangle className="w-5 h-5" strokeWidth={2} />
                        </div>
                        <h4 className="text-sm font-semibold uppercase tracking-widest text-slate-900">Risky Assumptions</h4>
                    </div>
                    <ul className="space-y-4">
                        {data.assumptions.map((item, idx) => (
                            <li key={idx} className="flex gap-3 text-slate-600 text-base leading-relaxed font-light">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-200 mt-2 shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Unknowns */}
                <div className="md:px-12 md:border-r border-slate-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-amber-50 text-amber-500">
                            <HelpCircle className="w-5 h-5" strokeWidth={2} />
                        </div>
                        <h4 className="text-sm font-semibold uppercase tracking-widest text-slate-900">Known Unknowns</h4>
                    </div>
                    <ul className="space-y-4">
                        {data.unknowns.map((item, idx) => (
                            <li key={idx} className="flex gap-3 text-slate-600 text-base leading-relaxed font-light">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-200 mt-2 shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Constraints */}
                <div className="md:pl-12">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 rounded-lg bg-slate-100 text-slate-600">
                            <Lock className="w-5 h-5" strokeWidth={2} />
                        </div>
                        <h4 className="text-sm font-semibold uppercase tracking-widest text-slate-900">Hard Constraints</h4>
                    </div>
                    <ul className="space-y-4">
                        {data.constraints.map((item, idx) => (
                            <li key={idx} className="flex gap-3 text-slate-600 text-base leading-relaxed font-light">
                                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Business Goal - Clean Banner */}
            <div className="mt-16 pt-10 border-t border-slate-100 flex flex-col items-center text-center">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-4">Core Business Goal</span>
                <p className="text-2xl md:text-3xl font-light text-slate-900 leading-tight max-w-3xl">
                    {data.businessGoal}
                </p>
            </div>
        </div>
    );
};

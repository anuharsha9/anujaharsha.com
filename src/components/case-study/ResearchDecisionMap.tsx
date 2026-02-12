import React from 'react';
import { Microscope, Zap, ArrowRight, Lightbulb } from 'lucide-react';

interface ResearchDecision {
    insight: string;
    evidence: string;
    decision: string;
    feature: string;
}

interface ResearchDecisionMapProps {
    data: ResearchDecision[];
}

export const ResearchDecisionMap: React.FC<ResearchDecisionMapProps> = ({ data }) => {
    return (
        <div className="w-full max-w-5xl mx-auto my-24 relative">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--accent-teal)]/40 to-transparent" />

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-12">
                {data.map((item, idx) => (
                    <div key={idx} className="md:col-span-6 group relative p-8 border border-slate-200 hover:border-[var(--accent-teal)] transition-all duration-300 bg-white rounded-2xl">
                        <div className="absolute top-4 right-4 text-slate-200 group-hover:text-[var(--accent-amber)] transition-colors">
                            <Lightbulb className="w-12 h-12" />
                        </div>

                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-3">
                                <Microscope className="w-4 h-4 text-[var(--accent-violet)]" />
                                <span className="text-[var(--accent-violet)] text-xs uppercase tracking-widest font-semibold">Insight</span>
                            </div>
                            <p className="text-xl font-light text-slate-900 leading-snug">
                                "{item.insight}"
                            </p>
                            <p className="text-xs text-slate-400 mt-2 font-mono">
                                Source: {item.evidence}
                            </p>
                        </div>

                        <div className="w-full h-[1px] bg-slate-100 my-6 group-hover:bg-[var(--accent-teal)]/30 transition-colors" />

                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <Zap className="w-4 h-4 text-[var(--accent-teal)]" />
                                <span className="text-[var(--accent-teal)] text-xs uppercase tracking-widest font-semibold">Product Decision</span>
                            </div>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                {item.decision}
                            </p>

                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-medium rounded-full">
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

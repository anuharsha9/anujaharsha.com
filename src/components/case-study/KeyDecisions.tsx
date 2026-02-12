import React from 'react';
import { Share2, XCircle } from 'lucide-react';

interface KeyDecision {
    decision: string;
    rationale: string;
    tradeoff: string;
    rejectedOption: string;
}

interface KeyDecisionsProps {
    data: KeyDecision[];
}

export const KeyDecisions: React.FC<KeyDecisionsProps> = ({ data }) => {
    return (
        <div className="max-w-4xl mx-auto my-24">
            <h3 className="text-2xl font-light text-slate-900 mb-8 border-b border-slate-200 pb-4">
                Strategic Pivots
            </h3>

            <div className="space-y-8">
                {data.map((item, idx) => (
                    <div key={idx} className="group relative pl-8 border-l-2 border-slate-200 hover:border-[var(--accent-teal)] transition-colors duration-300">
                        <div className="absolute -left-[9px] top-0 w-4 h-4 bg-white border-2 border-slate-300 group-hover:border-[var(--accent-teal)] transition-colors" />

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                            <div className="md:col-span-8">
                                <h4 className="text-xl font-medium text-slate-900 mb-2 group-hover:text-[var(--accent-teal)] transition-colors">
                                    {item.decision}
                                </h4>
                                <p className="text-slate-600 mb-4 leading-relaxed">
                                    <span className="text-slate-400 font-semibold uppercase text-xs tracking-wider mr-2">Rationale:</span>
                                    {item.rationale}
                                </p>
                                <p className="text-slate-500 text-sm leading-relaxed border-l-2 border-amber-200 pl-3">
                                    <span className="text-amber-600 font-semibold uppercase text-xs tracking-wider mr-2">Tradeoff:</span>
                                    {item.tradeoff}
                                </p>
                            </div>

                            <div className="md:col-span-4 flex flex-col justify-start pt-1">
                                <div className="p-4 border border-red-100 bg-red-50/50">
                                    <div className="flex items-center gap-2 text-red-600 mb-2">
                                        <XCircle className="w-4 h-4" />
                                        <span className="text-xs font-bold uppercase tracking-wider">Rejected path</span>
                                    </div>
                                    <p className="text-red-800/70 text-sm italic">
                                        "{item.rejectedOption}"
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

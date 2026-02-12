import React from 'react';
import { Target, TrendingUp, ShieldCheck } from 'lucide-react';

interface CompetitiveResponseProps {
    data: {
        marketGap: string;
        response: string;
        evidenceSource: string;
    };
}

export const CompetitiveResponse: React.FC<CompetitiveResponseProps> = ({ data }) => {
    return (
        <div className="w-full max-w-4xl mx-auto my-16 p-8 border border-slate-200 bg-white rounded-2xl relative overflow-hidden">

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                    <div className="flex items-center gap-2 mb-4 text-red-600">
                        <Target className="w-5 h-5" />
                        <h4 className="text-sm font-bold uppercase tracking-widest">The Market Gap</h4>
                    </div>
                    <p className="text-xl text-slate-700 font-light leading-relaxed mb-6">
                        {data.marketGap}
                    </p>
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-mono border-t border-dashed border-slate-200 pt-4">
                        <span className="w-2 h-2 bg-slate-300" />
                        Source: {data.evidenceSource}
                    </div>
                </div>

                <div className="relative pl-8 md:border-l border-slate-200">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--accent-teal)] to-[var(--accent-violet)] hidden md:block" />

                    <div className="flex items-center gap-2 mb-4 text-[var(--accent-teal)]">
                        <ShieldCheck className="w-5 h-5" />
                        <h4 className="text-sm font-bold uppercase tracking-widest">Our Strategic Response</h4>
                    </div>
                    <p className="text-lg text-slate-900 font-medium leading-relaxed">
                        {data.response}
                    </p>
                </div>
            </div>
        </div>
    );
};

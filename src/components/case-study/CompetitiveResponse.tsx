import React from 'react';
import { Target, TrendingUp, ShieldCheck } from 'lucide-react';

interface CompetitiveResponseProps {
    data: {
        marketGap: string;
        response: string;
        evidenceSource: string;
    };
    theme?: 'light' | 'dark';
}

export const CompetitiveResponse: React.FC<CompetitiveResponseProps> = ({ data, theme = 'light' }) => {
    const isDark = theme === 'dark';

    return (
        isDark ? (
            // Presentation Layout
            <div className="w-full h-full flex flex-col">
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-emerald-500 text-xs uppercase tracking-widest font-bold">
                            Execution Phase
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                        Competitive Response
                    </h2>

                    <div className="h-1 w-20 bg-zinc-800 rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start grow content-center">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 pb-4 border-b border-rose-500/20">
                            <Target className="w-6 h-6 text-rose-500" />
                            <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-100">The Market Gap</h4>
                        </div>
                        <p className="text-xl font-light text-zinc-400 leading-relaxed">
                            {data.marketGap}
                        </p>
                        <div className="flex items-center gap-2 text-xs font-mono text-zinc-600 border-t border-zinc-800 pt-4">
                            <span className="w-2 h-2 bg-zinc-700 rounded-full" />
                            Source: {data.evidenceSource}
                        </div>
                    </div>

                    <div className="space-y-6 relative">
                        {/* Vertical Divider for Desktop */}
                        <div className="absolute -left-6 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/50 to-transparent hidden md:block" />

                        <div className="flex items-center gap-3 pb-4 border-b border-emerald-500/20">
                            <ShieldCheck className="w-6 h-6 text-emerald-500" />
                            <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-100">Our Strategic Response</h4>
                        </div>
                        <p className="text-xl font-medium text-white leading-relaxed">
                            {data.response}
                        </p>
                    </div>
                </div>
            </div>
        ) : (
            // Standard Card Layout
            <div className="w-full max-w-4xl mx-auto my-16 p-8 border rounded-2xl relative overflow-hidden bg-white border-slate-200">
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div className="flex items-center gap-2 mb-4 text-red-500">
                            <Target className="w-5 h-5" />
                            <h4 className="text-sm font-bold uppercase tracking-widest">The Market Gap</h4>
                        </div>
                        <p className="text-xl font-light leading-relaxed mb-6 text-slate-700">
                            {data.marketGap}
                        </p>
                        <div className="flex items-center gap-2 text-xs font-mono border-t border-dashed pt-4 text-slate-400 border-slate-200">
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
                        <p className="text-lg font-medium leading-relaxed text-slate-900">
                            {data.response}
                        </p>
                    </div>
                </div>
            </div>
        )
    );
};

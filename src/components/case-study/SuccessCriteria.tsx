import React from 'react';
import { ArrowRight, Trophy, Target } from 'lucide-react';
import ComponentHeading from '@/components/ui/ComponentHeading';

interface SuccessCriteriaProps {
    data: {
        baseline: string;
        target: string;
        result: string;
        disclaimer?: string;
    };
    theme?: 'light' | 'dark';
}

export const SuccessCriteria: React.FC<SuccessCriteriaProps> = ({ data, theme = 'light' }) => {
    const isDark = theme === 'dark';

    return (
        <div className="w-full max-w-5xl mx-auto my-24 px-6 md:px-0">
            {/* Header */}
            {isDark ? (
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-emerald-500 text-xs uppercase tracking-widest font-bold">
                            Outcome Phase
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                        Measuring Progress
                    </h2>

                    <div className="h-1 w-20 bg-zinc-800 rounded-full" />
                </div>
            ) : (
                <ComponentHeading
                    variant="block"
                    tag="Success Metrics"
                    title="Measuring Progress"
                    align="center"
                    color="slate"
                    className="mb-16"
                />
            )}

            {/* Metrics Grid */}
            <div className={`grid grid-cols-1 md:grid-cols-3 rounded-2xl shadow-sm border overflow-hidden divide-y md:divide-y-0 md:divide-x ${isDark
                ? 'bg-slate-900 border-slate-800 divide-slate-800'
                : 'bg-white border-slate-100 divide-slate-100'
                }`}>
                {/* Baseline */}
                <div className={`p-10 flex flex-col items-center text-center space-y-6 group transition-colors ${isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50/50'
                    }`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-slate-50 border-slate-100'
                        }`}>
                        <div className={`w-2 h-2 rounded-full ${isDark ? 'bg-slate-500' : 'bg-slate-400'}`} />
                    </div>
                    <div>
                        <span className={`block text-[10px] font-bold uppercase tracking-[0.15em] mb-3 ${isDark ? 'text-slate-500' : 'text-slate-400'
                            }`}>Baseline</span>
                        <p className={`text-lg font-light leading-relaxed px-2 ${isDark ? 'text-zinc-400' : 'text-slate-600'
                            }`}>
                            {data.baseline}
                        </p>
                    </div>
                </div>

                {/* Target */}
                <div className={`p-10 flex flex-col items-center text-center space-y-6 group transition-colors relative ${isDark ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50/50'
                    }`}>
                    {/* Arrow Indicators */}
                    <div className={`absolute top-1/2 -left-3 hidden md:flex items-center justify-center z-10 w-6 h-6 rounded-full border shadow-sm ${isDark
                        ? 'bg-slate-800 border-slate-700 text-slate-500'
                        : 'bg-white border-slate-100 text-slate-300'
                        }`}>
                        <ArrowRight className="w-3 h-3" />
                    </div>
                    <div className={`absolute -top-3 left-1/2 -translate-x-1/2 md:hidden flex items-center justify-center z-10 w-6 h-6 rounded-full border shadow-sm ${isDark
                        ? 'bg-slate-800 border-slate-700 text-slate-500'
                        : 'bg-white border-slate-100 text-slate-300'
                        }`}>
                        <ArrowRight className="w-3 h-3 rotate-90" />
                    </div>

                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 border ${isDark ? 'bg-blue-900/20 border-blue-900/50' : 'bg-blue-50 border-blue-100'
                        }`}>
                        <Target className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} strokeWidth={1.5} />
                    </div>
                    <div>
                        <span className={`block text-[10px] font-bold uppercase tracking-[0.15em] mb-3 ${isDark ? 'text-blue-400' : 'text-blue-500'
                            }`}>Target</span>
                        <p className={`text-lg font-light leading-relaxed px-2 ${isDark ? 'text-zinc-200' : 'text-slate-900'
                            }`}>
                            {data.target}
                        </p>
                    </div>
                </div>

                {/* Result */}
                <div className={`p-10 flex flex-col items-center text-center space-y-6 group transition-colors relative ${isDark
                    ? 'bg-emerald-900/10 hover:bg-emerald-900/20'
                    : 'bg-emerald-50/30 hover:bg-emerald-50/50'
                    }`}>
                    {/* Arrow Indicators */}
                    <div className={`absolute top-1/2 -left-3 hidden md:flex items-center justify-center z-10 w-6 h-6 rounded-full border shadow-sm ${isDark
                        ? 'bg-slate-800 border-slate-700 text-slate-500'
                        : 'bg-white border-slate-100 text-slate-300'
                        }`}>
                        <ArrowRight className="w-3 h-3" />
                    </div>
                    <div className={`absolute -top-3 left-1/2 -translate-x-1/2 md:hidden flex items-center justify-center z-10 w-6 h-6 rounded-full border shadow-sm ${isDark
                        ? 'bg-slate-800 border-slate-700 text-slate-500'
                        : 'bg-white border-slate-100 text-slate-300'
                        }`}>
                        <ArrowRight className="w-3 h-3 rotate-90" />
                    </div>

                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 shadow-sm border ${isDark ? 'bg-emerald-900/30 border-emerald-800' : 'bg-emerald-100 border-emerald-200'
                        }`}>
                        <Trophy className={`w-5 h-5 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} strokeWidth={1.5} />
                    </div>
                    <div>
                        <span className={`block text-[10px] font-bold uppercase tracking-[0.15em] mb-3 ${isDark ? 'text-emerald-400' : 'text-emerald-600'
                            }`}>Result</span>
                        <p className={`text-lg font-medium leading-relaxed px-2 ${isDark ? 'text-emerald-300' : 'text-emerald-900'
                            }`}>
                            {data.result}
                        </p>
                    </div>
                </div>
            </div>

            {/* Disclaimer */}
            {data.disclaimer && (
                <div className={`mt-8 text-center ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                    <p className="text-[10px] md:text-xs font-mono max-w-2xl mx-auto opacity-70">
                        * {data.disclaimer}
                    </p>
                </div>
            )}
        </div>
    );
};

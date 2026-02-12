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
}

export const SuccessCriteria: React.FC<SuccessCriteriaProps> = ({ data }) => {
    return (
        <div className="w-full max-w-5xl mx-auto my-24 px-6 md:px-0">
            {/* Header */}
            <ComponentHeading
                variant="block"
                tag="Success Metrics"
                title="Measuring Progress"
                align="center"
                color="slate"
                className="mb-16"
            />

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden divide-y md:divide-y-0 md:divide-x divide-slate-100">
                {/* Baseline */}
                <div className="p-10 flex flex-col items-center text-center space-y-6 group hover:bg-slate-50/50 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-2 border border-slate-100">
                        <div className="w-2 h-2 rounded-full bg-slate-400" />
                    </div>
                    <div>
                        <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-3">Baseline</span>
                        <p className="text-slate-600 text-lg font-light leading-relaxed px-2">
                            {data.baseline}
                        </p>
                    </div>
                </div>

                {/* Target */}
                <div className="p-10 flex flex-col items-center text-center space-y-6 group hover:bg-slate-50/50 transition-colors relative">
                    {/* Arrow Indicators */}
                    <div className="absolute top-1/2 -left-3 hidden md:flex items-center justify-center z-10 w-6 h-6 bg-white rounded-full border border-slate-100 shadow-sm text-slate-300">
                        <ArrowRight className="w-3 h-3" />
                    </div>
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 md:hidden flex items-center justify-center z-10 w-6 h-6 bg-white rounded-full border border-slate-100 shadow-sm text-slate-300">
                        <ArrowRight className="w-3 h-3 rotate-90" />
                    </div>

                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mb-2 border border-blue-100">
                        <Target className="w-5 h-5 text-blue-500" strokeWidth={1.5} />
                    </div>
                    <div>
                        <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-blue-500 mb-3">Target</span>
                        <p className="text-slate-900 text-lg font-light leading-relaxed px-2">
                            {data.target}
                        </p>
                    </div>
                </div>

                {/* Result */}
                <div className="p-10 flex flex-col items-center text-center space-y-6 bg-emerald-50/30 group hover:bg-emerald-50/50 transition-colors relative">
                    {/* Arrow Indicators */}
                    <div className="absolute top-1/2 -left-3 hidden md:flex items-center justify-center z-10 w-6 h-6 bg-white rounded-full border border-slate-100 shadow-sm text-slate-300">
                        <ArrowRight className="w-3 h-3" />
                    </div>
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 md:hidden flex items-center justify-center z-10 w-6 h-6 bg-white rounded-full border border-slate-100 shadow-sm text-slate-300">
                        <ArrowRight className="w-3 h-3 rotate-90" />
                    </div>

                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-2 shadow-sm border border-emerald-200">
                        <Trophy className="w-5 h-5 text-emerald-600" strokeWidth={1.5} />
                    </div>
                    <div>
                        <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-600 mb-3">Result</span>
                        <p className="text-emerald-900 text-lg font-medium leading-relaxed px-2">
                            {data.result}
                        </p>
                    </div>
                </div>
            </div>

            {/* Disclaimer */}
            {data.disclaimer && (
                <div className="mt-8 text-center text-slate-400">
                    <p className="text-[10px] md:text-xs font-mono max-w-2xl mx-auto opacity-70">
                        * {data.disclaimer}
                    </p>
                </div>
            )}
        </div>
    );
};

import React from 'react';
import { AlertOctagon, RefreshCw } from 'lucide-react';

interface NotShippedProps {
    data: {
        reason: string;
        learning: string;
        nextStep: string;
    };
    theme?: 'light' | 'dark';
}

export const NotShipped: React.FC<NotShippedProps> = ({ data, theme = 'light' }) => {
    const isDark = theme === 'dark';

    return (
        <div className={`w-full max-w-4xl mx-auto my-12 p-8 border border-dashed relative ${isDark
                ? 'bg-slate-900/30 border-slate-700'
                : 'bg-slate-50/50 border-slate-300'
            }`}>
            <div className={`absolute -top-3 left-8 px-4 py-1 border text-xs font-mono uppercase tracking-widest flex items-center gap-2 ${isDark
                    ? 'bg-slate-900 border-slate-700 text-slate-400'
                    : 'bg-white border-slate-200 text-slate-500'
                }`}>
                <AlertOctagon className="w-3 h-3 text-orange-600" />
                Feature Not Shipped
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
                <div>
                    <h4 className="text-orange-600 text-xs font-bold uppercase tracking-wider mb-2">The Reason</h4>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-zinc-400' : 'text-slate-600'
                        }`}>
                        {data.reason}
                    </p>
                </div>

                <div className={`md:col-span-2 pl-0 md:pl-8 md:border-l ${isDark ? 'border-slate-800' : 'border-slate-200'
                    }`}>
                    <div className="mb-4">
                        <h4 className="text-[var(--accent-teal)] text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                            <RefreshCw className="w-3 h-3" /> The Pivot (Learning)
                        </h4>
                        <p className={`text-lg font-light leading-snug ${isDark ? 'text-zinc-200' : 'text-slate-900'
                            }`}>
                            "{data.learning}"
                        </p>
                    </div>

                    <div className={`pt-4 border-t ${isDark ? 'border-slate-800/50' : 'border-slate-200/50'
                        }`}>
                        <span className={`text-xs uppercase tracking-wider mr-2 ${isDark ? 'text-slate-500' : 'text-slate-400'
                            }`}>Next Step:</span>
                        <span className={`text-sm ${isDark ? 'text-zinc-400' : 'text-slate-600'
                            }`}>{data.nextStep}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

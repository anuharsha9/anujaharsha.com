import React from 'react';
import { AlertOctagon, RefreshCw } from 'lucide-react';

interface NotShippedProps {
    data: {
        reason: string;
        learning: string;
        nextStep: string;
    };
}

export const NotShipped: React.FC<NotShippedProps> = ({ data }) => {
    return (
        <div className="w-full max-w-4xl mx-auto my-12 p-8 border border-slate-300 border-dashed relative bg-slate-50/50">
            <div className="absolute -top-3 left-8 px-4 py-1 bg-white border border-slate-200 text-xs font-mono text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <AlertOctagon className="w-3 h-3 text-orange-600" />
                Feature Not Shipped
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
                <div>
                    <h4 className="text-orange-600 text-xs font-bold uppercase tracking-wider mb-2">The Reason</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        {data.reason}
                    </p>
                </div>

                <div className="md:col-span-2 pl-0 md:pl-8 md:border-l border-slate-200">
                    <div className="mb-4">
                        <h4 className="text-[var(--accent-teal)] text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                            <RefreshCw className="w-3 h-3" /> The Pivot (Learning)
                        </h4>
                        <p className="text-slate-900 text-lg font-light leading-snug">
                            "{data.learning}"
                        </p>
                    </div>

                    <div className="pt-4 border-t border-slate-200/50">
                        <span className="text-slate-400 text-xs uppercase tracking-wider mr-2">Next Step:</span>
                        <span className="text-slate-600 text-sm">{data.nextStep}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

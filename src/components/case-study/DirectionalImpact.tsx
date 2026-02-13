import React from 'react';
import { Info, TrendingUp } from 'lucide-react';

interface DirectionalImpactProps {
    data: {
        bullets: string[];
        disclaimer: string;
    };
    theme?: 'light' | 'dark';
}

export const DirectionalImpact: React.FC<DirectionalImpactProps> = ({ data, theme = 'light' }) => {
    const isDark = theme === 'dark';

    return (
        <div className={`w-full max-w-3xl mx-auto my-12 p-6 rounded-2xl border ${isDark
                ? 'bg-slate-900 border-slate-700'
                : 'bg-white border-slate-200'
            }`}>
            <div className="flex items-start gap-4">
                <div className="mt-1 p-2 bg-[var(--accent-teal)]/10 text-[var(--accent-teal)] rounded-lg">
                    <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="text-[var(--accent-teal)] font-semibold mb-3 tracking-wide">Directional Impact</h4>
                    <ul className="space-y-2 mb-4">
                        {data.bullets.map((bullet, idx) => (
                            <li key={idx} className={`flex items-start gap-2 text-sm leading-relaxed ${isDark ? 'text-zinc-300' : 'text-slate-700'
                                }`}>
                                <span className="mt-1.5 w-1.5 h-1.5 bg-[var(--accent-teal)] shrink-0 rounded-full" />
                                {bullet}
                            </li>
                        ))}
                    </ul>

                    <div className={`flex items-start gap-2 text-xs italic border-t pt-3 ${isDark
                            ? 'text-slate-500 border-slate-700'
                            : 'text-slate-400 border-slate-100'
                        }`}>
                        <Info className="w-3 h-3 mt-0.5 shrink-0" />
                        <p>{data.disclaimer}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

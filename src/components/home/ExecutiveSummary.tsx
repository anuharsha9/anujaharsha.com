import Link from 'next/link';
import { ArrowRight, Activity, ShieldCheck, Hammer } from 'lucide-react';
import { ExecutiveSummaryItem } from '@/data/home';

interface ExecutiveSummaryProps {
    items: ExecutiveSummaryItem[];
}

const getStatusColor = (status: string) => {
    if (status.includes('Live')) return 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)] animate-pulse';
    if (status.includes('Shipping')) return 'bg-amber-500';
    return 'bg-blue-500';
}

export const ExecutiveSummary: React.FC<ExecutiveSummaryProps> = ({ items }) => {
    return (
        <section className="py-24 bg-zinc-950 border-t border-zinc-900">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 flex items-center justify-between">
                    <h2 className="text-2xl font-light text-white flex items-center gap-3">
                        <Activity className="w-5 h-5 text-emerald-500" />
                        Portfolio Executive Summary
                    </h2>
                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest hidden md:block">
                        Status Report: Q1 2026
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {items.map((item) => (
                        <Link
                            key={item.slug}
                            href={`/work/${item.slug}`}
                            className="group p-6 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all hover:bg-zinc-900 overflow-hidden relative"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ArrowRight className="w-5 h-5 text-emerald-500 -rotate-45" />
                            </div>

                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className={`w-2 h-2 rounded-full ${getStatusColor(item.status)}`} />
                                    <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                                        {item.status}
                                    </span>
                                </div>
                                <h3 className="text-xl font-medium text-white mb-1 group-hover:text-emerald-400 transition-colors">
                                    {item.slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                                </h3>
                                <span className="inline-block px-2 py-0.5 rounded border border-zinc-800 bg-zinc-950 text-[10px] text-zinc-400 uppercase tracking-widest font-semibold mb-4">
                                    {item.caseStudyType} Case Study
                                </span>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-zinc-500 text-xs uppercase tracking-wider mb-2">The Problem</h4>
                                    <p className="text-zinc-300 text-sm leading-relaxed line-clamp-2">
                                        {item.problem}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-zinc-500 text-xs uppercase tracking-wider mb-2">Directional Impact</h4>
                                    <p className="text-emerald-100/90 text-sm font-medium leading-relaxed">
                                        {item.impactDirectional}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};


